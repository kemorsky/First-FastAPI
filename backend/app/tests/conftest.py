import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from datetime import datetime, timezone
from app.db.database import Base, get_db
from app.models.models import User
from app.core.security import get_current_user

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

@pytest.fixture(scope="function", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session():
    connection = engine.connect()
    transaction = connection.begin()

    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture
def test_user(db_session):
    user = User(
        id=1, 
        email="test@gmail.com", 
        oauth_provider="google", 
        oauth_id="test", 
        stripe_customer_id="test", 
        full_name="Testy Tester", 
        picture="test-picture", 
        disabled=False, 
        created_at=datetime.now(timezone.utc) )
    db_session.add(user)
    db_session.commit()
    return user

def test_request():
    return {"id": "sub_123", "status": "active"}

def test_stripe_signature():
    return "test_signature" # Needs to be a Header (stripe_signature: str = Header(None))

def test_stripe_event_data():
    return {"id": "sub_123", "status": "active"} # for subscription = event["data"]["object"]

@pytest.fixture(scope="function")
def client(db_session, test_user): # always add new values that may come up to the fixture
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    def override_get_current_user():
        return test_user

    # This section overrides dependencies in prod so any new value needed to be overridden should be placed here
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user
    
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()