import React, { useEffect, useState } from 'react';
import { User, ClipboardList, Pill, Building, Edit } from 'lucide-react';
import { medicalService } from '../services/api';
import MedicalRecordForm from '../components/MedicalRecordForm';

interface MedicalRecord {
  conditions: Array<{ name: string; date: string }>;
  medications: Array<{ name: string; dosage: string }>;
  hospitalVisits: Array<{ hospital: string; date: string; reason: string }>;
}

const Dashboard: React.FC = () => {
  const [medicalData, setMedicalData] = useState<MedicalRecord>({
    conditions: [],
    medications: [],
    hospitalVisits: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchMedicalData = async () => {
    try {
      const data = await medicalService.getRecords();
      setMedicalData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch medical records');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicalData();
  }, []);

  const handleUpdateRecords = async (data: MedicalRecord) => {
    try {
      await medicalService.updateRecords(data);
      setMedicalData(data);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update medical records');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Medical Dashboard</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0E998C] text-white rounded hover:bg-[#0d8a7f]"
          >
            <Edit size={20} />
            {isEditing ? 'Cancel Editing' : 'Edit Records'}
          </button>
        </div>

        {isEditing ? (
          <MedicalRecordForm
            initialData={medicalData}
            onSubmit={handleUpdateRecords}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Medical Conditions */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <ClipboardList className="h-6 w-6 text-[#0E998C] mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Medical Conditions</h2>
              </div>
              <div className="space-y-4">
                {medicalData.conditions.map((condition, index) => (
                  <div key={index} className="border-l-4 border-[#0E998C] pl-4">
                    <p className="font-medium text-gray-800">{condition.name}</p>
                    <p className="text-sm text-gray-500">Diagnosed: {condition.date}</p>
                  </div>
                ))}
                {medicalData.conditions.length === 0 && (
                  <p className="text-gray-500">No medical conditions recorded</p>
                )}
              </div>
            </div>

            {/* Medications */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Pill className="h-6 w-6 text-[#0E998C] mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Medications</h2>
              </div>
              <div className="space-y-4">
                {medicalData.medications.map((medication, index) => (
                  <div key={index} className="border-l-4 border-[#0E998C] pl-4">
                    <p className="font-medium text-gray-800">{medication.name}</p>
                    <p className="text-sm text-gray-500">Dosage: {medication.dosage}</p>
                  </div>
                ))}
                {medicalData.medications.length === 0 && (
                  <p className="text-gray-500">No medications recorded</p>
                )}
              </div>
            </div>

            {/* Hospital Visits */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-[#0E998C] mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Hospital Visits</h2>
              </div>
              <div className="space-y-4">
                {medicalData.hospitalVisits.map((visit, index) => (
                  <div key={index} className="border-l-4 border-[#0E998C] pl-4">
                    <p className="font-medium text-gray-800">{visit.hospital}</p>
                    <p className="text-sm text-gray-500">Date: {visit.date}</p>
                    <p className="text-sm text-gray-500">Reason: {visit.reason}</p>
                  </div>
                ))}
                {medicalData.hospitalVisits.length === 0 && (
                  <p className="text-gray-500">No hospital visits recorded</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 