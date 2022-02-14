import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import VideoPlayer from "expo-video-player";
import * as ScreenOrientation from "expo-screen-orientation";
import * as IntentLauncher from "expo-intent-launcher";
import * as Linking from "expo-linking";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import VideoIcon from "../../../../assets/profileitems/video-icon.png";

import DeleteIcon from "../../../../assets/tooltip/delete.png";
import PlayIcon from "../../../../assets/play-shadow.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const VideoModal = ({ closePress, selectedIndex, setSelectedIndex }) => {
  const videos = [
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/t92pULqlsKQ7B4Y0LIzsFf7OrQDZQdrS69vi4B3Y.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/aOIKdnZNK7jvqzR1G7bgG0aoCoBF1rmcCVNYFnNP.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/7D8lmJ06iFDxuqO54sXXr0Xuj98ofm0WO0cOAVNq.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/fJTyaN6xCQ4vSM88gyqGebaQPTozZyL9io9Knfy1.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/fWahrUDGCTfkpM0lQ0lGoVBuHKUDWtln2FSBRQYm.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/aOIKdnZNK7jvqzR1G7bgG0aoCoBF1rmcCVNYFnNP.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/7D8lmJ06iFDxuqO54sXXr0Xuj98ofm0WO0cOAVNq.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/t92pULqlsKQ7B4Y0LIzsFf7OrQDZQdrS69vi4B3Y.mp4",
    "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/boothcontent/videos/fWahrUDGCTfkpM0lQ0lGoVBuHKUDWtln2FSBRQYm.mp4",
  ];

  const openDeleteAlert = () => {
    Alert.alert(
      null,
      `Seçtiğiniz ${selectedIndex.length} adet videou silmek 
      istediğinizden emin misiniz?`,
      [
        {
          text: "Hayır",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Evet", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: true }
    );
  };

  const openVideo = (item) => {
    if (Platform.OS === "android") {
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", { data: item, type: "video/mp4" });
    } else {
      Linking.openURL(item);
    }
  };

  const SelectedButtons = () => (
    <View style={{ height: 60, width: "100%", flexDirection: "row", padding: 5 }}>
      <TouchableOpacity
        style={{
          margin: 5,
          backgroundColor: "#00AA9F",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={openDeleteAlert}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  const ChangeSelectedIndex = (index) => {
    if (!selectedIndex.includes(index)) {
      setSelectedIndex((prevArray) => [...prevArray, index]);
    } else {
      setSelectedIndex(selectedIndex.filter((item) => item !== index));
    }

    console.log(selectedIndex);
  };

  const selectAllImages = () => {
    Object.keys(videos).map(
      (el) =>
        !selectedIndex.includes(parseInt(el, 10)) && setSelectedIndex((prevArray) => [...prevArray, parseInt(el, 10)])
    );
  };

  const openSelectModeOn = (index) => {
    ChangeSelectedIndex(index);
  };
  const closeSelectModeOn = () => {
    setSelectedIndex([]);
  };

  const renderrItem = ({ item, index }) => (
    <View style={{ margin: 5 }}>
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: "cover",
          source: { uri: item },
        }}
        icon={{ play: <Text> </Text>, pause: <Text> </Text> }}
        timeVisible={false}
        slider={false}
        style={{ height: WIDTH_WINDOWS / 2 - 20, width: WIDTH_WINDOWS / 2 - 20 }}
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
        onPress={selectedIndex.length > 0 ? () => ChangeSelectedIndex(index) : () => openVideo(item)}
        // onPress={selectedIndex.length > 0 ? () => ChangeSelectedIndex(index) : () => openImageFullScreen(index)}
        /*  onPress={() => IntentLauncher.startActivityAsync("android.intent.action.VIEW", { data: item, type: "video/mp4" })} */
        // onPress={() => Linking.openURL(item)}
        onLongPress={selectedIndex.length > 0 ? () => ChangeSelectedIndex(index) : () => openSelectModeOn(index)}
        delayLongPress={350}
      >
        <Image style={{ flex: 1, height: 50, width: 50 }} source={PlayIcon} resizeMode="contain" />
      </TouchableOpacity>

      {selectedIndex.length > 0 &&
        (selectedIndex.includes(index) ? (
          <View style={styles.selectButton}>
            <View style={{ backgroundColor: "#00AA9F", width: 12, height: 12 }} />
          </View>
        ) : (
          <View style={styles.selectButton} />
        ))}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/** @@@@@  HEAD @@@@@ */}
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          {selectedIndex.length > 0 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => closeSelectModeOn()}>
                <Image style={{ height: 40, width: 40, marginRight: 10 }} source={DeleteIcon} resizeMode="contain" />
              </TouchableOpacity>
              <Text style={{ color: "#6C757D", fontSize: 17 }}>{selectedIndex.length} adet seçildi</Text>
            </View>
          ) : (
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={closePress}>
              <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
              <Text style={{ color: "#6C757D", fontSize: 20 }}>Profilim</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          {selectedIndex.length > 0 && (
            <TouchableOpacity onPress={() => selectAllImages()}>
              <View
                style={{
                  marginTop: 5,
                  borderWidth: 0.5,
                  borderColor: "#c1c1c1",
                  width: 20,
                  height: 20,
                  backgroundColor: "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#c1c1c1",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {videos.length === selectedIndex.length ? (
                  <View style={{ backgroundColor: "#00AA9F", width: 12, height: 12 }} />
                ) : (
                  <View style={{ backgroundColor: "#FFFFFF", width: 12, height: 12 }} />
                )}
              </View>
              <Text style={{ color: "#6C757D", fontSize: 8, marginTop: 3 }}>Hepsi</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/** @@@@@  MİDD @@@@@ */}
      <View style={styles.midFrame}>
        <View style={styles.infoTab}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
            <Image
              style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5 }}
              source={VideoIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Video</Text>
          </View>
        </View>

        <View style={styles.mainFrame}>
          <>
            <FlatList
              maxToRenderPerBatch={10}
              data={videos}
              renderItem={renderrItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              key={1}
            />
            {selectedIndex.length > 0 && <SelectedButtons />}
            {/*             <Modal
              transparent
              animationType="slide"
              visible={fullScreenModal}
              supportedOrientations={['portrait', 'landscape']}
              onRequestClose={() => {
               // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
                 setFullScreenModal((prev) => !prev);
              }}
            >
              <FullScreenVideoModal closePress={() => setFullScreenModal(false)} video={videos[selectImgIndex]} />
            </Modal> */}
          </>
        </View>
      </View>
    </View>
  );
};

export default VideoModal;

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

  selectButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#c1c1c1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
});
