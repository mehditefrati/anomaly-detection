import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from typing import Tuple

# Custom metric example (if you have custom metrics or loss functions)
@tf.keras.utils.register_keras_serializable(package='Custom')
class CustomMSE(tf.keras.metrics.MeanSquaredError):
    def __init__(self, name="mse", **kwargs):
        super().__init__(name=name, **kwargs)

# Load the model with the custom metric
model = tf.keras.models.load_model(
    r"C:\Users\mehdi\Downloads\model.h5",
    custom_objects={'mse': CustomMSE}  # Register your custom metric here
)

# Constants for padding and anomaly detection
max_route_length = 200  # Max route length, adjust according to the model
threshold = 0.1  # Threshold for anomaly detection, adjust as needed

# Create the FastAPI app
app = FastAPI()

class RouteData(BaseModel):
    coordinates: List[Tuple[float, float]]  # Improved type hint for coordinates

# Predefined normalization parameters (adjust with actual values from training data)
min_lat = 31.6324805
max_lat = 31.655
min_lon = -7.995
max_lon = -7.990

# Normalize function
def normalize_route(route: List[Tuple[float, float]]) -> List[Tuple[float, float]]:
    """Normalize latitude and longitude to a [0, 1] range."""
    return [
        ((lat - min_lat) / (max_lat - min_lat), (lon - min_lon) / (max_lon - min_lon))
        for lat, lon in route
    ]

@app.post("/predict/")
async def predict_anomaly(route_data: RouteData):
    try:
        # Normalize the route coordinates
        normalized_route = normalize_route(route_data.coordinates)

        # Pad the sequence to match the model's input shape
        padded_route = pad_sequences([normalized_route], maxlen=max_route_length, dtype='float32', padding='post', value=(0, 0))

        # Predict and calculate the reconstruction error
        reconstructed_route = model.predict(padded_route)
        error = np.mean(np.abs(padded_route - reconstructed_route))

        # Check if the route is an anomaly based on the error threshold
        is_anomaly = error > threshold

        # Return the result
        return {"is_anomaly": bool(is_anomaly), "error": float(error)}
    
    except Exception as e:
        # Catch and handle any errors during prediction
        raise HTTPException(status_code=400, detail=f"An error occurred during prediction: {str(e)}")

# Run the FastAPI app (use Uvicorn server to run the app)
# Use: uvicorn app_name:app --reload to run the server (app_name = file name without .py)
