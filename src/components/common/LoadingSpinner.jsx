import "../../styles/LoadingSpinner.css";

const LoadingSpinner = ({ fullScreen = false, text = "Loading..." }) => {
    if (fullScreen) {
        return (
            <div className="loading-spinner-overlay">
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                    <p className="loading-text">{text}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="loading-spinner-container">
            <div className="spinner"></div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
