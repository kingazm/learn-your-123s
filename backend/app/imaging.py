import numpy as np
from PIL import Image, ImageOps


def is_drawing(
    img: Image.Image,
    *,
    ink_threshold: int = 200,
    min_ink_ratio: float = 0.008,
    min_span_frac: float = 0.20,
    min_thin_frac: float = 0.03,
) -> bool:
    """Return False when the canvas looks blank or the mark is too small to be a digit."""
    arr = np.asarray(img, dtype=np.uint8)
    inked = arr < ink_threshold
    if inked.mean() < min_ink_ratio:
        return False
    rows = np.any(inked, axis=1)
    cols = np.any(inked, axis=0)
    if not rows.any():
        return False
    ri, ci = np.where(rows)[0], np.where(cols)[0]
    h, w = int(ri[-1] - ri[0] + 1), int(ci[-1] - ci[0] + 1)
    side = arr.shape[0]
    if max(h, w) < min_span_frac * side:
        return False
    if min(h, w) < min_thin_frac * side:
        return False
    return True


def preprocess(img: Image.Image) -> Image.Image:
    """Crop, centre, and resize a grayscale drawing to a 28x28 MNIST-style image."""
    img = ImageOps.invert(img)
    bbox = img.getbbox()
    if bbox is None:
        return Image.new("L", (28, 28), 0)
    img = img.crop(bbox)
    img.thumbnail((20, 20), Image.LANCZOS)
    canvas = Image.new("L", (28, 28), 0)
    w, h = img.size
    canvas.paste(img, ((28 - w) // 2, (28 - h) // 2))
    return canvas
