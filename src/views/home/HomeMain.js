/* eslint-disable no-else-return */
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, SafeAreaView, Image, View, Text, Button, Animated } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";

import HomeIcon from "../../../assets/tabbar/home.png";
import HomeIconActive from "../../../assets/tabbar/home-active.png";
import ProfileIcon from "../../../assets/tabbar/profile.png";
import ProfileIconActive from "../../../assets/tabbar/profile-active.png";
import VexMailIcon from "../../../assets/tabbar/vexmail.png";
import VexMailIconActive from "../../../assets/tabbar/vexmail-active.png";
import VexChatIcon from "../../../assets/tabbar/vexchat.png";
import VexChatIconActive from "../../../assets/tabbar/vexchat-active.png";
import NotifyIcon from "../../../assets/tabbar/notification.png";
import NotifyIconActive from "../../../assets/tabbar/notification-active.png";
import MenuIcon from "../../../assets/tabbar/menu.png";
import MenuIconActive from "../../../assets/tabbar/menu-active.png";

import HomeOld from "./HomeOld";
import Home from "./Home";
import Profile from "./Profile";
import VexMail from "./VexMail";
import Menu from "./Menu";
import Notification from "./Notification";

import OtherProfile from "./otherViews/OtherProfile";
import TakipView from "./otherViews/TakipView";
import StantMain from "./menuComponents/stant/StantMain";
import { PostProvider } from "../../contexts/PostContext";
import { StantProvider, reducerStant } from "../../contexts/StantContext";
import StantMenu from "./menuComponents/stant/StantMenu";
import Reklam from './menuComponents/reklam/Reklam';
import Muhasebe from './menuComponents/muhasebe/Muhasebe';


const Tab = createMaterialTopTabNavigator();

/*
const HEADER_HEIGHT = 44 + Constants.statusBarHeight;


 const scrollAnim = new Animated.Value(0);
const clampedScrollY = scrollAnim.interpolate({
  inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 1],
  outputRange: [0, 1],
 //  extrapolateLeft: "clamp",
});
const minusScrollY = Animated.multiply(clampedScrollY, -1);
const translateY = Animated.diffClamp(minusScrollY, -HEADER_HEIGHT, 0);
 */
const HomeMain = () => {
  const Stack = createStackNavigator();

  const initialStant = {
    stant: {},
  };

  return (
    <PostProvider>
      <StantProvider initialState={initialStant} reducer={reducerStant}>
        <Stack.Navigator>
          <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
          <Stack.Screen name="OtherProfile" component={OtherProfile} options={{ headerShown: false }} />
          <Stack.Screen name="TakipView" component={TakipView} options={{ headerShown: false }} />
          <Stack.Screen name="StantMain" component={StantMain} options={{ headerShown: false }} />
          <Stack.Screen name="Reklam" component={Reklam} options={{ headerShown: false }} />
          <Stack.Screen name="Muhasebe" component={Muhasebe} options={{ headerShown: false }} />
         {/*  /7 manüüler  içni oalans ddüas fdsa */}
          <Stack.Screen name="StantMenu" component={StantMenu} options={{ headerShown: false }} />
          
         
        </Stack.Navigator>
      </StantProvider>
    </PostProvider>
  );
};

export default HomeMain;

const styles = StyleSheet.create({
  img: {
    height: 25,
    width: "100%",
  },
  imgVexChat: {
    height: 25,
    width: "100%",
    marginTop: 3,
  },
  topbar: {
    padding: 10,
    height: 55,
    justifyContent: "center",
    backgroundColor: "teal",
  },
  textWhite: {
    color: "white",
    fontSize: 24,
  },
});

const HomeStack = () => {
  const [topbarState, setTopbarState] = useState(1);
  const [status, setStatus] = useState(0);
  // console.log("---------- rennnnndeeeer");
  const value = useRef(new Animated.Value(0)).current;

  /* const interpolatedHeight = value.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  useEffect(() => {
    if (status) {
      Animated.timing(value, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(value, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [status]);

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
 */
  const Topbar = () => {
    return (
      <View style={styles.topbar}>
        <Text style={styles.textWhite}>Expo</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 5 }}>
      {/*       <Animated.View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1, transform: [{ translateY }] }}
      >
        {topbarState === "home" && <Topbar />}
      </Animated.View>
      <Animated.View style={{ height: translateY }} /> */}
      {topbarState === "home" && <Topbar />}
      {/* <Text>asdasda</Text> */}
      <Tab.Navigator
        /* @@@@ 5.3.15 için    "@react-navigation/material-top-tabs": "^5.3.15", @@@@ */
        lazy // ?  optimize edilmeli
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          indicatorStyle: { backgroundColor: "#00AA9F" },
        }}

        /* @@@@ yeni versiyon top bar içn 6 üzeri @@@@ */
        /*     screenOptions={{
          tabBarPressColor:"#FFFFFF",
          tabBarShowIcon: true,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: "#00AA9F" },
          lazy: true,
        }} */
      >
        <Tab.Screen
          name="home"
          component={Home}
          // initialParams={{ scrollAnim }}
          listeners={({ route }) => ({
            focus: () => {
              setTopbarState(route.name);
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image style={styles.img} source={focused ? HomeIconActive : HomeIcon} resizeMode="contain" />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          listeners={({ route }) => ({
            focus: () => {
              setTopbarState(route.name);
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image style={styles.img} source={focused ? ProfileIconActive : ProfileIcon} resizeMode="contain" />
            ),
          }}
        />
        {/*   {(props) => <HomeOld  {...props} text={homeText} />}
        </Tab.Screen> */}
        <Tab.Screen
          name="vexmail"
          component={VexMail}
          listeners={({ route }) => ({
            focus: () => {
              setTopbarState(route.name);
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image style={styles.img} source={focused ? VexMailIconActive : VexMailIcon} resizeMode="contain" />
            ),
          }}
        />
        <Tab.Screen
          name="vexchat"
          component={HomeOld}
          listeners={({ route }) => ({
            focus: () => {
              setTopbarState(route.name);
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.imgVexChat}
                source={focused ? VexChatIconActive : VexChatIcon}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="notification"
          component={Notification}
          listeners={({ route }) => ({
            focus: () => {
              setTopbarState(route.name);
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image style={styles.img} source={focused ? NotifyIconActive : NotifyIcon} resizeMode="contain" />
            ),
          }}
        />
        <Tab.Screen
          name="menu"
          component={Menu}
          listeners={({ route }) => ({
            focus: () => {
              setTopbarState(route.name);
            },
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image style={styles.img} source={focused ? MenuIconActive : MenuIcon} resizeMode="contain" />
            ),
          }}
        />
      </Tab.Navigator>

      {/*       <Button title="test butonu" onPress={() => setStatus(true)} />
      <Button title="test butonu2" onPress={() => setStatus(false)} /> */}
    </SafeAreaView>
  );
};
