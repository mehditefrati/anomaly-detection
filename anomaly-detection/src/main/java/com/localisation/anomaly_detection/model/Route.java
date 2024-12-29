package com.localisation.anomaly_detection.model;

import java.util.List;

public class Route {
    private List<double[]> coordinates;

    public Route(List<double[]> coordinates) {
        this.coordinates = coordinates;
    }

    public List<double[]> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<double[]> coordinates) {
        this.coordinates = coordinates;
    }
}

