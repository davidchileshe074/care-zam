import api from "./api";

// Signup user
export const signup = async (userData) => {
  const data = await api.post("/auth/signup", userData);
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// Login user
export const login = async (email, password) => {
  const data = await api.post("/auth/login", { email, password });
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// Logout user
export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user from storage
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get user profile from backend
export const getUserProfile = async () => {
  return await api.get("/auth/profile");
};

// Check user roles
export const getUserRoles = () => {
  const user = getCurrentUser();
  return user ? [user.role] : [];
};

// Placeholders
export const sendPasswordResetEmail = async (email) => {
  console.log("Password reset email placeholder - Add backend route if needed");
};

export const updateUserProfile = async (profileData) => {
  console.log("Update profile placeholder - Add backend route if needed");
};
