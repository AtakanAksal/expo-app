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
import DavetListItem from "./DavetListItem";
import StantInfoHeader from "../../StantInfoHeader";
import MainHeader from "../../../../MainHeader";
import BildirimlerDavetGoruntule from "../../../../notificationComponents/BildirimlerDavetGoruntule";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../../../utils/HelperFunctions";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;

const DavetMain = ({ stantItem, setSelectedMenuItem }) => {
  const [davetData, setDavetData] = useState([]);
  const [davetCount, setDavetCount] = useState(0);
  const [innerViewState, setInnerViewState] = useState("listView");
  const [offset, setOffset] = useState(1);
  const [{ user }] = useUserValue();
  // console.log(stantItem);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    postData.append("id", 62); // stantItem.id
    postData.append("currentPage", offset);

    postStantSikayetler(postData, user.token) // değişecek
      .then((res) => {
        setDavetData((prevState) => [...prevState, ...res.complaints]);
        setDavetCount(res.complaints_count);
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
    <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={()=>{setInnerViewState("sendNewInvitation")}}>
      <View
        style={{
          height: relativeHeightNum(30),
          width: relativeWidthNum(100),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            backgroundColor: "#00AA9F",
            paddingHorizontal: 14,
            paddingVertical: 5,
            fontSize: 12,
          }}
        >
          Yeni Gönder
        </Text>
      </View>
    </TouchableOpacity>
  );

  const footerComponent = () => {
    return (
      <TouchableOpacity onPress={() => getData()}>
        <Text>yükle</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <DavetListItem item={item} />;
  const  ListView = () => {
    return (
      <View style={{ flex: 1 }}>
        <MainHeader
          text="Stant Menu - Davetiye"
          backBtnFunction={() => setSelectedMenuItem(0)}
        />

        <View style={styles.container}>
          <StantInfoHeader stant={stantItem} count={davetCount} />

          <View style={{ flex: 1, paddingBottom: 20 }}>
            <View style={{ flex: 8 }}>
              {/* <RenderComp /> */}

              <FlatList
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={10}
                data={davetData}
                //   onEndReached={() => getData()}
                //   onEndReachedThreshold={0.1}
                ListHeaderComponent={headerComponent}
                // ListFooterComponent={footerComponent}
                renderItem={renderItem}
                keyExtractor={(itm, index) => index.toString()}
              />
            </View>

            {/* main button - seçilenleri sil */}
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={
                  styles.mainButton
                } /* onPress={() => setOffset((prev) => prev + 1)} */
              >
                <Text style={styles.mainButtonText}>Yayınla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* modals..... */}
      </View>
    );
  };
  const SendNewInvitation = () => {
    return (
      <View style={{ flex: 1 }}>
        <MainHeader
          text="Davetiye - Yeni Gönder"
          backBtnFunction={() => setSelectedMenuItem(0)}
        />

        <View style={styles.container}>
          <StantInfoHeader stant={stantItem} count={davetCount} />

          <View style={{ flex: 1, paddingBottom: 20 }}>
            <View style={{ flex: 8 }}>
              {/* <RenderComp /> */}

            <BildirimlerDavetGoruntule/>
            </View>

            {/* main button - seçilenleri sil */}
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={
                  styles.mainButton
                } /* onPress={() => setOffset((prev) => prev + 1)} */
              >
                <Text style={styles.mainButtonText}>Davetiye Paylaş</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* modals..... */}
      </View>
    );
  };
  // Main Render Func

  switch (innerViewState) {
    case "listView":
    return  <ListView />;
      
    case "sendNewInvitation":
      return   <SendNewInvitation />;
      
    default: return <ListView />;
  }
};

export default DavetMain;

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
