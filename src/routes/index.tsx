import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/auth";
import { AppTabRoutes } from "./app.tab.routes";

export default function Routes() {
  const { user } = useAuth();
  console.log(user)
  return (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
