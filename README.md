# Sleep Health Predictor

AI-powered sleep disorder prediction using machine learning.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Flask + scikit-learn (SVM model)

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3 with pip

### Run the Frontend

```bash
cd sleep-insight-engine-main
npm install
npm run dev
```

Frontend runs at `http://localhost:8080`.

### Run the Backend

```bash
pip install flask flask-cors joblib pandas scikit-learn
python app.py
```

Flask API runs at `http://localhost:5000`.

## Project Structure

```
├── app.py                    # Flask backend API
├── svm_optimized_final.pkl   # Trained SVM model
└── sleep-insight-engine-main/
    └── src/
        ├── pages/            # Home, Prediction, Results, Chart, Performance
        ├── components/       # Layout, shadcn/ui components
        └── App.tsx           # Routes
```
