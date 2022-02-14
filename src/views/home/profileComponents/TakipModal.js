import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput } from "react-native";

import filter from "lodash.filter";

import { getAllUser } from "../../../helpers/connections";

import ShareKartvizitModal from "./ShareKartvizitModal";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import TakipIcon from "../../../../assets/profileitems/takip-icon.png";
import SearchIcon from "../../../../assets/profileitems/search.png";
import DeleteIcon from "../../../../assets/tooltip/delete.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const TakipModal = ({ closePress }) => {
  const [writedText, setWritedText] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [followers, setFollowers] = useState(null);
  const [filteredFollowers, setFilteredFollowers] = useState(null);

  useEffect(() => {
    /*  getAllUser()
      .then((res) => setFollowers(res))
      .catch((err) => console.log(err)); */

      /* dummyData */
    setFollowers([
      {
        id: 1361,
        name: "alp",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1362,
        name: "atakan",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1363,
        name: "mustafa",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1364,
        name: "mehmet",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1365,
        name: "meltem",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1366,
        name: "ali",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1367,
        name: "esin",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1368,
        name: "ahmet",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1369,
        name: "adem",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1370,
        name: "gülşen",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
      {
        id: 1371,
        name: "elanur",
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
      },
    ]);
  }, []);

  const handleSearch = (text) => {
    setWritedText(text);
    const filteredData = filter(followers, (name) => {
      return contains(name, text);
    });
    setFilteredFollowers(filteredData);
  };
  const contains = ({ name }, query) => {
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  };

  const InfoTab = () => (
    <View style={styles.infoTab}>
      {searchVisible ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
            <TextInput
              style={{ borderBottomWidth: 0.5, flex: 1, marginLeft: 15 }}
              autoFocus
              onChangeText={(txt) => handleSearch(txt)}
              value={writedText}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => [setSearchVisible(false), setWritedText("")]}>
              <Image
                style={{ height: WIDTH_WINDOWS / 10, width: WIDTH_WINDOWS / 10, margin: 5 }}
                source={DeleteIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
            <Image
              style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5 }}
              source={TakipIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Takip</Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => setSearchVisible(true)}>
              <Image
                style={{ height: WIDTH_WINDOWS / 15, width: WIDTH_WINDOWS / 15, margin: 5 }}
                source={SearchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const renderrItem = ({ item, index }) => (
    <View style={{ margin: 5, justifyContent: "space-between", alignContent: "space-between" }}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => console.log("takipçi tıklandı..")}
      >
        <Image
          style={{ backgroundColor: "#000", height: WIDTH_WINDOWS / 3 - 20, width: WIDTH_WINDOWS / 3 - 20 }}
          source={{ uri: item.picture }}
          resizeMode="contain"
        />
        <Text style={{ marginBottom: 5, alignSelf: "flex-start", color: "#6C757D" }}>{item.name}</Text>
      </TouchableOpacity>
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
        <InfoTab />

        <View style={styles.mainFrame}>
          <FlatList
            maxToRenderPerBatch={10}
            data={writedText === "" ? followers : filteredFollowers}
            renderItem={renderrItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            key={1}
          />
        </View>
      </View>
    </View>
  );
};

export default TakipModal;

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
    padding: 10,
  },
});
