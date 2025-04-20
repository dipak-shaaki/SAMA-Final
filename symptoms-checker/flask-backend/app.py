from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize database
def init_db():
    conn = sqlite3.connect('symptoms.db')
    cursor = conn.cursor()
    
    # Create symptoms table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS symptoms (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        name TEXT NOT NULL,
        body_part TEXT NOT NULL,
        severity INTEGER NOT NULL,
        duration TEXT NOT NULL,
        description TEXT,
        created_at TEXT NOT NULL
    )
    ''')
    
    # Create sessions table to group symptoms
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL
    )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/api/symptoms', methods=['POST'])
def submit_symptoms():
    try:
        data = request.json
        symptoms = data.get('symptoms', [])
        
        if not symptoms:
            return jsonify({'error': 'No symptoms provided'}), 400
        
        # Create a new session
        session_id = str(uuid.uuid4())
        now = datetime.now().isoformat()
        
        conn = sqlite3.connect('symptoms.db')
        cursor = conn.cursor()
        
        # Insert session
        cursor.execute(
            'INSERT INTO sessions (id, created_at) VALUES (?, ?)',
            (session_id, now)
        )
        
        # Insert symptoms
        for symptom in symptoms:
            symptom_id = str(uuid.uuid4())
            cursor.execute(
                '''INSERT INTO symptoms 
                   (id, session_id, name, body_part, severity, duration, description, created_at) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                (
                    symptom_id,
                    session_id,
                    symptom['name'],
                    symptom['bodyPart'],
                    symptom['severity'],
                    symptom['duration'],
                    symptom.get('description', ''),
                    now
                )
            )
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Symptoms recorded successfully',
            'session_id': session_id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_symptoms():
    try:
        data = request.json
        symptoms = data.get('symptoms', [])
        
        if not symptoms:
            return jsonify({'error': 'No symptoms provided'}), 400
        
        # This is where you would implement your symptom analysis logic
        # For now, we'll return mock data based on the symptoms
        
        # Mock conditions database - in a real app, this would be more sophisticated
        conditions_db = {
            "Headache": [
                {"name": "Tension headache", "probability": "High", "urgency": "Low", 
                 "description": "Common headache with mild to moderate pain, often described as feeling like a tight band around the head."},
                {"name": "Migraine", "probability": "Medium", "urgency": "Medium", 
                 "description": "Intense throbbing pain, usually on one side of the head, often accompanied by nausea, vomiting, and sensitivity to light and sound."},
                {"name": "Cluster headache", "probability": "Low", "urgency": "Medium", 
                 "description": "Extremely painful headaches occurring in clusters, usually around one eye or temple."}
            ],
            "Chest pain": [
                {"name": "Muscle strain", "probability": "Medium", "urgency": "Low", 
                 "description": "Pain caused by strained muscles in the chest wall, often worsened by movement or breathing deeply."},
                {"name": "Acid reflux", "probability": "Medium", "urgency": "Low", 
                 "description": "Burning sensation in the chest caused by stomach acid flowing back into the esophagus."},
                {"name": "Angina", "probability": "Low", "urgency": "High", 
                 "description": "Chest pain caused by reduced blood flow to the heart, often described as pressure or squeezing."}
            ],
            "Abdominal pain": [
                {"name": "Indigestion", "probability": "High", "urgency": "Low", 
                 "description": "Discomfort or burning feeling in the upper abdomen, often after eating."},
                {"name": "Irritable bowel syndrome", "probability": "Medium", "urgency": "Low", 
                 "description": "Chronic disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, diarrhea or constipation."},
                {"name": "Appendicitis", "probability": "Low", "urgency": "High", 
                 "description": "Inflammation of the appendix causing pain that begins around the navel and shifts to the lower right abdomen."}
            ]
        }
        
        # Find potential conditions based on symptoms
        results = []
        for symptom in symptoms:
            symptom_name = symptom['name']
            if symptom_name in conditions_db:
                for condition in conditions_db[symptom_name]:
                    # Check if condition is already in results
                    existing = next((c for c in results if c['name'] == condition['name']), None)
                    if existing:
                        if symptom_name not in existing['relatedSymptoms']:
                            existing['relatedSymptoms'].append(symptom_name)
                    else:
                        condition_copy = condition.copy()
                        condition_copy['relatedSymptoms'] = [symptom_name]
                        results.append(condition_copy)
        
        # Sort by urgency
        urgency_order = {"High": 0, "Medium": 1, "Low": 2}
        results.sort(key=lambda x: urgency_order[x['urgency']])
        
        return jsonify({
            'success': True,
            'conditions': results
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sessions/<session_id>', methods=['GET'])
def get_session(session_id):
    try:
        conn = sqlite3.connect('symptoms.db')
        conn.row_factory = sqlite3.Row  # This enables column access by name
        cursor = conn.cursor()
        
        # Get session
        cursor.execute('SELECT * FROM sessions WHERE id = ?', (session_id,))
        session = cursor.fetchone()
        
        if not session:
            return jsonify({'error': 'Session not found'}), 404
        
        # Get symptoms for this session
        cursor.execute('SELECT * FROM symptoms WHERE session_id = ?', (session_id,))
        symptoms = cursor.fetchall()
        
        # Convert to list of dicts
        symptoms_list = []
        for symptom in symptoms:
            symptoms_list.append({
                'id': symptom['id'],
                'name': symptom['name'],
                'bodyPart': symptom['body_part'],
                'severity': symptom['severity'],
                'duration': symptom['duration'],
                'description': symptom['description'],
                'createdAt': symptom['created_at']
            })
        
        conn.close()
        
        return jsonify({
            'success': True,
            'session': {
                'id': session['id'],
                'createdAt': session['created_at'],
                'symptoms': symptoms_list
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)