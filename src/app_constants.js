export const INITIAL_STATE = {
  selectedRequest: {},
  requestGroups: [
    {
      id: 'A',
      name: "Field Requests",
      requests: [
        {

          id: 'AA',
          method: "GET",
          name: "Get Field Support Task",
          url: "http://localhost:4000/books/addBook",
          token: "9U320H230FH23F23F08H",
          type: "GET",
          description: "Add a book in the database"
        },
        {

          id: 'AB',
          method: "POST",
          name: "Submit Field Support Task",
          url: "http://localhost:4000/books/selectAll",
          token: "9U320H230FH23F23F08H",
          type: "POST",
          description: "select all the books from the database"
        },
      ]
    },
    {
      id: 'B',
      name: "Inspection Process Requests",
      requests: [
        {
          id: 'BA',
          method: "GET",
          name: "Get Inspection Task",
          url: "https://alok.qa.isp.elm.sa/InspectionProcessService/api/inspection-task/task-information/676aea85-c673-11ea-9503-005056b22a37",
          token: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyNUFBMDdFOTM3NTI0NzhENDg2MzI4MTkxRUFCQkE4Q0Q2NTQyODkiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJBbHFnZnBOMUpIalVoaktCa2VxN3FNMWxRb2sifQ.eyJuYmYiOjE1OTQ4MDEwNjQsImV4cCI6MTU5ODQwMTA2NCwiaXNzIjoiaHR0cDovL2Fsb2sucWEuaXNwLmVsbS5zYS9pZGVudGl0eXNlcnZpY2UiLCJhdWQiOiJodHRwOi8vYWxvay5xYS5pc3AuZWxtLnNhL2lkZW50aXR5c2VydmljZS9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJpbnNwZWN0aW9uX3NwYSIsInN1YiI6IjBiODE1MWZhLTY1NTMtNDVlYS1iMGExLTdlYzdmOTc1N2RmMyIsImF1dGhfdGltZSI6MTU5NDgwMTA2NCwiaWRwIjoibG9jYWwiLCJlbWFpbCI6Ikluc3BlY3RvckBlbG0uc2EiLCJuYW1lIjoiSW5zcGVjdG9yQGVsbS5zYSIsImdpdmVuX25hbWUiOiJJbnNwZWN0b3IiLCJwaG9uZV9udW1iZXIiOiIwNTk3NTc5OTU3IiwiaW5zcGVjdGlvbl9jZW50ZXJfaWQiOiJjMTNiOGI3Ni0wMmY2LTQ1NzQtYTM1Ni1jNTAyYWZmZjEzODAiLCJyb2xlIjoiSW5zcGVjdG9yIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiSW5zcGVjdG9yQGVsbS5zYSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJpbnNwZWN0aW9uX3Byb2ZpbGUiXSwiYW1yIjpbInB3ZCJdfQ.OCh9E3sgccpff8vdnPLe8xo6gyNk8WFWx68KTyQum1bWGkH8ZzkcTYrqrEZFH4cGrEVh6N7xOqzaO-w83CIbNfigFZK9HLzVQOZ-zGEF366CkYMCIJEGcemTwvh-yB27sKQLuYWOfjLRF5BqfPvpqJ0aCSM9OdvbDGR8Qmr9-jsfDyhgcwHFeeviu8FQ4n-vbnzHbJNngYlWMCjA3ttKUzITvVaW5BK6S6LHnsDLqfawVo7bKIkyZAedItDILJv3cMyGoIwHiLc1Jfx6XVj9yEo5wcjJJJqFYvkMMK2mGIvX1_NWnaEV5parIjgjMN4Oqm7EcyFJNsQ8hY9zHh9Yfg",
          type: "GET",
          description: "Add a book in the database"
        },
        {
          id: 'BB',
          method: 'POST',
          name: "Submit Inspection Task",
          url: "http://alok.qa.isp.elm.sa/InspectionProcessService/api/inspection-task/task-information/f9294fb5-a340-11ea-be22-005056b22a37",
          token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyNUFBMDdFOTM3NTI0NzhENDg2MzI4MTkxRUFCQkE4Q0Q2NTQyODkiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJBbHFnZnBOMUpIalVoaktCa2VxN3FNMWxRb2sifQ.eyJuYmYiOjE1OTQ0OTg3ODYsImV4cCI6MTU5ODA5ODc4NiwiaXNzIjoiaHR0cDovL2Fsb2sucWEuaXNwLmVsbS5zYS9pZGVudGl0eXNlcnZpY2UiLCJhdWQiOiJodHRwOi8vYWxvay5xYS5pc3AuZWxtLnNhL2lkZW50aXR5c2VydmljZS9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJpbnNwZWN0aW9uX3NwYSIsInN1YiI6IjBiODE1MWZhLTY1NTMtNDVlYS1iMGExLTdlYzdmOTc1N2RmMyIsImF1dGhfdGltZSI6MTU5NDQ5ODc4NiwiaWRwIjoibG9jYWwiLCJlbWFpbCI6Ikluc3BlY3RvckBlbG0uc2EiLCJuYW1lIjoiSW5zcGVjdG9yQGVsbS5zYSIsImdpdmVuX25hbWUiOiJJbnNwZWN0b3IiLCJwaG9uZV9udW1iZXIiOiIwNTk3NTc5OTU3IiwiaW5zcGVjdGlvbl9jZW50ZXJfaWQiOiJjMTNiOGI3Ni0wMmY2LTQ1NzQtYTM1Ni1jNTAyYWZmZjEzODAiLCJyb2xlIjoiSW5zcGVjdG9yIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiSW5zcGVjdG9yQGVsbS5zYSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJpbnNwZWN0aW9uX3Byb2ZpbGUiXSwiYW1yIjpbInB3ZCJdfQ.N9X80Z8cwSh46N1_Bs5AQC9ZlfZad9OhTB4qPxW-rNDL6IMYFahPheu3T4YBYd0Qufcf1JCvGKBdhXov87wV5mq0fICjRs33va12DkUYFRUn_yQ37iM2HxAqh1rhRXOGkgAHdJM2OTmlYtax8Nt_ZdoLAvXcb7yreG88Q8mvkv-kWfGUPhgCN1xETcFWrNsKwEsKnjAKF0LLNhKLFneS6oipVcJKX0-PjdV8Nlcf-favoNYZFZTKngB82qwCHgiCJ2XpfdYAmEpCwZJ-ttkq_Lnw169j0-du6-5RS2HYA6b9XcB4gZWAnAO8H9HutvbMShRLDupMFGjrgu65KIY-Fg",
          type: "POST",
          description: "select all the books from the database"
        },
      ]
    },
    {
      id: 'C',
      name: "Survey Requests",
      requests: [
        {
          id: 'CA',
          method: "GET",
          name: "Get Survey Task",
          url: "http://localhost:4000/books/addBook",
          token: "9U320H230FH23F23F08H",
          type: "GET",
          description: "Add a book in the database"
        },
        {
          id: 'CB',
          method: "GET",
          name: "Submit Survey Task",
          url: "http://localhost:4000/books/selectAll",
          token: "9U320H230FH23F23F08H",
          type: "POST",
          description: "select all the books from the database"
        },
      ]
    }
  ]
}
