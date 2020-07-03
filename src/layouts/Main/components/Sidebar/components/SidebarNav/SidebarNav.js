/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { connect } from "react-redux"
import { changeDefault } from "../../../../../../actions/sideBarActions"
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
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
  const { pages, className, changeDefault, defaultRequest, ...rest } = props;

  const classes = useStyles();

  const [requestGroups, setRequestGroups] = useState([
    {
      id: 'A',
      name: "Books requests",
      requests: [
        {
          id: 'AA',
          name: "Add book",
          url: "http://localhost:4000/books/addBook",
          token: "9U320H230FH23F23F08H",
          type: "POST",
          description: "Add a book in the database"
        },
        {
          id: 'AB',
          name: "Select all books",
          url: "http://localhost:4000/books/selectAll",
          token: "9U320H230FH23F23F08H",
          type: "GET",
          description: "select all the books from the database"
        },
      ]
    },
    {
      id: 'B',
      name: "Class requests",
      requests: [
        {
          id: 'BA',
          name: "Add book",
          url: "http://localhost:4000/books/addBook",
          token: "9U320H230FH23F23F08H",
          type: "POST",
          description: "Add a book in the database"
        },
        {
          id: 'BB',
          name: "Select all books",
          url: "http://localhost:4000/books/selectAll",
          token: "9U320H230FH23F23F08H",
          type: "GET",
          description: "select all the books from the database"
        },
      ]
    }
  ])
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel, expanded)
    setExpanded(isExpanded ? panel : false);
  };

  const onRequestChange = (event) => {
    event.persist()
    console.log(event.currentTarget.name)
    const id = event.currentTarget.name
    const [selected] = requestGroups.filter(req => req.id === id[0])[0].requests.filter(req => req.id === id)
    console.log(selected)
    changeDefault(selected)
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
              requestGroup.requests.map((request, i) =>
                <Button 
                  color={request.type === 'GET' ? "secondary" : "primary"} 
                  key={i} 
                  className={classes.reqButton}
                  onClick={onRequestChange}
                  name={request.id}
                >
                  {request.type + " | " + request.name}
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
        {pages.map(page => (
          <ListItem
            className={classes.item}
            disableGutters
            key={page.title}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
        ))}
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

export default connect(mapStateToProps, { changeDefault })(SidebarNav)