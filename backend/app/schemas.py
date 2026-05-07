from pydantic import BaseModel


class PredictRequest(BaseModel):
    image: str  # base64 PNG (raw or data-URI)


class Prediction(BaseModel):
    digit: int
    confidence: float


class PredictResponse(BaseModel):
    not_drawing: bool
    predictions: list[Prediction]
