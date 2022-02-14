import React, { useState, useEffect } from "react";
import "proxy-polyfill/proxy.min";
import {
  NavigationContainer as Router,
  DefaultTheme,
} from "@react-navigation/native";
import { StatusBar, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";

import { UserProvider, reducerUser } from "./src/contexts/UserContext";
import Main from "./src/Main";
import SecureStoreTest from "./src/SecureStoreTest";
import HeightAnimated from "./src/views/tests/HeightAnimated";
import MutationTest from "./src/views/tests/MutationTest";
import CreditCard from "./src/views/tests/CreditCard";
import WelcomePage from "./src/WelcomePage";
import { createUuidToStore } from "./src/utils/CreateUUID";

// ! TODO token bozuk ise loading ekranında kalması yerine, storage'dan silelim
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialUser, setInitialUser] = useState({});
  // ! SecureStorage ve Expo AppLoading (SplashScreen yerine)
  /*   const initialUser = {
    user: { token: null, username: null, userid: null },
  }; */

  useEffect(() => {
    // SplashScreen.preventAutoHideAsync();
    SecureStore.getItemAsync("mobile-token")
      .then((token) => {
        if (token) {
          axios
            .get(`${process.env.REACT_APP_DEVAPI_HOST}v1/user/me`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              setInitialUser({
                user: {
                  token,
                  username: response.data.username,
                  userid: response.data.id,
                },
              });
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(true);
            });
          console.log("token var");
        } else {
          setIsLoading(false);
          setInitialUser({
            user: { token: null, username: null, userid: null },
          });
          console.log("token yok");
        }
      })
      .catch((err) => {
        console.log("Hata:", err);
        // SplashScreen.hideAsync();
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {

    SecureStore.getItemAsync("secure_deviceid")
      .then((id) => {
        if (id === null) {
          console.log("UUID yok, yaratılıyor... ");
          createUuidToStore();
          SecureStore.getItemAsync("secure_deviceid").then((uuid) => {
            console.log("uuid is : ", uuid);
          });
        } else {
          console.log("id is : ", id);
        }
      })
      .catch((err) => {
        console.log("Hata:", err);
      });
  }, []);

  const navTheme = DefaultTheme;
  navTheme.colors.background = "#EEEEEE"; // "#0B232E";EEEEEE

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading User..</Text>
      </View>
    );
  }
  if (!Object.keys(initialUser).length) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>CONTEXT HATASI</Text>
      </View>
    );
  }
  return (
    <Router theme={navTheme}>
      {/** <StatusBar barStyle="light-content" backgroundColor="transparent" translucent  /> */}
      <StatusBar />
      <UserProvider initialState={initialUser} reducer={reducerUser}>
        <View style={{ flex: 1 }}>
          {/* <CreditCard /> */}
          {/* <MutationTest /> */}
          {/* <HeightAnimated /> */}

          <Main />

          {/* <RequestResponse /> */}
          {/* <PostRequest /> */}
          {/* <SecureStoreTest /> */}
          {/* <ImageSlider /> */}
        </View>
      </UserProvider>
    </Router>
  );
};

export default App;
