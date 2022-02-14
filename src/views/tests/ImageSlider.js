/* eslint-disable react/no-array-index-key */
import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
const height = (width * 100) / 60;

const photo = [
  "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/72CInlwTHUe0EnaqzW11vD3OWQ8pdm1JriLScJBO.jpg",
  "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/4N6FlcfJHvPGtwhIXCIiEMD6uKcZUpoOp50AkxaZ.png",
  "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/4N6FlcfJHvPGtwhIXCIiEMD6uKcZUpoOp50AkxaZ.png",
  "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/4N6FlcfJHvPGtwhIXCIiEMD6uKcZUpoOp50AkxaZ.png",
];

const ImageSlider = () => {
  const scrollViewRef = useRef(null);

  const toNextPage = () => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: width * 2, // 2 seçeceğimiz fotonun indexi
        animated: true,
      });
    }
  };
  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
        {photo.map((image, index) => (
          <Image
            key={index}
            source={{
              uri: image,
            }}
            style={{ width, height }}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={toNextPage}>
        <Text>asdas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({});
