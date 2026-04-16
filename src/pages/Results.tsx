import { Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Brain,
  User,
  Clock,
  Heart,
  Activity,
  RefreshCw,
  FileText
} from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const predictionResult = location.state?.predictionResult;

  // Redirect to prediction page if no result data
  if (!predictionResult) {
    return <Navigate to="/prediction" replace />;
  }

  const { prediction, description, user_data: userData } = predictionResult;

  const getPredictionColor = (pred: string) => {
    switch (pred) {
      case 'Healthy': return 'text-accent';
      case 'Sleep Apnea': return 'text-destructive';
      case 'Insomnia': return 'text-yellow-600';
      default: return 'text-muted-foreground';
    }
  };

  const getPredictionIcon = (pred: string) => {
    switch (pred) {
      case 'Healthy': return <CheckCircle className="h-8 w-8 text-accent" />;
      case 'Sleep Apnea': return <XCircle className="h-8 w-8 text-destructive" />;
      case 'Insomnia': return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      default: return <Brain className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getRecommendations = (pred: string) => {
    switch (pred) {
      case 'Healthy':
        return [
          'Maintain your current sleep habits',
          'Continue regular physical activity',
          'Monitor stress levels regularly',
          'Keep consistent sleep schedule'
        ];
      case 'Sleep Apnea':
        return [
          'Consult a sleep specialist immediately',
          'Consider sleep study evaluation',
          'Maintain healthy weight',
          'Avoid alcohol before bedtime',
          'Sleep on your side'
        ];
      case 'Insomnia':
        return [
          'Establish consistent bedtime routine',
          'Limit screen time before bed',
          'Practice relaxation techniques',
          'Consider cognitive behavioral therapy',
          'Avoid caffeine late in the day'
        ];
      default:
        return ['Consult with healthcare provider for personalized advice'];
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Prediction Results</h1>
        <p className="text-lg text-muted-foreground">
          Analysis completed using SVM Optimized Model
        </p>
      </div>

      {/* Main Prediction Result */}
      <Card className="shadow-glow border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getPredictionIcon(prediction)}
          </div>
          <CardTitle className="text-2xl">
            Sleep Disorder Prediction
          </CardTitle>
          <CardDescription>
            Based on your health metrics analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-muted-foreground">Result:</h3>
            <Badge
              variant="outline"
              className={`text-2xl font-bold px-6 py-2 ${getPredictionColor(prediction)} border-current`}
            >
              {prediction}
            </Badge>
          </div>

          {description && (
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Model Used:</span>
              <span className="font-medium">SVM (Optimized)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Analysis Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Summary */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Input Summary</span>
          </CardTitle>
          <CardDescription>Your submitted health metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Gender & Age</p>
                <p className="font-medium">{userData.gender}, {userData.age} years</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Activity className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Occupation</p>
                <p className="font-medium">{userData.occupation}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Sleep Duration</p>
                <p className="font-medium">{userData.sleep_duration} hours</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Heart className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Sleep Quality</p>
                <p className="font-medium">{userData.quality_of_sleep}/10</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Activity className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Activity Level</p>
                <p className="font-medium">{userData.physical_activity}/100</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Brain className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Stress Level</p>
                <p className="font-medium">{userData.stress_level}/10</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">BMI Category</p>
              <p className="font-medium">{userData.bmi_category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blood Pressure</p>
              <p className="font-medium">{userData.blood_pressure}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Heart Rate</p>
              <p className="font-medium">{userData.heart_rate} BPM</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Steps</p>
              <p className="font-medium">{userData.daily_steps}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Health Recommendations</span>
          </CardTitle>
          <CardDescription>
            Personalized suggestions based on your results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {getRecommendations(prediction).map((rec: string, index: number) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          asChild
          className="flex items-center space-x-2"
        >
          <Link to="/prediction">
            <RefreshCw className="h-4 w-4" />
            <span>New Prediction</span>
          </Link>
        </Button>

        <Button
          size="lg"
          asChild
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <Link to="/chart">
            <Activity className="h-4 w-4 mr-2" />
            <span>View Analytics</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Results;
