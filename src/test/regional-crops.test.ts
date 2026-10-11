import { describe, expect, it } from 'vitest';
import { regionalCrops, seasonalWaterVolume } from '@/lib/regional-crops';
describe('Regional water planning references', () => {
 it('converts one millimetre over one hectare to ten cubic metres', () => { expect(seasonalWaterVolume(1,1)).toBe(10); });
 it('scales seasonal volume by field area', () => { expect(seasonalWaterVolume(450,2)).toBe(9000); expect(seasonalWaterVolume(650,2)).toBe(13000); });
 it('preserves FAO sorghum seasonal range', () => { expect(regionalCrops.find(c => c.id==='sorghum')?.water).toEqual([450,650]); });
 it('preserves FAO tomato seasonal range', () => { expect(regionalCrops.find(c => c.id==='tomato')?.water).toEqual([400,800]); });
 it('preserves FAO melon seasonal range', () => { expect(regionalCrops.find(c => c.id==='melon')?.water).toEqual([400,600]); });
 it('does not fabricate a date palm seasonal reference', () => { expect(regionalCrops.find(c => c.id==='date-palm')?.water).toBeNull(); });
 it('rejects invalid field areas and depths', () => { expect(()=>seasonalWaterVolume(450,0)).toThrow(); expect(()=>seasonalWaterVolume(450,-1)).toThrow(); expect(()=>seasonalWaterVolume(-1,1)).toThrow(); expect(()=>seasonalWaterVolume(450,NaN)).toThrow(); });
});
