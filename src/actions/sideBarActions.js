import { CHANGE_DEFAULT } from "./types"

export const changeDefault = (request) => (dispatch, getState) => {
    dispatch({type: CHANGE_DEFAULT, payload: request})
}