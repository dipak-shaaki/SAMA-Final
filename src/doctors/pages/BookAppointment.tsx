import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import DoctorImage from '../components/DoctorImage';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);

  // Find doctor from the ID (you would typically fetch this from an API)
  const doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: "15 years",
    location: "Kathmandu",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    availableDates: [
      "2024-03-20",
      "2024-03-21",
      "2024-03-22",
      "2024-03-23",
    ],
    availableSlots: {
      "2024-03-20": ["10:00 AM", "2:00 PM", "4:00 PM"],
      "2024-03-21": ["9:00 AM", "1:00 PM", "3:00 PM"],
      "2024-03-22": ["11:00 AM", "2:30 PM", "5:00 PM"],
      "2024-03-23": ["10:30 AM", "1:30 PM", "4:30 PM"],
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle appointment booking
    navigate('/doctors/confirmation', {
      state: {
        doctor,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/doctors')}
          className="flex items-center text-gray-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Doctors
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Doctor Info */}
          <div className="p-6 border-b">
            <div className="flex items-center">
              <DoctorImage
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="ml-6">
                <h1 className="text-2xl font-semibold">{doctor.name}</h1>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-gray-600">{doctor.location}</p>
              </div>
            </div>
          </div>

          {/* Booking Steps */}
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className={`flex-1 h-2 ${step >= 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 ml-2 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className={step >= 1 ? 'text-green-600' : 'text-gray-500'}>Select Date</span>
                <span className={step >= 2 ? 'text-green-600' : 'text-gray-500'}>Select Time</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Select Appointment Date</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {doctor.availableDates.map(date => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setStep(2);
                        }}
                        className={`p-4 border rounded-lg text-center hover:border-green-500 ${
                          selectedDate === date ? 'border-green-500 bg-green-50' : ''
                        }`}
                      >
                        <Calendar className="h-5 w-5 mx-auto mb-2" />
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Select Appointment Time</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {doctor.availableSlots[selectedDate].map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 border rounded-lg text-center hover:border-green-500 ${
                          selectedTime === time ? 'border-green-500 bg-green-50' : ''
                        }`}
                      >
                        <Clock className="h-5 w-5 mx-auto mb-2" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Back
                  </button>
                )}
                {step === 2 && selectedTime && (
                  <button
                    type="submit"
                    className="bg-[#0E998C] text-white px-6 py-2 rounded-lg hover:bg-[#0D8A7F]"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment; 