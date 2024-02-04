// weatherapi.js

const API_BASE_URL = "http://localhost:8000"; // Adjust this to your actual API base URL

async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export async function getFavorites() {
  const url = `${API_BASE_URL}/favorites`;
  return await fetchWithErrorHandling(url);
}

export async function addFavorite(locationData) {
  const url = `${API_BASE_URL}/favorites`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(locationData),
  };
  return await fetchWithErrorHandling(url, options);
}

// More functions for other API calls (update, delete, etc.)
