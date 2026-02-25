import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import fs from "fs";

const modelFiles = fs
  .readdirSync(__dirname + "/../models/")
  .filter((file) => file.endsWith(".js") && file !== "index.js");

const sequelizeService = {
  init: async () => {
    try {
      const connection = new Sequelize(databaseConfig);

      // Load all models
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        model.default.init(connection);
      }

      // Setup associations
      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        if (model.default.associate) {
          model.default.associate(connection.models);
        }
      }

      // 🔥 Auto create tables from models
      await connection.sync({ alter: true });

      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
};

export default sequelizeService;