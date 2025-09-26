const FestivalPoster = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
  return <img src={imageUrl} alt={title} className="w-full h-full object-cover" />;
};

export default FestivalPoster;
