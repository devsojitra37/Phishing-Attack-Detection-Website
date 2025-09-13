import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { UrlAnalyzer } from './components/UrlAnalyzer';
import { EmailAnalyzer } from './components/EmailAnalyzer';
import { ThreatDashboard } from './components/ThreatDashboard';
import { PhishingEducation } from './components/PhishingEducation';
import { 
  Shield, 
  Search, 
  Mail, 
  BarChart3, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const quickStats = [
    { label: 'Threats Blocked Today', value: '1,247', icon: <Shield className="h-4 w-4" />, color: 'text-green-600' },
    { label: 'Active Campaigns', value: '23', icon: <AlertTriangle className="h-4 w-4" />, color: 'text-red-600' },
    { label: 'Users Protected', value: '45.2K', icon: <CheckCircle className="h-4 w-4" />, color: 'text-blue-600' },
    { label: 'Detection Rate', value: '98.7%', icon: <TrendingUp className="h-4 w-4" />, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PhishGuard</h1>
                <p className="text-sm text-muted-foreground">Advanced Phishing Detection & Protection</p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="url-analyzer" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              URL Scanner
            </TabsTrigger>
            <TabsTrigger value="email-analyzer" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Analyzer
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learn & Protect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Threat Intelligence Dashboard</h2>
                <p className="text-muted-foreground">Real-time phishing threats and security analytics</p>
              </div>
            </div>
            <ThreatDashboard />
          </TabsContent>

          <TabsContent value="url-analyzer" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">URL Security Scanner</h2>
                <p className="text-muted-foreground">Analyze URLs for potential phishing and security risks</p>
              </div>
            </div>
            <UrlAnalyzer />
            
            <Card>
              <CardHeader>
                <CardTitle>How URL Analysis Works</CardTitle>
                <CardDescription>Our scanner checks multiple security indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Domain Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Checks for suspicious domains, homograph attacks, and URL shorteners
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Security Protocols</h4>
                    <p className="text-sm text-muted-foreground">
                      Verifies HTTPS usage and certificate validity
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Pattern Matching</h4>
                    <p className="text-sm text-muted-foreground">
                      Identifies known malicious patterns and suspicious keywords
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email-analyzer" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Email Content Analyzer</h2>
                <p className="text-muted-foreground">Detect phishing patterns in email content</p>
              </div>
            </div>
            <EmailAnalyzer />
            
            <Card>
              <CardHeader>
                <CardTitle>What We Analyze</CardTitle>
                <CardDescription>Our AI examines multiple aspects of email content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Language Patterns</h4>
                    <p className="text-sm text-muted-foreground">
                      Urgency tactics and pressure techniques
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Content Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Suspicious phrases and requests
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Grammar Check</h4>
                    <p className="text-sm text-muted-foreground">
                      Common spelling and grammar errors
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Social Engineering</h4>
                    <p className="text-sm text-muted-foreground">
                      Manipulation and deception tactics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Phishing Awareness Training</h2>
                <p className="text-muted-foreground">Learn to identify and prevent phishing attacks</p>
              </div>
            </div>
            <PhishingEducation />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-medium mb-3">PhishGuard Protection</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI-powered phishing detection and cybersecurity awareness platform.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3">Features</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Real-time URL scanning</li>
                <li>Email content analysis</li>
                <li>Threat intelligence dashboard</li>
                <li>Security awareness training</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Security</h3>
              <p className="text-sm text-muted-foreground">
                All analysis is performed securely with privacy protection. No sensitive data is stored.
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            <p>© 2024 PhishGuard. Protecting users from cyber threats.</p>
          </div>
        </div>
      </div>
    </div>
  );
}