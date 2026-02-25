import { Model, DataTypes } from "sequelize";

export default class Expense extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                currency: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                created_by: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Expense",
                tableName: "Expenses",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });

        this.belongsToMany(models.User, {
            through: models.ExpenseMember,
            foreignKey: "expense_id",
            otherKey: "user_id",
            as: "members",
        });
    }
}