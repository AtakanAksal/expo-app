/* eslint-disable no-undef */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-else-return */
import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import filter from "lodash.filter";

import { useUserValue } from "../../contexts/UserContext";

import { useGetStreams } from "../../helpers/streamConnections";
import Logo1 from "../../../assets/expologo.png";
import HomeCard from "./homeComponents/HomeCard";
import Bayrak from "../../../assets/flag/tr.png";
import CreatePostModal from "./homeComponents/CreatePostModal";
import ImageModal from "./homeComponents/ImageModal";
import { usePostValue } from "../../contexts/PostContext";

const HEADER_HEIGHT = 70; // 44 + Constants.statusBarHeight;

const scrollAnim = new Animated.Value(0);
const clampedScrollY = scrollAnim.interpolate({
  inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 1],
  outputRange: [0, 1],
  //  extrapolateLeft: "clamp",
});
const minusScrollY = Animated.multiply(clampedScrollY, -1);
const translateY = Animated.diffClamp(minusScrollY, -HEADER_HEIGHT, 0);

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModelOpen, setImageModelOpen] = useState(false);
  // const [streamData, setStreamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresing, setRefresing] = useState(false);
  const [imagesToServer, setImagesToServer] = useState([]);
  const [camOn, setCamOn] = useState(false);

  const [{ user }] = useUserValue();

  const { homestreamData, resetStream, incrementOffset } = usePostValue();

  const scrollRef = useRef();

  const onRefresh = () => {
    resetStream();
  };
  /*  
  context öncesi
useEffect(() => {
    if (!(isLoading || isError)) {
      console.log("home main useEffect içi ------------");
      setStreamData([...streamData, ...data.streams]);
    } else {
      console.log("isError loading");
      setLoading(true);
    }
  }, [data]);
   const onRefresh = () => {
    setRefresing(true);
    setOffset(1);

    if (!(isLoading || isError)) {
      console.log(data);
      setStreamData(data.streams);
      setRefresing(false);
    } else {
      console.log("err");
    }
  }; */

  const renderrItem = ({ item }) => <HomeCard stream={item} userID={user.userid} userToken={user.token}  />; // user.userid 21

  const headerComponent = () => (
    <View style={styles.headerComponent}>
      <View style={{ flex: 1, padding: 10, alignItems: "center" }}>
        <Image style={{ flex: 1, height: "100%", width: "100%" }} source={Logo1} resizeMode="contain" />
        <Text style={{ fontSize: 12 }}>{user.username}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Image style={{ height: 20, width: 20, marginRight: 2 }} source={Bayrak} resizeMode="contain" />
          <Text style={{ fontSize: 10, textAlignVertical: "center" }}>TR</Text>
          <Text style={{ paddingLeft: 10, fontSize: 8, textAlignVertical: "center" }}>Bireysel</Text>
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <TouchableOpacity style={{ flex: 3 }} onPress={() => setModalOpen(true)}>
          <Text style={styles.neDusunuyorsun}>Ne Düşünüyorsun ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const footerComponent = () => {
    if (loading) {
      return <ActivityIndicator color="#00AA9F" size="large" />;
    }
    return null;
  };

  if (homestreamData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading..</Text>
      </SafeAreaView>
    );
  } else if (homestreamData === "err") {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error.. </Text>
      </SafeAreaView>
    );
  } else {
    return (
      <>
        {/**
        <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
          <Text style={styles.title}>Header</Text>
        </Animated.View>
 */}
        <Modal
          visible={modalOpen}
          onRequestClose={() => {
            //  Alert.alert("Modal has been closed.");
            setModalOpen((prev) => !prev);
          }}
        >
          <Modal
            visible={imageModelOpen}
            onRequestClose={() => {
              //  Alert.alert("Modal has been closed.");
              setImageModelOpen((prev) => !prev);
            }}
          >
            <ImageModal setImageModelOpen={setImageModelOpen} imagesToServer={imagesToServer} setCamOn={setCamOn} />
          </Modal>

          <CreatePostModal
            setModalOpen={setModalOpen}
            setImageModelOpen={setImageModelOpen}
            imagesToServer={imagesToServer}
            setImagesToServer={setImagesToServer}
            camOn={camOn}
            setCamOn={setCamOn}
          />
        </Modal>

        <Animated.FlatList
          ref={scrollRef}
          style={{
            zIndex: 0,
            height: "100%",
            elevation: -1,
            flex: 1,
          }}
          // extraData
          // scrollEventThrottle={16}
          // bounces={true}
          // refreshing
          // alwaysBounceVertical={true}
          // extraData={console.log("as------ extraaa  d")}
          refreshControl={<RefreshControl refreshing={refresing} onRefresh={() => onRefresh()} />}
          // overScrollMode="never"
          windowSize={100}
          removeClippedSubviews
          ListHeaderComponent={headerComponent}
          ListFooterComponent={footerComponent}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={100}
          initialNumToRender={2}
          onEndReached={() => incrementOffset()}
          onEndReachedThreshold={2}
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollAnim } } }], { useNativeDriver: true })}
          data={homestreamData}
          renderItem={renderrItem}
          /** 
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.body}</Text>
            </View>
            */

          // numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  headerComponent: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    backgroundColor: "#FFF",
    elevation: 1000,
    marginVertical: 5,
  },
  neDusunuyorsun: {
    flex: 1,
    backgroundColor: "#FFF",
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    height: "100%",
    fontSize: 15,
    color: "#6C757D",
  },

  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignContent: "space-between",
  },
  header: {
    flex: 1,
    height: HEADER_HEIGHT,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
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
  title: {
    fontSize: 14,
    color: "#bf5e3c",
  },
  desc: {
    fontSize: 10,
    color: "#d8d8d8",
  },
  modalContent: {},
});
