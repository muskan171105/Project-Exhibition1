import cv2
import numpy as np
from scipy.signal import find_peaks
import time
import imutils
import json

def calculate_heart_rate(video_source=0):
    cap = cv2.VideoCapture(video_source)

    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    heart_rate_data = []
    start_time = time.time()
    fps = cap.get(cv2.CAP_PROP_FPS)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = imutils.resize(frame, width=600)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            roi = gray[y:y+h, x:x+w]
            roi = cv2.GaussianBlur(roi, (5, 5), 0)

            mean_val = np.mean(roi)
            heart_rate_data.append(mean_val)

            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)

        cv2.imshow('Health Monitoring System', frame)

        if time.time() - start_time > 30:
            break

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    heart_rate_data = np.array(heart_rate_data)

    sampling_rate = len(heart_rate_data) / 30  
    time_series = np.linspace(0, 30, len(heart_rate_data))

    peaks, _ = find_peaks(heart_rate_data, distance=sampling_rate/2)
    heart_rate = len(peaks) * 60 / 30  

    rr_intervals = np.diff(peaks) / sampling_rate
    hrv = np.std(rr_intervals) * 1000  
    stress_level = "High" if hrv < 50 else "Normal"

    respiratory_rate = len(peaks) * 2  

    illness_index = (100 - abs(heart_rate - 70) - abs(hrv - 70)) / 10
    illness_index = max(0, min(10, illness_index))  

    mood = "Calm" if stress_level == "Normal" and hrv > 60 else "Anxious"

    sleep_quality = "Poor" if hrv < 50 or stress_level == "High" else "Good"

    cardiac_risk = "High" if hrv < 40 or heart_rate > 100 else "Normal"

    activity_level = "Active" if respiratory_rate > 18 and heart_rate > 80 else "Resting"

    # Prepare data for Node.js in JSON format
    result = {
        'heart_rate': heart_rate,
        'stress_level': stress_level,
        'hrv': hrv,
        'respiratory_rate': respiratory_rate,
        'illness_index': illness_index,
        'mood': mood,
        'sleep_quality': sleep_quality,
        'cardiac_risk': cardiac_risk,
        'activity_level': activity_level
    }

    # Output the result as JSON to stdout
    print(json.dumps(result))

if __name__ == "__main__":
    calculate_heart_rate()
