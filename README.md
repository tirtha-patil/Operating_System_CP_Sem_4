# Page Replacement Simulator

A visual simulation tool for understanding how operating systems manage memory pages, handle page faults, and evaluate page replacement algorithms.

## Overview

The **Page Replacement Simulator** demonstrates how an operating system manages limited physical memory when processes request pages that are not currently loaded into memory. It simulates page replacement strategies, tracks page faults, and helps compare their performance using a given reference string and frame allocation.

Designed as an educational tool, the project makes virtual memory concepts easier to understand through step-by-step simulation and performance analysis.

## Features

- **Reference String Input:** Provide a custom sequence of page references to simulate memory access patterns.
- **Frame Allocation:** Configure the number of available page frames.
- **Algorithm Simulation:** Execute supported page replacement algorithms and observe how pages enter and leave memory.
- **Page Fault Tracking:** Identify page faults and calculate the total number of faults during execution.
- **Performance Comparison:** Compare the results of supported algorithms using the same reference string and frame configuration.
- **Interactive Visualization:** Follow the simulation to understand page hits, page faults, and replacement decisions.

## Algorithms

The simulator can include the following algorithms, depending on the implementations available in the project:

- **FIFO (First-In, First-Out):** Replaces the page that entered memory earliest.
- **LRU (Least Recently Used):** Replaces the page that has not been used for the longest time.
- **Optimal Page Replacement:** Replaces the page whose next use is farthest in the future.

## Concepts Demonstrated

- Operating System Memory Management
- Virtual Memory and Paging
- Page Faults and Page Hits
- Page Replacement Strategies
- Algorithm Analysis and Performance Comparison

## Tech Stack

Add the technologies used in the implementation:

- **Frontend:** [HTML, CSS, JavaScript / React / other]
- **Backend:** [Python / Java / C++ / not applicable]
- **Tools:** Git, GitHub

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd <project-folder>
```

### 3. Run the application

Follow the execution instructions for the technologies used in the project. For a browser-based application, open the appropriate entry-point file or start the development server as specified by the project setup.

## How It Works

1. Enter a page reference string.
2. Specify the number of available memory frames.
3. Select a supported replacement algorithm.
4. Run the simulation to observe page accesses and replacement decisions.
5. Review the resulting page faults and compare algorithm performance.

## Learning Outcomes

This project explores how operating systems allocate limited memory resources and manage page requests. It also demonstrates the practical differences between replacement strategies and how their behavior affects page fault rates under different access patterns.

## Future Enhancements

- Add more page replacement algorithms.
- Introduce side-by-side algorithm comparisons.
- Improve step-by-step memory state visualization.
- Add charts for page fault comparisons.
- Support downloadable simulation results.

## Contributors

Developed as an academic project to explore operating system memory management and page replacement strategies.
