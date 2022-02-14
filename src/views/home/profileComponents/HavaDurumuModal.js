import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput } from "react-native";

import filter from "lodash.filter";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import HavadurumuIcon from "../../../../assets/profileitems/havadurumu-icon.png";
import SearchIcon from "../../../../assets/profileitems/search-w.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const HavaDurumuModal = ({ closePress }) => {
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
              source={HavadurumuIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Hava Durumu</Text>
          </View>
        </View>
        <View style={styles.havaDurumuTab}>
          <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 25, textAlign: "center" }}>0°C</Text>
          <Image
            style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5 }}
            source={SearchIcon}
            resizeMode="contain"
          />
          <TextInput style={{ flex: 2, backgroundColor: "#FFFFFF", height: 40, paddingLeft: 5 }} />
        </View>
        <View style={styles.mainFrame}>
          <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#6C757D", fontSize: 16 }}>03:00</Text>
            <Text style={{ color: "#6C757D", fontSize: 16 }}>06:00</Text>
            <Text style={{ color: "#6C757D", fontSize: 16 }}>09:00</Text>
            <Text style={{ color: "#6C757D", fontSize: 16 }}>12:00</Text>
          </View>
          <View
            style={{
              height: HEIGHT_WINDOWS / 14,
              margin: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                textAlignVertical: "center",
                fontSize: 18,
                borderWidth: 0.5,
                borderColor: "#c1c1c1",
                height: "100%",
                paddingLeft: 10,
                margin: 5,
              }}
            >
              Sıcaklık
            </Text>
          </View>
          <View
            style={{
              height: HEIGHT_WINDOWS / 14,
              margin: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                textAlignVertical: "center",
                fontSize: 18,
                borderWidth: 0.5,
                borderColor: "#c1c1c1",
                height: "100%",
                paddingLeft: 10,
                margin: 5,
              }}
            >
              Rüzgar
            </Text>
          </View>
          <View
            style={{
              height: HEIGHT_WINDOWS / 14,
              margin: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                textAlignVertical: "center",
                fontSize: 18,
                borderWidth: 0.5,
                borderColor: "#c1c1c1",
                height: "100%",
                paddingLeft: 10,
                margin: 5,
              }}
            >
              Nem
            </Text>
          </View>
          <View
            style={{
              height: HEIGHT_WINDOWS / 14,
              marginTop: 10,
              width: "100%",
              padding: 10,
              borderTopWidth: 0.5,
              borderTopColor: "#c1c1c1",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ color: "#6C757D", fontSize: 16 }}>Detaylı Gör</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HavaDurumuModal;

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
  havaDurumuTab: {
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
