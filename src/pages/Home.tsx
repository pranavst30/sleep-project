import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Brain, BarChart3, Activity, Shield, Zap } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models analyze your sleep patterns to predict potential disorders.',
    },
    {
      icon: Zap,
      title: 'Quick Testing',
      description: 'Enter your health metrics and get instant sleep disorder predictions powered by ML.',
    },
    {
      icon: BarChart3,
      title: 'Interactive Charts',
      description: 'Visualize your sleep health data with beautiful, interactive charts and graphs.',
    },
    {
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Track key health metrics including heart rate, blood pressure, and activity levels.',
    },
    {
      icon: Shield,
      title: 'Medical Grade Analysis',
      description: 'Professional-grade analysis using validated health assessment models.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate predictions and recommendations for better sleep health.',
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Advanced Sleep Health
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Disorder Prediction
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to analyze your sleep patterns,
            health metrics, and lifestyle factors for early detection of sleep disorders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg"
            asChild
          >
            <Link to="/prediction">
              <Brain className="mr-2 h-5 w-5" />
              Start Prediction
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg border-2 hover:bg-secondary/50"
            asChild
          >
            <Link to="/chart">
              <BarChart3 className="mr-2 h-5 w-5" />
              View Analytics
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center shadow-medical">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">95%</div>
            <div className="text-muted-foreground">Prediction Accuracy</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-medical">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-accent">3</div>
            <div className="text-muted-foreground">Disorder Types Detected</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-medical">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary-glow">375+</div>
            <div className="text-muted-foreground">Data Points Analyzed</div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Comprehensive Sleep Health Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced platform combines multiple health indicators to provide
            accurate sleep disorder predictions and personalized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="shadow-medical hover:shadow-glow transition-all duration-300 group cursor-pointer"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-2 group-hover:animate-pulse-glow">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground shadow-glow">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Analyze Your Sleep Health?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Get started with our advanced sleep disorder prediction system.
            Input your health metrics and receive instant, accurate assessments.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform duration-200"
            asChild
          >
            <Link to="/prediction">
              Begin Analysis
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;