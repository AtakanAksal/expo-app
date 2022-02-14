import React, { useState } from "react";
// import * as Sharing from "expo-sharing";
import { StyleSheet, Image, View, Pressable, TouchableOpacity, Text, Dimensions, Share } from "react-native";

import TT from "../../assets/add.png";

const WIDTH_WINDOW = Dimensions.get("window").width;

// ? pan özelliği eklenecekW

const FullScreenImageModal = ({ closePress, img, shareBtn, bgBlk }) => {
  // const [selectedImage, setSelectedImage] = useState(null);

  // const openShareDialogAsync = async () => {
  //   // setSelectedImage({ localUri: img });
  //   if (!(await Sharing.isAvailableAsync())) {
  //     alert(`Uh oh, sharing isn't available on your platform`);
  //     return;
  //   }

  //   await Sharing.shareAsync(`https://www.google.com`);
  // };
  // console.log(img);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: img,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("result.activityType");
          console.log(result.activityType);
        } else {
          // shared
          console.log(" else result.activityType");
          console.log(result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log(" dismiss");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Pressable style={{ flex: 1, backgroundColor: bgBlk ? "#000000" : "#FFFFFF" }} onPress={closePress}>
      <Image source={{ uri: img }} style={{ height: shareBtn ? "95%" : "100%", width: "100%" }} resizeMode="contain" />
      {shareBtn && (
        <TouchableOpacity style={styles.mainButton} onPress={onShare}>
          <Text style={styles.mainButtonText}>Paylaş</Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default FullScreenImageModal;

const styles = StyleSheet.create({
  mainButton: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#00AA9F",
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
