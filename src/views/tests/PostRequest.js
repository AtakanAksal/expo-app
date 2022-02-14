/* eslint-disable no-undef */
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import BtnMain from "../../components/btnMain/BtnMain";
import MainLogo from "../../components/mainLogo/MainLogo";
 import { postLogin } from "../../helpers/connections";

const PostRequest = () => {
  const [tbUsername, setTbUsername] = useState(null);
  const [tbPassword, setPassword] = useState(null);
  const [returned, setReturned] = useState(null);

  const onPress = async () => {
    if (tbUsername && tbPassword) {
 
      const postData = new FormData();
      postData.append("username", tbUsername);
      postData.append("secret", tbPassword);

      /*       const postData = {
        username: tbUsername,
        secret: tbPassword,
      }; */
      postLogin(postData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={login.container}>
      <MainLogo />
      <Text style={login.mainText}>EXPO HESABI İLE GİRİŞ YAP</Text>
      <View>
        <TextInput style={login.input} onChangeText={(txt) => setTbUsername(txt)} placeholder="Kullanıcı Adı" />
        <TextInput style={login.input} onChangeText={(txt) => setPassword(txt)} placeholder="Şifre" />
      </View>
      <View>
        <BtnMain buttonDisabled={!tbUsername || !tbPassword} onPress={onPress} txt="Giriş Yap" />
      </View>
      <View>
        <Text>{returned}</Text>
      </View>
    </View>
  );
};

export default PostRequest;

const login = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    fontSize: 15,
    backgroundColor: "#fff",
    height: 40,
    margin: 12,
    padding: 5,
    borderWidth: 1,
  },
  mainText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
});
