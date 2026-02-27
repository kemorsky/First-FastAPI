import stripe
from app.db.database import SessionLocal
from app.models.models import Plan
from app.utils.config import Settings

settings = Settings()
stripe.api_key = settings.STRIPE_SECRET_KEY

def sync_stripe_products():
    db = SessionLocal()
    products = stripe.Product.list(active=True)

    for product in products.data:
        prices = stripe.Price.list(product=product.id, active=True)
        if not prices.data:
            continue
        price = prices.data[0]  # take the first price
        # Check if plan already exists
        existing = db.query(Plan).filter(Plan.stripe_product_name == product.id).first()
        if existing:
            continue
        plan = Plan(
            name=product.name,
            description=product.description or "",
            price=price.unit_amount / 100,  # Stripe uses cents
            stripe_product_name=product.id,
            stripe_price_id=price.id
        )
        db.add(plan)

    db.commit()
    db.close()
    print("Stripe products synced!")

if __name__ == "__main__":
    sync_stripe_products()