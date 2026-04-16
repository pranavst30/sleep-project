import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Brain, User, Clock, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PredictionFormData {
  Gender: string;
  Age: string;
  Occupation: string;
  Sleep_Duration: string;
  Quality_of_Sleep: string;
  Physical_Activity_Level: string;
  Stress_Level: string;
  BMI_Category: string;
  Blood_Pressure: string;
  Heart_Rate: string;
  Daily_Steps: string;
}

const Prediction = () => {
  const [formData, setFormData] = useState<PredictionFormData>({
    Gender: '',
    Age: '',
    Occupation: '',
    Sleep_Duration: '',
    Quality_of_Sleep: '',
    Physical_Activity_Level: '',
    Stress_Level: '',
    BMI_Category: '',
    Blood_Pressure: '',
    Heart_Rate: '',
    Daily_Steps: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const occupations = [
    'Software Engineer', 'Doctor', 'Sales Representative',
    'Teacher', 'Nurse', 'Engineer', 'Accountant',
    'Scientist', 'Lawyer', 'Salesperson', 'Manager',
  ];

  const bmiCategories = ['Overweight', 'Normal', 'Obese'];

  const bloodPressureOptions = [
    '126/83', '125/80', '140/90', '120/80', '132/87', '130/86',
    '117/76', '118/76', '128/85', '131/86', '128/84', '115/75',
    '135/88', '129/84', '130/85', '115/78', '119/77', '121/79',
    '125/82', '135/90', '122/80', '142/92', '140/95', '139/91', '118/75',
  ];

  const handleInputChange = (field: keyof PredictionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fillDummyData = () => {
    setFormData({
      Gender: 'Male',
      Age: '30',
      Occupation: 'Software Engineer',
      Sleep_Duration: '7.5',
      Quality_of_Sleep: '7',
      Physical_Activity_Level: '50',
      Stress_Level: '3',
      BMI_Category: 'Normal',
      Blood_Pressure: '120/80',
      Heart_Rate: '70',
      Daily_Steps: '8000',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    const requiredFields = Object.keys(formData) as (keyof PredictionFormData)[];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Call Flask backend JSON API
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get prediction');
      }

      const result = await response.json();

      toast({
        title: "Analysis Complete",
        description: "Sleep disorder prediction completed successfully.",
      });

      // Navigate to results with prediction result
      navigate('/results', { state: { predictionResult: result } });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to prediction service. Make sure your Flask backend is running on port 5000.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Sleep Disorder Prediction</h1>
        <p className="text-lg text-muted-foreground">
          Enter your health metrics for AI-powered sleep disorder analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>Basic demographic information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.Gender} onValueChange={(value) => handleInputChange('Gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="100"
                placeholder="Enter your age"
                value={formData.Age}
                onChange={(e) => handleInputChange('Age', e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Select value={formData.Occupation} onValueChange={(value) => handleInputChange('Occupation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your occupation" />
                </SelectTrigger>
                <SelectContent>
                  {occupations.map((occ) => (
                    <SelectItem key={occ} value={occ}>
                      {occ}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sleep Metrics */}
        <Card className="shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Sleep Metrics</span>
            </CardTitle>
            <CardDescription>Sleep duration and quality assessment</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sleep_duration">Sleep Duration (hours)</Label>
              <Input
                id="sleep_duration"
                type="number"
                min="1"
                max="15"
                step="0.1"
                placeholder="e.g., 7.5"
                value={formData.Sleep_Duration}
                onChange={(e) => handleInputChange('Sleep_Duration', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality_of_sleep">Quality of Sleep (1-10)</Label>
              <Input
                id="quality_of_sleep"
                type="number"
                min="1"
                max="10"
                placeholder="Rate from 1-10"
                value={formData.Quality_of_Sleep}
                onChange={(e) => handleInputChange('Quality_of_Sleep', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <Card className="shadow-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>Health Metrics</span>
            </CardTitle>
            <CardDescription>Physical health and activity measurements</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="physical_activity">Physical Activity Level (1-100)</Label>
              <Input
                id="physical_activity"
                type="number"
                min="1"
                max="100"
                placeholder="e.g., 75"
                value={formData.Physical_Activity_Level}
                onChange={(e) => handleInputChange('Physical_Activity_Level', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stress_level">Stress Level (1-10)</Label>
              <Input
                id="stress_level"
                type="number"
                min="1"
                max="10"
                placeholder="Rate from 1-10"
                value={formData.Stress_Level}
                onChange={(e) => handleInputChange('Stress_Level', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bmi_category">BMI Category</Label>
              <Select value={formData.BMI_Category} onValueChange={(value) => handleInputChange('BMI_Category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select BMI category" />
                </SelectTrigger>
                <SelectContent>
                  {bmiCategories.map((bmi) => (
                    <SelectItem key={bmi} value={bmi}>
                      {bmi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blood_pressure">Blood Pressure</Label>
              <Select value={formData.Blood_Pressure} onValueChange={(value) => handleInputChange('Blood_Pressure', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood pressure" />
                </SelectTrigger>
                <SelectContent>
                  {bloodPressureOptions.map((bp) => (
                    <SelectItem key={bp} value={bp}>
                      {bp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heart_rate">Heart Rate (BPM)</Label>
              <Input
                id="heart_rate"
                type="number"
                min="40"
                max="200"
                placeholder="e.g., 72"
                value={formData.Heart_Rate}
                onChange={(e) => handleInputChange('Heart_Rate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daily_steps">Daily Steps</Label>
              <Input
                id="daily_steps"
                type="number"
                min="0"
                max="50000"
                placeholder="e.g., 8000"
                value={formData.Daily_Steps}
                onChange={(e) => handleInputChange('Daily_Steps', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={fillDummyData}
            disabled={isLoading}
          >
            Fill Dummy Data
          </Button>

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-12 py-6 text-lg"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Predict Sleep Disorder</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Prediction;
