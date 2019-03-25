const Sequelize = require('sequelize');

//to expose things as file, you need module.
//configuration; need this for model
module.exports = new Sequelize('sqlite:chinook.db');
