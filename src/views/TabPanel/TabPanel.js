import React, { useState } from 'react'

import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
const TabPanel = (props) => {
    const { render, value, index, ...other } = props;
    // console.log(children)
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                render()
            )}
        </div>
    );
}

TabPanel.propTypes = {
    render: PropTypes.func.isRequired,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export {
    TabPanel
}