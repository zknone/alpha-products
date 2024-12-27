const StarIcon = ({
  isFavorite,
  size = 24,
}: {
  isFavorite: boolean;
  size: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFavorite ? "#FFD700" : "#ccc"}
      stroke="none"
    >
      <polygon points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9" />
    </svg>
  );
};

export default StarIcon;
