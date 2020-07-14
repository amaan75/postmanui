import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Chart } from 'react-chartjs-2'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from '@material-ui/styles'
import validate from 'validate.js'
import { chartjs } from './helpers'
import { INITIAL_STATE } from "./app_constants.js"
import theme from './theme'
import { StateManagementFunctionContext } from "./state_management_context"
import 'react-perfect-scrollbar/dist/css/styles.css'
import './assets/scss/index.scss'
import validators from './common/validators'
import Routes from './Routes'
const browserHistory = createBrowserHistory()

//REDUX IMPORTS


Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};



export default class App extends Component {
  constructor(props) {
    super(props);
    this.setSelectedRequest = (requestId) => {
      this.setState(prevState => {
        const selectedRequestGroup = prevState.requestGroups || [];
        const selectedRequests = selectedRequestGroup.flatMap(it => it.requests || []).filter(it => it.id === requestId) || [];
        const selectedRequest = selectedRequests && selectedRequests.length ? selectedRequests[0] : {};
        return { selectedRequest: selectedRequest };
      });
    }
    this.updateSelectedRequestBody = (body) => {
      this.setState(prevState => {
        const selectedRequest = prevState.selectedRequest;
        const updatedRequest = {
          ...selectedRequest,
          body: body

        };
        return { selectedRequest: updatedRequest };
      });
    }

    this.state =
    {
      ...INITIAL_STATE,
      setSelectedRequest: this.setSelectedRequest,
      updateSelectedRequestBody: this.updateSelectedRequestBody
    }

  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <StateManagementFunctionContext.Provider value={this.state}>
              <Routes appState={this.state} />
            </StateManagementFunctionContext.Provider>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
