// models/note.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.JobApplication);
      this.belongsTo(models.User);
    }
  }
  Note.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Content can't be blank",
          },
        },
      },
      JobApplicationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "job_applications",
          key: "id",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "notes",
    }
  );
  return Note;
};