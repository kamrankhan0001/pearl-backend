const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  dueDate: { type: DataTypes.DATE },
  isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false },
  recurrencePattern: { type: DataTypes.JSON }, // Stores recurrence data
  nextOccurrence: { type: DataTypes.DATE }     // Next scheduled date
});

module.exports = Task;
