import React from 'react';

const BodyMap = ({ onSelectBodyPart }) => {
  const bodyParts = [
    { id: 'head', name: 'Head & Face', area: 'M 50,10 C 60,10 70,20 70,30 L 70,45 C 70,55 60,65 50,65 C 40,65 30,55 30,45 L 30,30 C 30,20 40,10 50,10' },
    { id: 'chest', name: 'Chest', area: 'M 30,65 L 70,65 L 70,100 L 30,100 Z' },
    { id: 'abdomen', name: 'Abdomen', area: 'M 30,100 L 70,100 L 70,130 L 30,130 Z' },
    { id: 'leftArm', name: 'Left Arm', area: 'M 30,65 L 15,65 L 10,130 L 20,130 L 30,100' },
    { id: 'rightArm', name: 'Right Arm', area: 'M 70,65 L 85,65 L 90,130 L 80,130 L 70,100' },
    { id: 'leftLeg', name: 'Left Leg', area: 'M 30,130 L 40,130 L 35,190 L 25,190 Z' },
    { id: 'rightLeg', name: 'Right Leg', area: 'M 60,130 L 70,130 L 75,190 L 65,190 Z' },
    { id: 'back', name: 'Back & Spine', area: 'M 40,65 L 60,65 L 60,130 L 40,130 Z' }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px]">
      <svg
        viewBox="0 0 100 200"
        className="w-full h-full"
      >
        {/* Base figure - non-interactive */}
        <path
          d="M 50,10 C 60,10 70,20 70,30 L 70,45 C 70,55 60,65 50,65 C 40,65 30,55 30,45 L 30,30 C 30,20 40,10 50,10"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <path
          d="M 30,65 L 70,65 L 70,100 L 30,100 Z"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <path
          d="M 30,100 L 70,100 L 70,130 L 30,130 Z"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <path
          d="M 30,65 L 15,65 L 10,130 L 20,130 L 30,100"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <path
          d="M 70,65 L 85,65 L 90,130 L 80,130 L 70,100"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <path
          d="M 30,130 L 40,130 L 35,190 L 25,190 Z"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="1"
        />
        <path
          d="M 60,130 L 70,130 L 75,190 L 65,190 Z"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="1"
        />

        {/* Interactive areas */}
        {bodyParts.map((part) => (
          <path
            key={part.id}
            d={part.area}
            fill="transparent"
            className="cursor-pointer hover:fill-green-200 hover:opacity-50 transition-all"
            onClick={() => onSelectBodyPart(part.name)}
          />
        ))}
      </svg>

      {/* Labels */}
      <div className="absolute inset-0">
        {bodyParts.map((part) => (
          <button
            key={part.id}
            onClick={() => onSelectBodyPart(part.name)}
            className="absolute px-2 py-1 bg-white rounded-md shadow-sm hover:bg-green-50 text-sm"
            style={getPositionStyle(part.id)}
          >
            {part.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to position labels
function getPositionStyle(partId: string) {
  const positions = {
    head: { top: '5%', left: '50%', transform: 'translateX(-50%)' },
    chest: { top: '25%', left: '50%', transform: 'translateX(-50%)' },
    abdomen: { top: '45%', left: '50%', transform: 'translateX(-50%)' },
    leftArm: { top: '35%', left: '10%' },
    rightArm: { top: '35%', right: '10%' },
    leftLeg: { bottom: '15%', left: '25%' },
    rightLeg: { bottom: '15%', right: '25%' },
    back: { top: '35%', left: '50%', transform: 'translateX(-50%)' }
  };
  return positions[partId] || {};
}

export default BodyMap; 