import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal } from "react-native";

import { useGetStkTypes } from "../../helpers/connections";

const MutationTest = () => {
  //   const [sayfaState, setSayfaState] = useState(1);
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ alignSelf: "center", margin: 10 }}>STK TİPLERİ</Text>
      {/* {{ 1: <Sayfa1 />, 2: <Sayfa2 /> }[sayfaState]} */}
      <Sayfa1 />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {/* <Button title="1" onPress={() => setSayfaState(1)} />
        <Button title="2" onPress={() => setSayfaState(2)} /> */}
      </View>
    </View>
  );
};

export default MutationTest;

const styles = StyleSheet.create({});

const Sayfa1 = () => {
  const { data, isLoading, isError } = useGetStkTypes();
  const [modalVisible, setModalVisible] = useState(false);

  console.log("sayfa1 render..");

  if (isLoading) {
    return (
      <View>
        <Text style={{ alignSelf: "center" }}>Loading...</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: 60,
        width: "100%",
        flexDirection: "row",
        marginVertical: 10,
        backgroundColor: "#ffc1c1",
      }}
      onPress={() => setModalVisible((prev) => !prev)}
    >
      <Text style={{ marginHorizontal: 10 }}>id: {item.id}</Text>
      <Text>type: {item.type}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <FlatList data={data} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} />
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible((prev) => !prev)}>
        <Sayfa2 />
      </Modal>
    </>
  );
};

const Sayfa2 = () => {
  const { data, mutate } = useGetStkTypes();
  const STK_TYPE = `http://192.168.1.74:8000/v1/dropdown/get-non-governmental-organisation-type`;

  const handleClick = () => {
    // eslint-disable-next-line no-undef
    const postData = new FormData();

    const number1 = Math.floor(Math.random() * 1000) + 15;
    postData.append("type", `deneme ${number1}`);
    postData.append("id", number1);

    axios
      .post(STK_TYPE, postData)
      .then((res) => {
        console.log("post request sccess");
        mutate([...data, { type: `deneme ${number1}`, id: number1 }], false); /// buradaki false ; revalidate yapmayı engellemek için. revalidate datayı mutate ettikten sonra server a gidip dahatanın bütünlüğünü kontrol etmek için
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => handleClick()}>
        <Text>EKLE</Text>
      </TouchableOpacity>
    </View>
  );
};
