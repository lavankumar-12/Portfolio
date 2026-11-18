const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const getCustomResumeEndpoint = (download = false) =>
  `${API_BASE}/api/profile/resume${download ? '?download=1' : ''}`;

const TOKEN_KEY = 'lavan_admin_token';

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearAdminToken = () => localStorage.removeItem(TOKEN_KEY);

async function rawRequest(endpoint, options = {}) {
  const token = getAdminToken();
  const headers = {
    ...(options.isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return { data, response };
}

async function request(endpoint, options = {}) {
  const { data } = await rawRequest(endpoint, options);
  return data;
}

async function requestListWithTotal(endpoint) {
  const { data, response } = await rawRequest(endpoint);
  const totalHeader = response.headers.get('X-Total-Count');
  return {
    items: Array.isArray(data) ? data : [],
    totalCount: totalHeader !== null ? Number(totalHeader) : Array.isArray(data) ? data.length : 0,
  };
}

export const api = {
  // Health
  health: () => request('/api/health'),

  // Auth
  login: (credentials) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  verifyAuth: () => request('/api/auth/verify'),
  changePassword: (payload) =>
    request('/api/auth/password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  // Upload Image (returns { url: dataUri })
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return request('/api/upload', {
      method: 'POST',
      body: formData,
      isFormData: true,
    });
  },

  // Upload PDF Resume (returns { url: dataUri, fileName, size })
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return request('/api/upload/resume', {
      method: 'POST',
      body: formData,
      isFormData: true,
    });
  },

  // Seed Default Data
  seedDatabase: (force = false) =>
    request('/api/seed', {
      method: 'POST',
      body: JSON.stringify({ force }),
    }),

  // Profile
  getProfile: (includeResume = false) =>
    request(`/api/profile${includeResume ? '?includeResume=true' : ''}`),
  updateProfile: (payload) =>
    request('/api/profile', { method: 'PUT', body: JSON.stringify(payload) }),

  // Skills
  getSkills: (includeHidden = false) =>
    request(`/api/skills${includeHidden ? '?all=true' : ''}`),
  getSkillsPublic: () => requestListWithTotal('/api/skills'),
  createSkill: (payload) =>
    request('/api/skills', { method: 'POST', body: JSON.stringify(payload) }),
  updateSkill: (id, payload) =>
    request(`/api/skills/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  toggleSkillVisibility: (id) =>
    request(`/api/skills/${id}/visibility`, { method: 'PATCH' }),
  deleteSkill: (id) => request(`/api/skills/${id}`, { method: 'DELETE' }),

  // Projects
  getProjects: (includeHidden = false) =>
    request(`/api/projects${includeHidden ? '?all=true' : ''}`),
  getProjectsPublic: () => requestListWithTotal('/api/projects'),
  createProject: (payload) =>
    request('/api/projects', { method: 'POST', body: JSON.stringify(payload) }),
  updateProject: (id, payload) =>
    request(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  toggleProjectVisibility: (id) =>
    request(`/api/projects/${id}/visibility`, { method: 'PATCH' }),
  deleteProject: (id) => request(`/api/projects/${id}`, { method: 'DELETE' }),

  // Experience
  getExperience: (includeHidden = false) =>
    request(`/api/experience${includeHidden ? '?all=true' : ''}`),
  getExperiencePublic: () => requestListWithTotal('/api/experience'),
  createExperience: (payload) =>
    request('/api/experience', { method: 'POST', body: JSON.stringify(payload) }),
  updateExperience: (id, payload) =>
    request(`/api/experience/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  toggleExperienceVisibility: (id) =>
    request(`/api/experience/${id}/visibility`, { method: 'PATCH' }),
  deleteExperience: (id) => request(`/api/experience/${id}`, { method: 'DELETE' }),

  // Certificates
  getCertificates: (includeHidden = false) =>
    request(`/api/certificates${includeHidden ? '?all=true' : ''}`),
  getCertificatesPublic: () => requestListWithTotal('/api/certificates'),
  createCertificate: (payload) =>
    request('/api/certificates', { method: 'POST', body: JSON.stringify(payload) }),
  updateCertificate: (id, payload) =>
    request(`/api/certificates/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  toggleCertificateVisibility: (id) =>
    request(`/api/certificates/${id}/visibility`, { method: 'PATCH' }),
  deleteCertificate: (id) => request(`/api/certificates/${id}`, { method: 'DELETE' }),

  // Achievements
  getAchievements: (includeHidden = false) =>
    request(`/api/achievements${includeHidden ? '?all=true' : ''}`),
  getAchievementsPublic: () => requestListWithTotal('/api/achievements'),
  createAchievement: (payload) =>
    request('/api/achievements', { method: 'POST', body: JSON.stringify(payload) }),
  updateAchievement: (id, payload) =>
    request(`/api/achievements/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  toggleAchievementVisibility: (id) =>
    request(`/api/achievements/${id}/visibility`, { method: 'PATCH' }),
  deleteAchievement: (id) => request(`/api/achievements/${id}`, { method: 'DELETE' }),

  // Coding Profiles
  getCodingProfiles: (includeHidden = false) =>
    request(`/api/coding-profiles${includeHidden ? '?all=true' : ''}`),
  getCodingProfilesPublic: () => requestListWithTotal('/api/coding-profiles'),
  createCodingProfile: (payload) =>
    request('/api/coding-profiles', { method: 'POST', body: JSON.stringify(payload) }),
  updateCodingProfile: (id, payload) =>
    request(`/api/coding-profiles/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  toggleCodingProfileVisibility: (id) =>
    request(`/api/coding-profiles/${id}/visibility`, { method: 'PATCH' }),
  deleteCodingProfile: (id) => request(`/api/coding-profiles/${id}`, { method: 'DELETE' }),

  // Messages
  sendMessage: (payload) =>
    request('/api/messages', { method: 'POST', body: JSON.stringify(payload) }),
  getMessages: () => request('/api/messages'),
  markMessageRead: (id) => request(`/api/messages/${id}/read`, { method: 'PATCH' }),
  deleteMessage: (id) => request(`/api/messages/${id}`, { method: 'DELETE' }),
};
