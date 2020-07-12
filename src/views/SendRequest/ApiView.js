import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles'
import { Tab, Tabs } from '@material-ui/core';
import { BodyView } from './BodyView';
import { TabPanel } from 'views/TabPanel';
import { HeadersTableView } from './HeadersTableView';

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#000',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    }
}))((props) => <Tab disableRipple {...props} />);
const ApiView = props => {

    const { jsonBody: body = {}, isDisabled = false, bodyViewTitle, headers = [{
        key: "content-type",
        values: ["application/json"]
    }] } = props;

    const [selectedTab, selectTab] = useState(0);
    const handleChange = (event, newValue) => {
        selectTab(newValue);
    };

    return (
        <React.Fragment>
            <StyledTabs value={selectedTab} onChange={handleChange} aria-label="styled tabs example">
                <StyledTab label={bodyViewTitle} />
                <StyledTab label="Headers" />
            </StyledTabs >

            <TabPanel value={selectedTab} index={0} render=
                {() => <BodyView src={body} isDisabled={isDisabled} />} />

            <TabPanel value={selectedTab} index={1} render={
                () => <HeadersTableView headers={headers} />} />
        </React.Fragment>
    );

}

ApiView.propTypes = {
    isDisabled: PropTypes.bool,
    jsonBody: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    bodyViewTitle: PropTypes.string.isRequired,
};


export {
    ApiView
}