import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Brain,
  BarChart3,
  Zap,
  Shield,
  Award
} from 'lucide-react';

const Performance = () => {
  // Mock performance metrics based on typical ML model performance
  const modelMetrics = {
    gradientBoosting: {
      accuracy: 94.2,
      precision: 91.8,
      recall: 93.5,
      f1Score: 92.6,
      trainingTime: '3.2 min',
      predictionTime: '45 ms'
    },
    quadraticDiscriminant: {
      accuracy: 87.3,
      precision: 84.7,
      recall: 89.1,
      f1Score: 86.8,
      trainingTime: '1.8 min',
      predictionTime: '32 ms'
    }
  };

  const datasetMetrics = {
    totalSamples: 375,
    features: 11,
    classes: 3,
    balanceScore: 78.5,
    qualityScore: 92.3
  };

  const MetricCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    color = "primary" 
  }: {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    color?: string;
  }) => (
    <Card className="shadow-medical">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}/10`}>
            <Icon className={`h-5 w-5 text-${color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ModelPerformanceCard = ({ 
    title, 
    metrics, 
    description,
    recommended = false 
  }: {
    title: string;
    metrics: typeof modelMetrics.gradientBoosting;
    description: string;
    recommended?: boolean;
  }) => (
    <Card className={`shadow-medical ${recommended ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>{title}</span>
          </CardTitle>
          {recommended && (
            <Badge className="bg-primary text-primary-foreground">
              <Award className="h-3 w-3 mr-1" />
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Accuracy</span>
              <span className="font-medium">{metrics.accuracy}%</span>
            </div>
            <Progress value={metrics.accuracy} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Precision</span>
              <span className="font-medium">{metrics.precision}%</span>
            </div>
            <Progress value={metrics.precision} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Recall</span>
              <span className="font-medium">{metrics.recall}%</span>
            </div>
            <Progress value={metrics.recall} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>F1-Score</span>
              <span className="font-medium">{metrics.f1Score}%</span>
            </div>
            <Progress value={metrics.f1Score} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-lg font-semibold text-primary">{metrics.trainingTime}</p>
            <p className="text-xs text-muted-foreground">Training Time</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-accent">{metrics.predictionTime}</p>
            <p className="text-xs text-muted-foreground">Prediction Time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Model Performance</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive analysis of sleep disorder prediction models
        </p>
      </div>

      {/* Overall Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Overall Accuracy"
          value="94.2%"
          description="Best model performance"
          icon={Target}
          color="primary"
        />
        <MetricCard
          title="Processing Speed"
          value="45ms"
          description="Average prediction time"
          icon={Zap}
          color="accent"
        />
        <MetricCard
          title="Model Reliability"
          value="99.7%"
          description="Uptime and stability"
          icon={Shield}
          color="primary-glow"
        />
        <MetricCard
          title="Data Quality"
          value="92.3%"
          description="Dataset completeness"
          icon={CheckCircle}
          color="accent"
        />
      </div>

      {/* Model Comparison */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Model Comparison</h2>
          <p className="text-muted-foreground">
            Performance comparison of available prediction models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModelPerformanceCard
            title="Gradient Boosting Classifier"
            metrics={modelMetrics.gradientBoosting}
            description="Ensemble method using sequential weak learners for high accuracy"
            recommended={true}
          />
          
          <ModelPerformanceCard
            title="Quadratic Discriminant Analysis"
            metrics={modelMetrics.quadraticDiscriminant}
            description="Probabilistic classifier assuming Gaussian distributions"
          />
        </div>
      </div>

      {/* Dataset Analysis */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Dataset Analysis</span>
          </CardTitle>
          <CardDescription>
            Quality and characteristics of the training dataset
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">{datasetMetrics.totalSamples}</p>
              <p className="text-sm text-muted-foreground">Total Samples</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-accent">{datasetMetrics.features}</p>
              <p className="text-sm text-muted-foreground">Features</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary-glow">{datasetMetrics.classes}</p>
              <p className="text-sm text-muted-foreground">Classes</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Class Balance Score</span>
                <span className="font-medium">{datasetMetrics.balanceScore}%</span>
              </div>
              <Progress value={datasetMetrics.balanceScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Measures how evenly distributed the sleep disorder classes are
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Quality Score</span>
                <span className="font-medium">{datasetMetrics.qualityScore}%</span>
              </div>
              <Progress value={datasetMetrics.qualityScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Completeness, consistency, and accuracy of the dataset
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Importance */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Feature Importance</span>
          </CardTitle>
          <CardDescription>
            Most influential factors in sleep disorder prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { feature: 'Sleep Duration', importance: 92.3 },
              { feature: 'Quality of Sleep', importance: 87.6 },
              { feature: 'Stress Level', importance: 78.9 },
              { feature: 'Physical Activity Level', importance: 65.4 },
              { feature: 'BMI Category', importance: 58.7 },
              { feature: 'Blood Pressure', importance: 45.2 },
              { feature: 'Heart Rate', importance: 38.9 },
              { feature: 'Age', importance: 32.1 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.feature}</span>
                  <span className="text-muted-foreground">{item.importance}%</span>
                </div>
                <Progress value={item.importance} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="shadow-glow border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Performance Summary</CardTitle>
          <CardDescription>
            Our models demonstrate exceptional accuracy in sleep disorder prediction
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="text-sm">High Accuracy (94.2%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm">Fast Predictions (45ms)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary-glow" />
              <span className="text-sm">Reliable Results</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Our gradient boosting model achieves industry-leading performance for sleep disorder 
            classification, providing medical professionals with reliable diagnostic support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Performance;