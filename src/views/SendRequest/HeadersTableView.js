import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import _ from "underscore";
import { reduceHeaders } from 'helpers';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#f4f6f8",
        borderColor: "#000000",
        color: "#263238",
        marginTop: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
}))


const HeadersTableView = (props) => {
    const classes = useStyles();
    const { headers } = props;

    const createHeaderCells = headerMultiValueMap => {
        const result = [];
        for (const headerKey in headerMultiValueMap) {
            if (headerMultiValueMap.hasOwnProperty(headerKey)) {
                const headerValues = headerMultiValueMap[headerKey];
                result.push(<TableRow key={headerKey}>
                    <TableCell className={classes.textField}
                        size="small"
                        component="h2"
                        scope="row">
                        {headerKey}
                    </TableCell>
                    <TableCell >{createHeaderValue(headerValues)}</TableCell>
                </TableRow>);
            }
        }
        return result;
    }

    return (
        <TableContainer className={classes.root} variant="outlined" elevation={0} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead className={classes.root}>
                    <TableRow>
                        <TableCell>KEY</TableCell>
                        <TableCell>VALUE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {createHeaderCells(headers)}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

const createHeaderValue = (values) => {
    if (!_.isArray(values)) values = [values]
    const result = values.reduce(reduceHeaders);
    return result;

}


HeadersTableView.propTypes = {
    headers: PropTypes.object.isRequired,
}

export {
    HeadersTableView
}