import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# ---------------------------------------------------------------------------
# Load the saved SVM pipeline (ColumnTransformer + SVC)
# ---------------------------------------------------------------------------
model = joblib.load("svm_optimized_final.pkl")

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React frontend

# ---------------------------------------------------------------------------
# Encoding maps – must match the label-encoding used during training
# ---------------------------------------------------------------------------
GENDER_MAP = {"Male": 0, "Female": 1}

OCCUPATION_MAP = {
    "Software Engineer": 0, "Doctor": 1, "Sales Representative": 2,
    "Teacher": 3, "Nurse": 4, "Engineer": 5, "Accountant": 6,
    "Scientist": 7, "Lawyer": 8, "Salesperson": 9, "Manager": 10,
}

BMI_MAP = {"Overweight": 0, "Normal": 1, "Obese": 2}

BLOOD_PRESSURE_MAP = {
    "126/83": 0, "125/80": 1, "140/90": 2, "120/80": 3,
    "132/87": 4, "130/86": 5, "117/76": 6, "118/76": 7,
    "128/85": 8, "131/86": 9, "128/84": 10, "115/75": 11,
    "135/88": 12, "129/84": 13, "130/85": 15, "115/78": 16,
    "119/77": 17, "121/79": 18, "125/82": 19, "135/90": 20,
    "122/80": 21, "142/92": 22, "140/95": 23, "139/91": 24,
    "118/75": 25,
}

# Target class labels
CLASS_NAMES = {0: "Healthy", 1: "Insomnia", 2: "Sleep Apnea"}

# Friendly descriptions for each prediction
CLASS_DESCRIPTIONS = {
    "Healthy": "Great news! Based on the provided parameters, no sleep disorder is indicated. Keep maintaining a healthy lifestyle!",
    "Insomnia": "The model predicts signs of Insomnia — difficulty falling or staying asleep. Consider consulting a healthcare professional for guidance.",
    "Sleep Apnea": "The model predicts signs of Sleep Apnea — breathing repeatedly stops and starts during sleep. A medical evaluation is recommended.",
}

# Feature column order (must match training data)
FEATURE_COLS = [
    "Gender", "Age", "Occupation", "Sleep Duration",
    "Quality of Sleep", "Physical Activity Level", "Stress Level",
    "BMI Category", "Blood Pressure", "Heart Rate", "Daily Steps",
]


# ---------------------------------------------------------------------------
# JSON API endpoint for the React frontend
# ---------------------------------------------------------------------------
@app.route("/api/predict", methods=["POST"])
def api_predict():
    try:
        data = request.get_json()

        # Encode categorical fields using the maps
        gender = GENDER_MAP[data["Gender"]]
        age = int(data["Age"])
        occupation = OCCUPATION_MAP[data["Occupation"]]
        sleep_duration = float(data["Sleep_Duration"])
        quality_of_sleep = int(data["Quality_of_Sleep"])
        physical_activity = int(data["Physical_Activity_Level"])
        stress_level = int(data["Stress_Level"])
        bmi_category = BMI_MAP[data["BMI_Category"]]
        blood_pressure = BLOOD_PRESSURE_MAP[data["Blood_Pressure"]]
        heart_rate = int(data["Heart_Rate"])
        daily_steps = int(data["Daily_Steps"])

        # Build a single-row DataFrame that mirrors the training data
        input_data = pd.DataFrame(
            [[gender, age, occupation, sleep_duration, quality_of_sleep,
              physical_activity, stress_level, bmi_category,
              blood_pressure, heart_rate, daily_steps]],
            columns=FEATURE_COLS,
        )

        # Predict
        pred = model.predict(input_data)[0]
        label = CLASS_NAMES.get(pred, str(pred))
        description = CLASS_DESCRIPTIONS.get(label, "")

        return jsonify({
            "prediction": label,
            "description": description,
            "user_data": {
                "gender": data["Gender"],
                "age": age,
                "occupation": data["Occupation"],
                "bmi_category": data["BMI_Category"],
                "blood_pressure": data["Blood_Pressure"],
                "sleep_duration": sleep_duration,
                "quality_of_sleep": quality_of_sleep,
                "physical_activity": physical_activity,
                "stress_level": stress_level,
                "heart_rate": heart_rate,
                "daily_steps": daily_steps,
            },
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
