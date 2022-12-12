import { memo, useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";
import Newsletter from "~/components/Newsletter";
import Footer from "~/components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicRequest } from "~/requestMethod";
import { useRef } from "react";
import { addToCart } from "~/redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { modalInfo } from "~/modalNotify";
import { updateCart } from "~/redux/apiCalls";

const cx = classNames.bind(styles);

const Product = () => {

  const user = useSelector(state => state.auth.login.currentUser);
  const allProducts = useSelector(state => state.product.items);
  const cart = useSelector(state => state.cart);

  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [productsInSeries, setProductsInSeries] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const colorParentRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(allProducts);

  useEffect(() => {
    const currentProduct = allProducts.find(product => product._id === id);
    const seriesCode = currentProduct?.seriesCode;
    
    document.title = currentProduct.title;
    setProduct(currentProduct);
    setSize(Object.keys(currentProduct.size)[0].toString());
    setColor(currentProduct.color);
    setQuantity(1);
    

    const products = allProducts.filter(product => product.seriesCode === seriesCode).sort((a, b) => b - a);
    // console.log(products);

    setProductsInSeries(products);

  }, [id])

  useEffect(() => {
    setMaxQuantity(product?.size[size]);
  }, [product, size, color])

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      quantity < maxQuantity && setQuantity(quantity + 1);
    }
  }

  // const chooseColorDefault = () => {
  //   const allColors = Array.from(colorParentRef.current.children).slice(1);

  //   const currentColor = allColors.find(p => p.color === color);

  //   if (allColors && product && color){ 
  //     console.log(allColors);
  //     console.log(product);
  //     console.log(color);
  //     if (currentColor?.classList[1].split("--")[1].includes("black")) {
  //       currentColor.style.border = "1px solid white";
  //     } else {
  //       currentColor.style.border = "1px solid black";
  //     }
  //   }

  // }

  const handleColorChange = (e) => {
    // const allColors = Array.from(colorParentRef.current.children);

    // allColors.forEach(color => {
    //   color.style.border = "none";
    // });

    // // check color black
    // if (e.target.classList[1].split("--")[1].includes("black")) {
    //   e.target.style.border = "1px solid white";
    // } else {
    //   e.target.style.border = "1px solid black";
    // }

    setColor(e.target.classList[1].split("--")[1].split("__")[0]);
  }

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    setQuantity(1);
    setMaxQuantity(product.size[size]);
  }
  console.log(size);
  console.log(maxQuantity);

  const handleAddToCart = () => { 
    if (user) {
      // update cart
      const title = product.title+"-"+size;
      const _id = product._id+"#"+size;
      // console.log({ ...product,_id, title, quantity, size, color});
      dispatch(addToCart({ ...product, _id, title, quantity, size, color}));

      // updateCart(user.accessToken, user._id, cart)
      // console.log(cart);
    } else {
      modalInfo("add to your cart", navigate)
    }
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        updateCart(user.accessToken, user._id, cart)
      }, 1000)
    }
    return () => {
      console.log("delete");
    }
  }, [cart, user])

  return (
    <div className={cx("product-container")}>
      {/* <Navbar /> */}
      <Announcement />
      <div className={cx("product-wrapper")}>
        <div className={cx("product-imgContainer")}>
          <img
            className={cx("product-image")}
            src={product?.img}
            alt="logo"
          />
        </div>
        <div className={cx("product-infoContainer")}>
          <h1 className={cx("product-info__title")}>{product?.title}</h1>
          <p className={cx("product-info__desc")}>{product?.desc}</p>
          <span className={cx("product-info__price")}>${product?.price}</span>

          <div className={cx("product-info__filterContainer")}>
            {/* filter color */}
            <div ref={colorParentRef} className={cx("product-info__filter")}>
              <span className={cx("product-info__filter__title")}>Color</span>
              {
                productsInSeries && productsInSeries?.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    className={cx(
                      "product-info__filter__color",
                      `product-info__filter__color--${product.color}`,
                      product.color === color ? `product-info__filter__color--${product.color}--active` : ""
                    )}
                    key={product.color}
                    // onClick={handleColorChange}
                  ></Link>
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
                  product && Object.entries(product?.size)?.map(([s, inStock], index) => {
                    return (
                      <option
                        className={cx("product-info__filter__option")}
                        value={s}
                        key={s}
                        selected={index === 0}
                      >
                        {s}
                      </option>
                    )
                  }) 
                }
                
              </select>
            </div>
          </div>

          {maxQuantity === 0 ? (
            <div>OUT OF STOCK</div>
          ): (
            <div className={cx("product-info__addContainer")}>
              <div className={cx("product-info__amountContainer")}>
                <Remove className={cx("product-info__amountBtn")} onClick={() => handleQuantity("dec")}/>
                <span className={cx("product-info__amount")}>{quantity}</span>
                <Add className={cx("product-info__amountBtn")} onClick={() => handleQuantity("inc")}/>
              </div>
                <button 
                  className={cx("product-info__button")}
                  onClick={handleAddToCart} >ADD TO CART</button>
            </div>
          )}
        </div>
      </div>
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default memo(Product);
