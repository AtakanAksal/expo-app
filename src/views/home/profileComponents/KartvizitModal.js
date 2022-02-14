import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal } from "react-native";

import ShareKartvizitModal from "./ShareKartvizitModal";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import KartvizitIcon from "../../../../assets/profileitems/kartvizit-icon.png";
import ShareIcon from "../../../../assets/share-black.png";

/* geçici görseller */
import KartvizitPNG from "../../../../assets/kart-gecici.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;

const KartvizitModal = ({ closePress }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
              source={KartvizitIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Kartvizit</Text>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5 }}
                source={ShareIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Modal
              transparent
              animationType="fade"
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible((prev) => !prev);
              }}
            >
              <ShareKartvizitModal component={global} closePress={() => setModalVisible(false)} />
            </Modal>
          </View>
        </View>
        <View style={styles.mainFrame}>
          <Image style={{ width: "100%", height: HEIGHT_WINDOWS / 3 }} source={KartvizitPNG} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

export default KartvizitModal;

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
    padding:5
  },
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
});
