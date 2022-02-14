import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import * as routes from "./helpers/routes";
import HomeMain from "./views/home/HomeMain";
import Login from "./views/login/Login";
import { useUserValue } from "./contexts/UserContext";
import ForgotPassMain from "./views/forgotpass/ForgotPassMain";
import Register from "./views/register/Register";
import UserUpdateMain from "./views/userUpdate/UserUpdateMain";
import CollapseHeader from "./views/tests/CollapseHeader";
import DenemeHeader from "./views/tests/DenemeHeader";
import WelcomePage from './WelcomePage';


const Main = () => {
  const [{ user }] = useUserValue();
  const Stack = createStackNavigator();

  

  return (

    <Stack.Navigator>
      {user.token && user.token !== "initializing" ? (
        <>
          <Stack.Screen name={routes.HOMEMAIN} component={HomeMain} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name={routes.WELCOMEPAGE} component={WelcomePage} options={{ headerShown: false }} />
          <Stack.Screen name={routes.LOGIN} component={Login} options={{ headerShown: false }} />
          <Stack.Screen name={routes.FORGOT} component={ForgotPassMain} options={{ headerShown: false }} />
          <Stack.Screen name={routes.REGISTER} component={Register} options={{ headerShown: false }} />
          <Stack.Screen name={routes.UPDATE} component={UserUpdateMain} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Main;
