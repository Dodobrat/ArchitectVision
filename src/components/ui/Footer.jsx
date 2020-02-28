import React from 'react';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <p style={{textAlign: 'center'}}>
            &copy; Deyan Bozhilov {year}
        </p>
    );
};

export default Footer;
