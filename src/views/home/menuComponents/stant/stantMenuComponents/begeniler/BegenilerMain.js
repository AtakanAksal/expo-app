/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect, useState, useMemo } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  BackHandler,
  Modal,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import dayjs from "dayjs";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import stantYayindaIcon from "../../../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import LikeIcon from "../../../../../../../assets/like.png";

import { useUserValue } from "../../../../../../contexts/UserContext";

import { getBoothLikes } from "../../../../../../helpers/connections";
import BegeniListItem from "./BegeniListItem";
import StantInfoHeader from "../../StantInfoHeader";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;

const BegenilerMain = ({ stantItem, setSelectedMenuItem }) => {
  const [selectedIndex, setSelectedIndex] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [detailModalVisible, setDetailModalVisible] = useState(false);
  // const [vexDriveModalVisible, setVexDriveModalVisible] = useState(false);
  const [begeniData, setBegeniData] = useState([]);
  const [begeniCount, setBegeniCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [{ user }] = useUserValue();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getBoothLikes(stantItem.id /* 62 */, offset, user.token)
      .then((res) => {
        setBegeniCount(res.likes_count);
        setBegeniData((prev) => [...prev, ...res.likes]);
        setOffset((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };
  const getMainIcon = () => {
    switch (stantItem.status) {
      case 1:
        return stantYayindaIcon;
      case 2:
        return stantYayinBitenIcon;
      case 3:
        return stantYayinBekleyenIcon;
      default:
        break;
    }
  };

  const selectAllItems = () => {
    if (selectedIndex.length === begeniData.length) {
      setSelectedIndex([]);
    } else {
      Object.keys(begeniData).map(
        (el) =>
          !selectedIndex.includes(parseInt(el, 10)) && setSelectedIndex((prevArray) => [...prevArray, parseInt(el, 10)])
      );
    }
  };

  const headerComponent = () => (
    <View style={{ height: HEIGHT_WINDOW / 4, alignItems: "center" }}>
      <Image style={{ width: WIDTH_WINDOW / 1.5, height: "100%" }} source={LikeIcon} resizeMode="contain" />
    </View>
  );

  const footerComponent = () => {
    return (
      <TouchableOpacity onPress={() => getData()}>
        <Text>yükle</Text>
      </TouchableOpacity>
    );
  };
  const emptyComponent = () => {
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <Text>Loading...</Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <BegeniListItem item={item} index={index} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
  );

  return (
    <View style={{ flex: 1 }}>
      <MainHeader text="Beğeniler" backBtnFunction={() => setSelectedMenuItem(0)} />

      <View style={styles.container}>
        <StantInfoHeader stant={stantItem} count={begeniCount} />

        <View style={{ flex: 1, paddingBottom: 20, width: "100%" }}>
          <View style={{ flex: 8 }}>
            {/* <RenderComp /> */}

            <View
              style={{
                marginLeft: 5,
                alignItems: "center",
                alignSelf: "flex-start",
              }}
            >
              <CheckBox
                tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
                disabled={false}
                value={selectedIndex.length === begeniData.length}
                onValueChange={() => {
                  selectAllItems();
                }}
              />
              <Text style={{ color: "#6C757D", fontSize: 8 }}>Tümünü Seç</Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={10}
              data={begeniData}
              // onEndReached={() => getData()}
              // onEndReachedThreshold={0.1}
              ListHeaderComponent={headerComponent}
              // ListFooterComponent={footerComponent}
              // ListEmptyComponent={emptyComponent}
              renderItem={renderItem}
              keyExtractor={(itm, index) => index.toString()}
            />

            {useMemo(() => console.log("usememo render"), [])}
          </View>

          {/* main button - seçilenleri sil */}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.mainButton} onPress={() => setOffset((prev) => prev + 1)}>
              <Text style={styles.mainButtonText}>
                {selectedIndex.length > 0 ? "Seçililere Teşekkür Et" : "Yayınla"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* modals..... */}
    </View>
  );
};

export default BegenilerMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
  },

  mainButton: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#00AA9F",
  },
  /*   mainButtonDisabled: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#FFFFFF",
  }, */
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  /*   mainButtonTextDisabled: {
    color: "#6C757D",
    fontSize: 18,
  }, */
});
