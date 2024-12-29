package com.localisation.anomaly_detection.service;

import org.springframework.stereotype.Service;
import org.tensorflow.*;

import java.util.List;

@Service
public class ModelService {

    private final SavedModelBundle model;
    private final Session session;

    public ModelService() {
        // Load TensorFlow model
        this.model = SavedModelBundle.load("C:\\Users\\mehdi\\Downloads\\localisation\\anomaly-detection\\src\\main\\java\\com\\localisation\\anomaly_detection\\saved_model", "serve");
        this.session = model.session();
    }

    /**
     * Detect anomalies for a given route.
     *
     * @param route List of latitude-longitude pairs representing the route.
     * @return true if the route is anomalous, false otherwise.
     */
    public boolean isAnomalousRoute(List<double[]> route) {
        // Prepare the input tensor (reshape into [1, sequence_length, 2])
        float[][][] inputTensor = new float[1][route.size()][2];
        for (int i = 0; i < route.size(); i++) {
            inputTensor[0][i][0] = (float) route.get(i)[0]; // Latitude
            inputTensor[0][i][1] = (float) route.get(i)[1]; // Longitude
        }

        // Convert input to TensorFlow tensor
        try (Tensor<Float> input = Tensor.create(inputTensor, Float.class)) {
            // Run the model
            Tensor<?> output = session.runner()
                    .feed("serving_default_input_1", input) // Use your model's input name
                    .fetch("StatefulPartitionedCall")      // Use your model's output name
                    .run()
                    .get(0);

            // Extract result (true if anomalous, false otherwise)
            float[] predictions = new float[1];
            output.copyTo(predictions);

            return predictions[0] > 0.5; // Threshold for anomaly
        }
    }
}

