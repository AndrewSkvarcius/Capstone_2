// userService.js

const API_BASE_URL = "http://localhost:8000"; // Adjust as needed for your API



export async function getCurrentUser() {
    const url = `${API_BASE_URL}/current-user`; // Adjust the endpoint as per your API
    return await fetchWithErrorHandling(url);
  }
  

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
  
  async function fetchWithErrorHandling(url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeader(), // Add auth header to every request
      ...options.headers,
    };
  
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }
    return response.json();
  }

export async function addUser(userData) {
  const url = `${API_BASE_URL}/users`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include authorization header if needed
    },
    body: JSON.stringify(userData),
  };
  return await fetchWithErrorHandling(url, options);
}

export async function getAllUsers() {
  const url = `${API_BASE_URL}/users`;
  const options = {
    headers: {
      
    },
  };
  return await fetchWithErrorHandling(url, options);
}

export async function getUserByUsername(username) {
  const url = `${API_BASE_URL}/users/${username}`;
  const options = {
    headers: {
      // Include authorization header if needed
    },
  };
  return await fetchWithErrorHandling(url, options);
}

export async function updateUser(username, updateData) {
  const url = `${API_BASE_URL}/users/${username}`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // Include authorization header if needed
    },
    body: JSON.stringify(updateData),
  };
  return await fetchWithErrorHandling(url, options);
}

export async function deleteUser(username) {
  const url = `${API_BASE_URL}/users/${username}`;
  const options = {
    method: 'DELETE',
    headers: {
      // Include authorization header if needed
    },
  };
  return await fetchWithErrorHandling(url, options);
}

export async function applyToFavLocation(username, id) {
  const url = `${API_BASE_URL}/users/${username}/favlocation/${id}`;
  const options = {
    method: 'POST',
    headers: {
      // Include authorization header if needed
    },
  };
  return await fetchWithErrorHandling(url, options);
}

