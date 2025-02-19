from .database import Base
from sqlalchemy import Column, String, BigInteger, Boolean

class BaseItem(Base):
    __abstract__ = True  # This makes sure SQLAlchemy doesn't create a table for this class
    barcode = Column(BigInteger, primary_key=True, unique=True, index=True)
    name = Column(String, nullable=False)
    is_used = Column(Boolean, nullable=False)

class FreshMarketItem(BaseItem):
    __tablename__ = "fresh_market"

class OsherAdItem(BaseItem):
    __tablename__ = "osher_ad"

class ShufersalItem(BaseItem):
    __tablename__ = "shufersal"