import React, { useEffect, useState } from "react";
import { useFilter } from "../pages/hooks/useFilter";

const Filter = ({ facets }) => {
  const { filters, addFilter, removeFilter } = useFilter();
  console.log(filters);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [defaultFilter, setDefaultFilter] = useState([]);

  useEffect(() => {
    setDefaultFilter(facets);
  }, [facets]);

  const handleFilterChange = (category, label) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[category]) {
        newFilters[category] = new Set();
      }
      if (newFilters[category].has(label)) {
        newFilters[category].delete(label);
      } else {
        newFilters[category].add(label);
      }
      return newFilters;
    });
  };

  useEffect(() => {
    const generateFiltersArray = () => {
      const filtersArray = [];
      for (const [category, labelsSet] of Object.entries(selectedFilters)) {
        if (labelsSet.size > 0) {
          filtersArray.push({
            name: category,
            value: Array.from(labelsSet).join(","),
          });
        }
      }
      return filtersArray;
    };

    const filtersArray = generateFiltersArray();
    filters.forEach((filter) => removeFilter(filter.name));
    filtersArray.forEach(addFilter);
  }, [selectedFilters]);

  return (
    <>
      <div className="filter-form" id="search_filters_wrapper">
        <div class="title_block filter">
          <span>Filtrer</span>
        </div>
        <hr className="hr-filter" />
        <div id="search_filters">
          {defaultFilter &&
            defaultFilter.map((filtre, index) => (
              <div className="pb-2" key={index}>
                <h5 className="pt-3">{filtre.label}</h5>
                {filtre.filters.map((prop, index) => (
                  <div className="row filter-label" key={index}>
                    <div className="col-8">
                      <label>
                        <input
                          className="filter-input"
                          type="checkbox"
                          value={prop.label}
                          onChange={() =>
                            handleFilterChange(filtre.label, prop.label)
                          }
                        />
                        {prop.label}
                      </label>
                    </div>
                    <div className="col-4">({prop.magnitude})</div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
