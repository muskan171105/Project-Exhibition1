# Hriday Tarni

Hriday Tarni is an innovative project that leverages machine learning to detect heart rate by analyzing changes in the lighting of a person's face. This solution uses a camera feed to monitor subtle variations in light reflecting off the skin, processing these signals to provide an accurate heart rate estimation.

## Features

- **Real-time Heart Rate Detection:** Uses video feed to detect and analyze subtle lighting changes on the face.
- **Non-invasive Monitoring:** No physical contact or additional hardware is required.
- **Machine Learning Integration:** Employs advanced algorithms for accurate signal processing and heart rate calculation.
- **User-Friendly Interface:** Provides a simple and intuitive user experience.

## Technology Stack

### Frontend
- **Framework:** React.js
- **Styling:** Tailwind CSS
- **State Management:** Redux
- **Charting:** Chart.js

### Backend
- **Framework:** Flask
- **Machine Learning:** NumPy, OpenCV, SciPy
- **Database:** PostgreSQL
- **API Testing:** Postman

### Tools
- **Version Control:** Git & GitHub
- **Development Environment:** Visual Studio Code

## Installation and Setup

### Prerequisites
- Node.js
- Python 3.7+
- PostgreSQL
- Virtual Environment (optional)

### Frontend Setup
```bash
cd Frontend
npm install
npm start
```

### Backend Setup
```bash
cd Backend
pip install -r requirements.txt
python app.py
```

### Database Setup

Ensure PostgreSQL is running locally or connect to a remote PostgreSQL instance. Update the `config.py` file in the Backend directory with your PostgreSQL connection details.

## Usage
1. Start the backend server: python app.py
2. Run the frontend application: npm start
3. Open the application in your browser and provide camera permissions.
4. Follow on-screen instructions to monitor heart rate in real-time.

## File Structure
``` bash
Project-Exhibition1-main/
|
├── Frontend/         # React-based user interface
|
├── Backend/          # Flask-based server with machine learning logic
|
└── README.md         # Project documentation
```

## Future Enhancements
1. Mobile Application: Extend functionality to Android and iOS platforms.
2. Improved Accuracy: Incorporate additional machine learning models.
3. Integration: Connect with wearable devices for multi-source monitoring.

## Contributing

We welcome contributions to enhance Hriday Tarni. Please follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name
3. Commit your changes: git commit -m 'Add feature-name'
4. Push to the branch: git push origin feature-name
5. Open a pull request.
