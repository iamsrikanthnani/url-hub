import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "@/types";
import { getCurrentUser } from "@/appwrite/auth";
import { useRouter } from "next/navigation";

export const INITIAL_USER: UserType = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: UserType;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          //@ts-ignore
          id: currentAccount.$id, //@ts-ignore
          name: currentAccount.name, //@ts-ignore
          email: currentAccount.email, //@ts-ignore
          imageUrl: currentAccount.imageUrl,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  // auto redirection between pages, comment this useEffect if you dont want the auto redirection
  // useEffect(() => {
  //   const cookieFallback = localStorage.getItem("cookieFallback");
  //   if (
  //     cookieFallback === "[]" ||
  //     cookieFallback === null ||
  //     cookieFallback === undefined
  //   ) {
  //     router.push("/signin");
  //   } else {
  //     router.push("/");
  //   }

  //   checkAuthUser();
  // }, [router]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
