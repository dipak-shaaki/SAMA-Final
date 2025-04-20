import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SymptomForm = ({ bodyPart, onAddSymptom }) => {
  const [symptom, setSymptom] = useState({
    name: '',
    severity: 5,
    duration: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSymptom({
      id: uuidv4(),
      bodyPart,
      ...symptom
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What symptoms are you experiencing?
        </label>
        <input
          type="text"
          value={symptom.name}
          onChange={(e) => setSymptom({ ...symptom, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Severity (1-10)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={symptom.severity}
          onChange={(e) => setSymptom({ ...symptom, severity: parseInt(e.target.value) })}
          className="mt-1 block w-full"
        />
        <div className="text-center">{symptom.severity}</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          How long have you had this symptom?
        </label>
        <select
          value={symptom.duration}
          onChange={(e) => setSymptom({ ...symptom, duration: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        >
          <option value="">Select duration</option>
          <option value="Today">Today</option>
          <option value="Few days">Few days</option>
          <option value="A week">A week</option>
          <option value="Few weeks">Few weeks</option>
          <option value="A month or more">A month or more</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional details
        </label>
        <textarea
          value={symptom.description}
          onChange={(e) => setSymptom({ ...symptom, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Add Symptom
      </button>
    </form>
  );
};

export default SymptomForm; 