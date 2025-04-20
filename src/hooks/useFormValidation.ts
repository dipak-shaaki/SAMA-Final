import { useState, useCallback } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  match?: string;
}

interface Validations {
  [key: string]: ValidationRules;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (initialState: any, validations: Validations) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: any) => {
    const validation = validations[name];
    let error = '';

    if (validation?.required && !value) {
      error = 'This field is required';
    } else if (validation?.minLength && value.length < validation.minLength) {
      error = `Minimum length is ${validation.minLength} characters`;
    } else if (validation?.maxLength && value.length > validation.maxLength) {
      error = `Maximum length is ${validation.maxLength} characters`;
    } else if (validation?.pattern && !validation.pattern.test(value)) {
      error = 'Invalid format';
    } else if (validation?.match && values[validation.match] !== value) {
      error = 'Passwords do not match';
    }

    return error;
  }, [validations, values]);

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (callback: (values: any) => Promise<void>) => {
    setIsSubmitting(true);
    const newErrors: FormErrors = {};
    
    // Validate all fields
    Object.keys(validations).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await callback(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}; 