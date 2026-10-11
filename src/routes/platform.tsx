import { createFileRoute, Link } from '@tanstack/react-router';
import { Upload } from 'lucide-react';
import { FeatureCards, HowItWorks, ImpactBand } from '@/components/agrinova/platform-parts';
import { Button } from '@/components/ui/button';
import { pageMeta } from '@/lib/page-meta';
export const Route = createFileRoute('/platform')({ head: () => pageMeta('The Crop Intelligence Platform', 'Explore AgriNova’s hyperspectral crop analysis, early stress detection, risk mapping, and irrigation guidance for arid-region agriculture.'), component: Platform });
function Platform() { return <main><div className="site-width page-heading"><div className="eyebrow">CROP-FINGERPRINT 813</div><h1>Beyond observation.<br/>Into crop intelligence.</h1><p className="body-copy">Traditional monitoring can miss the first signs of stress. AgriNova’s vision combines hyperspectral satellite and field imagery with AI to reveal anomalies earlier, helping you turn hidden signals into informed action.</p><Button asChild className="mt-5"><Link to="/analyze"><Upload/>Upload Field Image</Link></Button></div><section className="section pt-6"><div className="site-width"><FeatureCards all/></div></section><HowItWorks/><ImpactBand/></main>; }
