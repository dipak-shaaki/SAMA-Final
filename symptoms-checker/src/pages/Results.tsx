import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Printer } from 'lucide-react';
import { Symptom } from './SymptomChecker';

// Mock data for potential conditions
// In a real app, this would come from your Flask backend
const mockConditions = {
  "Headache": [
    { name: "Tension headache", probability: "High", urgency: "Low", description: "Common headache with mild to moderate pain, often described as feeling like a tight band around the head." },
    { name: "Migraine", probability: "Medium", urgency: "Medium", description: "Intense throbbing pain, usually on one side of the head, often accompanied by nausea, vomiting, and sensitivity to light and sound." },
    { name: "Cluster headache", probability: "Low", urgency: "Medium", description: "Extremely painful headaches occurring in clusters, usually around one eye or temple." }
  ],
  "Chest pain": [
    { name: "Muscle strain", probability: "Medium", urgency: "Low", description: "Pain caused by strained muscles in the chest wall, often worsened by movement or breathing deeply." },
    { name: "Acid reflux", probability: "Medium", urgency: "Low", description: "Burning sensation in the chest caused by stomach acid flowing back into the esophagus." },
    { name: "Angina", probability: "Low", urgency: "High", description: "Chest pain caused by reduced blood flow to the heart, often described as pressure or squeezing." }
  ],
  "Abdominal pain": [
    { name: "Indigestion", probability: "High", urgency: "Low", description: "Discomfort or burning feeling in the upper abdomen, often after eating." },
    { name: "Irritable bowel syndrome", probability: "Medium", urgency: "Low", description: "Chronic disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, diarrhea or constipation." },
    { name: "Appendicitis", probability: "Low", urgency: "High", description: "Inflammation of the appendix causing pain that begins around the navel and shifts to the lower right abdomen." }
  ],
  "Pain": [
    { name: "Muscle strain", probability: "High", urgency: "Low", description: "Pain resulting from overuse or injury to muscles or tendons." },
    { name: "Arthritis", probability: "Medium", urgency: "Medium", description: "Inflammation of one or more joints, causing pain and stiffness that typically worsen with age." },
    { name: "Fracture", probability: "Low", urgency: "High", description: "A break in a bone that can cause severe pain, swelling, and bruising." }
  ],
  "Dizziness": [
    { name: "Vertigo", probability: "Medium", urgency: "Medium", description: "A sensation of spinning or whirling, making you feel as if you or your surroundings are moving when they're not." },
    { name: "Low blood pressure", probability: "Medium", urgency: "Low", description: "Blood pressure that's lower than normal, causing dizziness, especially when standing up quickly." },
    { name: "Inner ear infection", probability: "Medium", urgency: "Medium", description: "Infection of the inner ear that can affect balance and cause dizziness." }
  ]
};

const Results = () => {
  const location = useLocation();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [conditions, setConditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch results from your Flask backend
    if (location.state?.symptoms) {
      setSymptoms(location.state.symptoms);
      
      // Simulate API call to backend
      setTimeout(() => {
        const results: any[] = [];
        
        location.state.symptoms.forEach((symptom: Symptom) => {
          const symptomConditions = mockConditions[symptom.name as keyof typeof mockConditions];
          if (symptomConditions) {
            symptomConditions.forEach(condition => {
              if (!results.some(r => r.name === condition.name)) {
                results.push({
                  ...condition,
                  relatedSymptoms: [symptom.name]
                });
              } else {
                const existingCondition = results.find(r => r.name === condition.name);
                existingCondition.relatedSymptoms.push(symptom.name);
              }
            });
          }
        });
        
        // Sort by urgency
        results.sort((a, b) => {
          const urgencyOrder = { "High": 0, "Medium": 1, "Low": 2 };
          return urgencyOrder[a.urgency as keyof typeof urgencyOrder] - urgencyOrder[b.urgency as keyof typeof urgencyOrder];
        });
        
        setConditions(results);
        setLoading(false);
      }, 1500);
    } else {
      // No symptoms provided, redirect to symptom checker
      setLoading(false);
    }
  }, [location.state]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your symptoms...</p>
        </div>
      </div>
    );
  }

  if (symptoms.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-4">No Symptoms Provided</h1>
          <p className="text-gray-600 mb-6">
            Please use our symptom checker to input your symptoms for analysis.
          </p>
          <Link
            to="/symptom-checker"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go to Symptom Checker
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/symptom-checker" className="flex items-center text-green-600 hover:text-green-800">
            <ArrowLeft size={16} className="mr-1" /> Back to Symptom Checker
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <Printer size={16} className="mr-1" /> Print Results
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h1 className="text-2xl font-bold mb-6">Your Results</h1>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Important:</strong> This information is not a diagnosis. The results are based on your reported symptoms and are for informational purposes only. Please consult with a healthcare professional for proper medical advice.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Symptoms Reported</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-1">
                      {symptom.bodyPart}
                    </span>
                    <div>
                      <p className="font-medium">{symptom.name}</p>
                      <p className="text-sm text-gray-600">
                        Severity: {symptom.severity}/10 • Duration: {symptom.duration}
                      </p>
                      {symptom.description && (
                        <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3">Potential Conditions</h2>
            
            {conditions.length > 0 ? (
              <div className="space-y-4">
                {conditions.map((condition, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className={`p-4 ${
                      condition.urgency === 'High' 
                        ? 'bg-red-50 border-b border-red-100' 
                        : condition.urgency === 'Medium'
                          ? 'bg-yellow-50 border-b border-yellow-100'
                          : 'bg-green-50 border-b border-green-100'
                    }`}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{condition.name}</h3>
                        <div className="flex items-center">
                          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 ${
                            condition.urgency === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : condition.urgency === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {condition.urgency} Urgency
                          </span>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                            {condition.probability} Probability
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-gray-700 mb-3">{condition.description}</p>
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Related to your symptoms:</strong> {condition.relatedSymptoms.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No specific conditions could be determined based on the symptoms provided.
              </p>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-3">What to Do Next</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-1">1</span>
                <p>If you have any high urgency conditions, consider seeking medical attention promptly.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-1">2</span>
                <p>For medium urgency conditions, monitor your symptoms and consult with a healthcare provider if they persist or worsen.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-1">3</span>
                <p>For low urgency conditions, self-care measures may be appropriate, but consult a healthcare provider if you're concerned.</p>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-1">4</span>
                <p>Remember that this tool is not a substitute for professional medical advice, diagnosis, or treatment.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;