import { Model, DataTypes } from "sequelize";

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        default_currency: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "INR",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "Users",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Expense, { foreignKey: "created_by", as: "createdExpenses" });

    this.belongsToMany(models.Expense, {
      through: models.ExpenseMember,
      foreignKey: "user_id",
      otherKey: "expense_id",
      as: "expenses",
    });
  }
}