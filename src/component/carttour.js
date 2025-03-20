import React from 'react';

export default function TourCard({
  ten,
  id,
  gia,
  ngay,
  anh,
  dem,
  additionalInfo,
  isNearby,
}) {
  return (
    <div
      style={{
        width: '320px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={anh}
          alt={ten}
          style={{
            width: '80%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: isNearby ? '#ff9800' : 'green', // Màu cam cho "Gần đây", xanh cho "MỚI"
            color: 'white',
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '6px',
          }}
        >
          {isNearby ? 'Gần đây' : 'MỚI'}
        </span>
      </div>

      <div>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '12px 0',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
        >
          {ten}
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f8f8f8',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://deviet.vn/wp-content/themes/gctheme/images/index/tag.png"
            alt="Giá"
            style={{ width: '24px', height: '24px' }}
          />
          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#d4a017',
              marginRight: '20px',
            }}
          >
            {Number(gia).toLocaleString('vi-VN')}đ
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://deviet.vn/wp-content/themes/gctheme/images/index/calendar.png"
            alt="Thời gian"
            style={{ width: '24px', height: '24px', marginRight: '3px' }}
          />
          <p style={{ fontSize: '14px', color: '#555' }}>
            {ngay} ngày {dem} đêm
          </p>
        </div>
      </div>

      {additionalInfo && (
        <p style={{ fontSize: '14px', color: '#777', margin: '10px 0' }}>
          Khoảng cách: {additionalInfo}
        </p>
      )}

      <button
        style={{
          width: '100%',
          border: '2px solid #d4a017',
          color: '#d4a017',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '25px',
          marginTop: '12px',
          cursor: 'pointer',
          transition: '0.3s',
          background: 'transparent',
        }}
        onMouseOver={e => {
          e.target.style.background = '#d4a017';
          e.target.style.color = 'white';
        }}
        onMouseOut={e => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#d4a017';
        }}
      >
        Đặt tour ngay
      </button>
    </div>
  );
}
