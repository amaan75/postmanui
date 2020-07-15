import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles'
import { Container, colors, TextField, FormControlLabel, Switch, FormLabel, Grid } from '@material-ui/core';
import { withStateManagementFunctions } from 'state_management_context';
import { validJson, stringifiedJS } from 'helpers';
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        borderStyle: "solid",
        borderWidth: "thin",
        borderRadius: "4px",
        borderColor: colors.grey[400],
        minHeight: "200px"
    },
    grid: {
        padding: "0 12px"
    },
    debug: {
        backgroundColor: "yellow",

    }
}))

const Element = (props) => {
    const { isDisabled = false } = props;
    const [allowFreeEdit, setAllowFreeEdit] = useState(false);
    const [formValues, setFormValues] = useState({
        freeEditTextJson: stringifiedJS(props.src)
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const classes = useStyles();

    const handleBlur = e => {
        const name = e.target.name;
        setTouched({ [name]: true })
    }

    const freeEditTextJson = formValues.freeEditTextJson;
    const setFreeEditTextJson = (stringifiedJson) => {
        setFormValues(formValues => ({
            ...formValues,
            freeEditTextJson: stringifiedJson
        }));
    }

    const onChangeHandler = event => {
        setAllowFreeEdit(event.target.checked)
        if (allowFreeEdit) {
            props.updateSelectedRequestBody(validJson(freeEditTextJson))
        } else {
            setFreeEditTextJson(stringifiedJS(props.src))
        }
    }
    const isInvalidJson = value => stringifiedJS(validJson(value)) === "{}"

    const handleEditOrAddOrDelete = event => {
        const value = event.target.value;
        const name = event.target.name;
        const isTouched = touched[name];
        if (isTouched && isInvalidJson(value)) {
            setErrors({
                [name]: "Invalid JSON!"
            })
        } else {
            const newObject = validJson(value)
            const newState = stringifiedJS(newObject);
            if (newState !== "{}")
                setFreeEditTextJson(newState)
            setErrors({
                [name]: null
            })
        }
        setFreeEditTextJson(value);
    }
    const onKeyDownHandler = event => {
        if ((event.metaKey || event.ctrlKey) && (event.key === 'b' || event.key === 'B')) {
            const newObject = validJson(freeEditTextJson)
            const newState = stringifiedJS(newObject);
            if (newState !== "{}")
                setFreeEditTextJson(newState)
        }
    }

    const hasError = field =>
        touched[field] && errors[field] ? true : false
    const allowJsonModification = isDisabled ? false : handleEditOrAddOrDelete;
    // console.log("errors", errors)
    // console.log("touched", touched)
    return (
        <Container disableGutters={true} className={classes.root}>
            <Grid
                className={classes.grid}
                container={true}
                bgcolor="yellow"
                color="white"
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <FormLabel component="legend">Press Cmd+b or Ctrl+b to format</FormLabel>
                <FormControlLabel
                    bgColor="grey"
                    value={true}
                    control={<Switch checked={allowFreeEdit} color="primary" onChange={onChangeHandler} />}
                    label="Free Edit"
                    labelPlacement="start"
                />
            </Grid>
            {allowFreeEdit ?
                <TextField
                    value={freeEditTextJson}
                    variant="outlined"
                    multiline={true}
                    fullWidth={true}
                    error={hasError("freeEditTextJson")}
                    helperText={
                        hasError("freeEditTextJson") ? errors.freeEditTextJson : null
                    }
                    name="freeEditTextJson"
                    rows={10}
                    onChange={handleEditOrAddOrDelete}
                    onKeyDown={onKeyDownHandler}
                    onBlur={handleBlur}
                /> :
                (<ReactJson src={props.src}
                    onEdit={allowJsonModification}
                    onAdd={allowJsonModification}
                    onDelete={allowJsonModification}
                    enableClipboard={!isDisabled} />)}

        </Container>
    );
}

const BodyView = withStateManagementFunctions(Element);

BodyView.propTypes = {
    src: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool
}

export {
    BodyView
}