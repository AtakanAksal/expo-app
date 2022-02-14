import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

import { useUserValue } from "../../contexts/UserContext";
import RequestResponse from "../tests/RequestResponse";

const HomeOld = () => {
  const [StorageSync, setStorageSync] = useState(null);

  const [{ user }, dispatch] = useUserValue();

  const logoutUser = () => {
    SecureStore.deleteItemAsync("mobile-token");
    dispatch({ type: "logoutUser" });
  };

  const getFromStore = async (key) => {
    const result = await SecureStore.getItemAsync(key);
    setStorageSync(result);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.paragraph}>Hoşgeldiniz, {user.username}</Text>

      <Button style={styles.buttons} title="🔐 Çıkış Yap 🔐" onPress={() => logoutUser()} />
      <View style={{ borderBottomColor: "white", borderBottomWidth: 5 }} />
      <Button style={styles.buttons} title="Get key/value pair" onPress={() => getFromStore("mobile-token")} />

      <Text style={styles.paragraph}>Storage Right Now:</Text>
      <Text style={styles.paragraph} numberOfLines={2}>
        {StorageSync}
      </Text>
      <View style={{ borderBottomColor: "white", borderBottomWidth: 5 }} />

      {/*   <RequestResponse /> */}
    </ScrollView>
  );
};

export default HomeOld;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    margin: 20,
    padding: 10,
  },
  paragraph: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "#fff",
  },
});
