// api.js

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchProfile = async (userId) => {
  try {
    const response = await fetch(`/api/profile/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const saveProfile = async (userId, profile) => {
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, profile }),
    });
    if (!response.ok) {
      throw new Error('Failed to save profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};