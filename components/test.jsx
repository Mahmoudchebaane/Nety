import Footer from "../components/footer";
import Header from "../components/header";
import React, { useEffect, useState } from "react";
import { CategoryProduct } from "../pages/api/categoryProducts";
import Filtre from "../components/filter";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useFilter } from '../pages/hooks/useFilter';

export default function Test() {
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState([]);
  const { filters, getDataFilter } = useFilter();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchCategoryProducts() {
        console.log('from test',filters)
      try {
        const data = getDataFilter(); 
        const categoryProducts = await CategoryProduct(8, data);
        setProducts(categoryProducts.products);
        setFacets(categoryProducts.facets);
      } catch (err) {
        console.log("Erreur de chargement des produits");
      }
    }
    fetchCategoryProducts();
  }, [filters]);
}