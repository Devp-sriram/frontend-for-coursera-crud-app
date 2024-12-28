
# Employee Management Backend

This is a RESTful API built with Node.js, Express.js, and MongoDB for managing employee data. It serves as the backend companion to the Employee App frontend.

## Features

- CRUD operations for employees
- Data validation and sanitization
- Authentication and authorization
- API endpoints for creating, reading, updating, and deleting employee records
- Integration with MongoDB for data storage

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

Clone the repository:

```bash
git clone https://github.com/Devp-sriram/coursera-crud-project
```

# Install dependencies 

```bash
npm Install
```

# Start server

```bash
npm start
```

open http://localhost:4000/


# add .env file

```bash
DB_URL = <mongodb url>
```

# endpoints


1. **signin**
   -POST `/signin`
   -request body : 
   ```json
   { "email": "john@example.com", "password": "John@123","company":"john & Doe co"}
    ```


2. **login**
   -POST /login
   (you get all data from back-end replacement of GET request)
   -request body :
   ```json
    { "email": "john@example.com", "password": "John@123" }
   ```


3.**Add-Employee**
  -POST /addEmployee/:id
  (id = _id on user collection db)
  -request body :
  ```json
  {
  "firstname":"pepper",
  "lastname":"pots",
  "dep":"personal assistance"
  }
  ```


4.**update-Employee**
  -PUT /updateEmployee/:id/:employeeid
  **(
   id :  _id on user collection db , 
   employeeId : _id of employee from data array on corresponding document in user collection 
  )**
  request body :
  ```json 
    {
    "firstname": "pepper",
    "lastname": "pots",
    "dep": "asistance"
    }
  ```

5.**Delete-Employee
  -DELETE /deleteEmployee/:id/:employeeid
  **(
   id :  _id on user collection db , 
   employeeId : _id of employee from data array on corresponding document in user collection 
  )**
  request body : none
