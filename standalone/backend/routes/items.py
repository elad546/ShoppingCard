from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import FreshMarketItem, OsherAdItem, ShufersalItem

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dictionary to map source names to SQLAlchemy models
TABLE_MAP = {
    "fresh_market": FreshMarketItem,
    "osher_ad": OsherAdItem,
    "shufersal": ShufersalItem,
}

@router.get("/items", response_model=list[dict])
def get_items(db: Session = Depends(get_db)):
    return db.query(FreshMarketItem).all()

# ✅ Get an item by barcode (instead of id)
@router.get("/items/{source}/{barcode}")
def get_item_by_barcode(source: str, barcode: str, db: Session = Depends(get_db)):
    if source not in TABLE_MAP:
        raise HTTPException(status_code=400, detail="Invalid source name")
    model = TABLE_MAP[source]  # Get the corresponding table model
    item = db.query(FreshMarketItem).filter(FreshMarketItem.barcode == barcode).first()
    if item is None:
        return {"error": "Item not found"}
    return item



@router.get("/items/{source}")
def get_items(source: str, db: Session = Depends(get_db)):
    """Fetch items from a specific table."""
    if source not in TABLE_MAP:
        raise HTTPException(status_code=400, detail="Invalid source name")
    
    model = TABLE_MAP[source]  # Get the corresponding table model
    items = db.query(model).all()
    return items