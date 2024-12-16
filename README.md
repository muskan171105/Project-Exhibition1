# Hriday Tarni

Hriday Tarni is an innovative project that leverages machine learning to detect heart rate by analyzing changes in the lighting of a person's face. This solution uses a camera feed to monitor subtle variations in light reflecting off the skin, processing these signals to provide an accurate heart rate estimation.

## Features
- **Real-time Heart Rate Detection:** Uses video feed to detect and analyze subtle lighting changes on the face.
- **Non-invasive Monitoring:** No physical contact required for heart rate measurement.
- **Accurate Estimations:** Powered by advanced ML algorithms for precision.
- **Scalable Backend:** Supports real-time data processing and can be integrated with cloud services for large-scale deployment.

## Project Structure

```bash
├── Hriday-Tarni/
│   ├── backend/
│   │   ├── app/
│   │   │   ├── __init__.py      # Initialization of backend services
│   │   │   ├── routes.py        # API routes to handle requests
│   │   │   ├── models.py        # ML model loading and inference
│   │   │   ├── utils.py         # Helper functions for signal processing
│   │   ├── requirements.txt     # Dependencies for backend (Flask, ML libraries)
│   ├── ml_model/
│   │   ├── train_model.ipynb    # Jupyter notebook for model training
│   │   ├── heart_rate_model.pkl # Pre-trained ML model
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── CameraFeed.js   # Component to handle video input from webcam
│   │   │   │   ├── HeartRateDisplay.js # UI for displaying heart rate
│   │   │   ├── App.js              # Main React App
│   │   ├── package.json         # Frontend dependencies
│   ├── README.md                # Project documentation
│   ├── LICENSE                  # License information
│   ├── .gitignore               # Files to ignore in Git
```

## Tech Stack

### Backend
- Flask: Web framework to handle API routes and communicate with the frontend.
- Python: For backend logic and integrating the machine learning model.
Machine Learning Libraries:
- OpenCV: For video capture and face detection.
- scikit-learn / TensorFlow: For model training and inference.
- Numpy, Pandas: Data manipulation and signal processing.

### Frontend
- React.js: For building the user interface and real-time data visualization.
- HTML/CSS: Structuring and styling the web app.
- JavaScript: For dynamic behavior and handling user interactions.

### Machine Learning
- Preprocessing: Techniques to isolate the region of interest (face) and extract lighting changes.
- Model: A trained ML model capable of detecting heart rate variations from the captured video feed.
- Deployment
- Docker: For containerizing the application.
- AWS/GCP: Cloud services for hosting and scaling.
- Postman: API testing and debugging.

## Installation
1. Clone the Repository
```
git clone https://github.com/muskan171105/Project-Exhibition1.git
```
2. Install Backend Dependencies
```
cd Hriday-Tarni/backend
pip install -r requirements.txt
```
3. Run the Backend
```
python app.py
```
4. Install Frontend Dependencies
```
cd ../frontend
npm install
```
5. Run the Frontend
```
npm start
```

## Usage

1. Access the app on your local machine at http://localhost:3000.
2. Allow the webcam to capture video for heart rate monitoring.
3. The application will process the video and display the heart rate in real-time.

## Future Improvements
- Enhanced accuracy using deep learning techniques.
- Integration with mobile devices.
- Real-time cloud processing for scalability.
