/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList } from "react-native";
import VideoPlayer from "expo-video-player";
import * as IntentLauncher from "expo-intent-launcher";
import * as Linking from "expo-linking";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";
import { useUserValue } from "../../../../../../contexts/UserContext";
import { postBoothDocuments } from "../../../../../../helpers/connections";
import StantInfoHeader from "../../StantInfoHeader";
import PlayIcon from "../../../../../../../assets/play-shadow.png";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;

const VideolarMain = ({ stantItem, setSelectedMenuItem }) => {
  const [documentsData, setDocumentsData] = useState([]);

  const [{ user }] = useUserValue();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const postData = new FormData();
    postData.append("booth_id", stantItem.id); // stantItem.id 66
    postData.append("category_id", "8");

    postBoothDocuments(postData, user.token)
      .then((res) => {
        console.log(res);
        setDocumentsData((prevState) => [...prevState, ...res.cloudfiles]);
      })

      .catch((err) => console.log(err));
  };

  const openVideo = (url) => {
    if (Platform.OS === "android") {
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", { data: url, type: "video/mp4" });
    } else {
      Linking.openURL(url);
    }
  };

  const footerComponent = () => {
    return (
      <TouchableOpacity onPress={() => getData()}>
        <Text>yükle</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={{ margin: 5 }}>
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: "cover",
          source: { uri: item.file_url },
        }}
        icon={{ play: <Text> </Text>, pause: <Text> </Text> }}
        timeVisible={false}
        slider={false}
        style={{ height: WIDTH_WINDOW / 2 - 20, width: WIDTH_WINDOW / 2 - 20 }}
        fullscreen={{ visible: false }}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
        onPress={() => openVideo(item.file_url)}
      >
        <Image style={{ flex: 1, height: 50, width: 50 }} source={PlayIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MainHeader text="Video" backBtnFunction={() => setSelectedMenuItem(0)} />

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
      {/* 
      <Modal
        transparent
        animationType="slide"
        visible={fullScreenImageModalOpen}
        onRequestClose={() => {
          setfullScreenImageModalOpen((prev) => !prev);
        }}
      >
        <FullScreenImageModal closePress={() => setfullScreenImageModalOpen(false)} img={image} shareBtn />
      </Modal> */}
    </View>
  );
};

export default VideolarMain;

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
