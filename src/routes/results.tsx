import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { sampleAnalysis } from '@/lib/analysis-demo';
import { pageMeta } from '@/lib/page-meta';
import fieldImage from '@/assets/agrinova-fields.jpg';

type AnalysisResult = {
  healthScore: number;
  stressRisk: string;
  zone?: string;
  irrigation: string;
  waterRequirement: string;
  cropSuitability: string;
  insight: string;
  actionPlan: string;
  consumer: string;
};

const recommendedCrop = {
  name: 'Sorghum + drought-tolerant pulse blend',
  fit: '92% fit',
  water: 'Low to moderate irrigation',
  season: 'Best for next 90 days',
  image: fieldImage,
  notes: 'This zone is best suited to crops that handle heat stress and variable moisture without rapid yield loss.',
};

const defaultAnalysis: AnalysisResult = {
  ...sampleAnalysis,
  zone: 'Zone B',
};

export const Route = createFileRoute('/results')({
  head: () =>
    pageMeta(
      'Field Insight Results',
      'Premium agronomic dashboard showing the crop health summary, irrigation guidance, and crop recommendation for the uploaded field.',
    ),
  component: Results,
});

function Results() {
  const [analysis, setAnalysis] = useState<AnalysisResult>(defaultAnalysis);
  const [previewImage, setPreviewImage] = useState<string>(fieldImage);
  const [imageName, setImageName] = useState('AgriNova sample field');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedAnalysis = window.sessionStorage.getItem('agrinova-analysis');
    const storedImage = window.sessionStorage.getItem('agrinova-last-image');
    const storedName = window.sessionStorage.getItem('agrinova-last-image-name');

    if (storedAnalysis) {
      try {
        setAnalysis(JSON.parse(storedAnalysis) as AnalysisResult);
      } catch {
        setAnalysis(defaultAnalysis);
      }
    }

    if (storedImage) setPreviewImage(storedImage);
    if (storedName) setImageName(storedName);
  }, []);

  const healthTone = analysis.healthScore >= 80 ? 'Low' : analysis.healthScore >= 60 ? 'Moderate' : 'High';

  return (
    <main className="site-width" style={{ paddingTop: '32px', paddingBottom: '72px' }}>
      <div className="dashboard-shell" style={{ marginTop: 0 }}>
        <div className="dashboard-header">
          <div>
            <div className="eyebrow">CROP INTELLIGENCE SUMMARY</div>
            <h2>Field signal overview</h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="status-pill">DEMO FIELD SCAN</span>
            <Button variant="outline" asChild>
              <Link to="/analyze">
                <ArrowLeft size={14} />
                Back to upload
              </Link>
            </Button>
          </div>
        </div>

        <div className="dashboard-grid">
          <article className="metric-card highlight">
            <span className="metric-label">Crop Health Score</span>
            <strong className="metric-value">
              {analysis.healthScore}
              <small>/100</small>
            </strong>
            <span className="metric-foot">Overall field condition</span>
          </article>
          <article className="metric-card">
            <span className="metric-label">Stress Risk</span>
            <strong className="metric-value small">{analysis.stressRisk}</strong>
            <span className="metric-foot">Primary concern: {analysis.zone ?? 'Field zone'}</span>
          </article>
          <article className="metric-card">
            <span className="metric-label">Water Need</span>
            <strong className="metric-value small">{healthTone}</strong>
            <span className="metric-foot">Irrigation attention required</span>
          </article>
          <article className="metric-card">
            <span className="metric-label">Best Crop Fit</span>
            <strong className="metric-value small">{analysis.stressRisk}</strong>
            <span className="metric-foot">Heat-tolerant, water-aware cultivars</span>
          </article>
        </div>

        <div className="dashboard-visual-grid">
          <article className="chart-panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Water demand</span>
                <h3>Field moisture trend</h3>
              </div>
              <span className="trend-up">+8.4%</span>
            </div>
            <svg viewBox="0 0 300 120" className="chart-svg" aria-label="Water demand chart">
              <defs>
                <linearGradient id="trend-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(73,150,120,0.45)" />
                  <stop offset="100%" stopColor="rgba(73,150,120,0.02)" />
                </linearGradient>
              </defs>
              <path d="M0 95 L30 87 L60 88 L90 76 L120 78 L150 58 L180 62 L210 49 L240 53 L270 34 L300 42" fill="none" stroke="rgba(39,105,82,1)" strokeWidth="3" strokeLinecap="round" />
              <path d="M0 95 L30 87 L60 88 L90 76 L120 78 L150 58 L180 62 L210 49 L240 53 L270 34 L300 42 L300 120 L0 120 Z" fill="url(#trend-fill)" opacity="0.9" />
            </svg>
            <div className="chart-metrics">
              <div>
                <small>Current</small>
                <strong>82%</strong>
              </div>
              <div>
                <small>Target</small>
                <strong>68%</strong>
              </div>
              <div>
                <small>Gap</small>
                <strong>14%</strong>
              </div>
            </div>
          </article>

          <article className="crop-panel">
            <div className="crop-image-wrap">
              <img src={previewImage} alt="Recommended crop area preview" />
            </div>
            <div className="crop-content">
              <span className="mini-label">Recommended crop</span>
              <h3>{recommendedCrop.name}</h3>
              <div className="crop-meta">
                <span>{recommendedCrop.fit}</span>
                <span>{recommendedCrop.water}</span>
              </div>
              <p>{recommendedCrop.notes}</p>
            </div>
          </article>
        </div>

        <div className="insight-grid">
          <article className="insight-panel">
            <h3>Irrigation Recommendation</h3>
            <p>{analysis.irrigation}</p>
          </article>
          <article className="insight-panel">
            <h3>Water Requirement</h3>
            <p>{analysis.waterRequirement}</p>
          </article>
          <article className="insight-panel wide">
            <h3>Risk Pattern</h3>
            <p>{analysis.insight}</p>
          </article>
          <article className="insight-panel">
            <h3>Crop Suitability</h3>
            <p>{analysis.cropSuitability}</p>
          </article>
          <article className="insight-panel">
            <h3>Next 72 Hours</h3>
            <p>{analysis.actionPlan}</p>
          </article>
          <article className="insight-panel">
            <h3>Consumer Impact</h3>
            <p>{analysis.consumer}</p>
          </article>
        </div>

        <div className="recommendation-strip">
          <div>
            <span className="mini-label">Recommended planting window</span>
            <strong>{recommendedCrop.season}</strong>
          </div>
          <div>
            <span className="mini-label">Best field zone</span>
            <strong>{analysis.zone ?? 'Zone B'}</strong>
          </div>
          <div>
            <span className="mini-label">Likely crop profile</span>
            <strong>Heat resilient / low water demand</strong>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '18px' }}>
          <div className="demo-notice" style={{ marginTop: 0 }}>
            Uploaded file: {imageName}
          </div>
          <Button variant="hero" asChild>
            <Link to="/analyze">
              Upload another image <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
