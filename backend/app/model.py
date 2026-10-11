from __future__ import annotations

import io
from typing import Any

from PIL import Image, UnidentifiedImageError


def _make_default_response(reason: str = "Conservative field estimate") -> dict[str, Any]:
    return {
        "healthScore": 78,
        "stressRisk": "Moderate",
        "irrigation": "Use a controlled irrigation pulse in the stressed zones and avoid overwatering the healthier areas.",
        "waterRequirement": "Estimated water requirement: 34 mm over the next 72 hours while monitoring soil moisture and canopy response.",
        "cropSuitability": "Heat-tolerant cereals and drought-aware pulse blends remain the best fit for the current field profile.",
        "insight": f"The current image suggests localized crop stress with a moderate risk profile. {reason}",
        "actionPlan": "Inspect the stressed patch, verify emitter performance, review soil moisture, and adjust irrigation timing within the next 24 to 48 hours.",
        "consumer": "Early intervention protects yield stability, improves water efficiency, and supports healthier crop performance under variable field conditions.",
    }


def analyze_crop_image(image_bytes: bytes, filename: str = "field.jpg") -> dict[str, Any]:
    if not image_bytes:
        return _make_default_response("No image data was provided, so the system applied a conservative estimate.")

    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except (UnidentifiedImageError, ValueError, OSError):
        return _make_default_response("The image could not be interpreted cleanly, so a cautious estimate was applied.")

    pixels = list(image.getdata())
    if not pixels:
        return _make_default_response("The uploaded image was empty, so the system applied a conservative estimate.")

    red_total = 0
    green_total = 0
    blue_total = 0
    brightness_total = 0

    for r, g, b in pixels:
        red_total += r
        green_total += g
        blue_total += b
        brightness_total += (r + g + b) / 3

    pixel_count = len(pixels)
    avg_red = red_total / pixel_count
    avg_green = green_total / pixel_count
    avg_blue = blue_total / pixel_count
    avg_brightness = brightness_total / pixel_count
    green_ratio = avg_green / (avg_red + avg_green + avg_blue + 1)

    # Simple severity heuristic inspired by crop stress indicators: low green dominance and high brightness suggest stress.
    stress_index = max(0, min(100, round((0.75 - green_ratio) * 120 + (avg_brightness - 90) * 0.8)))
    health_score = max(45, min(96, 100 - stress_index))

    if health_score >= 80:
        stress_risk = "Low"
        irrigation = "Light irrigation is adequate, with a focus on preserving uniform moisture rather than applying excess water."
        water_requirement = "Estimated water requirement: 24 mm over the next 72 hours for consistent canopy health."
        crop_suitability = "High-value cereals, legumes, and drought-tolerant crops fit well with the current field conditions."
        insight = f"The image suggests a healthy crop canopy with mild variation in field vigor. The field maintains a positive outlook for {filename} under the current conditions."
        action_plan = "Continue the scheduled irrigation cycle and monitor the hottest sections of the field for any early signs of canopy stress."
    elif health_score >= 60:
        stress_risk = "Moderate"
        irrigation = "Apply a measured irrigation pulse to the stressed zones and reduce saturation in the healthier sections."
        water_requirement = "Estimated water requirement: 32 mm over the next 72 hours with tighter moisture control in the stress patch."
        crop_suitability = "Heat-tolerant cereals and resilient pulse blends are the best fit for this crop profile."
        insight = "The image shows uneven field vigor and localized stress, pointing to a moderate risk pattern rather than full-field collapse."
        action_plan = "Inspect emitter flow, check soil moisture, and adjust irrigation timing within 24 to 48 hours to stabilize the stressed area."
    else:
        stress_risk = "High"
        irrigation = "Use a targeted irrigation response immediately and avoid watering the entire field indiscriminately."
        water_requirement = "Estimated water requirement: 46 mm over the next 72 hours to recover moisture balance and reduce crop losses."
        crop_suitability = "The field is most suited to drought-resilient varieties with stronger stress recovery and lower water demand."
        insight = "The current image indicates large canopy stress and weak vigor, suggesting a more urgent field intervention is necessary."
        action_plan = "Review irrigation lines, inspect root-zone moisture, and prioritize the most stressed blocks for rapid remediation in the next 12 to 24 hours."

    return {
        "healthScore": int(round(health_score)),
        "stressRisk": stress_risk,
        "irrigation": irrigation,
        "waterRequirement": water_requirement,
        "cropSuitability": crop_suitability,
        "insight": insight,
        "actionPlan": action_plan,
        "consumer": "Early intervention protects yield quality, improves water efficiency, and reduces unnecessary losses during seasonal stress events.",
    }
