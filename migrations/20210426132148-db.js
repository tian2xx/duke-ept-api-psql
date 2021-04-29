const {v4: uuidv4} = require("uuid")

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.createTable('users', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: { type: Sequelize.STRING, required: false },
      email: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        unique: true,
      },
      password: { type: Sequelize.STRING, required: true },
      birthday: { type: Sequelize.STRING, required: false },
      gender: { type: Sequelize.STRING, required: false },
      role: { type: Sequelize.STRING, required: true },
    
      accessToken: { type: Sequelize.STRING, required: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }),
    queryInterface.createTable('activities', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dayId: { type: Sequelize.INTEGER, required: true },
      userId: { type: Sequelize.INTEGER, required: true },
      activityId: { type: Sequelize.INTEGER, required: false },
      categoryId: { type: Sequelize.INTEGER, required: false },
      difficultyId: { type: Sequelize.INTEGER, required: false },
      mET: { type: Sequelize.INTEGER, required: false },
      activityName: { type: Sequelize.STRING, required: false },
      hasCompleted: { type: Sequelize.INTEGER, required: false },
      exertion: { type: Sequelize.INTEGER, required: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }),
    queryInterface.createTable('days', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      weekId: { type: Sequelize.INTEGER, required: true },
      userId: { type: Sequelize.INTEGER, required: true },
      date: { type: Sequelize.STRING, required: false },
      dateName: { type: Sequelize.STRING, required: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE
      }

    }),
    queryInterface.createTable('sessions', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: { type: Sequelize.INTEGER, required: true },
      token: { type: Sequelize.STRING, required: true },
      device: { type: Sequelize.STRING, required: false },
      clientIp: { type: Sequelize.STRING, required: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }),
    queryInterface.createTable('symptoms', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        // autoIncrement: true
      },
      userId: { type: Sequelize.INTEGER, required: true },
      startDay: { type: Sequelize.STRING, required: true },
      pain: { type: Sequelize.STRING, required: false },
      fatigue: { type: Sequelize.STRING, required: false },
      nausea: { type: Sequelize.STRING, required: false },
      disturbedSleep: { type: Sequelize.STRING, required: false },
      anxiety: { type: Sequelize.STRING, required: false },
      shortnessOfBreath: { type: Sequelize.STRING, required: false },
      cantRememberThings: { type: Sequelize.STRING, required: false },
      lackOfAppetite: { type: Sequelize.STRING, required: false },
      drowsy: { type: Sequelize.STRING, required: false },
      sadness: { type: Sequelize.STRING, required: false },
      vomit: { type: Sequelize.STRING, required: false },
      numbnessOrTingling: { type: Sequelize.STRING, required: false },
      generalActivity: { type: Sequelize.STRING, required: false },
      mood: { type: Sequelize.STRING, required: false },
      work: { type: Sequelize.STRING, required: false },
      relationWithOthers: { type: Sequelize.STRING, required: false },
      walking: { type: Sequelize.STRING, required: false },
      enjoymentOfLife: { type: Sequelize.STRING, required: false },
      difficultyLevel: { type: Sequelize.STRING, required: false },      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }),
    queryInterface.createTable('weeks', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: { type: Sequelize.INTEGER, required: true },
      startDay: { type: Sequelize.STRING, required: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
         defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }),
  ]),

  down: async (queryInterface, Sequelize) =>     
    Promise.all([
      queryInterface.dropTable("users"),  
      queryInterface.dropTable("activities"),
      queryInterface.dropTable("days"),
      queryInterface.dropTable("sessions"),
      queryInterface.dropTable("symptoms"),
      queryInterface.dropTable("weeks"),
    ])

};
