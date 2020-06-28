const inquirer = require("inquirer");
const mysql = require("mysql");

/////////////////////////////////////

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db",
});

//////////////////Questions//////////////////

const questions = [
  {
    name: "operation",
    message: "Choose a DB operation:",
    type: "list",
    choices: [
      {
        name: "Add item to database",
        value: "addDB",
        short: "Add database",
      },
      {
        name: "View item in database",
        value: "viewDB",
        short: "View database",
      },
      {
        name: "Update item in database",
        value: "updateDB",
        short: "Update database",
      },
      {
        name: "Delete item in database",
        value: "deleteDB",
        short: "Delete database",
      },
    ],
  },
];

const questions_addDB = [
  {
    name: "operationAdd",
    message: "Choose the item you wish to add:",
    type: "list",
    choices: [
      {
        name: "Add department to database",
        value: "addDepartment",
        short: "Add department",
      },
      {
        name: "Add role to database",
        value: "addRole",
        short: "Add role",
      },
      {
        name: "Add employee to database",
        value: "addEmployee",
        short: "Add employee",
      },
    ],
  },
];

const questions_view = [
  {
    name: "operationView",
    message: "Choose a DB operation:",
    type: "list",
    choices: [
      {
        name: "view department in database",
        value: "employee_db.departments",
        short: "view department",
      },
      {
        name: "view role in database",
        value: "employee_db.roles",
        short: "view role",
      },
      {
        name: "view employee in database",
        value: "employee_db.employees",
        short: "view employee",
      },
    ],
  },
];

const questions_update = [
  {
    name: "operationUpdate",
    message: "Choose a DB operation:",
    type: "list",
    choices: [
      {
        name: "update department in database",
        value: "updateDepartment",
        short: "update department",
      },
      {
        name: "update role in database",
        value: "updateRole",
        short: "update role",
      },
      {
        name: "update employee in database",
        value: "updateEmployee",
        short: "update employee",
      },
    ],
  },
];

const questions_delete = [
  {
    name: "table",
    message: "Which table you wish to delete from",
    type: "list",
    choices: [
      {
        name: "Delete employee in database",
        value: "employee_db.employees",
        short: "delete employee",
      },
      {
        name: "Delete role in database",
        value: "employee_db.roles",
        short: "delete role",
      },
      {
        name: "Delete department in database",
        value: "employee_db.departments",
        short: "delete department",
      },
    ],
  },
];

////This function will be run after you finish a command to see if you wish to continue or not. If you wish to continue, the init() will be run again
const continueOperation = async () => {
  const question_continue = [
    {
      name: "operation",
      message: "continue?",
      type: "list",
      choices: [
        {
          name: "Yes",
          value: "Yes",
        },
        {
          name: "No",
          value: "No",
        },
      ],
    },
  ];
  const { operation } = await inquirer.prompt(question_continue);

  if (operation === "Yes") {
    init();
  } else {
    connection.end;
  }
};

//////////////////////////////////

