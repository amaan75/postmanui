import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import ReactJson from 'react-json-view'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const SendRequest = () => {
  const classes = useStyles()
  const jsonData = {
      "field1": "field1data",
      "field2": ["1é", "2"],
      "field3": {"string1": "string1","string2": "string2"}
  }
  return (
    <div className={classes.root}>
        <ReactJson src={jsonData} />
        <ReactJson onEdit={edit => console.log(edit)}/>
    </div>
  );
};

export default SendRequest;
