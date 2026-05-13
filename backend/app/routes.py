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
    kb = round(len(req.image) * 3 / 4 / 1024, 1)
    log.info("predict request — image size: ~%s KB", kb)

    predictor = request.app.state.predictor
    try:
        not_drawing, predictions = predictor.predict(req.image)
    except ValueError as exc:
        log.warning("predict rejected — %s", exc)
        raise HTTPException(status_code=400, detail=str(exc))

    if not_drawing:
        log.info("predict result — no drawing detected")
    else:
        top = predictions[0]
        log.info("predict result — digit=%s confidence=%.1f%%", top.digit, top.confidence)

    return PredictResponse(not_drawing=not_drawing, predictions=predictions)
