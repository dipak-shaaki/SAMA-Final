import React from 'react';
import { 
  User,
  ClipboardList,
  Pill,
  Building
} from 'lucide-react'; 

// Dummy data for the dashboard
const medicalHistory = {
  diseases: [
    { id: 1, date: '2024-03-15', condition: 'Common Cold', status: 'Recovered' },
    { id: 2, date: '2024-02-20', condition: 'Migraine', status: 'Ongoing' },
    { id: 3, date: '2024-01-10', condition: 'Allergies', status: 'Managed' }
  ],
  medications: [
    { id: 1, name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days' },
    { id: 2, name: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', duration: '7 days' },
    { id: 3, name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: 'As needed' }
  ],
  hospitalVisits: [
    { id: 1, date: '2024-03-15', hospital: 'SAMA Medical Center', doctor: 'Dr. Anup Shrestha', purpose: 'Regular Checkup' },
    { id: 2, date: '2024-02-20', hospital: 'City Hospital', doctor: 'Dr. Sujata Poudel', purpose: 'Migraine Treatment' },
    { id: 3, date: '2024-01-10', hospital: 'SAMA Medical Center', doctor: 'Dr. Binod Maharjan', purpose: 'Allergy Consultation' }
  ]
};

const Dashboard = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{"name": "User"}');

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <User className="h-8 w-8 text-[#0E998C]" />
            <h1 className="text-3xl font-bold">Welcome, {currentUser.name}</h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem('currentUser');
              window.location.href = '/login';
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0E998C] hover:bg-[#0D8A7F] rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <ClipboardList className="h-6 w-6 text-[#0E998C] mr-2" />
              <h2 className="text-xl font-semibold">Medical Conditions</h2>
            </div>
            <p className="text-3xl font-bold text-[#0E998C]">{medicalHistory.diseases.length}</p>
            <p className="text-gray-600">Recorded conditions</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Pill className="h-6 w-6 text-[#0E998C] mr-2" />
              <h2 className="text-xl font-semibold">Medications</h2>
            </div>
            <p className="text-3xl font-bold text-[#0E998C]">{medicalHistory.medications.length}</p>
            <p className="text-gray-600">Active prescriptions</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 text-[#0E998C] mr-2" />
              <h2 className="text-xl font-semibold">Hospital Visits</h2>
            </div>
            <p className="text-3xl font-bold text-[#0E998C]">{medicalHistory.hospitalVisits.length}</p>
            <p className="text-gray-600">Total visits</p>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Medical Conditions History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicalHistory.diseases.map(disease => (
                    <tr key={disease.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{disease.date}</td>
                      <td className="px-6 py-4">{disease.condition}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          disease.status === 'Recovered' ? 'bg-green-100 text-green-800' :
                          disease.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {disease.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicalHistory.medications.map(medication => (
                    <tr key={medication.id}>
                      <td className="px-6 py-4">{medication.name}</td>
                      <td className="px-6 py-4">{medication.dosage}</td>
                      <td className="px-6 py-4">{medication.frequency}</td>
                      <td className="px-6 py-4">{medication.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Hospital Visits */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Hospital Visits</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospital</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicalHistory.hospitalVisits.map(visit => (
                    <tr key={visit.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{visit.date}</td>
                      <td className="px-6 py-4">{visit.hospital}</td>
                      <td className="px-6 py-4">{visit.doctor}</td>
                      <td className="px-6 py-4">{visit.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 