import { memo, useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";
import Newsletter from "~/components/Newsletter";
import Footer from "~/components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { publicRequest } from "~/requestMethod";
import { useRef } from "react";
import { addProduct } from "~/redux/cartRedux";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const Product = () => {

  const {id} = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const colorParentRef = useRef();

  console.log(id);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/${id}`);
        console.log(res.data);
        setProduct(res.data);
        setSize(res.data.size[0]);
        setColor(res.data.color[0]);
        chooseColorDefault();
      } catch (err) {
        console.log(err);
      }
    }

    getProduct();
  }, [id])

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }

  const chooseColorDefault = () => {
    const firstColor = Array.from(colorParentRef.current.children)[1];
    if (firstColor.classList[1].split("--")[1].includes("black")) {
      firstColor.style.border = "1px solid white";
    } else {
      firstColor.style.border = "1px solid black";
    }
  }

  const handleColorChange = (e) => {
    const allColors = Array.from(colorParentRef.current.children);

    allColors.forEach(color => {
      color.style.border = "none";
    });

    // check color black
    if (e.target.classList[1].split("--")[1].includes("black")) {
      e.target.style.border = "1px solid white";
    } else {
      e.target.style.border = "1px solid black";
    }

    setColor(e.target.classList[1].split("--")[1].split("__")[0]);
  }

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  }

  const handleClick = () => { 
    // update cart
    dispatch(addProduct({ ...product, quantity, size, color}));
  }

  return (
    <div className={cx("product-container")}>
      <Navbar />
      <Announcement />
      <div className={cx("product-wrapper")}>
        <div className={cx("product-imgContainer")}>
          <img
            className={cx("product-image")}
            src={product.img}
            alt="logo"
          />
        </div>
        <div className={cx("product-infoContainer")}>
          <h1 className={cx("product-info__title")}>{product.title}</h1>
          <p className={cx("product-info__desc")}>{product.desc}</p>
          <span className={cx("product-info__price")}>${product.price}</span>

          <div className={cx("product-info__filterContainer")}>
            {/* filter color */}
            <div ref={colorParentRef} className={cx("product-info__filter")}>
              <span className={cx("product-info__filter__title")}>Color</span>
              {
                product.color?.map((c) => (
                  <div
                    className={cx(
                      "product-info__filter__color",
                      `product-info__filter__color--${c}`,
                      // c === color ? "product-info__filter__color--active" : ""
                    )}
                    key={c}
                    onClick={handleColorChange}
                  ></div>
                ))
              }
            </div>

            {/* filter size */}
            <div className={cx("product-info__filter")}>
              <span className={cx("product-info__filter__title")}>Size</span>
              <select 
                className={cx("product-info__filter__size")}
                onChange={handleSizeChange}
              >
                {
                  product.size?.map((s) => (
                    <option
                      className={cx("product-info__filter__option")}
                      value={s}
                      key={s}
                    >
                      {s}
                    </option>
                  ))
                }
                
              </select>
            </div>
          </div>

          <div className={cx("product-info__addContainer")}>
            <div className={cx("product-info__amountContainer")}>
              <Remove className={cx("product-info__amountBtn")} onClick={() => handleQuantity("dec")}/>
              <span className={cx("product-info__amount")}>{quantity}</span>
              <Add className={cx("product-info__amountBtn")} onClick={() => handleQuantity("inc")}/>
            </div>
            <button 
              className={cx("product-info__button")}
              onClick={handleClick} >ADD TO CART</button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default memo(Product);
