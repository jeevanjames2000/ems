import React from "react";
import PropTypes from "prop-types";
import "../../styles/common.css";

const Button = ({
    variant = "primary",
    size = "md",
    icon: Icon,
    className = "",
    children,
    ...props
}) => {
    const baseClass = "btn";
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
            {...props}
        >
            {Icon && <Icon size={size === "sm" ? 16 : 20} className="btn-icon" />}
            {children && <span className="btn-text">{children}</span>}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger", "ghost"]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    icon: PropTypes.elementType,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Button;
