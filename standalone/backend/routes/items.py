from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc
from ..database import SessionLocal
from ..models import FreshMarketItem, OsherAdItem, ShufersalItem

router = APIRouter(prefix="/api/shopping_list", tags=["shopping_list"])

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

@router.get("/filtered/{store}")
def get_items(store: str, skip: int = 0, limit: int = 50, search: str = None):
    db: Session = SessionLocal()
    try:
        if store not in TABLE_MAP:
            raise HTTPException(status_code=404, detail="Store not found")
        query = db.query(TABLE_MAP[store])

        # Filter by search if provided
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    TABLE_MAP[store].name.ilike(search_pattern),
                    TABLE_MAP[store].barcode.ilike(search_pattern)
                )
            )

        # Order by is_used first and limit results
        items = query.order_by(desc(TABLE_MAP[store].is_used)).offset(skip).limit(limit).all()
        return items
    finally:
        db.close()