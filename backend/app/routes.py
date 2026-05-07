import logging

from fastapi import APIRouter, HTTPException, Request

from .schemas import PredictRequest, PredictResponse

router = APIRouter()
log = logging.getLogger(__name__)


@router.get("/health")
def health() -> dict:
    return {"status": "ok"}


@router.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest, request: Request) -> PredictResponse:
    predictor = request.app.state.predictor
    try:
        not_drawing, predictions = predictor.predict(req.image)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    log.info("prediction: not_drawing=%s %s", not_drawing, predictions)
    return PredictResponse(not_drawing=not_drawing, predictions=predictions)
