import { User } from "../models";

// Create user
export const createUser = async (req, res) => {
    try {
        const { email, password, default_currency } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({ email, password, default_currency });
        return res.status(201).json({ message: "User created", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get user profile
export const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { email, default_currency } = req.body;
        await user.update({ email, default_currency });
        return res.json({ message: "User updated", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        return res.json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
