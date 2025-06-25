const OfflineFallback = ({text}) => (
  <div className="alert alert-warning text-center my-4">
    <h4>Offline</h4>
    <p>{text}</p>
    <p>Please check your connection and try again.</p>
  </div>
);

export default OfflineFallback;
