/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import filter from "lodash.filter";

import { useUserValue } from "../../../contexts/UserContext";

import searchIcon from "../../../../assets/general/search.png";
import profilePlaceholder from "../../../../assets/general/profile.png";
import OthersHeader from "./OthersHeader";

const WINDOW_WIDTH = Dimensions.get("window").width;

const TakipView = ({ route }) => {
  const { userDetail } = route.params;

  const gelenTakip = userDetail.user.following_users;
  const gelenTakipci = userDetail.user.followed_users;
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{ flex: 1 }}>
      <OthersHeader
        userName={
          userDetail?.user?.userrole_id === 1
            ? userDetail?.user?.userdetail?.name
            : userDetail?.user?.userdetail?.full_institution_name
        }
      />
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          indicatorStyle: { backgroundColor: "#00AA9F" },
        }}

        /*        screenOptions={{
          tabBarPressColor: "#FFFFFF",
          tabBarShowLabel: true,
          tabBarIndicatorStyle: { backgroundColor: "#00AA9F" },
          //   lazy: true,
          tabBarLabelStyle: { textTransform: "none" },
        }} */
      >
        <Tab.Screen
          name="takip"
          component={Takip}
          options={{
            tabBarLabel: "Takip",
          }}
          initialParams={{ gelenTakip }}
        />
        <Tab.Screen
          name="takipci"
          component={Takipci}
          options={{
            tabBarLabel: "Takipçi",
          }}
          initialParams={{ gelenTakipci }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TakipView;

const styles = StyleSheet.create({});

/*  @@@@@@  TAKİP @@@@@@ */

const Takip = ({ route }) => {
  const [takipData, setTakipData] = useState([]);

  useEffect(() => {
    setTakipData(route.params.gelenTakip);
  }, []);

  const handleSearch = (text) => {
    if (text !== "") {
      const filtered = filter(route.params.gelenTakip, (singledata) => {
        if (singledata?.followed_user_detay?.userrole_id === 1) {
          return contains(singledata?.followed_user_detay?.userdetail?.name, text);
        } else {
          return contains(singledata?.followed_user_detay?.userdetail?.full_institution_name, text);
        }

        // console.log(singledata);
      });
      setTakipData(filtered);
    } else {
      setTakipData(route.params.gelenTakip);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          elevation: 5,
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 5,
          alignItems: "center",
        }}
      >
        <TextInput style={{ flex: 1 }} placeholder="Takip içinde ara..." onChangeText={(text) => handleSearch(text)} />

        <Image style={{ height: WINDOW_WIDTH / 9, width: WINDOW_WIDTH / 9 }} source={searchIcon} resizeMode="contain" />
      </View>
      <FlatList
        numColumns={3}
        key={1}
        data={takipData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderrItemTakip}
      />
    </View>
  );
};

const renderrItemTakip = ({ item }) => <TakipRenderComp data={item} />;

const TakipRenderComp = ({ data }) => {
  const nav = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      {console.log(data)}
      <TouchableOpacity
        style={{ padding: 10, marginVertical: 10, width: "95%", height: WINDOW_WIDTH / 3, alignItems: "center" }}
        onPress={() => nav.push("OtherProfile", { userID: data?.followed_user_detay?.userdetail?.user_id })}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          source={
            data?.followed_user_detay?.userdetail?.picture
              ? { uri: data?.followed_user_detay?.userdetail?.picture }
              : profilePlaceholder
          }
        />
        <Text style={{ textAlign: "left", color: "#6C757D" }} numberOfLines={1}>
          {
            /* data?.followed_user_detay?.userdetail?.name */

            data?.followed_user_detay?.userrole_id === 1
              ? data?.followed_user_detay?.userdetail?.name
              : data?.followed_user_detay?.userdetail?.full_institution_name
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

/*  @@@@@@  TAKİPÇİİİ @@@@@@ */

const Takipci = ({ route }) => {
  const [takiciData, setTakiciData] = useState([]);

  useEffect(() => {
    setTakiciData(route.params.gelenTakipci);
  }, []);

  const handleSearch = (text) => {
    if (text !== "") {
      const filtered = filter(route.params.gelenTakipci, (singledata) => {
        // return contains(singledata?.following_user_detay?.userdetail?.name, text);

        if (singledata?.following_user_detay?.userrole_id === 1) {
          return contains(singledata?.following_user_detay?.userdetail?.name, text);
        } else {
          return contains(singledata?.following_user_detay?.userdetail?.full_institution_name, text);
        }
      });
      setTakiciData(filtered);
    } else {
      setTakiciData(route.params.gelenTakipci);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          elevation: 5,
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 5,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ flex: 1 }}
          placeholder="Takipçi içinde ara..."
          onChangeText={(text) => handleSearch(text)}
        />

        <Image style={{ height: WINDOW_WIDTH / 9, width: WINDOW_WIDTH / 9 }} source={searchIcon} resizeMode="contain" />
      </View>

      <FlatList
        numColumns={3}
        key={1}
        data={takiciData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderrItemTakipci}
      />
    </View>
  );
};

const renderrItemTakipci = ({ item }) => <TakipciRenderComp data={item} />;

const TakipciRenderComp = ({ data }) => {
  const nav = useNavigation();
  const [{ user }] = useUserValue();
  return (
    <View style={{ flex: 1 }}>
      {console.log(data)}
      <TouchableOpacity
        style={{ padding: 10, marginVertical: 10, width: "95%", height: WINDOW_WIDTH / 3, alignItems: "center" }}
        onPress={() =>
          user.userid !== data?.following_user_detay?.userdetail?.user_id &&
          nav.push("OtherProfile", { userID: data?.following_user_detay?.userdetail?.user_id })
        }
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          source={
            data?.following_user_detay?.userdetail?.picture
              ? { uri: data?.following_user_detay?.userdetail?.picture }
              : profilePlaceholder
          }
        />
        <Text style={{ textAlign: "left", color: "#6C757D" }} numberOfLines={1}>
          {
            /* data?.following_user_detay?.userdetail?.name */

            data?.following_user_detay?.userrole_id === 1
              ? data?.following_user_detay?.userdetail?.name
              : data?.following_user_detay?.userdetail?.full_institution_name
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const contains = (data, query) => {
  if (data?.toString().toLowerCase().includes(query.toString().toLowerCase())) {
    return true;
  }
  return false;
};
