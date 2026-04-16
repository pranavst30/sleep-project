import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Activity } from 'lucide-react';

interface ChartData {
  sleepDisorderData: Array<{ name: string; count: number; percentage: number }>;
  ageGroupData: Array<{ ageGroup: string; count: number; avgSleepQuality: number }>;
  occupationData: Array<{ occupation: string; count: number; avgStress: number }>;
  sleepQualityData: Array<{ duration: number; quality: number; stressLevel: number }>;
  bmiData: Array<{ category: string; count: number; avgSleepDuration: number }>;
}

const Chart = () => {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load and process the dataset
    fetch('/data/sleep_dataset.csv')
      .then(response => response.text())
      .then(csvText => {
        const lines = csvText.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',');
        
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj: any, header, index) => {
            const cleanHeader = header.trim();
            const value = values[index]?.trim();
            obj[cleanHeader] = value;
            return obj;
          }, {});
        }).filter(row => row['Person ID']);

        // Process data for charts
        const processedData = processChartData(parsedData);
        setData(processedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  const processChartData = (rawData: any[]): ChartData => {
    // Sleep Disorder Distribution
    const disorderCounts = rawData.reduce((acc, row) => {
      const disorder = row['Sleep Disorder'] || 'None';
      acc[disorder] = (acc[disorder] || 0) + 1;
      return acc;
    }, {});

    const sleepDisorderData = Object.entries(disorderCounts).map(([name, count]: [string, any]) => ({
      name,
      count,
      percentage: Math.round((count / rawData.length) * 100)
    }));

    // Age Group Analysis
    const ageGroupCounts: any = {};
    const ageGroupQuality: any = {};
    
    rawData.forEach(row => {
      const age = parseInt(row.Age);
      let ageGroup = '';
      if (age < 30) ageGroup = '20-29';
      else if (age < 40) ageGroup = '30-39';
      else if (age < 50) ageGroup = '40-49';
      else ageGroup = '50+';
      
      ageGroupCounts[ageGroup] = (ageGroupCounts[ageGroup] || 0) + 1;
      if (!ageGroupQuality[ageGroup]) ageGroupQuality[ageGroup] = [];
      ageGroupQuality[ageGroup].push(parseFloat(row['Quality of Sleep']) || 0);
    });

    const ageGroupData = Object.keys(ageGroupCounts).map(ageGroup => ({
      ageGroup,
      count: ageGroupCounts[ageGroup],
      avgSleepQuality: Math.round(
        (ageGroupQuality[ageGroup].reduce((a: number, b: number) => a + b, 0) / ageGroupQuality[ageGroup].length) * 10
      ) / 10
    }));

    // Occupation vs Stress Level
    const occupationStress: any = {};
    const occupationCounts: any = {};
    
    rawData.forEach(row => {
      const occupation = row.Occupation;
      if (!occupationStress[occupation]) occupationStress[occupation] = [];
      occupationStress[occupation].push(parseFloat(row['Stress Level']) || 0);
      occupationCounts[occupation] = (occupationCounts[occupation] || 0) + 1;
    });

    const occupationData = Object.keys(occupationStress)
      .filter(occ => occupationCounts[occ] >= 5) // Only show occupations with 5+ entries
      .map(occupation => ({
        occupation: occupation.length > 12 ? occupation.slice(0, 12) + '...' : occupation,
        count: occupationCounts[occupation],
        avgStress: Math.round(
          (occupationStress[occupation].reduce((a: number, b: number) => a + b, 0) / occupationStress[occupation].length) * 10
        ) / 10
      }));

    // Sleep Quality vs Duration
    const sleepQualityData = rawData
      .filter(row => row['Sleep Duration'] && row['Quality of Sleep'])
      .map(row => ({
        duration: parseFloat(row['Sleep Duration']),
        quality: parseFloat(row['Quality of Sleep']),
        stressLevel: parseFloat(row['Stress Level']) || 0
      }))
      .slice(0, 100); // Limit for performance

    // BMI Category Analysis
    const bmiCounts: any = {};
    const bmiSleepDuration: any = {};
    
    rawData.forEach(row => {
      const bmi = row['BMI Category'];
      bmiCounts[bmi] = (bmiCounts[bmi] || 0) + 1;
      if (!bmiSleepDuration[bmi]) bmiSleepDuration[bmi] = [];
      bmiSleepDuration[bmi].push(parseFloat(row['Sleep Duration']) || 0);
    });

    const bmiData = Object.keys(bmiCounts).map(category => ({
      category,
      count: bmiCounts[category],
      avgSleepDuration: Math.round(
        (bmiSleepDuration[category].reduce((a: number, b: number) => a + b, 0) / bmiSleepDuration[category].length) * 10
      ) / 10
    }));

    return {
      sleepDisorderData,
      ageGroupData,
      occupationData,
      sleepQualityData,
      bmiData
    };
  };

  const COLORS = ['hsl(var(--accent))', 'hsl(var(--destructive))', 'hsl(var(--primary))', 'hsl(var(--primary-glow))'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load chart data</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Sleep Health Analytics</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive data visualization and insights
        </p>
      </div>

      <Tabs defaultValue="disorders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="disorders" className="flex items-center space-x-2">
            <PieChartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Disorders</span>
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Demographics</span>
          </TabsTrigger>
          <TabsTrigger value="lifestyle" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Lifestyle</span>
          </TabsTrigger>
          <TabsTrigger value="correlations" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Correlations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disorders" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle>Sleep Disorder Distribution</CardTitle>
                <CardDescription>Percentage breakdown of sleep disorders in the dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.sleepDisorderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {data.sleepDisorderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle>Disorder Counts</CardTitle>
                <CardDescription>Absolute numbers of each sleep disorder</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.sleepDisorderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle>Age Group Distribution</CardTitle>
                <CardDescription>Count and average sleep quality by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.ageGroupData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-medical">
              <CardHeader>
                <CardTitle>BMI Category Analysis</CardTitle>
                <CardDescription>Average sleep duration by BMI category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.bmiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgSleepDuration" fill="hsl(var(--primary-glow))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lifestyle" className="space-y-6">
          <Card className="shadow-medical">
            <CardHeader>
              <CardTitle>Occupation vs Stress Level</CardTitle>
              <CardDescription>Average stress levels across different occupations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.occupationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="occupation" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgStress" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <Card className="shadow-medical">
            <CardHeader>
              <CardTitle>Sleep Duration vs Quality</CardTitle>
              <CardDescription>Correlation between sleep duration and quality (color indicates stress level)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={data.sleepQualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="duration" name="Sleep Duration" unit="h" />
                  <YAxis dataKey="quality" name="Sleep Quality" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="quality" fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chart;