import React from 'react';

const RatingSVG = ({ rating }) => {
  // Determine color based on rating
  const getColor = () => {
    if (rating <= 3) return 'rgb(255, 0, 0)'; // Red
    if (rating <= 7) return 'rgb(255, 255, 0)'; // Yellow
    return 'rgb(0, 128, 0)'; // Green
  };

  // Calculate stroke-dasharray based on rating
  const ratingStrokeDasharray = `${(rating / 10) * 298.451}, 298.451`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="72"
      height="72"
      fill="none"
      shapeRendering="crispEdges"
      className="h-9 w-9 sm:h-10 sm:w-10"
      style={{ userSelect: 'none' }}
    >
      {/* Background Gray Circle */}
      <circle
        cx="50"
        cy="50"
        r="47.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDashoffset="0"
        strokeWidth="5"
        shapeRendering="geometricPrecision"
        style={{
          transformOrigin: '50% 50%',
          strokeDasharray: '298.451, 298.451', // Full circle in gray
          transform: 'rotate(-90deg)',
          stroke: 'rgb(66, 66, 66)',
          opacity: 1,
        }}
      ></circle>

      {/* Rating Circle */}
      <circle
        cx="50"
        cy="50"
        r="47.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDashoffset="0"
        strokeWidth="5"
        shapeRendering="geometricPrecision"
        style={{
          transformOrigin: '50% 50%',
          strokeDasharray: ratingStrokeDasharray, // Partially filled based on rating
          transform: 'rotate(-90deg)',
          stroke: getColor(),
          opacity: 1,
        }}
      ></circle>
    </svg>
  );
};

export default RatingSVG;
