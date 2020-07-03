import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import validate from 'validate.js'
import { 
  Grid,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormHelperText,
  Link,
  TextareaAutosize
} from '@material-ui/core'
import {history} from "../../history"
import { connect } from "react-redux"
import { Link as RouterLink, withRouter } from 'react-router-dom'
import ReactJson from 'react-json-view'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  bodyContent: {
    height: '300px',
    width: '400px'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}))

const schema = {
  url: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  header: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  body: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
}
const SendRequest = (props) => {
  const { defaultRequest } = props
  const classes = useStyles()
  const jsonData = {
    "field1": "field1data",
    "field2": ["1é", "2"],
    "field3": { "string1": "string1", "string2": "string2" }
  }
  const [request, setRequest] = useState(null)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  useEffect(() => {
    if(defaultRequest) {
      console.log(defaultRequest)
      setRequest(defaultRequest)
      setFormState(prev => ({
        ...prev,
        values: {
          ...prev.values,
          url: defaultRequest.url
        }
      }))
    }
  }, [defaultRequest])

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values])

  const handleChange = event => {
    event.persist()

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }))
  }

  const handleBack = () => {
    history.goBack()
  }

  const handleSignUp = event => {
    event.preventDefault();
    history.push('/')
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false
  return (
    <div className={classes.root}>
      {/* <ReactJson src={jsonData} />
      <ReactJson onEdit={edit => console.log(edit)} /> */}
      {request !== null ? <form
        className={classes.form}
        onSubmit={handleSignUp}
      >
        <Typography
          className={classes.title}
          variant="h2"
        >
          Send your request
        </Typography>
        <TextField
          className={classes.textField}
          error={hasError('url')}
          fullWidth
          helperText={
            hasError('url') ? formState.errors.url[0] : null
          }
          label="Url"
          name="url"
          onChange={handleChange}
          type="text"
          value={formState.values.url || ''}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError('header')}
          fullWidth
          helperText={
            hasError('header') ? formState.errors.header[0] : null
          }
          label="Headers"
          name="header"
          onChange={handleChange}
          type="text"
          value={formState.values.header || ''}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError('body')}
          fullWidth
          helperText={
            hasError('body') ? formState.errors.body[0] : null
          }
          label="Body"
          name="body"
          onChange={handleChange}
          type="text"
          value={formState.values.body || ''}
          variant="outlined"
        />
        <Button
          className={classes.signUpButton}
          color="primary"
          disabled={!formState.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Send Request
        </Button>
      </form>
      : 
      <Typography
        className={classes.title}
        variant="h2"
      >
        No request selected
      </Typography>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  defaultRequest: state.sideBar.defaultRequest,
})

export default connect(mapStateToProps, { })(SendRequest)
