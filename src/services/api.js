// api.js

const API_BASE_URL = 'http://localhost:3001/api';

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
    const response = await fetch(`${API_BASE_URL}/profile/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    const data = await response.json();
    return {
      profile: data.profile,
      riskScore: data.risk.score,
      riskDetails: data.risk.details,
      category: data.risk.category
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const saveProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userId, 
        profile: profileData 
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save profile');
    }
    
    const data = await response.json();
    return {
      profile: data.profile,
      riskScore: data.risk.score,
      riskDetails: data.risk.details,
      category: data.risk.category
    };
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

export const fetchRiskTrends = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/${userId}/trends`);
    if (!response.ok) {
      throw new Error('Failed to fetch risk trends');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching risk trends:', error);
    throw error;
  }
};