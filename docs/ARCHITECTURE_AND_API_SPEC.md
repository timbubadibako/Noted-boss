# 🏗️ System Architecture, ERD & API Specification — NotulaAI

## 📐 High-Level Architecture (HLD)

```text
[ Browser / Web Client ]
       │  (Web Audio Stream / File Upload)
       ▼
[ Next.js Frontend ] ── API Gateway / Proxy
                            │
                            ▼
                  [ Python FastAPI Backend ]
                   ┌────────┴───────────────────────────┐
                   │                                    │
        [ Deepgram / Whisper API ]             [ LLM Extraction Engine ]
        (Diarization & Audio Transcript)        (Gemini 2.0 / GPT-4o JSON Schema)
                   │                                    │
                   └────────┬───────────────────────────┘
                            │
                            ▼
                 [ Voice Embedding Engine ]
                 (Pyannote / ResNet Audio)
                            │
                            ▼
          [ PostgreSQL + pgvector Database ]
          - Users & Voice Profiles
          - Meetings, Transcripts & Action Items
```

---

## 🗄️ Database Schema & ERD (Low-Level Design)

### 1. `users`
- `id`: UUID (PK)
- `email`: VARCHAR(255) (UNIQUE)
- `name`: VARCHAR(255)
- `created_at`: TIMESTAMP

### 2. `voice_profiles` (Memori Profil Suara)
- `id`: UUID (PK)
- `user_id`: UUID (FK -> users.id)
- `speaker_name`: VARCHAR(255)
- `voice_embedding`: VECTOR(512) — *Struktur vector embedding untuk voice matching*
- `sample_audio_url`: TEXT
- `total_meetings_matched`: INT (DEFAULT 0)
- `created_at`: TIMESTAMP

### 3. `meetings`
- `id`: UUID (PK)
- `title`: VARCHAR(255)
- `status`: ENUM ('recording', 'processing', 'completed', 'failed')
- `audio_url`: TEXT
- `duration_seconds`: INT
- `executive_summary`: TEXT
- `created_at`: TIMESTAMP

### 4. `transcripts` (Utterances / Per Pembicara)
- `id`: UUID (PK)
- `meeting_id`: UUID (FK -> meetings.id)
- `speaker_id`: UUID (FK -> voice_profiles.id, Nullable)
- `speaker_label`: VARCHAR(100) — *misal: "Person 1" atau "Budi Santoso"*
- `start_time`: FLOAT (seconds)
- `end_time`: FLOAT (seconds)
- `text`: TEXT
- `confidence`: FLOAT

### 5. `action_items` (Tabel Task Otomatis)
- `id`: UUID (PK)
- `meeting_id`: UUID (FK -> meetings.id)
- `task`: TEXT
- `assignee_name`: VARCHAR(255)
- `deadline`: VARCHAR(100)
- `priority`: ENUM ('low', 'medium', 'high')
- `is_completed`: BOOLEAN (DEFAULT false)

---

## 🔌 API Documentation Specification (OpenAPI / REST)

### 1. Audio Recording & Ingestion
- `POST /api/v1/meetings/start`
  - **Request:** `{ "title": "Sprint Planning" }`
  - **Response:** `{ "meeting_id": "uuid", "status": "recording" }`

- `POST /api/v1/meetings/{id}/upload-audio`
  - **Request:** `multipart/form-data` (file: `audio.webm` / `audio.mp3`)
  - **Response:** `{ "status": "processing", "message": "Diarization & Summary scheduled" }`

### 2. Notulensi & Action Items
- `GET /api/v1/meetings/{id}/summary`
  - **Response:**
  ```json
  {
    "id": "meeting-123",
    "title": "Sprint Planning",
    "executive_summary": "Rapat membahas rilis payment gateway...",
    "action_items": [
      {
        "id": "task-1",
        "task": "Staging deployment backend",
        "assignee_name": "Siti Rahma",
        "deadline": "Besok 17:00",
        "priority": "high",
        "is_completed": false
      }
    ]
  }
  ```

### 3. Speaker Management & Voice Memory
- `PATCH /api/v1/meetings/{id}/speakers`
  - **Request:** `{ "speaker_label": "Person 2", "new_name": "Siti Rahma", "save_voice_profile": true }`
  - **Response:** `{ "success": true, "voice_profile_id": "profile-789" }`

- `GET /api/v1/voice-profiles`
  - **Response:** List daftar profil suara tersimpan di database.

---
