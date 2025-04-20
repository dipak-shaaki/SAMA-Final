# HealthAssist Symptom Checker - Flask Backend

This is the Flask backend for the HealthAssist Symptom Checker application. It provides API endpoints for storing and analyzing symptom data.

## Features

- Store symptom data in SQLite database
- Analyze symptoms and return potential conditions
- Session-based symptom grouping

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

## API Endpoints

### POST /api/symptoms
Stores symptom data in the database.

Request body:
```json
{
  "symptoms": [
    {
      "name": "Headache",
      "bodyPart": "Head",
      "severity": 7,
      "duration": "3-6 days",
      "description": "Throbbing pain on the right side"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "message": "Symptoms recorded successfully",
  "session_id": "uuid-string"
}
```

### POST /api/analyze
Analyzes symptoms and returns potential conditions.

Request body:
```json
{
  "symptoms": [
    {
      "name": "Headache",
      "bodyPart": "Head",
      "severity": 7,
      "duration": "3-6 days",
      "description": "Throbbing pain on the right side"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "conditions": [
    {
      "name": "Tension headache",
      "probability": "High",
      "urgency": "Low",
      "description": "Common headache with mild to moderate pain...",
      "relatedSymptoms": ["Headache"]
    }
  ]
}
```

### GET /api/sessions/{session_id}
Retrieves a session and its associated symptoms.

Response:
```json
{
  "success": true,
  "session": {
    "id": "uuid-string",
    "createdAt": "2023-05-01T12:34:56.789Z",
    "symptoms": [
      {
        "id": "uuid-string",
        "name": "Headache",
        "bodyPart": "Head",
        "severity": 7,
        "duration": "3-6 days",
        "description": "Throbbing pain on the right side",
        "createdAt": "2023-05-01T12:34:56.789Z"
      }
    ]
  }
}
```

## Database Schema

### symptoms
- id: TEXT (UUID)
- session_id: TEXT (UUID)
- name: TEXT
- body_part: TEXT
- severity: INTEGER
- duration: TEXT
- description: TEXT
- created_at: TEXT (ISO datetime)

### sessions
- id: TEXT (UUID)
- created_at: TEXT (ISO datetime)