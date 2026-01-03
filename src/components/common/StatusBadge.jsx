import React from "react";
import PropTypes from "prop-types";
import "../../styles/common.css";

const StatusBadge = ({ status, activeLabel = "Active", inactiveLabel = "Inactive" }) => {
    const isActive = status === true || status === "Active";

    return (
        <span className={`status-badge ${isActive ? "status-active" : "status-inactive"}`}>
            <span className="status-dot"></span>
            {isActive ? activeLabel : inactiveLabel}
        </span>
    );
};

StatusBadge.propTypes = {
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    activeLabel: PropTypes.string,
    inactiveLabel: PropTypes.string,
};

export default StatusBadge;
