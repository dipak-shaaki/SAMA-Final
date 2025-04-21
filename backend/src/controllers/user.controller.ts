import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { name, email, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { name, email, phone },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile' });
    }
}; 