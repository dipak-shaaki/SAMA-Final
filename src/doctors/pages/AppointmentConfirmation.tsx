import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import DoctorImage from '../components/DoctorImage';

const AppointmentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, appointmentDate, appointmentTime } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 text-center border-b">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold">Appointment Confirmed!</h1>
            <p className="text-gray-600 mt-2">Your appointment has been successfully scheduled</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <DoctorImage
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="ml-4">
                  <h2 className="font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{new Date(appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{appointmentTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{doctor.location}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h3 className="font-semibold mb-2">Important Notes:</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Please arrive 15 minutes before your appointment time</li>
                  <li>• Bring any relevant medical records or test results</li>
                  <li>• Wear a mask and follow COVID-19 safety protocols</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/doctors')}
                className="bg-[#0E998C] text-white px-6 py-2 rounded-lg hover:bg-[#0D8A7F]"
              >
                Back to Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation; 