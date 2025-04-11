import React from 'react';
import { Pill, Stethoscope, Newspaper, Calendar } from 'lucide-react';

const services = [
  {
    icon: <Pill className="h-6 w-6" />,
    title: 'E-Pharmacy',
    description: 'Order medicines online with doorstep delivery!',
    href: '/pharmacy'
  },
  {
    icon: <Stethoscope className="h-6 w-6" />,
    title: 'Symptom Checker',
    description: 'Check your symptoms to know the possible diseases you can have.',
    href: '/symptoms'
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Doctor Appointments',
    description: 'Book consultations with top healthcare experts and doctors.',
    href: '/doctors'
  },
  {
    icon: <Newspaper className="h-6 w-6" />,
    title: 'Health Articles',
    description: 'Stay informed with latest health updates regularly from Government of Nepal and other health portals.',
    href: '/articles'
  }
];

export function FeaturedServices() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive healthcare solutions at your fingertips from the comfort of your home
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                <div className="text-teal-600">{service.icon}</div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{service.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}