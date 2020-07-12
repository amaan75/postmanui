import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import { Container, colors, TextField } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        borderStyle: "solid",
        borderWidth: "thin",
        borderRadius: "4px",
        borderColor: colors.grey[400],
        minHeight: "200px"
    }
}))

const BodyView = (props) => {
    const { isDisabled = false } = props;
    const [requestBody, setRequestBody] = useState(props.src);

    const classes = useStyles();


    const allowJsonModification = () => {
        return isDisabled ? false : handleEditOrAddOrDelete;
    }
    const handleEditOrAddOrDelete = event => {
        setRequestBody(event.updated_src);
    }
    return (
        <Container disableGutters={true} className={classes.root}>
            <ReactJson src={props.src}
                onEdit={allowJsonModification()}
                onAdd={allowJsonModification()}
                onDelete={allowJsonModification()}
                enableClipboard={!isDisabled} />
        </Container>
    );
}


BodyView.propTypes = {
    src: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool
}

export {
    BodyView
}