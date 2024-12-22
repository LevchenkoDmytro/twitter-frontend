const LoadingSpinner = ({ size = "md", color = '#1D9BF0' }) => {
  const sizeClass = `loading-${size}`;

  return <span className={`loading loading-spinner ${sizeClass}`} style={{ backgroundColor: color }} />;
};
export default LoadingSpinner;