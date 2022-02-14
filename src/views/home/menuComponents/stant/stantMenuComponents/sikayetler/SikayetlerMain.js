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
import ComplaintIcon from "../../../../../../../assets/complaint.png";

import { useUserValue } from "../../../../../../contexts/UserContext";

import { postStantSikayetler } from "../../../../../../helpers/connections";
import SikayetListItem from "./SikayetListItem";
import StantInfoHeader from "../../StantInfoHeader";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;

const SikayetlerMain = ({ stantItem, setSelectedMenuItem }) => {
  const [sikayetData, setSikayetData] = useState([]);
  const [sikayetCount, setSikayetCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [{ user }] = useUserValue();
  // console.log(stantItem);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    postData.append("id", stantItem.id);
    postData.append("currentPage", offset);

    postStantSikayetler(postData, user.token)
      .then((res) => {
        setSikayetData((prevState) => [...prevState, ...res.complaints]);
        setSikayetCount(res.complaints_count);
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
        return null;
    }
  };

  const headerComponent = () => (
    <View style={{ height: HEIGHT_WINDOW / 4, alignItems: "center" }}>
      <Image style={{ width: WIDTH_WINDOW / 1.5, height: "100%" }} source={ComplaintIcon} resizeMode="contain" />
    </View>
  );

  const footerComponent = () => {
    return (
      <TouchableOpacity onPress={() => getData()}>
        <Text>yükle</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <SikayetListItem item={item} />;

  return (
    <View style={{ flex: 1 }}>
      <MainHeader text="Şikayetler" backBtnFunction={() => setSelectedMenuItem(0)} />

      <View style={styles.container}>
        <StantInfoHeader stant={stantItem} count={sikayetCount} />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            {/* <RenderComp /> */}

            <FlatList
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={10}
              data={sikayetData}
              //   onEndReached={() => getData()}
              //   onEndReachedThreshold={0.1}
              ListHeaderComponent={headerComponent}
              // ListFooterComponent={footerComponent}
              renderItem={renderItem}
              keyExtractor={(itm, index) => index.toString()}
            />
          </View>

          {/* main button - seçilenleri sil */}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.mainButton} /* onPress={() => setOffset((prev) => prev + 1)} */>
              <Text style={styles.mainButtonText}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* modals..... */}
    </View>
  );
};

export default SikayetlerMain;

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