const init = async () => {
  const { operation } = await inquirer.prompt(questions);
  switch (operation) {
    case "addDB":
      //Choosing the table to add to
      const { operationAdd } = await inquirer.prompt(questions_addDB);
      //IF statement to run the line depend on which table the user chosen
      if (operationAdd === "addDepartment") {
        const { departmentName } = await inquirer.prompt([
          {
            name: "departmentName",
            message: "What is your new department name",
          },
        ]);
        const addDataBaseDepartment = async (item) => {
          //Add Item to department
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "INSERT INTO departments (name) VALUES (?)",
            [item],
            view
          );
        };
        addDataBaseDepartment(departmentName);
      } else if (operationAdd === "addEmployee") {
        const {
          employeeFirstName,
          employeeLastName,
          employeeroleId,
          employeeManagerId,
        } = await inquirer.prompt([
          {
            name: "employeeFirstName",
            message: "What is your new employee's first name",
          },
          {
            name: "employeeLastName",
            message: "What is your new employee's last name",
          },
          {
            name: "employeeroleId",
            message: "What is your new employee's role id",
          },
          {
            name: "employeeManagerId",
            message: "What is your new employee's manager id",
          },
        ]);
        const addDataBaseEmployee = async (
          firstName,
          lastName,
          roleId,
          managerId
        ) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
            [firstName, lastName, roleId, managerId],
            view
          );
        };
        addDataBaseEmployee(
          employeeFirstName,
          employeeLastName,
          employeeroleId,
          employeeManagerId
        );
      } else {
        const { title, salary, departmentID } = await inquirer.prompt([
          {
            name: "title",
            message: "What is the new role's title",
          },
          {
            name: "salary",
            message: "What is the new role's salary",
          },
          {
            name: "departmentID",
            message: "What is the new role's department id",
          },
        ]);
        const addDataBaseRole = async (title, salary, department_id) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
            [title, salary, department_id],
            view
          );
        };

        addDataBaseRole(title, salary, departmentID);
      }

      continueOperation;

      break;
    case "viewDB":
      //View the selected Database
      const { operationView } = await inquirer.prompt(questions_view);
      const viewDataBase = (item) => {
        const view = (err, rows) => {
          if (err) throw err;
          console.table(rows);

          continueOperation();
        };

        connection.query("SELECT * FROM ??", [item], view);
      };

      viewDataBase(operationView);
      continueOperation;

      break;

    //////For Updating data from data base/////
    case "updateDB":
      ///Choosing which table to update from///
      const { operationUpdate } = await inquirer.prompt(questions_update);
      //If statement to run the lines to update the information//
      if (operationUpdate === "updateDepartment") {
        const questions_UpdateDepartment = [
          {
            name: "departmentName",
            message: "What is the department name?",
          },
          {
            name: "updateItem",
            message: "What do you wish to update about the department?",
            type: "list",
            choices: [
              {
                name: "Update department name",
                value: "name",
                short: "Update department name",
              },
              {
                name: "Update department ID",
                value: "id",
                short: "Update department ID",
              },
            ],
          },
          {
            name: "updatedValue",
            message: "Enter the change",
          },
        ];
        const {
          departmentName,
          updateItem,
          updatedValue,
        } = await inquirer.prompt(questions_UpdateDepartment);

        const updateDepartments = (names, updateItems, updatedValues) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "UPDATE employee_db.departments SET ?? = ? WHERE name = ?",
            [updateItems, updatedValues, names],
            view
          );
        };
        updateDepartments(departmentName, updateItem, updatedValue);
      } else if (operationUpdate === "updateRole") {
        const questions_UpdateRole = [
          { name: "title", message: "What is the row title?" },
          {
            name: "updateItem",
            message: "What do you want to change?",
            type: "list",
            choices: [
              {
                name: "Update ID",
                value: "id",
                short: "Update ID",
              },
              {
                name: "Update title",
                value: "title",
                short: "Update title",
              },
              {
                name: "Update salary",
                value: "salary",
                short: "Update salary",
              },
              {
                name: "Update department ID",
                value: "department_id",
                short: "Update department ID",
              },
            ],
          },
          {
            name: "updatedValue",
            message: "Enter the change",
          },
        ];
        const { title, updateItem, updatedValue } = await inquirer.prompt(
          questions_UpdateRole
        );
        const updateRoles = (titles, updateItems, updatedValues) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "UPDATE employee_db.roles SET ?? = ? WHERE title = ?",
            [updateItems, updatedValues, title],
            view
          );
        };
        updateRoles(title, updateItem, updatedValue);
      } else {
        const questions_UpdateEmployee = [
          {
            name: "firstName",
            message:
              "What is the first name of the employee you wish to change?",
          },
          {
            name: "lastName",
            message: "Last name?",
          },
          {
            name: "updateItem",
            message: "What do you wish to update about him/her?",
            type: "list",
            choices: [
              {
                name: "Update Role ID",
                value: "role_id",
                short: "Update Role ID",
              },
              {
                name: "Update First Name",
                value: "first_name",
                short: "Update First Name",
              },
              {
                name: "Update Last Name",
                value: "last_name",
                short: "Update Last Name",
              },
            ],
          },
          {
            name: "updatedValue",
            message: "Enter the change",
          },
        ];
        const {
          firstName,
          lastName,
          updateItem,
          updatedValue,
        } = await inquirer.prompt(questions_UpdateEmployee);

        //UPDATE employee_db.employees SET role_id = 6969 WHERE first_name = "Andrwe" AND last_name = "Wong";
        const updateEmployees = (
          firstNames,
          lastNames,
          updateItems,
          updatedValues
        ) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
          };

          connection.query(
            "UPDATE employee_db.employees SET ?? = ? WHERE first_name = ? AND last_name = ?",
            [updateItems, updatedValues, firstNames, lastNames],
            view
          );
        };
        updateEmployees(firstName, lastName, updateItem, updatedValue);
      }

      break;

    //////For deleting data from data base/////
    case "deleteDB":
      const { table } = await inquirer.prompt(questions_delete);

      if (table === "employee_db.employees") {
        const { firstName, lastName } = await inquirer.prompt([
          {
            name: "firstName",
            message: "who is the unlucky employee's first name?",
          },
          {
            name: "lastName",
            message: "Last name?",
          },
        ]);

        const deleteEmployees = (firstNames, lastNames) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "Delete from employee_db.employees where first_name = ? AND last_name = ?",
            [firstName, lastName],
            view
          );
        };

        deleteEmployees();
      } else if (table === "employee_db.roles") {
        const { role } = await inquirer.prompt([
          {
            name: "role",
            message: "Which role is useless for the company now?",
          },
        ]);
        const deleteRoles = (roles) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "Delete from employee_db.roles where title = ?",
            [roles],
            view
          );
        };
        deleteRoles(role);
      } else {
        const { name } = await inquirer.prompt([
          {
            name: "name",
            message: "Which department is no longer needed?",
          },
        ]);
        const deleteDepartments = (departmentName) => {
          const view = (err, rows) => {
            if (err) throw err;
            console.table(rows);
            continueOperation();
          };

          connection.query(
            "Delete from employee_db.departments where name = ?",
            [departmentName],
            view
          );
        };
        deleteDepartments(name);
      }
      break;

    default:
      console.log(
        "something seems wrong, please contact the programme Shiba Inu for debug"
      );
      break;
  }
  connection.end;
};

/////////////Establish Connection with the SQL//////////////
connection.connect(function async(err) {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId + "\n");
  init();

  connection.end;
});
