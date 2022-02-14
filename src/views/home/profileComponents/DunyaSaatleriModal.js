import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput } from "react-native";

import filter from "lodash.filter";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import DunyaSaatleriIcon from "../../../../assets/profileitems/dunya-saatleri-icon.png";


const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const DunyaSaatleriModal = ({ closePress }) => {
  const [dovizData, setDovizData] = useState([
    { id: 1, code: "TR", name:"Türkiye" },
    { id: 1, code: "US", name:"Amerika"  },
    { id: 1, code: "TR", name:"Türkiye"  },
    { id: 1, code: "TR", name:"Türkiye"  },
  ]);

  const renderrItem = ({ item, index }) => (
    <View
      style={{
        height: HEIGHT_WINDOWS / 14,
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth:0.5,
        borderColor:"#c1c1c1",
        padding:5
      }}
    >
   
      <Text style={{ textAlign: "center", textAlignVertical: "center", fontSize:18 }}>{item.name}</Text>
      <Text style={{ textAlign: "center", textAlignVertical: "center", fontSize:18, color:"#00AA9F" }}>14:00</Text>
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
              source={DunyaSaatleriIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Dünya Saatleri</Text>
          </View>

    
        </View>
        <View style={styles.cevirTab}>
          <Text style={{ flex: 2, color: "#FFFFFF", fontSize: 18, textAlign: "center" }}>Ermenistan</Text>
          <Text style={{ flex: 2, color: "#FFFFFF", fontSize: 18, textAlign: "center" }}>16:31</Text>
          
         
          <TouchableOpacity style={{ flex: 3, backgroundColor: "#FFFFFF", height: 40, marginHorizontal: 5 }}>
            <Text style={{ flex: 1, color: "#6C757D", fontSize: 15, textAlign: "center", textAlignVertical: "center" }}>
              Ülke Seçin
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

export default DunyaSaatleriModal;

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
