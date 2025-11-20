const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('access') || localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async register(userData) {
    return this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.access) {
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
    }
    
    return response;
  }

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  async getUserInfo() {
    return this.request('/auth/me/');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile/', {
      method: 'PATCH',
      body: JSON.stringify(profileData)
    });
  }

  // Wellness
  async logMood(moodData) {
    return this.request('/wellness/mood-logs/', {
      method: 'POST',
      body: JSON.stringify(moodData)
    });
  }

  async getMoodLogs() {
    return this.request('/wellness/mood-logs/');
  }

  async startStudySession(sessionData) {
    return this.request('/wellness/study-sessions/', {
      method: 'POST',
      body: JSON.stringify(sessionData)
    });
  }

  async endStudySession(sessionId) {
    return this.request(`/wellness/study-sessions/${sessionId}/end/`, {
      method: 'POST'
    });
  }

  async getStudySessions() {
    return this.request('/wellness/study-sessions/');
  }

  async calculateBurnout() {
    return this.request('/wellness/burnout-assessment/', {
      method: 'POST'
    });
  }

  async getDashboardData() {
    return this.request('/wellness/dashboard/');
  }

  async generateSchedule(date) {
    return this.request('/wellness/generate-schedule/', {
      method: 'POST',
      body: JSON.stringify({ date })
    });
  }

  async getNotifications() {
    return this.request('/wellness/notifications/');
  }

  // Analytics
  async getWeeklyAnalytics() {
    return this.request('/analytics/weekly/');
  }

  async getHeatmapData(days = 30) {
    return this.request(`/analytics/heatmap/?days=${days}`);
  }

  async getClassHeatmap(days = 7) {
    return this.request(`/analytics/class-heatmap/?days=${days}`);
  }

  async getProductivityTrends(days = 30) {
    return this.request(`/analytics/productivity-trends/?days=${days}`);
  }
}

export default new ApiService();