import React from 'react';
import { Search } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-teal-600 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-teal-100 sm:text-xl md:mt-5 md:max-w-3xl">
            Access healthcare services, check symptoms, and find medication - all in one place.
          </p>
          
          <div className="mt-10 max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-lg shadow-md p-2">
              <Search className="h-5 w-5 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search symptoms, medicines, or doctors..."
                className="flex-1 ml-3 outline-none text-gray-700"
              />
              <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}