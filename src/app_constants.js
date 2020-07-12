export const INITIAL_STATE = {
    selectedRequest: {},
    requestGroups: [
        {
            id: "A",
            name: "Books requests",
            requests: [
                {
                    method: "GET",
                    id: "AA",
                    name: "Add book",
                    url: "http://localhost:8080/test/api",
                    token: "9U320H230FH23F23F08H",
                    type: "GET",
                    description: "Add a book in the database"
                },
                {
                    method: "POST",
                    id: "AB",
                    name: "Select all books",
                    url: "http://localhost:8080/test/api",
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
                    method: "GET",
                    id: "BA",
                    name: "Add book",
                    url: "http://localhost:8080/test/api",
                    token: "9U320H230FH23F23F08H",
                    type: "POST",
                    description: "Add a book in the database"
                },
                {
                    method: "GET",
                    id: "BB",
                    name: "Select all books",
                    url: "http://localhost:8080/test/api",
                    token: "9U320H230FH23F23F08H",
                    type: "GET",
                    description: "select all the books from the database"
                },
            ]
        }
    ]
}