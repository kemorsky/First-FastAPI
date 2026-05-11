from fastapi import Request
import jwt
from app.utils.config import settings

async def user_identifier(request: Request):
    token = request.cookies.get("access_token")

    if not token:
        return f"anon:{request.client.host}"

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        return f"user:{payload.get('sub')}"
    except Exception:
        return f"invalid:{request.client.host}"