import {
    CHANGE_DEFAULT
} from '../actions/types'

const initialState = {
    defaultRequest: null,
    requestGroup: [
        {
          id: "A",
          name: "Books requests",
          requests: [
            {
              id: "AA",
              name: "Add book",
              url: "http://localhost:4000/books/addBook",
              token: "9U320H230FH23F23F08H",
              type: "POST",
              description: "Add a book in the database"
            },
            {
              id: "AB",
              name: "Select all books",
              url: "http://localhost:4000/books/selectAll",
              token: "9U320H230FH23F23F08H",
              type: "GET",
              description: "select all the books from the database"
            },
          ]
        },
        {
          id: "B",
          name: "Class requests",
          requests: [
            {
              id: "BA",
              name: "Add book",
              url: "http://localhost:4000/books/addBook",
              token: "9U320H230FH23F23F08H",
              type: "POST",
              description: "Add a book in the database"
            },
            {
              id: "BB",
              name: "Select all books",
              url: "http://localhost:4000/books/selectAll",
              token: "9U320H230FH23F23F08H",
              type: "GET",
              description: "select all the books from the database"
            },
          ]
        }
      ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_DEFAULT:
            return {
                ...state,
                defaultRequest: action.payload
            }
        default:
            return state
    }
}