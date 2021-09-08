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
        {
          type: "input",
          name: "managerName",
          message: "Who is the manager of this team?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              return "Please enter the manager's name!";
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
          validate: (answers) => {
            if (answers !== "") {
              return true;
            } else {
              return "Please enter the manager's ID!";
            }
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Please enter the manager's office number",
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              return "Please enter an office number!";
            }
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          // answers.managerRole,
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
        {
          type: "input",
          name: "engineerName",
          message: "What's the name of the Engineer?",
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              return "Please enter an Engineer's name!";
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
          name: "engineerEmail",
          message: "Please enter the Engineer's email.",
        },
        {
          type: "input",
          name: "engineerId",
          message: "Please enter the Engineer's ID.",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "Please enter the Engineer's github username.",
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              return "Please enter the Engineer's github username!";
            }
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          // answers.engineerRole,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What's the name of the Intern?",
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              return "Please enter an Intern's name!";
            }
          },
        },
        {
          type: "list",
          name: "internRole",
          message: "Please choose your employee's role",
          choices: ["Intern"],
        },
        {
          type: "input",
          name: "internEmail",
          message: "Please enter the Intern's email.",
        },
        {
          type: "input",
          name: "internId",
          message: "Please enter the Intern's ID.",
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              return "Please enter the Intern's ID!";
            }
          },
        },
        {
          type: "input",
          name: "school",
          message: "Please enter the Intern's school",
          validate: (answers) => {
            if (answers) {
              return true;
            } else {
              return "Please enter the Intern's school!";
            }
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          // answers.interRole,
          answers.internId,
          answers.internEmail,
          answers.school
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
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
