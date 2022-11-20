import React, { memo, useState } from "react";

import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";
import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";
import Products from "~/components/Products";
import Newsletter from "~/components/Newsletter";
import Footer from "~/components/Footer";
import { useParams } from "react-router-dom";
import { Select, Tag, Input, Row, Col, Typography, Radio } from "antd";

const cx = classNames.bind(styles);

const {Search} = Input;
const {Option} = Select;

const ProductList = () => {

  const {category} = useParams();

  console.log(category);

  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    subject: [],
    color: []
  });
  const [sort, setSort] = useState("newest");

  // const handleFilters = (e) => {
  //   const value = e.target.value;
  //   setFilters({
  //     ...filters,
  //     [e.target.name]: value
  //   })
  // }

  // console.log(filters);
  // console.log(Object.keys(filter));

  const handleColorChange = (value) => {
    setFilters({
      ...filters,
      color: value
    })
  };

  const handleSizeChange = (value) => {
    setFilters({
      ...filters,
      size: value
    })
  };

  const handleBrandChange = (value) => {
    setFilters({
      ...filters,
      brand: value
    })
  };

  const handleSubjectChange = (value) => {
    setFilters({
      ...filters,
      subject: value
    })
  };

  const handleSortChange = (value) => {
    setSort(value)
  };


  return (
    <div className={cx("productList-container")}>
      <Navbar />
      <Announcement />
      <h1 className={cx("productList-title")}>{category ? `Shoes for ${category}` : "All shoes"}</h1>
      {/* filter origin */}
      {/* <div className={cx("productList-filterContainer")}>
        <div className={cx("productList-filter")}>
          <span className={cx("productList-filter__text")}>
            Filter Products:
          </span>
          <select name="color" className={cx("productList-filter__select")}
            onChange={handleFilters}
            // multiple
          >
            <option
              disabled
              className={cx("productList-filter__select__option")}
              defaultValue="Color"
            >
              Color
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="white"
            >
              white
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="black"
            >
              black
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="red"
            >
              red
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="blue"
            >
              blue
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="yellow"
            >
              yellow
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="green"
            >
              green
            </option>
          </select>

          
          <select name="size" className={cx("productList-filter__select")}
            onChange={handleFilters}
          >
            <option
              disabled
              className={cx("productList-filter__select__option")}
              value="Size"
            >
              Size
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="38"
            >
              38
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="39"
            >
              39
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="40"
            >
              40
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="41"
            >
              41
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="42"
            >
              42
            </option>
          </select>
        </div>

        <div className={cx("productList-filter")}>
          <span className={cx("productList-filter__text")}>Sort Products:</span>
          <select className={cx("productList-filter__select")}
            onChange={(e) => setSort(e.target.value)}
          >
            <option
              className={cx("productList-filter__select__option")}
              value="newest"
            >
              Newest
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="asc"
            >
              Price (asc)
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="desc"
            >
              Price (desc)
            </option>
          </select>
        </div>
      </div> */}

      {/* Filters Ant design */}
      {/* Select brand & category */}
      <Row gutter={[0, 16]} style={{marginLeft: "28px", marginRight: "28px"}} justify="space-between">
        <Col xs={24} sm={24} lg={12} xl={16}>
          <Row gutter={ [16,8] }>
            <Typography.Title level={4} style={{ paddingRight: "10px" }}>Filter Products:</Typography.Title>
            <Col xs={24} sm={8} xl={8}>
              <Select
                mode="multiple"
                style={{
                  width: '100%',
                }}
                placeholder="Select Brand"
                onChange={handleBrandChange}
              >
                <Option value="adidas">Adidas</Option>
                <Option value="nike">Nike</Option>
                <Option value="puma">Puma</Option>
                <Option value="reebok">Reebok</Option>
                <Option value="skechers">Skechers</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} xl={8}>
              <Select
                mode="multiple"
                style={{
                  width: '100%',
                }}
                placeholder="Select Size"
                onChange={handleSizeChange}
              >
                <Option value="35">35</Option>
                <Option value="36">36</Option>
                <Option value="37">37</Option>
                <Option value="38">38</Option>
                <Option value="39">39</Option>
                <Option value="40">40</Option>
                <Option value="41">41</Option>
                <Option value="42">42</Option>
                <Option value="43">43</Option>
                <Option value="44">44</Option>
              </Select>
            </Col>
            {/* <Col xs={24} sm={8} xl={8}>
              <Select
                mode="multiple"
                style={{
                  width: '100%',
                }}
                placeholder="Select Subject"
                onChange={handleSubjectChange}
              >
                <Option value="men">Men</Option>
                <Option value="women">Women</Option>
                <Option value="unisex">Unisex</Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col xs={24} sm={24} lg={8} xl={8}>
          <Row gutter={[16,8]}>
            <Typography.Title level={4} style={{ paddingRight: "10px" }}>Sort Products:</Typography.Title>
            <Col>
              <Select
                style={{
                  width: '170px',
                }}
                defaultValue="newest"
                onChange={handleSortChange}
              >
                <Option value="newest">Newest</Option>
                <Option value="asc">Price (ascending)</Option>
                <Option value="dsc">Price (descending)</Option>
              </Select>
            </Col>
            
          </Row>
        </Col>
      </Row>

      {/* Select color & size & Sort */}
      {/* <Row gutter={[0, 16]} style={{marginLeft: "28px", marginRight: "28px"}} justify="space-between">
        <Col xs={24} sm={24} lg={12} xl={16}>
          <Row gutter={ [16,8] }>
            <Typography.Title level={4} style={{ paddingRight: "10px" }}>Filter Products:</Typography.Title>
            <Col xs={24} sm={8} xl={8}>
              <Select
                mode="multiple"
                style={{
                  width: '100%',
                }}
                placeholder="Select Color"
                onChange={handleColorChange}
              >
                <Option value="white">White</Option>
                <Option value="red">Red</Option>
                <Option value="orange">Orange</Option>
                <Option value="yellow">Yellow</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
                <Option value="purple">Purple</Option>
                <Option value="pink">Pink</Option>
                <Option value="gray">Gray</Option>
                <Option value="black">Black</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} xl={8}>
              <Select
                mode="multiple"
                style={{
                  width: '100%',
                }}
                placeholder="Select Size"
                onChange={handleSizeChange}
              >
                <Option value="35">35</Option>
                <Option value="36">36</Option>
                <Option value="37">37</Option>
                <Option value="38">38</Option>
                <Option value="39">39</Option>
                <Option value="40">40</Option>
                <Option value="41">41</Option>
                <Option value="42">42</Option>
                <Option value="43">43</Option>
                <Option value="44">44</Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} lg={8} xl={8}>
          <Row gutter={[16,8]}>
            <Typography.Title level={4} style={{ paddingRight: "10px" }}>Sort Products:</Typography.Title>
            <Col>
              <Select
                style={{
                  width: '170px',
                }}
                defaultValue="newest"
                onChange={handleSortChange}
              >
                <Option value="newest">Newest</Option>
                <Option value="asc">Price (ascending)</Option>
                <Option value="dsc">Price (descending)</Option>
              </Select>
            </Col>
            
          </Row>
        </Col>
      </Row> */}

      {/* list product */}
      <Products category={category} filters={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default memo(ProductList);
