// Temporary mock auth for development - replace with real Supabase later
const mockUsers = {
  "admin@gym.com": { id: "1", email: "admin@gym.com", role: "admin" },
  "user@gym.com": { id: "2", email: "user@gym.com", role: "customer" },
};

let currentUser = null;

export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      if (mockUsers[email] && password === "password123") {
        currentUser = mockUsers[email];
        localStorage.setItem("mockUser", JSON.stringify(currentUser));
        return { data: { user: currentUser }, error: null };
      }
      return { data: null, error: { message: "Invalid credentials" } };
    },
    getUser: async () => {
      if (!currentUser) {
        const stored = localStorage.getItem("mockUser");
        currentUser = stored ? JSON.parse(stored) : null;
      }
      return { data: { user: currentUser } };
    },
    signOut: async () => {
      currentUser = null;
      localStorage.removeItem("mockUser");
      return { error: null };
    },
    onAuthStateChange: (callback) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },
};
