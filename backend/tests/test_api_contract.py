import unittest

from backend.app.model import analyze_crop_image


class CropAnalysisContractTests(unittest.TestCase):
    def test_returns_expected_fields(self):
        result = analyze_crop_image(b"fake-bytes")

        required_fields = {
            "healthScore",
            "stressRisk",
            "irrigation",
            "waterRequirement",
            "cropSuitability",
            "insight",
            "actionPlan",
            "consumer",
        }

        self.assertTrue(required_fields.issubset(result.keys()))
        self.assertIsInstance(result["healthScore"], int)
        self.assertGreaterEqual(result["healthScore"], 0)
        self.assertLessEqual(result["healthScore"], 100)
        self.assertIn(result["stressRisk"], {"Low", "Moderate", "High"})


if __name__ == "__main__":
    unittest.main()
