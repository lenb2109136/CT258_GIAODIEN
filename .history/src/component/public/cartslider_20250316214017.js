import React, { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import TourCard from './carttour'; // Sử dụng TourCard thay vì Cart
import { Link } from 'react-router-dom';

const TourSlider = props => {
  const sliderRef = useRef(null);
  const scrollAmount = 300;
  const [displayTours, setDisplayTours] = useState(props.ds || []);

  const calculateSimilarity = (tour1, tour2, chanData) => {
    // Vector cơ bản: Số ngày, số đêm, giá
    const vector1 = [tour1.T_SONGAY || 0, tour1.T_SODEM || 0, tour1.gia || 0];
    const vector2 = [tour2.T_SONGAY || 0, tour2.T_SODEM || 0, tour2.gia || 0];

    // Tính tích vô hướng và độ lớn của vector
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }

    const magnitude1 = Math.sqrt(
      vector1.reduce((sum, val) => sum + val * val, 0)
    );
    const magnitude2 = Math.sqrt(
      vector2.reduce((sum, val) => sum + val * val, 0)
    );

    let similarity =
      magnitude1 === 0 || magnitude2 === 0
        ? 0
        : dotProduct / (magnitude1 * magnitude2);

    // 1. So sánh loại tour (LT_ID)
    if (tour1.LT_ID === tour2.LT_ID) {
      similarity += 0.1; // Tăng độ tương đồng nếu cùng loại tour
    }

    // 2. So sánh điểm đến trong bảng chan (dựa trên T_ID)
    const chanTour1 = chanData.filter(chan => chan.T_ID === tour1.T_ID);
    const chanTour2 = chanData.filter(chan => chan.T_ID === tour2.T_ID);
    const commonDestinations = chanTour1.filter(c1 =>
      chanTour2.some(c2 => c1.C_DIADIEMDEN === c2.C_DIADIEMDEN)
    ).length;
    if (commonDestinations > 0) {
      similarity += 0.05 * commonDestinations; // Tăng độ tương đồng dựa trên số điểm đến chung
    }

    // 3. So sánh thời gian khởi hành (T_THOIGIANKHOIHANH)
    const time1 = new Date(tour1.T_THOIGIANKHOIHANH).getTime();
    const time2 = new Date(tour2.T_THOIGIANKHOIHANH).getTime();
    const timeDiff = Math.abs(time1 - time2) / (1000 * 60 * 60 * 24); // Chênh lệch tính bằng ngày
    if (timeDiff <= 7) {
      similarity += 0.1 * (1 - timeDiff / 7); // Tương đồng giảm dần nếu cách xa đến 7 ngày
    }

    // 4. So sánh tags (T_TAGS)
    const tags1 = (tour1.T_TAGS || '').split(',').map(tag => tag.trim());
    const tags2 = (tour2.T_TAGS || '').split(',').map(tag => tag.trim());
    const commonTags = tags1.filter(tag => tags2.includes(tag)).length;
    if (commonTags > 0) {
      similarity += 0.05 * commonTags; // Tăng độ tương đồng dựa trên số tag chung
    }

    // Giới hạn similarity trong khoảng [0, 1]
    return Math.min(Math.max(similarity, 0), 1);
  };

  const getRecommendedTours = (selectedTour, allTours) => {
    const similarities = allTours.map(tour => ({
      tour,
      similarity: calculateSimilarity(selectedTour, tour),
    }));

    const sortedTours = similarities
      .filter(item => item.tour.T_ID !== selectedTour.T_ID)
      .sort((a, b) => b.similarity - a.similarity);

    return sortedTours.slice(0, 5).map(item => item.tour);
  };

  const handleTourClick = selectedTour => {
    const recommendedTours = getRecommendedTours(
      selectedTour,
      props.allTours || props.ds
    );
    setDisplayTours(recommendedTours);
    if (props.onTourClick) {
      props.onTourClick(selectedTour);
    }
  };

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

  useEffect(() => {
    setDisplayTours(props.ds || []);
  }, [props.ds]);

  return (
    <div style={wrapperStyle}>
      <button onClick={scrollLeft} style={leftButtonStyle}>
        <FaArrowLeft />
      </button>

      <div ref={sliderRef} style={cartItemsWrapperStyle}>
        {displayTours.length > 0 ? (
          displayTours.map((data, index) => (
            <Link
              key={index}
              to={`/khachhang/tour?id=${data.T_ID}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                marginLeft: '6%',
              }}
              onClick={e => {
                e.preventDefault();
                handleTourClick(data);
                setTimeout(() => {
                  window.location.href = `/khachhang/tour?id=${data.T_ID}`;
                }, 100);
              }}
            >
              <TourCard
                ten={data.T_TEN}
                id={data.T_ID}
                gia={data.gia}
                ngay={data.T_SONGAY}
                anh={data.T_ANH}
                dem={data.T_SODEM}
                lt_id={data.LT_ID}
                onTourSelect={handleTourClick}
              />
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
            Không có tour để hiển thị
          </div>
        )}
      </div>

      <button onClick={scrollRight} style={rightButtonStyle}>
        <FaArrowRight />
      </button>
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '90%',
  margin: 'auto',
  overflow: 'hidden',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  padding: '10px',
  backgroundColor: '#fff',
};

const buttonStyle = {
  position: 'absolute',
  backgroundColor: '#fff',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  zIndex: 10,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15)',
  padding: '12px',
  borderRadius: '50%',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const leftButtonStyle = {
  ...buttonStyle,
  left: '10px',
};

const rightButtonStyle = {
  ...buttonStyle,
  right: '10px',
};

const cartItemsWrapperStyle = {
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  gap: '15px',
  whiteSpace: 'nowrap',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  width: '100%',
};

export default TourSlider;
