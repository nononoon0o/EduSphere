// src/services/d3Visualization.js

import * as d3 from "d3";

/**
 * Generate mock data for molecules or atomic structures
 */
export const generateMoleculeData = () => {
  const elements = ["H", "O", "C", "N"];
  const data = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      element: elements[Math.floor(Math.random() * elements.length)],
      value: Math.floor(Math.random() * 100) + 10,
    });
  }

  return data;
};

/**
 * Create a bar scale for visualization
 * @param {Array} data
 * @param {number} width
 */
export const createBarScale = (data, width) => {
  return d3
    .scaleBand()
    .domain(data.map((d) => d.element + d.id))
    .range([0, width])
    .padding(0.2);
};

/**
 * Create a linear scale for heights
 * @param {Array} data
 * @param {number} height
 */
export const createValueScale = (data, height) => {
  return d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([0, height]);
};

/**
 * Generate molecule color map
 */
export const getElementColor = (element) => {
  const colorMap = {
    H: "#4CAF50",   // Hydrogen - Green
    O: "#2196F3",   // Oxygen - Blue
    C: "#9E9E9E",   // Carbon - Gray
    N: "#FF9800",   // Nitrogen - Orange
  };

  return colorMap[element] || "#9E9E9E";
};
