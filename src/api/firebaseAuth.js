import firebaseConfig from "../../FirebaseConfig";

const API_KEY = firebaseConfig.apiKey;

export const loginUser = async (email, password) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.error?.message || "Authentication failed";
    throw new Error(errorMessage);
  }

  return data;
};

export const sendPasswordResetEmail = async (email) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.error?.message || "Failed to send reset email.";
    throw new Error(errorMessage);
  }

  return data;
};
