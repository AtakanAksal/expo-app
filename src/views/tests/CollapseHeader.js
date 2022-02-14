/* eslint-disable react-native/no-unused-styles */
// https://medium.com/@andi.gu.ca/a-collapsing-navbar-with-tabs-in-react-native-e80790588830
import React from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,

  Dimensions,
  SafeAreaView,
} from "react-native";

import Constants from "expo-constants";

import { useDataPosts } from "../../helpers/connections";

const HEADER_HEIGHT = 44 + Constants.statusBarHeight;

const scrollAnim = new Animated.Value(0);
const clampedScrollY = scrollAnim.interpolate({
  inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 1],
  outputRange: [0, 1],
 //  extrapolateLeft: "clamp",
});
const minusScrollY = Animated.multiply(clampedScrollY, -1);
const translateY = Animated.diffClamp(minusScrollY, -HEADER_HEIGHT, 0);


export default function CollapseHeader() {
  const { data, isLoading, isError } = useDataPosts();
  const scrollRef = React.useRef();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <Text style={styles.title}>Header</Text>
      </Animated.View>
      
      <Animated.FlatList
        ref={scrollRef}
        style={{
          zIndex: 0,
          height: "100%",
          elevation: -1,
        }}
        scrollEventThrottle={1}
        bounces
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollAnim } } }], { useNativeDriver: true })}
        overScrollMode="never"
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.body}</Text>
          </View>
        )}
        // numColumns={3}
        keyExtractor={(item, index) => index.toString()}
       />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },


  header: {
    flex: 1,
    height: HEADER_HEIGHT,
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
  },
  title: {
    fontSize: 16,
  },
  upButtonStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 70,
  },
  scrollTopButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  // eslint-disable-next-line no-dupe-keys
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignContent: "space-between",
  },
  footer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    zIndex: 1000,
    elevation: 1000,
  },
  bar: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 2,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#9bb8c2",
    padding: 3,
    margin: 2,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 100,
  },
  // eslint-disable-next-line no-dupe-keys
  titlee: {
    fontSize: 14,
    color: "#bf5e3c",
  },
  desc: {
    fontSize: 10,
    color: "#d8d8d8",
  },
});

