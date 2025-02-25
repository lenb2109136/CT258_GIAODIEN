import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Cart from "../carttour";

const TourSlider = () => {
  const sliderRef = useRef(null);
  const scrollAmount = 300;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div style={wrapperStyle}>
      <button onClick={scrollLeft} style={leftButtonStyle}>
        <FaArrowLeft />
      </button>

      <div ref={sliderRef} style={cartItemsWrapperStyle}>
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
      </div>

      <button onClick={scrollRight} style={rightButtonStyle}>
        <FaArrowRight />
      </button>
    </div>
  );
};

const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "90%",
  margin: "auto",
  overflow: "hidden",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  padding: "10px",
  backgroundColor: "#fff",
};

const buttonStyle = {
  position: "absolute",
  backgroundColor: "#fff",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
  padding: "12px",
  borderRadius: "50%",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const leftButtonStyle = {
  ...buttonStyle,
  left: "10px",
};

const rightButtonStyle = {
  ...buttonStyle,
  right: "10px",
};

const cartItemsWrapperStyle = {
  display: "flex",
  overflowX: "auto",
  scrollBehavior: "smooth",
  gap: "15px",
  whiteSpace: "nowrap",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  width: "100%",
};

export default TourSlider;
