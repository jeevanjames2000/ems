import React from "react";
import PropTypes from "prop-types";
import "../../styles/common.css";

const Input = ({
    label,
    error,
    className = "",
    fullWidth = false,
    type = "text",
    id,
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div className={`input-container ${fullWidth ? "full-width" : ""} ${className}`}>
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                className={`input-field ${error ? "input-error" : ""}`}
                {...props}
            />
            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.string,
};

export default Input;
