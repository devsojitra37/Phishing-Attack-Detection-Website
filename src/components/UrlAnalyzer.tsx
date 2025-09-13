import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

interface AnalysisResult {
  url: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  indicators: string[];
  recommendations: string[];
}

export function UrlAnalyzer() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeUrl = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const indicators: string[] = [];
    let riskScore = 0;
    
    // Basic phishing detection heuristics
    const suspiciousDomains = ['bit.ly', 'tinyurl.com', 'short.link', 'click.me'];
    const suspiciousKeywords = ['urgent', 'verify', 'suspended', 'click', 'login', 'secure'];
    const homographs = ['paypaI', 'arnazon', 'microsofT', 'goog1e'];
    
    // Check for suspicious domains
    const domain = new URL(url).hostname.toLowerCase();
    if (suspiciousDomains.some(d => domain.includes(d))) {
      indicators.push('Uses URL shortening service');
      riskScore += 30;
    }
    
    // Check for homograph attacks
    if (homographs.some(h => domain.includes(h.toLowerCase()))) {
      indicators.push('Contains character substitution (homograph attack)');
      riskScore += 40;
    }
    
    // Check for suspicious keywords in URL
    if (suspiciousKeywords.some(k => url.toLowerCase().includes(k))) {
      indicators.push('Contains suspicious keywords');
      riskScore += 20;
    }
    
    // Check for IP address instead of domain
    if (/^\d+\.\d+\.\d+\.\d+/.test(domain)) {
      indicators.push('Uses IP address instead of domain name');
      riskScore += 35;
    }
    
    // Check for excessive subdomains
    const subdomains = domain.split('.');
    if (subdomains.length > 4) {
      indicators.push('Excessive number of subdomains');
      riskScore += 25;
    }
    
    // Check for HTTPS
    if (!url.startsWith('https://')) {
      indicators.push('Not using secure HTTPS protocol');
      riskScore += 15;
    }
    
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (riskScore >= 50) riskLevel = 'high';
    else if (riskScore >= 25) riskLevel = 'medium';
    
    const recommendations = [];
    if (riskLevel === 'high') {
      recommendations.push('Do not visit this URL');
      recommendations.push('Report this URL if received via email or message');
    } else if (riskLevel === 'medium') {
      recommendations.push('Exercise caution when visiting this URL');
      recommendations.push('Verify the sender if received via communication');
    } else {
      recommendations.push('URL appears safe based on basic analysis');
      recommendations.push('Always verify legitimacy of sensitive requests');
    }
    
    setResult({
      url,
      riskScore,
      riskLevel,
      indicators: indicators.length > 0 ? indicators : ['No obvious suspicious indicators found'],
      recommendations
    });
    
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <Shield className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5" />
          URL Phishing Analyzer
        </CardTitle>
        <CardDescription>
          Analyze URLs for potential phishing indicators and security risks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL to analyze (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={analyzeUrl} 
            disabled={!url || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
        
        {result && (
          <div className="space-y-4">
            <Alert className={getRiskColor(result.riskLevel)}>
              <div className="flex items-center gap-2">
                {getRiskIcon(result.riskLevel)}
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>Risk Level: {result.riskLevel.toUpperCase()}</span>
                    <Badge variant="outline">Score: {result.riskScore}/100</Badge>
                  </div>
                </AlertDescription>
              </div>
            </Alert>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.indicators.map((indicator, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0" />
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}