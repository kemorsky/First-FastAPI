from fastapi.testclient import TestClient
from main import app
from app.models.models import UserSubscription, Plan
from datetime import datetime, timezone

client = TestClient(app)

def create_subscription(db_session, user):
    plan = Plan(id=1, price=1000, name="Test Plan", description="test", stripe_product_name="prod_123", stripe_price_id="price_123")

    db_session.add(plan)
    db_session.commit()

    subscription = UserSubscription(
        id=1,
        user_id=user.id,
        plan_id=plan.id,
        stripe_subscription_id="sub_123",
        status="active",
        cancel_at_period_end=False,
        current_period_start=datetime.now(timezone.utc), # TODO - change as this is not optimal
        current_period_end=datetime.now(timezone.utc)
    )

    db_session.add(subscription)
    db_session.commit()

    return subscription

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

def test_get_user_subscription(client, db_session, test_user):
    create_subscription(db_session, test_user)

    response = client.get("/api/payments/get-user-subscription")
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == test_user.id
    assert data["plan_id"] == 1
    assert data["status"] == "active"

def test_cancel_user_subscription(client, db_session, test_user, monkeypatch):
    create_subscription(db_session, test_user)

    def mock_modify(*args, **kwargs): # mock Stripe requests as to not use the actual API
        return {"id": "sub_123", "status": "active"}

    monkeypatch.setattr("stripe.Subscription.modify", mock_modify) # apply the mock modifier to the Stripe API

    response = client.post("/api/payments/cancel-subscription")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"
    assert data["cancel_at_period_end"] == True