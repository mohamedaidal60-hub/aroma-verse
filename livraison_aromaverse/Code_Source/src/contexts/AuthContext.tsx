import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  id: string;
  email: string;
};

type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  role: "client" | "creator" | "subscriber_pass" | "subscriber_no_pass" | "supplier" | "investor" | "admin";
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const data = JSON.parse(authData);
      setUser(data.user);
      setProfile(data.profile);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const newUser = { id: Date.now().toString(), email };
    const newProfile: Profile = { id: Date.now().toString(), user_id: newUser.id, full_name: fullName, role: "client" };
    setUser(newUser);
    setProfile(newProfile);
    localStorage.setItem("auth", JSON.stringify({ user: newUser, profile: newProfile }));
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // For prototype purposes, any email/password logs in, or we could require exact match
    if (!email) return { error: new Error("Email requis") };
    
    // Check if it's the admin
    if (email === "mohamed@aroma-verse.com") {
      const newUser = { id: "1", email };
      const newProfile: Profile = { id: "1", user_id: "1", full_name: "Administrateur", role: "admin" };
      setUser(newUser);
      setProfile(newProfile);
      localStorage.setItem("auth", JSON.stringify({ user: newUser, profile: newProfile }));
      localStorage.setItem("adminAuth", "true");
      return { error: null };
    }

    const newUser = { id: Date.now().toString(), email };
    const newProfile: Profile = { id: Date.now().toString(), user_id: newUser.id, full_name: email.split("@")[0], role: "client" };
    setUser(newUser);
    setProfile(newProfile);
    localStorage.setItem("auth", JSON.stringify({ user: newUser, profile: newProfile }));
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("adminAuth");
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
