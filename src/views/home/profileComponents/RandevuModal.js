import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Flags } from "../../../components/FlagExporter";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import RandevuIcon from "../../../../assets/profileitems/randevu-icon.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const RandevuModal = ({ closePress }) => {
  const [randevuData, setRandevuData] = useState([
    {
      id: 1,
      name: "Atakan",
      country: "TR",
      picture:
        "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
    },
    {
      id: 2,
      name: "Yunus",
      country: "US",
      picture:
        "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
    },
    {
      id: 3,
      name: "Emre",
      country: "TR",
      picture:
        "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
    },
    {
      id: 4,
      name: "Ahmet",
      country: "US",
      picture:
        "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
    },
  ]);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const renderrItem = ({ item, index }) => (
    <ListItem.Accordion
      content={
        <>
          <Avatar
            source={{
              uri: item.picture,
            }}
          />
          <ListItem.Content
            style={{ borderBottomWidth: 0.5, borderColor: "#c1c1c1", marginLeft: 10, paddingBottom: 5 }}
          >
            <View>
              <Text>{item.name}</Text>
              <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Image
                  style={{ height: 20, width: 20, marginRight: 5 }}
                  source={Flags[item.country.toLowerCase()]}
                  resizeMode="contain"
                />

                <Text style={{ marginRight: 10, fontSize: 12, textAlignVertical: "center", color: "#6C757D" }}>
                  {item.country}
                </Text>
                <Text style={{ fontSize: 12, textAlignVertical: "center", color: "#6C757D" }}>Bireysel</Text>
              </View>
            </View>
          </ListItem.Content>
        </>
      }
      isExpanded={expandedIndex === index}
      onPress={
        expandedIndex === index
          ? () => {
              setExpandedIndex(-1);
            }
          : () => {
              setExpandedIndex(index);
            }
      }
    >
      <View style={styles.accordionAltItems}>
        <Text style={{ color: "#6C757D" }}>Randevu Alan Kişi Adı</Text>
        <Text style={{ color: "#6C757D" }}>{item.name}</Text>
      </View>
      <View style={styles.accordionAltItems}>
        <Text style={{ color: "#6C757D" }}>Randevu Aldığı Birim</Text>
        <Text style={{ color: "#6C757D" }}>VexClinic</Text>
      </View>
      <View style={styles.accordionAltItems}>
        <Text style={{ color: "#6C757D" }}>Randevu Aldığı Tarih ve Saat</Text>
        <Text style={{ color: "#6C757D" }}>21.10.2021 15:06</Text>
      </View>
      <View style={styles.accordionAltItems}>
        <Text style={{ color: "#6C757D" }}>Konu</Text>
        <Text style={{ color: "#6C757D" }}>Rapor Gösterimi</Text>
      </View>
      <View
        style={{
          marginHorizontal: 0,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderBottomWidth: 5,
          borderColor: "#c1c1c1",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#6C757D" }}>İşlem</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ backgroundColor: "#00AA9F", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 }}
          >
            <Text style={{ color: "#FFFFFF" }}>Onayla</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF0000",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>Reddet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ListItem.Accordion>
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
              source={RandevuIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Randevu</Text>
          </View>
        </View>

        <View style={styles.mainFrame}>
          <FlatList
            contentContainerStyle={{ width: WIDTH_WINDOWS - 10 }}
            maxToRenderPerBatch={10}
            data={randevuData}
            renderItem={renderrItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default RandevuModal;

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
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
  },
  accordionAltItems: {
    marginHorizontal: 0,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#c1c1c1",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
