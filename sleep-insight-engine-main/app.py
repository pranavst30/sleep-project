import numpy as np
from flask import Flask, request, jsonify, render_template, redirect, flash, send_file
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

# Load models
boost = pickle.load(open('sleep_boost.pkl','rb'))
Quadra = pickle.load(open('sleep_Quadra.pkl','rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/preview', methods=["POST"])
def preview():
    if request.method == 'POST':
        dataset = request.files['datasetfile']
        df = pd.read_csv(dataset, encoding='unicode_escape')
        df.set_index('Id', inplace=True)
        return render_template("preview.html", df_view=df)

@app.route('/prediction')
def prediction():
    return render_template('prediction.html')

@app.route('/chart')
def chart():
    return render_template('chart.html')

@app.route('/performance')
def performance():
    return render_template('performance.html')

# API Routes for React Frontend
@app.route('/api/predict', methods=['POST'])
def predict_api():
    try:
        data = request.json
        print("Received data:", data)
        
        # Extract data from JSON
        gender = int(data['Gender'])
        age = int(data['Age'])
        occupation = int(data['Occupation'])
        sleep_duration = float(data['Sleep_Duration'])
        quality_of_sleep = int(data['Quality_of_Sleep'])
        physical_activity = int(data['Physical_Activity_Level'])
        stress_level = int(data['Stress_Level'])
        bmi_category = int(data['BMI_Category'])
        blood_pressure = int(data['Blood_Pressure'])
        heart_rate = int(data['Heart_Rate'])
        daily_steps = int(data['Daily_Steps'])
        model_choice = data['Model']
        
        # Convert categorical values for display
        gender_map = {0: 'Male', 1: 'Female'}
        occupation_map = {
            0: 'Software Engineer', 1: 'Doctor', 2: 'Sales Representative',
            3: 'Teacher', 4: 'Nurse', 5: 'Engineer', 6: 'Accountant',
            7: 'Scientist', 8: 'Lawyer', 9: 'Salesperson', 10: 'Manager'
        }
        bmi_map = {0: 'Overweight', 1: 'Normal', 2: 'Obese', 3: 'Normal Weight'}
        bp_map = {
            0: '126/83', 1: '125/80', 2: '140/90', 3: '120/80', 4: '132/87',
            5: '130/86', 6: '117/76', 7: '118/76', 8: '128/85', 9: '131/86',
            10: '128/84', 11: '115/75', 12: '135/88', 13: '129/84', 14: '129/84',
            15: '130/85', 16: '115/78', 17: '119/77', 18: '121/79', 19: '125/82',
            20: '135/90', 21: '122/80', 22: '142/92', 23: '140/95', 24: '139/91',
            25: '118/75'
        }
        
        # Prepare input for model
        input_variables = pd.DataFrame([[
            gender, age, occupation, sleep_duration, quality_of_sleep,
            physical_activity, stress_level, bmi_category, blood_pressure,
            heart_rate, daily_steps
        ]], columns=[
            'Gender', 'Age', 'Occupation', 'Sleep_Duration', 'Quality_of_Sleep',
            'Physical_Activity_Level', 'Stress_Level', 'BMI_Category',
            'Blood_Pressure', 'Heart_Rate', 'Daily_Steps'
        ], index=['input'])
        
        final_features = input_variables.to_numpy()
        print("Model input:", final_features)
        
        # Make prediction based on selected model
        if model_choice == 'GradientBoostingClassifier':
            prediction = boost.predict(final_features)
            output = prediction[0]
        elif model_choice == 'QuadraticDiscriminantAnalysis':
            prediction = Quadra.predict(final_features)
            output = prediction[0]
        else:
            return jsonify({'error': 'Invalid model selection'}), 400
        
        # Return prediction with user data
        response_data = {
            'prediction': output,
            'model': model_choice,
            'user_data': {
                'gender': gender_map.get(gender, 'Unknown'),
                'age': age,
                'occupation': occupation_map.get(occupation, 'Unknown'),
                'sleep_duration': sleep_duration,
                'quality_of_sleep': quality_of_sleep,
                'physical_activity': physical_activity,
                'stress_level': stress_level,
                'bmi_category': bmi_map.get(bmi_category, 'Unknown'),
                'blood_pressure': bp_map.get(blood_pressure, 'Unknown'),
                'heart_rate': heart_rate,
                'daily_steps': daily_steps
            }
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

# Original form-based predict route for HTML templates
@app.route('/predict', methods=['POST'])
def predict():
    resul = {}
    result = ''

    if request.method == 'POST': 
        resul = request.form.to_dict()
        print(resul)
   
        Gender = request.form['Gender']
        if Gender == '0':
            Depa = 'Male'
        elif Gender == '1':
            Depa = 'Female'
        
        Age = request.form['Age']   
        Occupation = request.form['Occupation']
        if Occupation == '0':
            Edu = 'Software Engineer'
        elif Occupation == '1':
            Edu = 'Doctor'
        elif Occupation == '2':
            Edu = 'Sales Representative'
        elif Occupation == '3':
            Edu = 'Teacher'
        elif Occupation == '4':
            Edu = 'Nurse'
        elif Occupation == '5':
            Edu = 'Engineer'     
        elif Occupation == '6':
            Edu = 'Accountant'   
        elif Occupation == '7':
            Edu = 'Scientist'   
        elif Occupation == '8':
            Edu = 'Lawyer'  
        elif Occupation == '9':
            Edu = 'Salesperson'   
        elif Occupation == '10':
            Edu = 'Manager'   
                          
        Sleep_Duration = request.form['Sleep_Duration']
        Quality_of_Sleep = request.form['Quality_of_Sleep']
        Physical_Activity_Level = request.form['Physical_Activity_Level']
        Stress_Level = request.form['Stress_Level']
       
        BMI_Category = request.form['BMI_Category']
        if BMI_Category == '0':
            Job = 'Overweight'
        elif BMI_Category == '1':
            Job = 'Normal'
        elif BMI_Category == '2':
            Job = 'Obese' 
        elif BMI_Category == '3':
            Job = 'Normal Weight'
          
        Blood_Pressure = request.form['Blood_Pressure']
        if Blood_Pressure == '0':
            jobs = '126/83'
        elif Blood_Pressure == '1':
            jobs = '125/80'
        elif Blood_Pressure == '2':
            jobs = '140/90'
        elif Blood_Pressure == '3':
            jobs = '120/80' 
        elif Blood_Pressure == '4':
            jobs = '132/87'
        elif Blood_Pressure == '5':
            jobs = '130/86'
        elif Blood_Pressure == '6':
            jobs = '117/76' 
        elif Blood_Pressure == '7':
            jobs = '118/76'
        elif Blood_Pressure == '8':
            jobs = '128/85'
        elif Blood_Pressure == '9':
            jobs = '131/86' 
        elif Blood_Pressure == '10':
            jobs = '128/84'
        elif Blood_Pressure == '11':
            jobs = '115/75'
        elif Blood_Pressure == '12':
            jobs = '135/88'   
        elif Blood_Pressure == '13':
            jobs = '129/84' 
        elif Blood_Pressure == '14':
            jobs = '129/84'
        elif Blood_Pressure == '15':
            jobs = '130/85'
        elif Blood_Pressure == '16':
            jobs = '115/78' 
        elif Blood_Pressure == '17':
            jobs = '119/77'
        elif Blood_Pressure == '18':
            jobs = '121/79'
        elif Blood_Pressure == '19':
            jobs = '125/82' 
        elif Blood_Pressure == '20':
            jobs = '135/90'
        elif Blood_Pressure == '21':
            jobs = '122/80'
        elif Blood_Pressure == '22':
            jobs = '142/92'   
        elif Blood_Pressure == '23':
            jobs = '140/95'
        elif Blood_Pressure == '24':
            jobs = '139/91'
        elif Blood_Pressure == '25':
            jobs = '118/75'           
        Heart_Rate = request.form['Heart_Rate']
        Daily_Steps = request.form['Daily_Steps']
        Model = request.form['Model']
        
        input_variables = pd.DataFrame([[Gender,Age, Occupation, Sleep_Duration, Quality_of_Sleep, Physical_Activity_Level, Stress_Level, BMI_Category, Blood_Pressure, Heart_Rate,Daily_Steps]],
                                        columns=['Gender','Age','Occupation','Sleep_Duration','Quality_of_Sleep','Physical_Activity_Level','Stress_Level','BMI_Category','Blood_Pressure','Heart_Rate','Daily_Steps'],
                                        index=['input'])

        final_features = input_variables.to_numpy()
        print(final_features)

        if Model == 'GradientBoostingClassifier':
            prediction = boost.predict(final_features)
            output = prediction[0]
        elif Model == 'QuadraticDiscriminantAnalysis':
            prediction = Quadra.predict(final_features)
            output = prediction[0]
    
    return render_template('result.html', prediction_text=output, model=Model,Depa=Depa,Age=Age,Edu=Edu,Sleep_Duration=Sleep_Duration,Quality_of_Sleep=Quality_of_Sleep,Physical_Activity_Level=Physical_Activity_Level,Stress_Level=Stress_Level,Job=Job,jobs=jobs,Heart_Rate=Heart_Rate,Daily_Steps=Daily_Steps)

if __name__ == "__main__":
    app.run(debug=True, port=5000)