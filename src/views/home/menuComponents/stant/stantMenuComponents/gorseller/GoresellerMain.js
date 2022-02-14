/* eslint-disable no-undef */
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

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import { useUserValue } from "../../../../../../contexts/UserContext";

import { postBoothDocuments } from "../../../../../../helpers/connections";
import FullScreenImageModal from "../../../../../../components/FullScreenImageModal";
import StantInfoHeader from "../../StantInfoHeader";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;


const GoresellerMain = ({ stantItem, setSelectedMenuItem }) => {
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [image, setImage] = useState();
  const [fullScreenImageModalOpen, setfullScreenImageModalOpen] = useState(false);
  const [documentsData, setDocumentsData] = useState([]);

  const [{ user }] = useUserValue();

  useEffect(() => {
    getData();
    // console.log(stantItem);
  }, []);

  const getData = () => {
    const postData = new FormData();

    postData.append("booth_id", stantItem.id); // stantItem.id 66
    postData.append("category_id", "9");

    postBoothDocuments(postData, user.token)
      .then((res) => {
        setDocumentsData((prevState) => [...prevState, ...res.cloudfiles]);
      })

      .catch((err) => console.log(err));
  };

  /*   const selectAllItems = () => {
    if (selectedIndex.length === documentsData.length) {
      setSelectedIndex([]);
    } else {
      Object.keys(documentsData).map(
        (el) =>
          !selectedIndex.includes(parseInt(el, 10)) && setSelectedIndex((prevArray) => [...prevArray, parseInt(el, 10)])
      );
    }
  }; */

  const footerComponent = () => {
    return (
      <TouchableOpacity onPress={() => getData()}>
        <Text>yükle</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setImage(item.file_url);
        setfullScreenImageModalOpen(true);
      }}
    >
      <Image
        style={{ height: WIDTH_WINDOW / 2.2, width: WIDTH_WINDOW / 2.2, margin: 5, alignSelf: "center" }}
        source={{ uri: item.file_url }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <MainHeader text="Görseller" backBtnFunction={() => setSelectedMenuItem(0)} />

      <View style={styles.container}>
        <StantInfoHeader stant={stantItem} />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            {/* <RenderComp /> */}

            {/*    <View style={{ marginLeft: 5, alignItems: "center", alignSelf: "flex-start" }}>
              <CheckBox
                tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
                disabled={false}
                value={selectedIndex.length === documentsData.length}
                onValueChange={() => {
                  selectAllItems();
                }}
              />
              <Text style={{ color: "#6C757D", fontSize: 8 }}>Tümünü Seç</Text>
            </View> */}

            <FlatList
              contentContainerStyle={{ alignItems: "center" }}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={10}
              data={documentsData}
              // onEndReached={() => getData()}
              // onEndReachedThreshold={0.1}
              //   ListHeaderComponent={headerComponent}
              // ListFooterComponent={footerComponent}
              renderItem={renderItem}
              keyExtractor={(itm, index) => index.toString()}
              numColumns={2}
              key={2}
            />
          </View>

          {/* main button - seçilenleri sil */}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* modals..... */}

      <Modal
        transparent
        animationType="slide"
        visible={fullScreenImageModalOpen}
        onRequestClose={() => {
          setfullScreenImageModalOpen((prev) => !prev);
        }}
      >
        <FullScreenImageModal closePress={() => setfullScreenImageModalOpen(false)} img={image} shareBtn />
      </Modal>
    </View>
  );
};

export default GoresellerMain;

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
