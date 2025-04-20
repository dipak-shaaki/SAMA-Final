import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Define common conditions and their associated symptoms
const conditionDatabase = {
  headache: {
    name: 'Headache',
    symptoms: ['head pain', 'headache', 'migraine'],
    severity: {
      mild: 'Rest and over-the-counter pain relievers may help',
      moderate: 'Consider consulting a healthcare provider if persistent',
      severe: 'Seek immediate medical attention, especially if accompanied by other symptoms'
    }
  },
  chest_pain: {
    name: 'Chest Pain',
    symptoms: ['chest pain', 'chest pressure', 'chest tightness'],
    severity: {
      mild: 'Monitor symptoms and avoid strenuous activity',
      moderate: 'Consult a healthcare provider for evaluation',
      severe: 'Seek emergency medical attention immediately'
    }
  },
  // Add more conditions as needed
};

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const symptoms = location.state?.symptoms || [];

  const analyzeSymptoms = (symptoms) => {
    const analysis = {
      urgency: 'low',
      recommendations: [],
      possibleConditions: [],
      generalAdvice: []
    };

    // Check for high severity symptoms
    const hasHighSeverity = symptoms.some(s => s.severity >= 8);
    const hasChestPain = symptoms.some(s => 
      s.bodyPart.toLowerCase().includes('chest') || 
      s.name.toLowerCase().includes('chest pain')
    );

    // Set urgency level
    if (hasHighSeverity || hasChestPain) {
      analysis.urgency = 'high';
      analysis.recommendations.push('Seek immediate medical attention');
    } else if (symptoms.some(s => s.severity >= 5)) {
      analysis.urgency = 'medium';
      analysis.recommendations.push('Consider consulting a healthcare provider soon');
    }

    // Add general advice based on symptoms
    analysis.generalAdvice = [
      'Keep track of your symptoms and any changes',
      'Stay hydrated and get adequate rest',
      'Avoid activities that worsen your symptoms'
    ];

    // Add specific recommendations based on body parts affected
    symptoms.forEach(symptom => {
      const bodyPart = symptom.bodyPart.toLowerCase();
      if (bodyPart.includes('head')) {
        analysis.recommendations.push(
          'For headaches: Rest in a quiet, dark room and consider over-the-counter pain relievers'
        );
      }
      if (bodyPart.includes('chest')) {
        analysis.recommendations.push(
          'For chest symptoms: Avoid strenuous activity and monitor breathing'
        );
      }
      // Add more specific recommendations for other body parts
    });

    return analysis;
  };

  const analysis = analyzeSymptoms(symptoms);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Symptom Analysis Results</h1>
        
        <div className="space-y-6">
          {/* Urgency Level */}
          <div className={`p-4 rounded-lg ${
            analysis.urgency === 'high' 
              ? 'bg-red-100 border-red-500' 
              : analysis.urgency === 'medium'
                ? 'bg-yellow-100 border-yellow-500'
                : 'bg-green-100 border-green-500'
          } border`}>
            <h2 className="text-lg font-semibold mb-2">
              Urgency Level: {analysis.urgency.toUpperCase()}
            </h2>
            <p className="text-gray-700">
              {analysis.recommendations[0]}
            </p>
          </div>

          {/* Symptoms Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Symptoms Summary</h2>
            <div className="space-y-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="font-medium text-lg text-green-700">{symptom.name}</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Location: {symptom.bodyPart}</p>
                      <p className="text-gray-600">Duration: {symptom.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        Severity: {symptom.severity}/10
                        <span className="ml-2">
                          {symptom.severity >= 8 ? '⚠️ Severe' : 
                           symptom.severity >= 5 ? '⚠️ Moderate' : 'Mild'}
                        </span>
                      </p>
                      {symptom.description && (
                        <p className="text-gray-600">Details: {symptom.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <ul className="list-disc list-inside space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">General Advice</h3>
            <ul className="list-disc list-inside space-y-2">
              {analysis.generalAdvice.map((advice, index) => (
                <li key={index} className="text-gray-700">{advice}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => navigate('/symptoms-checker')}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Check New Symptoms
            </button>
            
            <button 
              onClick={() => navigate('/doctors')}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
            >
              Find a Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results; 