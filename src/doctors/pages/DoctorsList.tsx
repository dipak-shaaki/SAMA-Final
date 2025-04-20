import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Calendar } from 'lucide-react';
import DoctorImage from '../components/DoctorImage';

// Updated doctors data with Nepali names and local images
const doctorsData = [
  {
    id: 1,
    name: "Dr. Anup Shrestha",
    specialization: "Cardiologist",
    experience: "15 years",
    location: "Kathmandu",
    rating: 4.8,
    availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
    image: "/doctors/doctor1.jpg" 
  },
  {
    id: 2,
    name: "Dr. Sujatta Poudel",
    specialization: "Neurologist",
    experience: "12 years",
    location: "Lalitpur",
    rating: 4.9,
    availableSlots: ["9:00 AM", "1:00 PM", "3:00 PM"],
    image: "/doctors/doctor22.jpg"
  },
  {
    id: 3,
    name: "Dr. Samanta Maharjan",
    specialization: "Pediatrician",
    experience: "10 years",
    location: "Bhaktapur",
    rating: 4.7,
    availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM"],
    image: "/doctors/doctor3.jpeg"
  },
  {
    id: 4,
    name: "Dr. Prashant Thapa",
    specialization: "Orthopedic",
    experience: "20 years",
    location: "Kathmandu",
    rating: 4.9,
    availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
    image: "/doctors/doctor4.jpeg"
  },
  {
    id: 5,
    name: "Dr. Hari Tamang",
    specialization: "Dermatologist",
    experience: "8 years",
    location: "Lalitpur",
    rating: 4.6,
    availableSlots: ["10:30 AM", "2:30 PM", "5:30 PM"],
    image: "/doctors/doctor5.jpeg"
  },
  {
    id: 6,
    name: "Dr. Radha Karki",
    specialization: "Cardiologist",
    experience: "18 years",
    location: "Kathmandu",
    rating: 4.9,
    availableSlots: ["9:00 AM", "1:00 PM", "4:00 PM"],
    image: "/doctors/doctor6.jpeg"
  },
  {
    id: 7,
    name: "Dr. Sunil Rai",
    specialization: "Pediatrician",
    experience: "14 years",
    location: "Bhaktapur",
    rating: 4.8,
    availableSlots: ["10:00 AM", "2:00 PM", "5:00 PM"],
    image: "/doctors/doctor8.jpg"
  },
  {
    id: 8,
    name: "Dr. Dipesh Gurung",
    specialization: "Neurologist",
    experience: "16 years",
    location: "Lalitpur",
    rating: 4.7,
    availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
    image: "/doctors/doctor8.jpeg"
  },
  {
    id: 9,
    name: "Dr. Manisha Basnet",
    specialization: "Dermatologist",
    experience: "11 years",
    location: "Kathmandu",
    rating: 4.8,
    availableSlots: ["10:30 AM", "2:30 PM", "5:30 PM"],
    image: "/doctors/doctor9.jpeg"
  },
  {
    id: 10,
    name: "Dr. Ramesh Adhikari",
    specialization: "Orthopedic",
    experience: "22 years",
    location: "Lalitpur",
    rating: 4.9,
    availableSlots: ["9:00 AM", "1:00 PM", "4:00 PM"],
    image: "/doctors/doctor10.jpeg"
  },
  {
    id: 11,
    name: "Dr. Aavash Lama",
    specialization: "Pediatrician",
    experience: "13 years",
    location: "Bhaktapur",
    rating: 4.7,
    availableSlots: ["10:00 AM", "2:00 PM", "5:00 PM"],
    image: "/doctors/doctor11.jpeg"
  },
  {
    id: 12,
    name: "Dr. Bimal Pant",
    specialization: "Cardiologist",
    experience: "19 years",
    location: "Kathmandu",
    rating: 4.8,
    availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
    image: "/doctors/dooctor5.jpeg"
  }
];

const DoctorsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    'all',
    'Cardiologist',
    'Neurologist',
    'Pediatrician',
    'Dermatologist',
    'Orthopedic'
  ];

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            doctor.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Doctors</h1>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex p-6">
                <DoctorImage
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-xl font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-gray-600 text-sm">{doctor.location}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-gray-600 text-sm">{doctor.rating} • {doctor.experience}</span>
                  </div>
                </div>
              </div>
              <div className="border-t px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">Next Available: Today</span>
                  </div>
                  <button
                    onClick={() => navigate(`/doctors/book/${doctor.id}`)}
                    className="bg-[#0E998C] text-white px-4 py-2 rounded-lg hover:bg-[#0D8A7F]"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList; 