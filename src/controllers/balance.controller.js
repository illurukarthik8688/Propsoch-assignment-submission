import { Expense, User } from "../models";

export const getBalances = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const expenses = await Expense.findAll({
            include: [
                {
                    model: User,
                    as: "members",
                    through: { attributes: ["share_amount"] },
                },
            ],
        });

        let balances = {};

        for (let expense of expenses) {
            for (let member of expense.members) {
                if (member.id === userId) continue;

                const share = member.ExpenseMember.share_amount;

                if (expense.created_by === userId) {
                    balances[member.id] = (balances[member.id] || 0) + share;
                } else if (member.id === userId) {
                    balances[expense.created_by] =
                        (balances[expense.created_by] || 0) - share;
                }
            }
        }

        return res.json(balances);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
