import axios from 'axios';
import { Symptom } from '../pages/SymptomChecker';

// This file will be used to connect to your Flask backend
// Replace the BASE_URL with your actual Flask API URL when it's ready
const BASE_URL = 'http://localhost:5000/api';

// Create an axios instance for the API
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to submit symptoms to the backend
export const submitSymptoms = async (symptoms: Symptom[]) => {
  try {
    const response = await api.post('/symptoms', { symptoms });
    return response.data;
  } catch (error) {
    console.error('Error submitting symptoms:', error);
    throw error;
  }
};

// Function to get potential conditions based on symptoms
export const getPotentialConditions = async (symptoms: Symptom[]) => {
  try {
    const response = await api.post('/analyze', { symptoms });
    return response.data;
  } catch (error) {
    console.error('Error getting potential conditions:', error);
    throw error;
  }
};

export default api;