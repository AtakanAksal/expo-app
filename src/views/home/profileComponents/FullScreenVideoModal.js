import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const FullScreenVideoModal = ({ closePress, video }) => {
  const [inFullscreen, setInFullsreen] = useState(false);

  const refVideo = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000", justifyContent: "center" }}>
      <Pressable onPress={()=>console.log("asdasd")}>
        <VideoPlayer
          videoProps={{
            ref: refVideo,
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: video,
            },
          }}
          // style={{ height: HEIGHT_WINDOWS, width: WIDTH_WINDOWS }}
          style={{
            videoBackgroundColor: "black",
            height: inFullscreen ? WIDTH_WINDOWS : HEIGHT_WINDOWS,
            width: inFullscreen ? HEIGHT_WINDOWS : WIDTH_WINDOWS,
          }}
          fullscreen={{
            inFullscreen,
            enterFullscreen: async () => {
              // setStatusBarHidden(true, "fade");
              setInFullsreen(!inFullscreen);
              await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
              refVideo.current.setStatusAsync({
                shouldPlay: true,
              });
            },
            exitFullscreen: async () => {
              // setStatusBarHidden(false, "fade");
              setInFullsreen(!inFullscreen);
              await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
            },
          }}
        />
      </Pressable>
    </View>
  );
};

export default FullScreenVideoModal;

const styles = StyleSheet.create({});
