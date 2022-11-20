import React, { useState } from "react";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import Slide from "./Slide";
import { sliderItems } from "~/data";

import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const hanleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className={cx("slider-container")}>
      <div
        onClick={() => hanleClick("left")}
        className={cx("slider-arrow", "slider-arrow--left")}
      >
        <ArrowLeftOutlined />
      </div>
      <div
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
        className={cx("slider-wrapper")}
      >
        {sliderItems.map((items) => (
          <Slide
            key={items.id}
            bg={items.bg}
            img={items.img}
            title={items.title}
            desc={items.desc}
            id={items.id}
          />
        ))}
      </div>
      <div
        onClick={() => hanleClick("right")}
        className={cx("slider-arrow", "slider-arrow--right")}
      >
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
