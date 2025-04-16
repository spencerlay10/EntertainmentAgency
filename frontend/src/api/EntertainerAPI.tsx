// api.js or EntertainerAPI.js

import { Entertainer } from "../types/Entertainer";

const API_URL = 'https://localhost:5000/Entertainer';

// Function to fetch all entertainers
export const fetchEntertainers = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/AllEntertainers`);
    if (!response.ok) {
      throw new Error("Failed to fetch entertainers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching entertainers:", error);
    throw error;
  }
};

// Function to fetch a single entertainer by ID
export const fetchEntertainerById = async (entertainerId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/${entertainerId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entertainer with ID: ${entertainerId}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching entertainer:", error);
    throw error;
  }
};

// Add a new entertainer
export const addEntertainer = async (newEntertainer: Entertainer): Promise<Entertainer> => {
    try {
      const response = await fetch(`${API_URL}/AddEntertainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntertainer),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add entertainer");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error adding entertainer", error);
      throw error;
    }
  };
  

// Function to update an entertainer by ID
export const updateEntertainer = async (entertainerId: number, updatedEntertainer: Entertainer): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/UpdateEntertainer/${entertainerId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEntertainer),
    });

    if (!response.ok) {
      throw new Error(`Failed to update entertainer with ID: ${entertainerId}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating entertainer:", error);
    throw error;
  }
};

// Function to delete an entertainer by ID
export const deleteEntertainer = async (entertainerId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteEntertainer/${entertainerId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete entertainer with ID: ${entertainerId}`);
    }
  } catch (error) {
    console.error("Error deleting entertainer:", error);
    throw error;
  }
};
