import React, { useState } from 'react';

interface DoctorImageProps {
  src: string;
  alt: string;
  className?: string;
}

const DoctorImage = ({ src, alt, className = '' }: DoctorImageProps) => {
  const [error, setError] = useState(false);

  const defaultImage = '/doctors/default-doctor.png';

  return (
    <img
      src={error ? defaultImage : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default DoctorImage; 