import React, { useState } from 'react';
import { Symptom } from '../pages/SymptomChecker';

type SymptomFormProps = {
  bodyPart: string;
  onAddSymptom: (symptom: Symptom) => void;
};

const commonSymptoms: Record<string, string[]> = {
  "Head": ["Headache", "Dizziness", "Blurred vision", "Ear pain", "Sore throat"],
  "Chest": ["Chest pain", "Shortness of breath", "Cough", "Heart palpitations"],
  "Abdomen": ["Abdominal pain", "Nausea", "Vomiting", "Diarrhea", "Constipation"],
  "Left Arm": ["Pain", "Numbness", "Weakness", "Swelling"],
  "Right Arm": ["Pain", "Numbness", "Weakness", "Swelling"],
  "Left Leg": ["Pain", "Numbness", "Weakness", "Swelling"],
  "Right Leg": ["Pain", "Numbness", "Weakness", "Swelling"],
};

const SymptomForm: React.FC<SymptomFormProps> = ({ bodyPart, onAddSymptom }) => {
  const [symptomName, setSymptomName] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!symptomName && !customSymptom) {
      newErrors.symptom = 'Please select or enter a symptom';
    }
    
    if (!duration) {
      newErrors.duration = 'Please select a duration';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create symptom object
    const finalSymptomName = symptomName === 'Other' ? customSymptom : symptomName;
    
    const symptom: Symptom = {
      id: Date.now().toString(),
      name: finalSymptomName,
      bodyPart,
      severity,
      duration,
      description,
    };
    
    onAddSymptom(symptom);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          What symptom are you experiencing?
        </label>
        <select
          value={symptomName}
          onChange={(e) => {
            setSymptomName(e.target.value);
            if (errors.symptom) {
              setErrors({ ...errors, symptom: '' });
            }
          }}
          className={`w-full p-3 border rounded-lg ${
            errors.symptom ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a symptom</option>
          {commonSymptoms[bodyPart]?.map((symptom) => (
            <option key={symptom} value={symptom}>
              {symptom}
            </option>
          ))}
          <option value="Other">Other (specify)</option>
        </select>
        {errors.symptom && <p className="text-red-500 text-sm mt-1">{errors.symptom}</p>}
      </div>

      {symptomName === 'Other' && (
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Specify your symptom
          </label>
          <input
            type="text"
            value={customSymptom}
            onChange={(e) => {
              setCustomSymptom(e.target.value);
              if (errors.symptom) {
                setErrors({ ...errors, symptom: '' });
              }
            }}
            className={`w-full p-3 border rounded-lg ${
              errors.symptom ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your symptom"
          />
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          How severe is your symptom? ({severity}/10)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={severity}
          onChange={(e) => setSeverity(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Mild</span>
          <span>Moderate</span>
          <span>Severe</span>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          How long have you been experiencing this symptom?
        </label>
        <select
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
            if (errors.duration) {
              setErrors({ ...errors, duration: '' });
            }
          }}
          className={`w-full p-3 border rounded-lg ${
            errors.duration ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select duration</option>
          <option value="Less than a day">Less than a day</option>
          <option value="1-2 days">1-2 days</option>
          <option value="3-6 days">3-6 days</option>
          <option value="1-2 weeks">1-2 weeks</option>
          <option value="2-4 weeks">2-4 weeks</option>
          <option value="1-3 months">1-3 months</option>
          <option value="3+ months">3+ months</option>
        </select>
        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Additional details (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Describe any other details about your symptom"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Continue
      </button>
    </form>
  );
};

export default SymptomForm;