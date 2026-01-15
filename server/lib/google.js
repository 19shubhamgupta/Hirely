// Dynamic import for ES modules
let Google;
(async () => {
  const arctic = await import('arctic');
  Google = arctic.Google;
})();

const redirectURI =
  process.env.NODE_ENV === "production"
    ? "https://chit-chat-realtime-chat-app-2.onrender.com/api/auth/google/callback"
    : "http://localhost:5001/api/auth/google/callback";

// Create and export Google client when the module initializes
let googleClient;

const initializeGoogleClient = async () => {
  // Wait for Google to be imported
  if (!Google) {
    const arctic = await import("arctic");
    Google = arctic.Google;
  }

  googleClient = new Google(
    process.env.Client_ID,
    process.env.Client_secret,
    redirectURI
  );
};

// Initialize immediately
initializeGoogleClient();

// Export a proxy object that forwards calls to the initialized client
exports.google = new Proxy(
  {},
  {
    get(target, prop) {
      if (!googleClient) {
        throw new Error("Google client not initialized yet");
      }
      return googleClient[prop];
    },
  }
);
