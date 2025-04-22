import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import {
  validateDate,
  validateRequired,
  validateDosage,
  validateHospitalName,
  validateReason
} from '../utils/validation';

interface MedicalRecordFormProps {
  initialData?: {
    conditions: Array<{ name: string; date: string }>;
    medications: Array<{ name: string; dosage: string }>;
    hospitalVisits: Array<{ hospital: string; date: string; reason: string }>;
  };
  onSubmit: (data: any) => Promise<void>;
}

interface FormErrors {
  conditionName?: string;
  conditionDate?: string;
  medicationName?: string;
  medicationDosage?: string;
  hospitalName?: string;
  visitDate?: string;
  visitReason?: string;
}

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    conditions: initialData?.conditions || [],
    medications: initialData?.medications || [],
    hospitalVisits: initialData?.hospitalVisits || [],
  });

  const [newCondition, setNewCondition] = useState({ name: '', date: '' });
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '' });
  const [newVisit, setNewVisit] = useState({ hospital: '', date: '', reason: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateCondition = () => {
    const nameError = validateRequired(newCondition.name, 'Condition name');
    const dateError = validateDate(newCondition.date);
    
    setErrors(prev => ({
      ...prev,
      conditionName: nameError,
      conditionDate: dateError
    }));

    return !nameError && !dateError;
  };

  const validateMedication = () => {
    const nameError = validateRequired(newMedication.name, 'Medication name');
    const dosageError = validateDosage(newMedication.dosage);
    
    setErrors(prev => ({
      ...prev,
      medicationName: nameError,
      medicationDosage: dosageError
    }));

    return !nameError && !dosageError;
  };

  const validateVisit = () => {
    const hospitalError = validateHospitalName(newVisit.hospital);
    const dateError = validateDate(newVisit.date);
    const reasonError = validateReason(newVisit.reason);
    
    setErrors(prev => ({
      ...prev,
      hospitalName: hospitalError,
      visitDate: dateError,
      visitReason: reasonError
    }));

    return !hospitalError && !dateError && !reasonError;
  };

  const handleAddCondition = () => {
    if (!validateCondition()) return;

    setFormData(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition]
    }));
    setNewCondition({ name: '', date: '' });
    setErrors(prev => ({ ...prev, conditionName: undefined, conditionDate: undefined }));
  };

  const handleAddMedication = () => {
    if (!validateMedication()) return;

    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication]
    }));
    setNewMedication({ name: '', dosage: '' });
    setErrors(prev => ({ ...prev, medicationName: undefined, medicationDosage: undefined }));
  };

  const handleAddVisit = () => {
    if (!validateVisit()) return;

    setFormData(prev => ({
      ...prev,
      hospitalVisits: [...prev.hospitalVisits, newVisit]
    }));
    setNewVisit({ hospital: '', date: '', reason: '' });
    setErrors(prev => ({
      ...prev,
      hospitalName: undefined,
      visitDate: undefined,
      visitReason: undefined
    }));
  };

  const handleRemove = (type: 'conditions' | 'medications' | 'hospitalVisits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setErrors(prev => ({ ...prev, submit: 'Failed to update medical records' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {errors.submit}
        </div>
      )}

      {/* Conditions Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Medical Conditions</h3>
        <div className="space-y-4">
          {formData.conditions.map((condition, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{condition.name}</p>
                <p className="text-sm text-gray-500">Diagnosed: {condition.date}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove('conditions', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Condition name"
                  value={newCondition.name}
                  onChange={(e) => setNewCondition(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded ${errors.conditionName ? 'border-red-500' : ''}`}
                />
                {errors.conditionName && (
                  <p className="text-red-500 text-sm mt-1">{errors.conditionName}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="date"
                  value={newCondition.date}
                  onChange={(e) => setNewCondition(prev => ({ ...prev, date: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded ${errors.conditionDate ? 'border-red-500' : ''}`}
                />
                {errors.conditionDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.conditionDate}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleAddCondition}
                className="px-3 py-2 bg-[#0E998C] text-white rounded hover:bg-[#0d8a7f]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Medications Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Medications</h3>
        <div className="space-y-4">
          {formData.medications.map((medication, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{medication.name}</p>
                <p className="text-sm text-gray-500">Dosage: {medication.dosage}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove('medications', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Medication name"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded ${errors.medicationName ? 'border-red-500' : ''}`}
                />
                {errors.medicationName && (
                  <p className="text-red-500 text-sm mt-1">{errors.medicationName}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Dosage (e.g., 500mg, 1 tablet)"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded ${errors.medicationDosage ? 'border-red-500' : ''}`}
                />
                {errors.medicationDosage && (
                  <p className="text-red-500 text-sm mt-1">{errors.medicationDosage}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-3 py-2 bg-[#0E998C] text-white rounded hover:bg-[#0d8a7f]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Visits Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Hospital Visits</h3>
        <div className="space-y-4">
          {formData.hospitalVisits.map((visit, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{visit.hospital}</p>
                <p className="text-sm text-gray-500">Date: {visit.date}</p>
                <p className="text-sm text-gray-500">Reason: {visit.reason}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove('hospitalVisits', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <div className="space-y-2">
            <div>
              <input
                type="text"
                placeholder="Hospital name"
                value={newVisit.hospital}
                onChange={(e) => setNewVisit(prev => ({ ...prev, hospital: e.target.value }))}
                className={`w-full px-3 py-2 border rounded ${errors.hospitalName ? 'border-red-500' : ''}`}
              />
              {errors.hospitalName && (
                <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="date"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit(prev => ({ ...prev, date: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded ${errors.visitDate ? 'border-red-500' : ''}`}
                />
                {errors.visitDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.visitDate}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Reason for visit"
                  value={newVisit.reason}
                  onChange={(e) => setNewVisit(prev => ({ ...prev, reason: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded ${errors.visitReason ? 'border-red-500' : ''}`}
                />
                {errors.visitReason && (
                  <p className="text-red-500 text-sm mt-1">{errors.visitReason}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleAddVisit}
                className="px-3 py-2 bg-[#0E998C] text-white rounded hover:bg-[#0d8a7f]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-[#0E998C] text-white rounded hover:bg-[#0d8a7f] disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Medical Records'}
      </button>
    </form>
  );
};

export default MedicalRecordForm; 