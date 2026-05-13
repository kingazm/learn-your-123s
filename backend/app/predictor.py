import base64
import io

import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

from .config import Settings
from .imaging import is_drawing, preprocess
from .schemas import Prediction
from model import DigitsNetwork


class Predictor:
    def __init__(self, settings: Settings) -> None:

        self._device = settings.device
        self._mean = settings.mean
        self._std = settings.std
        self._thresholds = {
            "ink_threshold": settings.ink_threshold,
            "min_ink_ratio": settings.min_ink_ratio,
            "min_span_frac": settings.min_span_frac,
            "min_thin_frac": settings.min_thin_frac,
        }

        model = DigitsNetwork().to(settings.device)
        model.load_state_dict(
            torch.load(settings.model_path, map_location=settings.device, weights_only=True)
        )
        model.eval()
        self._model = model

    def predict(self, image_b64: str) -> tuple[bool, list[Prediction]]:
        """
        Returns (not_drawing, predictions).
        Raises ValueError on malformed image data.
        """
        if "," in image_b64:
            image_b64 = image_b64.split(",", 1)[1]

        try:
            img = Image.open(io.BytesIO(base64.b64decode(image_b64))).convert("L")
        except Exception as exc:
            raise ValueError("Could not decode image") from exc

        if not is_drawing(img, **self._thresholds):
            return True, []

        img = preprocess(img)
        arr = (np.array(img, dtype=np.float32) / 255.0 - self._mean) / self._std
        tensor = torch.tensor(arr).unsqueeze(0).unsqueeze(0)  # (1, 1, 28, 28)

        with torch.no_grad():
            probs = F.softmax(self._model(tensor), dim=1)[0]

        top3 = torch.topk(probs, 3)
        predictions = [
            Prediction(
                digit=int(top3.indices[i]),
                confidence=round(float(top3.values[i]) * 100, 2),
            )
            for i in range(3)
        ]
        return False, predictions
