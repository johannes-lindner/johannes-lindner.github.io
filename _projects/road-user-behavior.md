---
title: Road User Behavior Modelling
category: Modelling
description: Road User Behavior Modelling
status: Active
image: /img/pathsOnMap.png
order: 3
---

## Cyclist Desired Path of Travel
We present a path-finding model for bicyclists navigating urban intersections, considering road infrastructure, driving direction, and occupancy to establish a free-flow baseline excluding road user interaction. To capture behavioral heterogeneity, we employ a Sequential Neural Posterior Estimation (SNPE) framework for parameter estimation. We successfully generate realistic cyclist paths based on scenario features, finding that direction of travel and occupancy are least influential, whereas infrastructure types (road, sidewalk, bicycle lane) are most important. Generalizability across varying intersections is achieved for origin-destination pairs involving bicycle lanes, whereas other scenarios currently lack transferability. This methodology serves as a foundation for microscopic traffic simulation, providing a deterministic baseline upon which state-of-the-art bicycle motion control and road user interaction models can be integrated. Furthermore, quantifying how physical infrastructure dictates path choice provides insights for optimizing urban intersection safety and enhances trajectory prediction algorithms critical for automated vehicles operating in mixed traffic. 

> Preprint: [https://doi.org/10.13140/RG.2.2.34748.60806](https://doi.org/10.13140/RG.2.2.34748.60806)


![Bicycle Pathfinding Model Description](/img/modelDescription.png)


## Bus Passenger Modelling
Short dwell times at bus stops are crucial for efficient public transport operations, yet existing traffic simulation tools commonly simplify passenger boarding. In this paper, we extend the SUMO-based co-simulation framework, Sumonity, to incorporate a sub-microscopic pedestrian model for city bus boarding. Our approach simulates real-time passenger flow, pathfinding, and door congestion in a Unity-based environment. We conduct a full-factorial simulation experiment with four bus door configurations, ranging from fully open double doors to partially closed options. We also consider different passenger loads between 1 and 50, yielding 200 unique scenarios. Detailed spatiotemporal data on passenger movements and boarding times are generated for each scenario. Analysis of crowding behaviors and door usage reveals significant sensitivity of boarding times to both passenger volume and door availability. These findings demonstrate the importance of accurately modeling pedestrian interactions for reliable dwell-time forecasts and underscore the potential of sub-microscopic pedestrian simulations.

> Publication: [https://doi.org/10.52825/scp.v6i.2618](https://doi.org/10.52825/scp.v6i.2618)

![Bus Passenger Modelling](/img/bus-boarding-sumonity.png)