from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    SECRET_KEY: str
    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MYSQL_HOST: str
    MYSQL_ROOT_PASSWORD: str
    MYSQL_DATABASE: str
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    FRONTEND_SUCCESS_URI: str
    FRONTEND_CANCEL_URI: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str
    GOOGLE_AUTH_ENDPOINT: str
    GOOGLE_TOKEN_ENDPOINT: str
    GOOGLE_USERINFO_ENDPOINT: str

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()