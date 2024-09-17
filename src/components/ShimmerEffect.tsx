import ContentLoader from 'react-content-loader';

const ShimmerEffect = () => (
  <ContentLoader viewBox="0 0 400 200"
    height={200}
    width={400}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">

    <rect x="0" y="0" rx="5" ry="5" width="100%" height="150" />
    <rect x="0" y="160" rx="5" ry="5" width="70%" height="20" />
    <rect x="0" y="190" rx="5" ry="5" width="50%" height="20" />
  </ContentLoader>
);

export default ShimmerEffect;
