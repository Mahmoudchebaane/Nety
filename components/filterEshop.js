import React, { useState,useEffect } from "react";
import { useFilter } from "../pages/hooks/useFilter";

export default function FilterEshop({categories,marques}) {
  const { filters, addFilter, removeFilter } = useFilter();
  const [categorie, setCategorie] = useState([]);
  const [marque, setMarque] = useState([]);
  const [filterCategorie,setFilterCategorie]=useState([]);
  const [filterMarque,setFilterMarque]=useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
 console.log(categories)
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
 useEffect(()=>{
  setFilterCategorie(categories)
  setFilterMarque(marques)
 },[filterCategorie,filterMarque])
  return (
    <div className="filter-form" id="search_filters_wrapper">
    <div class="title_block filter">
      <span>Filtrer</span>
    </div>
    <hr className="hr-filter" />
    <div id="search_filters">
    <div className="pb-2" >
    <h5 className="pt-3">Catégorie</h5>
        {filterCategorie &&
          filterCategorie.map((categorie, index) => (
            <div className="row filter-label" key={index}>
                    <div className="col-8">
            <label key={index}>
              <input
                className="filter-input"
                type="checkbox"
                value={categorie.id}
                onChange={() =>
                  handleFilterChange("categorie", categorie.id)
                }
              />
              {categorie.name}
            </label>
            </div>
            </div>
          ))}
       </div>
       

        
        <div className="pb-2" >
    <h5 className="pt-3">Marque</h5>
        {filterMarque &&
          filterMarque.map((nameMarque, index) => (
            <div className="row filter-label" key={index}>
                    <div className="col-8">
        <label key={index}>
          <input
            type="checkbox"
            value={nameMarque.value}
            onChange={() =>
              handleFilterChange("Marque", nameMarque.value)
            }
          />
          {nameMarque.label}
        </label>
        </div>
      </div>
          ))}
          
          </div>
      </div>
      </div>
  );
}
