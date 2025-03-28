export const renderStars = (rating) => {
  console.log({ rating });
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  console.log({ fullStars });
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="text-yellow-500 text-xl" aria-hidden="true">
          ★
        </span>
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="text-yellow-500 text-xl" aria-hidden="true">
          ☆
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-400 text-xl" aria-hidden="true">
          ★
        </span>
      );
    }
  }
  return <span className="flex">{stars}</span>;
};
