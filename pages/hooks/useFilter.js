import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);

  const addFilter = (newFilter) => {
    setFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter.name === newFilter.name
      );
      if (existingFilterIndex !== -1) {
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = newFilter;
        return updatedFilters;
      } else {
        return [...prevFilters, newFilter];
      }
    });
  };

  const removeFilter = (filterName) => {
    setFilters((prevFilters) => prevFilters.filter((filter) => filter.name !== filterName));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return (
    <FilterContext.Provider value={{ filters, addFilter, removeFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
