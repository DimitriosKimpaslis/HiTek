import { Outlet } from "react-router"
import supabase from "../Client";
import { useEffect, useState } from "react";
import Signin from "../components/Signin";

const getAuth = async () => {
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    return true;
  } else {
    return false;
  }
}

const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authResult = await getAuth();
      setIsAuth(authResult);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuth ? <Outlet /> : <Signin />
  )
}

export default ProtectedRoutes;