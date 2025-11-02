const Leave = ({ className, strokeWidth = 3 }: { className?: string; strokeWidth?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={className}
    >
      <g stroke="none" strokeWidth={strokeWidth} fill="none" fillRule="evenodd">
        <g>
          <rect fillRule="nonzero" x="0" y="0" width="24" height="24" />
          <line
            stroke="currentColor"
            x1="9"
            y1="12"
            x2="19"
            y2="12"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d="M16,8 L18.5858,10.5858 C19.3668,11.3668 19.3668,12.6332 18.5858,13.4142 L16,16"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d="M16,4 L6,4 C4.89543,4 4,4.89543 4,6 L4,18 C4,19.1046 4.89543,20 6,20 L16,20"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default Leave;
