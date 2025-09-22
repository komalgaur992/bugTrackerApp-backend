import dotenv from 'dotenv';

dotenv.config();

const VALID_SEVERITIES = ["LOW", "MEDIUM", "HIGH"];
const VALID_STATUSES = ["OPEN", "IN_PROGRESS", "CLOSED"];
const VALID_ROLES = ["REPORTER", "ADMIN"];

export const validateBugInput = (title, description, severity) => {
  if (!title || title.trim() === "") return "Title is required";
  if (!description || description.trim() === "") return "Description is required";
  if (title.length > 200) return "Title must be less than 200 characters";
  if (description.length > 1000) return "Description must be less than 1000 characters";
  if (severity && !VALID_SEVERITIES.includes(severity)) {
    return "Severity must be LOW, MEDIUM, or HIGH";
  }
  return null;
};

export const validateStatus = (status) => {
  if (!status) return "Status is required";
  if (!VALID_STATUSES.includes(status)) {
    return "Status must be OPEN, IN_PROGRESS, or CLOSED";
  }
  return null;
};

export const validateRole = (role) => {
  if (!role) return "Role is required";
  if (!VALID_ROLES.includes(role)) {
    return "Role must be REPORTER or ADMIN";
  }
  return null;
};

export const validateUserInput = (name, email, password, role) => {
  if (!name || name.trim() === "") return "Name is required";
  if (!email || email.trim() === "") return "Email is required";
  if (!password || password.length < 6) return "Password must be at least 6 characters";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  
  if (role && !VALID_ROLES.includes(role.toUpperCase())) {
    return "Role must be REPORTER or ADMIN";
  }
  return null;
};

// Ensure PORT is loaded from environment variables
const PORT = process.env.PORT || 5000;
