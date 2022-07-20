"use strict";
// const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
    //   id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //   },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name is required.",
          },
          notEmpty: {
            msg: "Please provide a first name!",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is required.",
          },
          notEmpty: {
            msg: "Please provide a last name!",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email you entered already exists. Please enter another email.",
        },
        validate: {
          notNull: {
            msg: "An email address is required.",
          },
          isEmail: {
            msg: "Please provide a valid email address!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue('password', hashedPassword);
        },
        validate: {
          notNull: {
            msg: "A pasword is required.",
          },
          notEmpty: {
            msg: "Please provide a password!",
          },
        //   len: {
        //     args: [8, 21],
        //     msg: "The password should be between 8 and 20 characters",
        //   },
        },
      },
    //   confirmedPassword: 
    //   {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     set(val) {
    //         if( val === this.password ) {
                
    //             const hashedPassword = bcrypt.hashSync(val, 10);
    //             this.setDataValue('confirmedPassword', hashedPassword);
    //         }
    //     },
    //     validate: {
    //         notNull: {
    //             msg: "Both passwords must match"
    //         }
    //     }
    //   }
    },
    { sequelize }
  );

  User.associate = (models) => {
    User.hasMany(models.Course, {
    //   as: "StudentId",
      foreignKey: {
        fieldName: "StudentId",
        allowNull: false,
      },
    });
  };

  return User;
};
