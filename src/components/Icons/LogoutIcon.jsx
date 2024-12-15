import React from 'react'

const LogoutIcon = ({ size = 20, color = "currentColor", className }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
  <path
    d="M15 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H15"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  />
  <path
    fill={color}
    d="M19 12L15 8M19 12L15 16M19 12H9"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  />
  </svg>
)

export default LogoutIcon