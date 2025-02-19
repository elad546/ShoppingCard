from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import items

app = FastAPI()

app.include_router(items.router)

# Allow frontend origin (adjust as needed)
origins = [
    "http://localhost:3000",  # React frontend
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Can also use ["*"] to allow all (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)