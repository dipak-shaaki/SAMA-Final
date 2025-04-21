import { Request, Response } from 'express';
import MedicalRecord from '../models/medical.model';

export const getMedicalRecords = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const records = await MedicalRecord.findOne({ userId });
        res.json(records || { conditions: [], medications: [], hospitalVisits: [] });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medical records' });
    }
};

export const updateMedicalRecords = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { conditions, medications, hospitalVisits } = req.body;

        const records = await MedicalRecord.findOneAndUpdate(
            { userId },
            { conditions, medications, hospitalVisits },
            { new: true, upsert: true }
        );

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error updating medical records' });
    }
}; 