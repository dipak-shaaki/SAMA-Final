import React from 'react';
import { Building2, Mail, Bell } from 'lucide-react';

const CareersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Careers at SAMA</h1>
          <p className="text-gray-600">Join us in revolutionizing healthcare</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Building2 className="w-16 h-16 text-[#0E998C] mb-6" />
              <h2 className="text-2xl font-semibold mb-4">No Current Openings</h2>
              <p className="text-gray-600 max-w-lg mb-8">
                We're not actively hiring at the moment, but we're always interested in connecting with talented individuals. 
                Subscribe to our job alerts to be notified when new positions become available.
              </p>

              {/* Notification Sign-up */}
              <div className="w-full max-w-md bg-gray-50 p-6 rounded-lg">
                <h3 className="flex items-center justify-center text-lg font-medium mb-4">
                  <Bell className="w-5 h-5 mr-2 text-[#0E998C]" />
                  Get Job Alerts
                </h3>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E998C]"
                  />
                  <button
                    className="bg-[#0E998C] text-white px-6 py-2 rounded-lg hover:bg-[#0D8A7F] transition-colors"
                  >
                    Subscribe!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage; 