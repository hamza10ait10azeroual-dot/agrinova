export function validateFieldImage(file: { type: string; size: number }): string | null {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return 'Please choose a JPG, PNG, or WebP image.';
  if (file.size > 10 * 1024 * 1024) return 'Please choose an image smaller than 10 MB.';
  if (file.size === 0) return 'This image is empty. Please choose another image.';
  return null;
}

export const sampleAnalysis = {
  healthScore: 86,
  stressRisk: 'Moderate',
  zone: 'Zone B',
  irrigation:
    'Targeted irrigation is recommended for Zone B. Reduce watering in healthy zones and apply a brief, focused pulse to the stressed area before the next cycle to avoid overwatering surrounding crops.',
  waterRequirement:
    'Estimated water requirement for this zone is slightly above baseline for the next 48–72 hours due to elevated evapotranspiration and lower canopy efficiency.',
  cropSuitability:
    'Given the current conditions, crops with moderate water tolerance and strong heat resilience are the best fit for this area. Water-intensive varieties would need tighter irrigation control and closer field monitoring.',
  insight:
    'Zone B is emerging as the only materially stressed area in the field. The pattern suggests uneven moisture distribution and localized crop stress rather than a broad field-wide decline.',
  actionPlan:
    'Within 24 hours: verify soil moisture in Zone B and inspect emitters. Within 48–72 hours: adjust irrigation timing, review nutrient balance, and compare the zone against adjacent healthy blocks to monitor recovery.',
  consumer:
    'Early intervention helps protect yield quality and reduce avoidable waste while supporting more efficient use of scarce water resources in the growing season.',
};

export function createDemoAnalysis(fileName = 'field-image.jpg') {
  const healthScore = Math.floor(Math.random() * 46) + 50;
  const zones = ['Zone A', 'Zone B', 'North block', 'South block', 'Irrigation corridor'];
  const zone = zones[Math.floor(Math.random() * zones.length)];

  let stressRisk: 'Low' | 'Moderate' | 'High';
  let irrigation: string;
  let waterRequirement: string;
  let cropSuitability: string;
  let insight: string;
  let actionPlan: string;

  if (healthScore >= 80) {
    stressRisk = 'Low';
    irrigation = 'Light irrigation is sufficient. Keep the current cycle steady and avoid overwatering the healthiest parts of the field.';
    waterRequirement = `Estimated water requirement: ${Math.floor(Math.random() * 12) + 20} mm over the next 72 hours with balanced moisture retention.`;
    cropSuitability = 'Cereal and pulse crops with moderate water demand remain a strong fit for this field profile.';
    insight = `This demo result for ${fileName} shows a generally healthy canopy with minor variability in ${zone}. The profile is favorable for continued growth and routine monitoring.`;
    actionPlan = 'Continue the normal irrigation schedule, check moisture in the driest patches, and confirm the field is remaining evenly hydrated.';
  } else if (healthScore >= 65) {
    stressRisk = 'Moderate';
    irrigation = 'Apply a targeted irrigation pulse to the stressed zones and reduce watering in the healthier areas to maintain field balance.';
    waterRequirement = `Estimated water requirement: ${Math.floor(Math.random() * 12) + 28} mm over the next 72 hours with tighter monitoring in the stress patch.`;
    cropSuitability = 'Heat-tolerant cereals and drought-aware pulse blends are the best fit for the current field conditions.';
    insight = `This demo result for ${fileName} indicates localized pressure in ${zone} and a moderate stress profile, suggesting uneven moisture or canopy vigor.`;
    actionPlan = 'Inspect emitter flow, verify soil moisture, and adjust the next irrigation cycle within 24 to 48 hours to stabilize the stressed area.';
  } else {
    stressRisk = 'High';
    irrigation = 'Use an urgent, targeted irrigation response and avoid broad overwatering across the whole field.';
    waterRequirement = `Estimated water requirement: ${Math.floor(Math.random() * 18) + 36} mm over the next 72 hours to recover moisture balance and reduce crop losses.`;
    cropSuitability = 'The crop profile favors drought-resilient varieties with strong recovery and lower water demand.';
    insight = `This demo result for ${fileName} shows a high-risk stress pattern in ${zone} with poor canopy vigor and urgent field attention required.`;
    actionPlan = 'Prioritize the stress patch for fast inspection, review irrigation uniformity, and correct soil moisture conditions within the next 12 to 24 hours.';
  }

  return {
    healthScore,
    stressRisk,
    zone,
    irrigation,
    waterRequirement,
    cropSuitability,
    insight,
    actionPlan,
    consumer: 'Early intervention protects yield quality, improves water efficiency, and reduces unnecessary losses during seasonal stress events.',
  };
}
