import { Model, DataTypes } from "sequelize";

export default class ExpenseMember extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                expense_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                share_amount: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "ExpenseMember",
                tableName: "ExpenseMembers",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id" });
        this.belongsTo(models.Expense, { foreignKey: "expense_id" });
    }
}