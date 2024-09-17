import ContentLoader from 'react-content-loader';

const ShimmerEffect = () => (
  <ContentLoader height={160} width={400}>
    <rect x="0" y="0" rx="5" ry="5" width="400" height="160" />
  </ContentLoader>
);

export default ShimmerEffect;
