/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'


import {
  List,
  ListItem,
  Button,
  colors,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  ButtonGroup
} from '@material-ui/core';
import { withStateManagementFunctions } from "./../../../../../../state_management_context"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  reqButton: {

    fontSize:10,
    fontFamily:'sans-serif', // No effect
    fontWeight:40 // no effect

  }
}))

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, changeDefault, defaultRequest, appState, ...rest } = props;

  const { requestGroups = [] } = appState;
  console.log("props for side bar", props)
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel, expanded)
    setExpanded(isExpanded ? panel : false);
  };

  const onRequestChange = (event) => {
    event.persist()
    const id = event.currentTarget.name
    props.setSelectedRequest(id);
  }

  const ExpansionItem = (props) => {
    const requestGroup = props.requestGroup
    return (
      <ExpansionPanel expanded={expanded === requestGroup.name} onChange={handleChange(requestGroup.name)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"

        >
          <Typography className={classes.heading}>{requestGroup.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined primary button group"
            variant="text"
            fullWidth={true}
          >
            {
              requestGroup.requests.map((request, index) =>
                <Button
                  color={request.method === 'GET' ? "secondary" : "primary"}
                  key={index}
                  className={classes.reqButton}
                  onClick={onRequestChange}
                  name={request.id}
                >
                  {request.method + " => " + request.name.toLowerCase()}
                </Button>
              )}
          </ButtonGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }


  return (
    <div>
      <List
        {...rest}
        className={clsx(classes.root, className)}
      >
      </List>
      {requestGroups.map((requestGroup, i) => <ExpansionItem key={i} requestGroup={requestGroup} />)}
    </div>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  defaultRequest: state.sideBar.defaultRequest,
  changeDefault: PropTypes.func,
})

// export default SidebarNav; 
export default withStateManagementFunctions(SidebarNav);
