const ValidateIcon = ({ stroke }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.7" clipPath="url(#clip0_2199_16194)">
      <path
        d="M4.875 9.375L7.875 12.375L13.875 6.375"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M9.375 17.625C13.9313 17.625 17.625 13.9313 17.625 9.375C17.625 4.81865 13.9313 1.125 9.375 1.125C4.81865 1.125 1.125 4.81865 1.125 9.375C1.125 13.9313 4.81865 17.625 9.375 17.625Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </g>
    <defs>
      <clipPath id="clip0_2199_16194">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default ValidateIcon
