#! /usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const { exec } = require("child_process");
const moment = require("moment");
const fs = require("fs");
const { options } = require("yargs");

const greeting = chalk.white.bold("🚀 Rocket CLI for Strapi");

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
};

const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);

const yargsOptions = yargs
  .usage("Usage: -n <name>")
  .option("n", {
    alias: "name",
    describe: "The name of the project",
    type: "string",
    demandOption: true,
  })
  .option("v", {
    alias: "version",
    describe: "What version of strapi",
    type: "string",
  })
  .option("rf", {
    alias: "right-here",
    describe: "Create the project in the current folder",
    type: "boolean",
    default: "false",
  })
  .option("to", {
    alias: "take-off",
    describe:
      "Opens the project folder in VS Code. (`code` command must be exported to your path)",
    type: "boolean",
    default: false,
  }).argv;

const parentFolder = moment().format("DD-MM-YYYY");

try {
  if (!fs.existsSync(`./${parentFolder}`)) {
    fs.mkdirSync(parentFolder);
  }
} catch (e) {
  console.log(e);
}

const projectName = `./${
  options["right-here"] === false ? parentFolder + "/" : null
}${options.name}`;

exec(
  `npx create-strapi-app${options.version} ${projectName} --quickstart --no-run`
);

if (options["take-off"] === true) {
  exec(`code ${projectName}`);
}
