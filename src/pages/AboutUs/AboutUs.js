import React from 'react';
import { Link } from 'react-router-dom';
import { pagetitle, scrollToTop } from '../../helper/CommonFunction';

const AboutUs = (props) => {
    pagetitle(props.pageTitle);
    scrollToTop();
    return (
        <div>
            <Link to="/contact">this is about us section</Link> 
        </div>
    );
};

export default AboutUs;