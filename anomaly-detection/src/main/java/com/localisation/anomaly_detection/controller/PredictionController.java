package com.localisation.anomaly_detection.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.localisation.anomaly_detection.service.ModelService;
import com.localisation.anomaly_detection.model.Route;

@RestController
@RequestMapping("/api")
public class PredictionController {

    @Autowired
    private ModelService modelService;

    @PostMapping("/detect-anomaly")
    public boolean detectAnomaly(@RequestBody Route route) {
        return modelService.isAnomalousRoute(route.getCoordinates());
    }
}

