# Meeting Accountability Tracker

A premium web application designed to track and ensure accountability for meeting action items, tasks, and follow-ups.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python 3.10+)
- **Database**: PostgreSQL (via Supabase)

---

## Project Structure

```
meeting-tracker/
├── backend/                  # FastAPI Backend
│   ├── app/
│   │   ├── models/           # SQLAlchemy models
│   │   ├── routers/          # API endpoints / controllers
│   │   ├── schemas/          # Pydantic schemas (request/response validation)
│   │   └── services/         # Business logic and database actions
│   ├── main.py               # Backend API entry point
│   └── requirements.txt      # Python package dependencies
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/              # Next.js pages and layouts
│   │   └── components/       # Reusable React components
│   ├── package.json          # Node package dependencies
│   ├── tailwind.config.ts    # Tailwind CSS configuration
│   └── tsconfig.json         # TypeScript configuration
└── README.md                 # Project documentation (this file)
```

---

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- Python (v3.10 or higher)
- Supabase account (PostgreSQL database)

---

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the development server**:
   ```bash
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://127.0.0.1:8000`. You can view the interactive documentation at `http://127.0.0.1:8000/docs`.

---

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The frontend application will be available at `http://localhost:3000`.

---

## Database Configuration (Supabase)

To connect the application to your Supabase PostgreSQL instance:
1. Create a `.env` file in the `backend/` directory with your database connection details (refer to your Supabase project settings).
2. Configure `.env.local` in the `frontend/` directory if you plan on using Supabase authentication or the client SDK directly on the frontend.
