/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

const SecureStoreTest = () => {
  const [StorageSync, setStorageSync] = useState(null);

  const [InputState, setInputState] = useState("");

  const saveToStore = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getFromStore = async (key) => {
    const result = await SecureStore.getItemAsync(key);
    setStorageSync(result || "null");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Secure store test</Text>

      {/*       <Button
        title="Save key/value pair"
        onPress={() => {
          saveToStore("emre", "test");
        }}
      /> */}

      <Text style={styles.paragraph}>Almak istediğiniz key'i girin.</Text>
      <TextInput style={styles.input} onChangeText={(txt) => setInputState(txt)} />
      <Button
        title="Get key/value pair"
        onPress={() => {
          getFromStore(InputState);
        }}
      />

      <Text style={styles.paragraph}>Storage Right Now:</Text>
      <Text style={styles.paragraph}>{StorageSync}</Text>
    </View>
  );
};

export default SecureStoreTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderStyle: "solid",
    borderWidth: 0,
  },
  input: {
    height: 30,
    margin: 10,
    borderWidth: 1,
    padding: 3,
    width: 250,
  },
});
