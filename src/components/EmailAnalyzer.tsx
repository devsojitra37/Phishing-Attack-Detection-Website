import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Mail, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

interface EmailAnalysisResult {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  indicators: {
    category: string;
    items: string[];
  }[];
  recommendations: string[];
}

export function EmailAnalyzer() {
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState<EmailAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEmail = async () => {
    if (!emailContent.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let riskScore = 0;
    const indicators: { category: string; items: string[] }[] = [];
    
    const content = emailContent.toLowerCase();
    
    // Urgency indicators
    const urgencyWords = ['urgent', 'immediate', 'expires today', 'act now', 'limited time', 'hurry'];
    const urgencyMatches = urgencyWords.filter(word => content.includes(word));
    if (urgencyMatches.length > 0) {
      indicators.push({
        category: 'Urgency Tactics',
        items: urgencyMatches.map(word => `Contains "${word}"`)
      });
      riskScore += urgencyMatches.length * 15;
    }
    
    // Financial/credential requests
    const sensitiveRequests = ['password', 'credit card', 'ssn', 'social security', 'bank account', 'pin', 'verification'];
    const sensitiveMatches = sensitiveRequests.filter(word => content.includes(word));
    if (sensitiveMatches.length > 0) {
      indicators.push({
        category: 'Sensitive Information Requests',
        items: sensitiveMatches.map(word => `Requests ${word}`)
      });
      riskScore += sensitiveMatches.length * 25;
    }
    
    // Suspicious phrases
    const suspiciousPhrases = [
      'verify your account',
      'suspended account',
      'click here',
      'confirm identity',
      'security alert',
      'unauthorized access'
    ];
    const phraseMatches = suspiciousPhrases.filter(phrase => content.includes(phrase));
    if (phraseMatches.length > 0) {
      indicators.push({
        category: 'Suspicious Phrases',
        items: phraseMatches.map(phrase => `Contains "${phrase}"`)
      });
      riskScore += phraseMatches.length * 20;
    }
    
    // Grammar and spelling issues (simple check)
    const commonMisspellings = ['recieve', 'occured', 'seperate', 'definately', 'youre account'];
    const spellingMatches = commonMisspellings.filter(word => content.includes(word));
    if (spellingMatches.length > 0) {
      indicators.push({
        category: 'Grammar/Spelling Issues',
        items: spellingMatches.map(word => `Misspelling: "${word}"`)
      });
      riskScore += spellingMatches.length * 10;
    }
    
    // Generic greetings
    const genericGreetings = ['dear customer', 'dear user', 'dear client', 'valued customer'];
    const greetingMatches = genericGreetings.filter(greeting => content.includes(greeting));
    if (greetingMatches.length > 0) {
      indicators.push({
        category: 'Generic Communication',
        items: greetingMatches.map(greeting => `Uses generic greeting: "${greeting}"`)
      });
      riskScore += greetingMatches.length * 5;
    }
    
    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (riskScore >= 60) riskLevel = 'high';
    else if (riskScore >= 30) riskLevel = 'medium';
    
    // Generate recommendations
    const recommendations = [];
    if (riskLevel === 'high') {
      recommendations.push('This email shows multiple phishing indicators - do not respond or click any links');
      recommendations.push('Report this email to your IT department or email provider');
      recommendations.push('Delete the email immediately');
    } else if (riskLevel === 'medium') {
      recommendations.push('Exercise caution - verify sender through independent means');
      recommendations.push('Do not provide sensitive information via email');
      recommendations.push('Contact the organization directly using official contact methods');
    } else {
      recommendations.push('Email appears relatively safe based on content analysis');
      recommendations.push('Still verify sender if requesting sensitive actions');
      recommendations.push('Be cautious of any unexpected requests');
    }
    
    if (indicators.length === 0) {
      indicators.push({
        category: 'Analysis Results',
        items: ['No obvious phishing indicators detected in content']
      });
    }
    
    setResult({
      riskScore,
      riskLevel,
      indicators,
      recommendations
    });
    
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium': return <Shield className="w-5 h-5 text-yellow-600" />;
      default: return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Content Analyzer
        </CardTitle>
        <CardDescription>
          Analyze email content for potential phishing indicators and social engineering tactics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Paste email content here for analysis..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[150px]"
          />
          <Button 
            onClick={analyzeEmail} 
            disabled={!emailContent.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing Content...' : 'Analyze Email'}
          </Button>
        </div>
        
        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                {getRiskIcon(result.riskLevel)}
                <div>
                  <p className={`font-medium ${getRiskColor(result.riskLevel)}`}>
                    Risk Level: {result.riskLevel.toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Risk Score: {result.riskScore}/100
                  </p>
                </div>
              </div>
              <Badge 
                variant={result.riskLevel === 'high' ? 'destructive' : 
                        result.riskLevel === 'medium' ? 'default' : 'secondary'}
              >
                {result.riskScore}/100
              </Badge>
            </div>
            
            <Progress 
              value={result.riskScore} 
              className="w-full"
            />
            
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detected Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.indicators.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{category.category}</h4>
                      <ul className="space-y-1 ml-4">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security Recommendations</CardTitle>
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