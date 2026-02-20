from google.oauth2 import id_token
from google.auth.transport import requests

def verify_google_token(token: str):
    idinfo = id_token.verify_oauth2_token(
        token,
        requests.Request(),
        YOUR_GOOGLE_CLIENT_ID
    )

    return idinfo
