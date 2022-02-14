import React, { useEffect, useState } from "react";
import { BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainHeader from "../../../../MainHeader";
import StantInfoHeader from "../../StantInfoHeader";

import hediyeBoxIcon from "../../../../../../../assets/stant/menu/hediye-box.png";
import hediyeIcon from "../../../../../../../assets/stant/menu/hediye.png";
import hediyeTalepIcon from "../../../../../../../assets/stant/menu/hediye-talep.png";

import { getMyGifts } from "../../../../../../helpers/stantConnections";
import { useUserValue } from "../../../../../../contexts/UserContext";

const WIDTH_WINDOW = Dimensions.get("window").width;

const HediyeMain = ({ stantItem, setSelectedMenuItem }) => {
  const [selectedComponent, setSelectedComponent] = useState(0);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, [selectedComponent]);

  const handleBackButtonClick = () => {
    if (selectedComponent !== 0) {
      setSelectedComponent(0);
    } else {
      setSelectedMenuItem(0);
    }
    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      {
        {
          0: (
            <MainComponent
              stantItem={stantItem}
              setSelectedComponent={setSelectedComponent}
              setSelectedMenuItem={setSelectedMenuItem}
            />
          ),
          1: <HediyelerimComponent stantItem={stantItem} setSelectedComponent={setSelectedComponent} />,
          2: <HediyelerimComponent stantItem={stantItem} setSelectedComponent={setSelectedComponent} />,
        }[selectedComponent]
      }
    </View>
  );
};

const MainComponent = ({ stantItem, setSelectedComponent, setSelectedMenuItem }) => (
  <View style={{ flex: 1 }}>
    <MainHeader text="Hediye" backBtnFunction={() => setSelectedMenuItem(0)} />
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", margin: 5 }}>
      <StantInfoHeader stant={stantItem} />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
        <View>
          <TouchableOpacity style={styles.midButtons} onPress={() => setSelectedComponent(1)}>
            <Image style={{ width: "70%", height: "70%" }} source={hediyeBoxIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", textAlign: "center", marginVertical: 10, fontSize: 16 }}>Hediyeler</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.midButtons}>
            <Image style={{ width: "70%", height: "70%" }} source={hediyeTalepIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", textAlign: "center", marginVertical: 10, fontSize: 16 }}>Talepler</Text>
        </View>
      </View>
    </View>
  </View>
);

const HediyelerimComponent = ({ stantItem, setSelectedComponent }) => {
  const [hediyeData, setHediyeData] = useState([]);
  const [offset, setOffset] = useState(1);

  const [{ user }] = useUserValue();

  useEffect(() => {
    getData();
  }, [offset]);

  const getData = () => {
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    postData.append("page", offset);
    postData.append("q", "");
    postData.append("type", "all");

    getMyGifts(postData, user.token)
      .then((res) => {
        setHediyeData((prevState) => [...prevState, ...res.gift_names]);
      })

      .catch((err) => console.log(err));
  };

  const renderItem = ({ item }) => (
    // <View style={{ backgroundColor: "red", width: 50, height: 50 }}>
    //   <Text>{item.gift_name}</Text>
    // </View>

    <View style={{ width: WIDTH_WINDOW / 2.2, height: WIDTH_WINDOW / 2.2, alignItems: "center" }}>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#00AA9F",
          margin: 10,
          width: WIDTH_WINDOW / 3.5,
          height: WIDTH_WINDOW / 3.5,
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image style={{ flex: 1 }} source={hediyeIcon} resizeMode="contain" />
      </View>
      <Text style={{ color: "#6C757D", textAlign: "center" }}>{item.gift_name}</Text>
    </View>
  );

  return (
    <>
      <MainHeader text="Hediyeler" backBtnFunction={() => setSelectedComponent(0)} />
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", margin: 5 }}>
        <StantInfoHeader stant={stantItem} />
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={hediyeData}
          // onEndReached={() => getData()}
          // onEndReachedThreshold={0.1}
          //   ListHeaderComponent={headerComponent}
          // ListFooterComponent={footerComponent}
          renderItem={renderItem}
          keyExtractor={(itm, index) => index.toString()}
          numColumns={2}
          key={1}
        />
      </View>
    </>
  );
};

const TaleplerComponent = ({ stantItem, setSelectedComponent }) => {
  const [hediyeData, setHediyeData] = useState([]);
  const [offset, setOffset] = useState(1);

  const [{ user }] = useUserValue();

  useEffect(() => {
    getData();
  }, [offset]);

  const getData = () => {
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    postData.append("page", offset);
    postData.append("q", "");
    postData.append("type", "all");

    getMyGifts(postData, user.token)
      .then((res) => {
        setHediyeData((prevState) => [...prevState, ...res.gift_names]);
      })

      .catch((err) => console.log(err));
  };

  const renderItem = ({ item }) => (
    // <View style={{ backgroundColor: "red", width: 50, height: 50 }}>
    //   <Text>{item.gift_name}</Text>
    // </View>

    <View style={{ width: WIDTH_WINDOW / 2.2, height: WIDTH_WINDOW / 2.2, alignItems: "center" }}>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#00AA9F",
          margin: 10,
          width: WIDTH_WINDOW / 3.5,
          height: WIDTH_WINDOW / 3.5,
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image style={{ flex: 1 }} source={hediyeIcon} resizeMode="contain" />
      </View>
      <Text style={{ color: "#6C757D", textAlign: "center" }}>{item.gift_name}</Text>
    </View>
  );

  return (
    <>
      <MainHeader text="Hediyeler" backBtnFunction={() => setSelectedComponent(0)} />
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", margin: 5 }}>
        <StantInfoHeader stant={stantItem} />
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={hediyeData}
          // onEndReached={() => getData()}
          // onEndReachedThreshold={0.1}
          //   ListHeaderComponent={headerComponent}
          // ListFooterComponent={footerComponent}
          renderItem={renderItem}
          keyExtractor={(itm, index) => index.toString()}
          numColumns={2}
          key={1}
        />
      </View>
    </>
  );
};

export default HediyeMain;

const styles = StyleSheet.create({
  midButtons: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW / 3,
    height: WIDTH_WINDOW / 3,
    backgroundColor: "#FFFFFF",
  },
});
