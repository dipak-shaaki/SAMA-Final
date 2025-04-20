import React, { useState } from 'react';

type BodyPartProps = {
  id: string;
  name: string;
  path: string;
  onSelect: (name: string) => void;
  isSelected: boolean;
};

const BodyPart: React.FC<BodyPartProps> = ({ id, name, path, onSelect, isSelected }) => {
  return (
    <path
      id={id}
      d={path}
      fill={isSelected ? "#4ade80" : "#e5e7eb"}
      stroke="#4b5563"
      strokeWidth="1"
      onClick={() => onSelect(name)}
      className="cursor-pointer hover:fill-green-300 transition-colors"
    />
  );
};

type BodyMapProps = {
  onSelectBodyPart: (bodyPart: string) => void;
};

const BodyMap: React.FC<BodyMapProps> = ({ onSelectBodyPart }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handleSelect = (name: string) => {
    setSelectedPart(name);
    onSelectBodyPart(name);
  };

  // Updated body map with centered head
  const bodyParts = [
    { id: "head", name: "Head", path: "M 150,50 A 30,30 0 1 1 150,49.9 Z" },
    { id: "chest", name: "Chest", path: "M 120,100 L 180,100 L 180,160 L 120,160 Z" },
    { id: "abdomen", name: "Abdomen", path: "M 120,160 L 180,160 L 180,220 L 120,220 Z" },
    { id: "left-arm", name: "Left Arm", path: "M 120,100 L 100,100 L 70,180 L 90,190 L 120,160 Z" },
    { id: "right-arm", name: "Right Arm", path: "M 180,100 L 200,100 L 230,180 L 210,190 L 180,160 Z" },
    { id: "left-leg", name: "Left Leg", path: "M 120,220 L 140,220 L 130,320 L 110,320 Z" },
    { id: "right-leg", name: "Right Leg", path: "M 160,220 L 180,220 L 190,320 L 170,320 Z" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <p className="text-gray-600">Click on a body part to select it</p>
        {selectedPart && (
          <p className="mt-2 font-medium text-green-600">Selected: {selectedPart}</p>
        )}
      </div>
      
      <svg width="300" height="400" viewBox="0 0 300 400">
        {bodyParts.map((part) => (
          <BodyPart
            key={part.id}
            id={part.id}
            name={part.name}
            path={part.path}
            onSelect={handleSelect}
            isSelected={selectedPart === part.name}
          />
        ))}
      </svg>
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
        {bodyParts.map((part) => (
          <button
            key={part.id}
            onClick={() => handleSelect(part.name)}
            className={`py-2 px-4 rounded-md border ${
              selectedPart === part.name
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {part.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BodyMap;