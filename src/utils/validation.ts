export const validateDate = (date: string): string | null => {
  if (!date) return 'Date is required';
  
  const selectedDate = new Date(date);
  const today = new Date();
  
  if (selectedDate > today) {
    return 'Date cannot be in the future';
  }
  
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateDosage = (dosage: string): string | null => {
  if (!dosage.trim()) {
    return 'Dosage is required';
  }
  
  // Basic dosage format validation (e.g., "500mg", "1 tablet", "2 times daily")
  const dosageRegex = /^[\d\s]+(mg|ml|tablet|capsule|times|daily|week|month|hour|day)?$/i;
  if (!dosageRegex.test(dosage)) {
    return 'Please enter a valid dosage format (e.g., 500mg, 1 tablet, 2 times daily)';
  }
  
  return null;
};

export const validateHospitalName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Hospital name is required';
  }
  
  // Basic validation for hospital name (should contain at least 2 words)
  const words = name.trim().split(/\s+/);
  if (words.length < 2) {
    return 'Please enter the full hospital name';
  }
  
  return null;
};

export const validateReason = (reason: string): string | null => {
  if (!reason.trim()) {
    return 'Reason for visit is required';
  }
  
  if (reason.length < 10) {
    return 'Please provide a more detailed reason for the visit';
  }
  
  return null;
}; 