import { extractColorsFromSrc } from 'extract-colors';
import React, { useEffect, useState } from 'react';
import { apiEndpoints, defaultConst } from '../../utils/constants';

const MovieBg = ({ imageUrl }) => {
  const [palette, setPalette] = useState([]);
    console.log(palette);
    
  useEffect(() => {
    const fetchColors = async () => {
      const colors = await extractColorsFromSrc(`${imageUrl}`, {
        crossOrigin: 'Anonymous'
      });
      setPalette(colors.map(color => color.hex));
    };
    fetchColors();
  }, [imageUrl]);

  const gradient = palette.length
    ? `linear-gradient(to bottom right, ${palette.join(', ')})`
    : 'transparent';

  return (
    <>
      <div className="absolute w-full inset-0 -z-30 text-center">
        <img
          alt="movie-backdrop"
          src={imageUrl}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: 0,
            objectFit: 'cover',
            color: 'transparent',
          }}
        />
      </div>
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: gradient,
          opacity: 1,
        }}
      ></div>
      <div className="absolute inset-0 -z-10"></div>
    </>
  );
};

export default MovieBg;
