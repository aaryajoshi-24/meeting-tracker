from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Meeting Accountability Tracker API",
    description="Backend API for tracking meeting accountability, action items, and participants.",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Meeting Accountability Tracker API",
        "docs_url": "/docs",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }
