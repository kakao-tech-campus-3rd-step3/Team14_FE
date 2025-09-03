interface LeftArrowProps {
  className?: string;
}

const LeftArrow = ({ className }: LeftArrowProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 24 24"
      strokeWidth={3}
      fill="none"
      stroke="black"
      className={className}
    >
      <path d="M16 4 L8 12 L16 20" />
    </svg>
  );
};

export default LeftArrow;
