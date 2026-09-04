---
title: "Traffic Simulation"
category: Lecture
description: "Co-Simulation Use-Case Sumonity"
duration: "2022 - today"
order: 4
---

## 1. System Architecture & Interoperability
* **Microscopic Simulation Control (TraCI/SUMO):** Uses the Traffic Control Interface (TraCI) to control, retrieve, and dynamically update simulated entities and traffic light phases within the SUMO traffic simulation environment in real time.
* **3D Environment Integration (Unity):** Interfaces SUMO with the Unity 3D engine to render rich visual surroundings, update traffic light states, and enable realistic interactive scenarios.
* **Communication & Serialization:** 
  * Uses Object-Oriented Programming (OOP) concepts (classes, attributes, methods, and inheritance) to structure real-time vehicle and simulation states.
  * Converts Python objects into dictionaries (key-value pairs) and serializes them into JSON format, allowing language-agnostic data transmission over TCP socket servers to external applications like Unity (C#).

---

## 2. Dynamic Vehicle Modeling
* **Hardware-to-Motion Dynamics:** Converts raw physical inputs (e.g., steering angle and wheel rotational speed) into directional movement.
* **Single-Track Kinematics:** Implements a single-track physical model to compute critical vehicle dynamics—including yaw rate, side-slip angle, lateral/longitudinal tire forces, and velocity—at every time step to update position and heading accurately.

---

## 3. Modular Code Infrastructure
* **Simulation Management (`TraciServer.py`):** Handles initialization, execution loops, and teardown of the SUMO simulation and TraCI socket connections.
* **Network Messaging (`SocketServerSimple.py` & `SumoEntities.py`):** Encapsulates and formats vehicle and traffic light data into structured network payloads sent to external visualization servers.
* **Core Execution (`Exercise.py`):** Inherits from base server classes to execute the main simulation loop, continuously processing user inputs, updating physical state models, and synchronizing external graphics with SUMO traffic.