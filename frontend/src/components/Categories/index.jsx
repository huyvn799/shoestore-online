 
import { categories } from "~/data";

import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import CategoryItem from "./CategoryItem";

const cx = classNames.bind(styles);

const Categories = () => {
  return (
    <div className={cx("categories-container")}>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Categories;
