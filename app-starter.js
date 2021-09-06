const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
const render = require("./lib/htmlRenderer");
// Alternative rendering function
// const render = require("./lib/page-template.js");

const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user

const idArray = [];

function appMenu() {
  // Create manager first, then manager we will create a team
  // Once manager is created, we will create tean by asking the user which type of employee to create
  // based on the choice, we will create that employee object
  // loop thru the create team until user is done from create employee
  // then we will use the employee objects to create

  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        //
        // YOUR CODE HERE:
        // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
        // Strongly recommend to add validate property function for id and email
        //
        {
          type: "input",
          name: "managerName",
          message: "Who is the manager of this team?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the manager's name!");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "managerRole",
          message: "Please choose your employee's role",
          choices: ["Manager"],
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Please enter the manager's email.",
        },
        {
          type: "input",
          name: "managerId",
          message: "Please enter the manager's ID.",
          validate: (nameInput) => {
            if (nameInput) {
              console.log("Please enter the manager's ID!");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Please enter the manager's office number",
          validate: (nameInput) => {
            if (nameInput) {
              console.log("Please enter an office number!");
              return false;
            } else {
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        const Manager = new Manager(
          answers.managerName,
          answers.managerRole,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        //
        // YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
        //
        {
          type: "input",
          name: "engineerName",
          message: "What's the name of the Engineer?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter an Engineer's name!");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "engineerRole",
          message: "Please choose your employee's role",
          choices: ["Engineer"],
        },
        {
          type: "input",
          name: "email",
          message: "Please enter the Engineer's email.",
        },
        {
          type: "input",
          name: "engineerId",
          message: "Please enter the Engineer's ID.",
          validate: (nameInput) => {
            if (nameInput) {
              console.log("Please enter the Engineer's ID!");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "Please enter the Engineer's github username.",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the Engineer's github username!");
            }
          },
        },
      ])
      .then((answers) => {
        //
        // YOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE ENGINEER CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY  teamMembers.push(manager);
        // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY  idArray.push(answers.engineerId);
        //
        const Engineer = new Engineer(
          answers.engineerName,
          answers.engineerRole,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(Engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        //
        // YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
        //
        {
          type: "input",
          name: "name",
          message: "What's the name of the Intern?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter an Intern's name!");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "role",
          message: "Please choose your employee's role",
          choices: ["Intern"],
        },
        {
          type: "input",
          name: "email",
          message: "Please enter the Intern's email."
        },
        {
          type: "input",
          name: "id",
          message: "Please enter the Intern's ID.",
          validate: (nameInput) => {
            if (nameInput) {
              console.log("Please enter the Intern's ID!");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "school",
          message: "Please enter the Intern's school",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the Intern's school!");
            }
          },
        }
      ])
      .then((answers) => {
        //
        // YOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE INTERN CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
        //
        const Intern = new Intern(
          answers.internName,
          answers.interRole,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(Intern);
        idArray.push(answers.InternId);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();
}

appMenu();
