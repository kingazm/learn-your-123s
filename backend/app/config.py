from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

_ML = Path(__file__).resolve().parent

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="APP_")

    model_path: Path = _ML / "model.pth"
    device: str = "cpu"

    # Normalisation constants (MNIST statistics)
    mean: float = 0.1307
    std: float = 0.3081

    # Blank-canvas detection thresholds
    ink_threshold: int = 200      # grayscale < this counts as inked
    min_ink_ratio: float = 0.008  # fraction of pixels that must be inked
    min_span_frac: float = 0.20   # largest bbox dimension as fraction of canvas
    min_thin_frac: float = 0.03   # smallest bbox dimension as fraction of canvas
