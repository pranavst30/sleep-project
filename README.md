# Sleep Health Predictor

An AI-powered sleep disorder prediction application using machine learning models to assess health vitals and lifestyle factors to predict whether a user is healthy, suffers from insomnia, or suffers from sleep apnea. 

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Recharts (for charts)
- **Backend**: Flask API
- **Machine Learning**: Support Vector Machine (SVM) pipeline using scikit-learn

## 🚀 Getting Started

To run the full stack locally, you need to run the Frontend and the Backend simultaneously in **two separate terminal windows**.

### Prerequisites
1. [Node.js & npm](https://nodejs.org/en) installed.
2. [Python 3](https://www.python.org/downloads/) installed.

---

### Step 1: Run the Backend API (Terminal 1)

The backend handles the ML model processing.

```bash
# 1. Ensure you are in the root directory
cd path/to/Sleep-disorder-project-main

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Start the Flask server
python app.py
```
> The Flask API will spin up and run at **http://localhost:5000**

---

### Step 2: Run the Frontend App (Terminal 2)

The frontend handles the UI and dynamic charts.

```bash
# 1. Ensure you are in the root directory
cd path/to/Sleep-disorder-project-main

# 2. Install Node dependencies
npm install

# 3. Start the Vite development server
npm run dev
```
> The React app will be live at **http://localhost:8080**

You can now open a browser and go to `http://localhost:8080`!

---

## 📂 Project Structure

```
.
├── app.py                      # Flask backend API entrypoint
├── api/                        # Vercel serverless integration 
├── requirements.txt            # Python dependencies
├── svm_optimized_final.pkl     # Trained SVM model pipeline
├── package.json                # Node dependencies
├── vite.config.ts              # Vite configuration (proxies /api to Flask)
└── src/                        # Frontend source code
    ├── pages/                  # Home, Prediction, Chart, Performance
    ├── components/             # Layout and reusable UI componentes
    └── ...                     
```
