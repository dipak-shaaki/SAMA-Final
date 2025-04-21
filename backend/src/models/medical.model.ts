import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conditions: [{
    condition: String,
    diagnosedDate: Date,
    status: {
      type: String,
      enum: ['Ongoing', 'Recovered', 'Managed'],
      default: 'Ongoing'
    },
    notes: String
  }],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    prescribed: {
      type: Boolean,
      default: true
    }
  }],
  hospitalVisits: [{
    hospital: String,
    doctor: String,
    date: Date,
    purpose: String,
    diagnosis: String,
    followUp: Date
  }]
}, {
  timestamps: true
});

export default mongoose.model('MedicalRecord', medicalRecordSchema); 