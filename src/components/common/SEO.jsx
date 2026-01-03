import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
    title,
    description = "A comprehensive Employee Management System for tracking attendance, managing profiles, and generating reports.",
    name = 'EMS',
    type = 'website'
}) => {
    const siteTitle = `${title} | ${name}`;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name='description' content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
};

export default SEO;
