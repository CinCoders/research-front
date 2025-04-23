import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

export default function ImageWithLoading({
  alt,
  width,
  height,
  style,
  src,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      {loading && (
        <Skeleton
          variant='rectangular'
          width={width}
          height={height}
          animation='wave'
          style={{
            borderRadius: '0.5rem',
            position: 'absolute',
            top: 0,
            left: 0,
            ...style,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s',
          ...style,
        }}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
