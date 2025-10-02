interface RightArrowProps {
  className?: string;
}

const RightArrow = ({ className }: RightArrowProps) => {
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
      <path d="M8 4 L16 12 L8 20" />
    </svg>
  );
};

export default RightArrow;
