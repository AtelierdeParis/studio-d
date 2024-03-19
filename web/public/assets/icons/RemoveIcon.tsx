const RemoveIcon = ({ stroke = '#283583' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M11.0001 5.66666L5.66675 11"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M11.0001 11L5.66675 5.66666"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M8.33333 15.6667C12.3834 15.6667 15.6667 12.3834 15.6667 8.33333C15.6667 4.28325 12.3834 1 8.33333 1C4.28325 1 1 4.28325 1 8.33333C1 12.3834 4.28325 15.6667 8.33333 15.6667Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default RemoveIcon
