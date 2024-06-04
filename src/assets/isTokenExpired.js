import { jwtDecode } from "jwt-decode";

// Function to check if the JWT token is expired
const isTokenExpired = (token) => {
  if (!token) return true; // If there's no token, consider it expired

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if the token has expired
    return decodedToken.exp < currentTime;
  } catch (error) {
    // If there's an error decoding the token, consider it expired
    console.error("Error decoding token:", error);
    return true;
  }
};

export default isTokenExpired;
