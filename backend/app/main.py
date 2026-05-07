import logging
import time
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .config import Settings
from .predictor import Predictor
from .routes import router

_STATIC = Path(__file__).resolve().parents[1] / "static"

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = Settings()
    app.state.predictor = Predictor(settings)
    log.info("Model loaded — device=%s path=%s", settings.device, settings.model_path)
    yield


app = FastAPI(lifespan=lifespan)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    ms = (time.perf_counter() - start) * 1000
    log.info("%s %s -> %d  (%.1f ms)", request.method, request.url.path, response.status_code, ms)
    return response


app.mount("/static", StaticFiles(directory=str(_STATIC)), name="static")
app.include_router(router)


@app.get("/")
def index():
    return FileResponse(str(_STATIC / "index.html"))
