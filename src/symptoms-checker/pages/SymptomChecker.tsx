import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BodyMap from '../components/BodyMap';
import SymptomForm from '../components/SymptomForm';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type Symptom = {
  id: string;
  name: string;
  bodyPart: string;
  severity: number;
  duration: string;
  description: string;
};

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  const handleBodyPartSelect = (bodyPart: string) => {
    setSelectedBodyPart(bodyPart);
    setStep(2);
  };

  const handleAddSymptom = (symptom: Symptom) => {
    setSymptoms([...symptoms, symptom]);
    setStep(3);
  };

  const handleSubmit = async () => {
    try {
      // Navigate to results page with symptoms data
      navigate('/symptoms-checker/results', { state: { symptoms } });
    } catch (error) {
      console.error('Error submitting symptoms:', error);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Symptom Checker</h1>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex-1 h-2 ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-2 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-2 ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-green-600 font-medium' : 'text-gray-500'}>Select Body Part</span>
            <span className={step >= 2 ? 'text-green-600 font-medium' : 'text-gray-500'}>Describe Symptoms</span>
            <span className={step >= 3 ? 'text-green-600 font-medium' : 'text-gray-500'}>Review & Submit</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Where are you experiencing symptoms?</h2>
              <p className="text-gray-600 mb-6">Click on the body map to select the area where you're experiencing symptoms.</p>
              <BodyMap onSelectBodyPart={handleBodyPartSelect} />
            </>
          )}

          {step === 2 && selectedBodyPart && (
            <>
              <h2 className="text-xl font-semibold mb-4">Describe your symptoms in the {selectedBodyPart}</h2>
              <SymptomForm bodyPart={selectedBodyPart} onAddSymptom={handleAddSymptom} />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Review Your Symptoms</h2>
              
              {symptoms.length > 0 ? (
                <div className="mb-6">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="border-b border-gray-200 py-4 last:border-b-0">
                      <h3 className="font-medium text-lg">{symptom.name}</h3>
                      <p className="text-gray-600">Body part: {symptom.bodyPart}</p>
                      <p className="text-gray-600">Severity: {symptom.severity}/10</p>
                      <p className="text-gray-600">Duration: {symptom.duration}</p>
                      <p className="text-gray-600">Description: {symptom.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 mb-4">No symptoms added yet.</p>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  + Add Another Symptom
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={symptoms.length === 0}
                  className={`bg-green-600 text-white py-2 px-6 rounded-lg ${
                    symptoms.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                  }`}
                >
                  Get Results
                </button>
              </div>
            </>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker; 