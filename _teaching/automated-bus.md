---
title: "Towards Automated Busses in Public Transport"
category: Lecture
description: "Co-Simulation Use-Case Sumonity"
duration: "2026"
order: 3
---

## 1. Fundamentals and Operational Design Domain (ODD)
* **Motivation:** Autonomous buses offer significant benefits for public transit, including increased service frequency and quality, reduced operating costs, improved mobility equity, and a mitigation strategy for driver shortages.
* **Automation Framework:** Structured around SAE J3016 levels of driving automation (ranging from Level 0 No Automation to Level 5 Full Driving Automation).
* **ODD Classification:** Defined per ISO 34503:2023 across three main categories: scenery elements (e.g., zones, junctions), environmental conditions (e.g., weather, illumination), and dynamic elements (e.g., traffic agents, subject vehicles).
* **Public Transport (PT) ODD Specifics:**
  * **Legal & Regulatory:** Bound by national (e.g., Passenger Transportation Law, accessibility acts) and municipal/city-level rules of conduct and carriage regulations across different jurisdictions (EU, US, Canada, Germany).
  * **Driver Task Replacement:** Automated systems must perform non-driving driver duties spanning operation, safety monitoring, and communication (e.g., stop skipping, rule enforcement, monitoring payments, clearing door zones).
  * **Universal Accessibility:** Must meet statutory accessibility requirements for all passengers, including individuals with visual impairments or neurodivergent conditions (e.g., Autism Spectrum Disorder).
  * **Form Factors & Platooning:** Encompasses various vehicle types (full-size omnibuses, automated shuttles) and platooning setups (e.g., human-driven leader coupled with automated followers).


## 2. Selected Research Topics in Automated PT
* **System Design & Operations:** Examines trade-offs across operation schemes (line-based vs. pooling/hailing), boarding locations (fixed vs. flexible), and demand sensitivity (scheduled vs. on-demand).
* **Bus Stop & PUDO Assessment:** Spatial analysis and prioritization of city-wide bus stops and street segments for pick-up/drop-off (PUDO) zones using combined policy weightings of safety, accessibility, and operational efficiency.
* **Ride-Pooling Optimization:** Algorithmic vehicle assignment and re-assignment strategies balancing operator costs (fleet size, vehicle distance) against passenger service quality (waiting/travel time).
* **Motion Planning:** Continuous trajectory planning governed by vehicle dynamics and regulatory framework constraints expressed in temporal logic formulas to maintain safety while ensuring efficiency.


## 3. Data Collection, Testing, and Benchmarking
* **Virtual Testing Pipelines:** Utilizes Software-in-the-Loop (SiL), Hardware-in-the-Loop (HiL), and Human-in-the-Loop (HiL) simulation frameworks to evaluate automated systems.
* **Microscopic Datasets & Methodologies:** Combines real-life observations (LiDAR, drone video, roadside cameras) for frequent/regular traffic scenarios with test beds and targeted simulator experiments to capture critical, rare edge cases and near-crash events.
* **Benchmarking & Safety Criteria:** Evaluates system functions against objective scenario databases (e.g., EURO NCAP) and establishes quantitative safety benchmarks to determine performance relative to human drivers.


---
Lecture at TU Delft, 2026
![Lecture TU Delft](/img/lecture-delft.jpg)