from .database import Base
from sqlalchemy import Column, Integer, String

# class ShoppingItem(Base):
#     __tablename__ = "fresh_market"

#     barcode = Column(Integer, primary_key=True, unique=True, index=True)
#     name = Column(String(255))
#     # category = Column(String(255))
#     # image_url = Column(String(255))


# class FreshMarketItem(Base):
#     __tablename__ = "fresh_market"  # Your table name

#     barcode = Column(String, primary_key=True, unique=True, index=True)
#     name = Column(String, nullable=False)
    # category = Column(String, nullable=False)
    # image = Column(String, nullable=True)
    # price = Column(Float, nullable=True)  # Optional price column

class BaseItem(Base):
    __abstract__ = True  # This makes sure SQLAlchemy doesn't create a table for this class
    barcode = Column(String, primary_key=True, unique=True, index=True)
    name = Column(String, nullable=False)

class FreshMarketItem(BaseItem):
    __tablename__ = "fresh_market"

class OsherAdItem(BaseItem):
    __tablename__ = "osher_ad"

class ShufersalItem(BaseItem):
    __tablename__ = "shufersal"