import { describe, it, expect } from 'vitest';
import { validateFieldImage, sampleAnalysis, createDemoAnalysis } from '@/lib/analysis-demo';

describe('Field image demonstration', () => {
  it('accepts supported field image formats', () => {
    for (const type of ['image/jpeg', 'image/png', 'image/webp']) {
      expect(validateFieldImage({ type, size: 1024 })).toBeNull();
    }
    expect(validateFieldImage({ type: 'application/pdf', size: 1024 })).not.toBeNull();
  });

  it('caps images at 10 MB', () => {
    expect(validateFieldImage({ type: 'image/jpeg', size: 10 * 1024 * 1024 })).toBeNull();
    expect(validateFieldImage({ type: 'image/jpeg', size: 10 * 1024 * 1024 + 1 })).not.toBeNull();
  });

  it('rejects empty images', () => {
    expect(validateFieldImage({ type: 'image/png', size: 0 })).not.toBeNull();
  });

  it('returns fixed sample results rather than claiming image diagnostics', () => {
    expect(sampleAnalysis.healthScore).toBe(86);
    expect(sampleAnalysis.stressRisk).toBe('Moderate');
  });

  it('creates a fresh random demo result for each uploaded file', () => {
    const first = createDemoAnalysis('uploaded-field-1.jpg');
    const second = createDemoAnalysis('uploaded-field-2.jpg');

    expect(first.insight).toContain('uploaded-field-1.jpg');
    expect(second.insight).toContain('uploaded-field-2.jpg');
    expect(first.healthScore).toBeGreaterThanOrEqual(50);
    expect(first.healthScore).toBeLessThanOrEqual(95);
    expect(second.healthScore).toBeGreaterThanOrEqual(50);
    expect(second.healthScore).toBeLessThanOrEqual(95);
    expect(first.healthScore).not.toBe(second.healthScore);
  });
});
