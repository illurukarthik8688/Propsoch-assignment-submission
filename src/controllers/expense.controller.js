import { Expense, ExpenseMember } from "../models";

export const createExpense = async (req, res) => {
    try {
        const { name, amount, currency, date, created_by, members } = req.body;

        // 1️⃣ Create expense
        const expense = await Expense.create({
            name,
            amount,
            currency,
            date,
            created_by,
        });

        // 2️⃣ Insert members
        for (let member of members) {
            await ExpenseMember.create({
                expense_id: expense.id,
                user_id: member.user_id,
                share_amount: member.share_amount,
            });
        }

        return res.status(201).json({ message: "Expense created", expense });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
