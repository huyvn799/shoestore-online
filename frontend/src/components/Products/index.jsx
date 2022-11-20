import { popularProducts } from "~/data";

import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import Product from "./Product";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const Products = ({ category, filters, sort }) => {
  // console.log(category, filters,sort);

  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
      setFilteredProducts(
        products.filter((attr) =>
          Object.entries(filters).every(([key, values]) => {
            console.log("[keys]", attr[key]);
            console.log("[values]", values);
            console.log("[array]", Array.isArray(attr[key]));
            if (values.length === 0) {
              return true;
            } else {
              if (Array.isArray(attr[key])) {
                return values.every(item => attr[key].includes(item));
              } else {
                return values.includes(attr[key]);
              }
            } 
          }
        )
      ));
  }, [filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => 
        [...prev].sort((a,b) => a.createdAt - b.createdAt)
      )
    } else if (sort === "asc") {
      setFilteredProducts((prev) => 
        [...prev].sort((a,b) => a.price - b.price)
      )
    } else {
      setFilteredProducts((prev) => 
        [...prev].sort((a,b) => b.price - a.price)
      )
    }
  }, [sort])

  return (
    <div className={cx("products-container")}>
      {
        location.pathname.includes("products") ? 
        (
          filteredProducts.map((item) => (
            <Product item={item} key={item.id} />
          ))
        ) : (
          products.slice(0, 8).map((item) => (
            <Product item={item} key={item.id} />
          ))
        )    
      }
    </div>
  );
};

export default memo(Products);
