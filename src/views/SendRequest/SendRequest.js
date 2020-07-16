import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import validate from 'validate.js'
import {
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { history } from "../../history"
import Axios from 'axios'
import { ApiView } from './ApiView'
import { unReduceHeaders } from 'helpers'

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
  sendReqeustButton: {
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
  const { selectedRequest } = props.appState;
  const isLocal = false;

  const classes = useStyles()

  const [request, setRequest] = useState(selectedRequest || {})
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  const [response, setResponse] = useState({});

  useEffect(() => {
    if (selectedRequest) {
      console.log(selectedRequest)
      setRequest(selectedRequest)
      setFormState(prev => ({
        ...prev,
        values: {
          ...prev.values,
          url: selectedRequest.url
        }
      }))
    }
  }, [selectedRequest])

  // useEffect(() => {
  //   const errors = validate(formState.values, schema);

  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values])

  const handleChange = event => {
    event.persist()

    setRequest(prevRequest => ({
      ...prevRequest,
      url: event.target.value
    }))
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

  const onHeaderChange = event => {
    console.log(event.target.value)
    console.log(event.target.name)
    const name = event.target.name;
    console.log(`${JSON.stringify(request, null, 2)}`)
    event.persist();
    setRequest(prevRequest => ({
      ...prevRequest,
      headers: {
        ...prevRequest.headers,
        [name]: unReduceHeaders(event.target.value)
      }
    }));
  }



  const handleBack = () => {
    history.goBack()
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (isLocal) {
      //todo:
      const response = Axios[selectedRequest.method.toLowerCase()](selectedRequest.url);
      response.then(response => { console.log(response); }).catch(err => console.err(err));
    } else {
      const requestEntity = createRequest(request);
      console.log(`requestEntity :${JSON.stringify(requestEntity, null, 2)}`)
      const response = Axios.post("http://localhost:3001/requests/make/request", requestEntity);
      response.then(response => {
        console.log(response)
        setResponse(response.data)
      }).catch(err => console.log(err))
    }
  }

  const jsonBodyHandler = event => {
    setRequest(prevRequest => ({
      ...prevRequest,
      body: event.updated_src
    }));
  }

  const createRequest = (request) => {
    const headers = request.headers || {};
    const headersToSend = formatHeaders(headers)
    return {
      url: request.url,
      method: request.method,
      body: request.body || {},
      headers: headersToSend
    }
  }
  const formatHeaders = headers => {
    const result = {
      ...headers,
      authorization: `Bearer ${headers.authorization}`
    };
    return result;
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false
  const headers = request.headers || {};
  return (
    <div className={classes.root}>
      {request !== null ?
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Typography
            className={classes.title}
            variant="h2"
          >
            Send your request
        </Typography>
          <TextField
            // disabled={true}
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
            value={request.url || ''}
            variant="outlined"
          />

          <TextField
            className={classes.textField}
            error={hasError("token")}
            fullWidth
            helperText={
              hasError('token') ? formState.errors.url[0] : null
            }
            label="Token"
            name="authorization"
            onChange={onHeaderChange}
            type="text"
            value={headers.authorization || ""}
            variant="outlined"
          />

          <ApiView
            // type="REQUEST"
            jsonBody={request.body}
            jsonBodyHandler={jsonBodyHandler}
            bodyViewTitle="Request Body"
            headers={request.headers} />

          <Button
            className={classes.sendReqeustButton}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Send Request
        </Button>

          <ApiView
            type="RESPONSE"
            isDisabled={false}
            jsonBody={response.body}
            headers={response.headers}
            bodyViewTitle="Response Body" />
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



export default SendRequest;

