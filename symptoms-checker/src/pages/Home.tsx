import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Search, AlertCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Your Health, Our Priority
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Use our symptom checker to get insights about possible conditions based on your symptoms.
        </p>
        <Link
          to="/symptom-checker"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
          Start Symptom Check
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="flex justify-center mb-4">
            <Search size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Identify Symptoms</h2>
          <p className="text-gray-600">
            Use our interactive body map to pinpoint exactly where and what symptoms you're experiencing.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="flex justify-center mb-4">
            <Stethoscope size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Get Insights</h2>
          <p className="text-gray-600">
            Receive information about potential conditions based on your specific symptoms.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Important Note</h2>
          <p className="text-gray-600">
            This tool is for informational purposes only and does not replace professional medical advice.
          </p>
        </div>
      </section>

      <section className="bg-green-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Select Body Area</h3>
            <p className="text-center text-gray-600">
              Click on our interactive body map to indicate where you're experiencing symptoms.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Describe Symptoms</h3>
            <p className="text-center text-gray-600">
              Answer a few questions about your symptoms, their severity, and duration.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Review Results</h3>
            <p className="text-center text-gray-600">
              Get information about potential conditions that match your symptoms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;