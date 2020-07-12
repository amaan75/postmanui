import React from 'react'
export const StateManagementFunctionContext = React.createContext({
  setSelectedRequest: () => { }
});


export const withStateManagementFunctions = (Component) => {

  const wrapper = props => {
    return (
      <StateManagementFunctionContext.Consumer>
        {(values) => {
          return (<Component {...values} {...props} />)
        }}
      </StateManagementFunctionContext.Consumer>
    );
  }
  return wrapper;


}