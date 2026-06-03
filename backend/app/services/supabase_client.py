import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# Resolve backend root path
backend_dir = Path(__file__).resolve().parent.parent.parent
env_path = backend_dir / ".env"

# Load backend/.env if it exists
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    # Fallback to system environment loading
    load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SECRET_KEY")

if not supabase_url or not supabase_key:
    raise ValueError(
        f"SUPABASE_URL and SUPABASE_SECRET_KEY environment variables must be set. "
        f"Attempted to load from: {env_path}"
    )

# Instantiate the Supabase Client
supabase: Client = create_client(supabase_url, supabase_key)
