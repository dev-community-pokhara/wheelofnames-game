import './SponsorBanner.css';

const SponsorBanner = () => {
  return (
    <div className="sponsor-banner">
      <div className="sponsor-content">
        <span className="sponsor-label">Powered by</span>
        <div className="sponsor-info">
          <div className="sponsor-logo">
            <div className="logo-placeholder">
              <span className="logo-text">Apify</span>
            </div>
          </div>
          <div className="sponsor-details">
            <h3 className="sponsor-name">Apify</h3>
            <p className="sponsor-tagline">In collaboration with Developer Community Pokhara</p>
          </div>
        </div>
        <a
          href="https://apify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsor-link"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

export default SponsorBanner;
