import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle, 
  Users, 
  Globe,
  Mail,
  Smartphone
} from 'lucide-react';

export function ThreatDashboard() {
  // Mock threat intelligence data
  const threatStats = {
    totalThreats: 12847,
    newThreats: 234,
    blockedAttempts: 8934,
    riskReduction: 67
  };

  const topThreats = [
    { name: 'Email Phishing', count: 4521, trend: 'up', percentage: 35 },
    { name: 'Fake Banking Sites', count: 3214, trend: 'up', percentage: 25 },
    { name: 'Social Media Scams', count: 2891, trend: 'down', percentage: 22 },
    { name: 'SMS Phishing', count: 1967, trend: 'up', percentage: 15 },
    { name: 'Voice Phishing', count: 254, trend: 'down', percentage: 2 }
  ];

  const recentAlerts = [
    {
      type: 'High',
      title: 'New Banking Phishing Campaign',
      description: 'Targeting major banks with convincing login pages',
      time: '2 hours ago',
      affected: 1247
    },
    {
      type: 'Medium',
      title: 'Social Engineering via LinkedIn',
      description: 'Fake job offers requesting personal information',
      time: '6 hours ago',
      affected: 523
    },
    {
      type: 'High',
      title: 'Cryptocurrency Scam Emails',
      description: 'Fake investment opportunities with malicious links',
      time: '12 hours ago',
      affected: 892
    }
  ];

  const industryTargets = [
    { industry: 'Financial Services', risk: 89, attacks: 3421 },
    { industry: 'Healthcare', risk: 76, attacks: 2156 },
    { industry: 'Technology', risk: 68, attacks: 1893 },
    { industry: 'Education', risk: 54, attacks: 1247 },
    { industry: 'Government', risk: 72, attacks: 1634 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.totalThreats.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Threats (24h)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.newThreats}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% from yesterday
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Attempts</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.blockedAttempts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +23% from last week
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.riskReduction}%</div>
            <p className="text-xs text-muted-foreground">
              Protection effectiveness
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Threat Types */}
        <Card>
          <CardHeader>
            <CardTitle>Top Threat Types</CardTitle>
            <CardDescription>Most common phishing attack vectors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topThreats.map((threat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                    {threat.name.includes('Email') && <Mail className="h-4 w-4" />}
                    {threat.name.includes('Banking') && <Shield className="h-4 w-4" />}
                    {threat.name.includes('Social') && <Users className="h-4 w-4" />}
                    {threat.name.includes('SMS') && <Smartphone className="h-4 w-4" />}
                    {threat.name.includes('Voice') && <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{threat.name}</p>
                    <p className="text-sm text-muted-foreground">{threat.count.toLocaleString()} attacks</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={threat.trend === 'up' ? 'destructive' : 'secondary'}>
                    {threat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {threat.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Alerts</CardTitle>
            <CardDescription>Latest phishing campaigns and threats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="border-l-4 border-l-destructive pl-4 space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant={alert.type === 'High' ? 'destructive' : 'default'}>
                    {alert.type} Risk
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <h4 className="font-medium">{alert.title}</h4>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground">
                  {alert.affected.toLocaleString()} users potentially affected
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Industry Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Risk Analysis</CardTitle>
          <CardDescription>Phishing attack targeting by industry sector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryTargets.map((industry, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{industry.industry}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {industry.attacks.toLocaleString()} attacks
                    </span>
                    <Badge variant={industry.risk >= 70 ? 'destructive' : industry.risk >= 50 ? 'default' : 'secondary'}>
                      {industry.risk}% risk
                    </Badge>
                  </div>
                </div>
                <Progress value={industry.risk} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}