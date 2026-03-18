from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_user(client, test_user):
    response = client.get("/api/users/me")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_user.id
    assert data["email"] == test_user.email