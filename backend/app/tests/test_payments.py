from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_plans():
    response = client.get("/api/payments/get-plans")
    assert response.status_code == 200
    assert response.json() == [
        {
            "name": "Yearly",
            "description": "Yearly subscription to AutoDoccie Software.",
            "price": 999,
            "id": 1,
            "stripe_product_name": "prod_U3U5h3Oqp89xGw",
            "stripe_price_id": "price_1T5N7A9fnTIBtSehClFqfjZd"
        },
        {
            "name": "Quarterly",
            "description": "Quarterly subscription to AutoDoccie Software.",
            "price": 249,
            "id": 2,
            "stripe_product_name": "prod_U3U4fkU5SblD6y",
            "stripe_price_id": "price_1T5N6a9fnTIBtSeh3GOizcON"
        },
        {
            "name": "Monthly",
            "description": "Monthly subscription to AutoDoccie Software.",
            "price": 89,
            "id": 3,
            "stripe_product_name": "prod_U3U48tcMT7o5zG",
            "stripe_price_id": "price_1T5N639fnTIBtSehhGvG38N7"
        }
    ]