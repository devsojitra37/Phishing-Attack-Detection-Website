import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Eye, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Mail,
  Smartphone,
  Globe
} from 'lucide-react';

export function PhishingEducation() {
  const redFlags = [
    {
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      title: 'Urgent Language',
      description: 'Phrases like "Act now!", "Limited time", "Account will be closed"',
      example: '"Your account will be suspended in 24 hours unless you verify immediately!"'
    },
    {
      icon: <Mail className="h-5 w-5 text-red-500" />,
      title: 'Generic Greetings',
      description: 'Emails starting with "Dear Customer" instead of your name',
      example: '"Dear Valued Customer" instead of "Dear John Smith"'
    },
    {
      icon: <Globe className="h-5 w-5 text-red-500" />,
      title: 'Suspicious URLs',
      description: 'Misspelled domains, suspicious redirects, or IP addresses',
      example: 'paypaI.com (using capital i instead of lowercase L)'
    },
    {
      icon: <Eye className="h-5 w-5 text-red-500" />,
      title: 'Poor Grammar',
      description: 'Spelling mistakes and awkward phrasing',
      example: '"We has detected suspicious activity on you\'re account"'
    }
  ];

  const safetyTips = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: 'Verify Independently',
      description: 'Contact organizations directly using official phone numbers or websites',
      action: 'Always verify suspicious requests through official channels'
    },
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: 'Check URLs Carefully',
      description: 'Hover over links to see actual destinations before clicking',
      action: 'Look for HTTPS and correct spelling in domain names'
    },
    {
      icon: <Mail className="h-5 w-5 text-green-500" />,
      title: 'Be Skeptical of Attachments',
      description: 'Don\'t open unexpected attachments, especially from unknown senders',
      action: 'Scan attachments with antivirus before opening'
    },
    {
      icon: <Smartphone className="h-5 w-5 text-green-500" />,
      title: 'Enable 2FA',
      description: 'Use two-factor authentication on all important accounts',
      action: 'Set up 2FA as an extra layer of security'
    }
  ];

  const phishingExamples = [
    {
      type: 'Email Phishing',
      legitimate: false,
      subject: 'Urgent: Your PayPal Account Has Been Limited',
      sender: 'security@paypaI-support.com',
      content: 'Dear Customer, We have detected unusual activity on your account. Click here to verify your identity within 24 hours or your account will be permanently suspended.',
      indicators: ['Generic greeting', 'Urgent language', 'Suspicious domain (paypaI vs paypal)', 'Threatening consequences']
    },
    {
      type: 'Banking Phishing',
      legitimate: false,
      subject: 'Action Required: Verify Your Bank Account',
      sender: 'alerts@bank-security.net',
      content: 'Your account has been temporarily locked due to suspicious activity. Please confirm your login credentials and SSN to restore access.',
      indicators: ['Non-bank domain', 'Requests sensitive information', 'Creates false urgency', 'Vague "suspicious activity"']
    },
    {
      type: 'Tech Support Scam',
      legitimate: false,
      subject: 'Microsoft Security Alert - Virus Detected',
      sender: 'support@microsoft-security.org',
      content: 'We have detected 3 viruses on your computer. Call 1-800-FAKE-NUM immediately to speak with a technician.',
      indicators: ['Fake Microsoft domain', 'False virus claims', 'Phone number for "support"', 'Creates panic']
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Phishing Awareness Education
          </CardTitle>
          <CardDescription>
            Learn to identify and protect yourself from phishing attacks
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="red-flags" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="red-flags">Red Flags</TabsTrigger>
          <TabsTrigger value="safety-tips">Safety Tips</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="red-flags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Warning Signs to Watch For</CardTitle>
              <CardDescription>
                Common indicators that an email or message might be a phishing attempt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {redFlags.map((flag, index) => (
                  <div key={index} className="border border-red-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      {flag.icon}
                      <h3 className="font-medium">{flag.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{flag.description}</p>
                    <div className="bg-red-50 p-3 rounded border-l-4 border-l-red-400">
                      <p className="text-sm italic">Example: {flag.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety-tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Best Practices for Protection</CardTitle>
              <CardDescription>
                Essential steps to protect yourself from phishing attacks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="border border-green-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      {tip.icon}
                      <h3 className="font-medium">{tip.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                    <div className="bg-green-50 p-3 rounded border-l-4 border-l-green-400">
                      <p className="text-sm font-medium">Action: {tip.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-World Phishing Examples</CardTitle>
              <CardDescription>
                Learn from actual phishing attempts to better recognize threats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {phishingExamples.map((example, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{example.type}</h3>
                    <Badge variant="destructive">
                      <X className="h-3 w-3 mr-1" />
                      Phishing
                    </Badge>
                  </div>
                  
                  <div className="bg-muted p-4 rounded space-y-2">
                    <div className="grid gap-2 text-sm">
                      <div><strong>From:</strong> {example.sender}</div>
                      <div><strong>Subject:</strong> {example.subject}</div>
                    </div>
                    <div className="border-t pt-2">
                      <p className="text-sm">{example.content}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Phishing Indicators:</h4>
                    <div className="flex flex-wrap gap-2">
                      {example.indicators.map((indicator, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {indicator}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}