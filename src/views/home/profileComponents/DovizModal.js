import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput } from "react-native";

import filter from "lodash.filter";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import DovizIcon from "../../../../assets/profileitems/doviz-icon.png";
import Doviz2Icon from "../../../../assets/profileitems/doviz2.png";
import RandevuIcon from "../../../../assets/profileitems/randevu-icon.png";
import DeleteIcon from "../../../../assets/tooltip/delete.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const DovizModal = ({ closePress }) => {
  const [dovizData, setDovizData] = useState([
    { id: 1, code: "TR" },
    { id: 1, code: "US" },
    { id: 1, code: "TR" },
    { id: 1, code: "TR" },
  ]);

  const renderrItem = ({ item, index }) => (
    <View
      style={{
        height: HEIGHT_WINDOWS / 14,
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Image
        style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5, alignSelf: "center" }}
        source={Doviz2Icon}
        resizeMode="contain"
      />
      <Image
        style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5, alignSelf: "center" }}
        source={DovizIcon}
        resizeMode="contain"
      />
      <Text style={{ textAlign: "center", textAlignVertical: "center", fontSize:18 }}>{item.code}</Text>
      <Text style={{ textAlign: "center", textAlignVertical: "center", fontSize:18 }}>1.00</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/** @@@@@  HEAD @@@@@ */}
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={closePress}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
            <Text style={{ color: "#6C757D", fontSize: 20 }}>Profilim</Text>
          </TouchableOpacity>
        </View>

        {/* Header sağ kısım , gerekirse  */}
        {/*      <View style={{ flex: 1, alignItems: "center" }}>
           <Image style={{ height: 45, width: 45 }} source={CommentIcon} resizeMode="contain" />
          
        </View> */}
      </View>

      {/** @@@@@  MİDD @@@@@ */}

      <View style={styles.midFrame}>
        <View style={styles.infoTab}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
            <Image
              style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5 }}
              source={DovizIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Döviz</Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => console.log("randevu icon click")}>
              <Image
                style={{ height: WIDTH_WINDOWS / 10, width: WIDTH_WINDOWS / 10, margin: 5 }}
                source={RandevuIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cevirTab}>
          <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 25, textAlign: "center" }}>€</Text>
          <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 18, textAlign: "center" }}>EUR</Text>
          <TextInput
            style={{ flex: 2, backgroundColor: "#FFFFFF", height: 40, paddingLeft: 5 }}
            keyboardType="numeric"
          />
          <TouchableOpacity style={{ flex: 2, backgroundColor: "#00AA9F", height: 40, marginHorizontal: 5 }}>
            <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 18, textAlign: "center", textAlignVertical: "center" }}>
              Çevir
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainFrame}>
          <FlatList
            contentContainerStyle={{ width: WIDTH_WINDOWS - 20 }}
            maxToRenderPerBatch={10}
            data={dovizData}
            renderItem={renderrItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default DovizModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  headFrame: {
    flexDirection: "row",
    margin: 5,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  midFrame: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  infoTab: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    padding: 5,
  },
  cevirTab: {
    flexDirection: "row",
    height: 55,
    backgroundColor: "#036F67",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    padding: 5,
    marginHorizontal: 5,
  },
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
});
