/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-lonely-if */

import React, { useEffect, useState, useMemo } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import filter from "lodash.filter";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import stantYayindaIcon from "../../../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";

import vexRateIcon from "../../../../../../../assets/vex-rate.png";

import { useUserValue } from "../../../../../../contexts/UserContext";
import { postStantVexRate } from "../../../../../../helpers/connections";
import VexRateListItem from "./VexRateListItem";
import Puanlama from "./Puanlama";
import StantInfoHeader from "../../StantInfoHeader";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;

const VexRateMain = ({ stantItem, setSelectedMenuItem }) => {
  const [vexRateData, setVexRateData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [selectedItem, setSelectedItem] = useState();

  const [{ user }] = useUserValue();
  console.log(stantItem);
  const postData = new FormData();

  useEffect(() => {
    getData();
  }, []);

  /*   console.log("--------ğğğğğğğğ ğğğğğ ------");
  console.log(stantItem.hall_id);
  console.log(stantItem.boothcontent.booth_id);
  console.log("--------rrrrrrrrrrrrrrrrrr ğğğğğ ------"); */
  const getData = () => {
    setLoading(true);
    postData.append("hall_id", stantItem.hall_id);
    postData.append("booth_id", stantItem.boothcontent?.booth_id);

    postStantVexRate(postData, user.token)
      .then((res) => {
        setOffset(offset + 1);
        setVexRateData(res.ratingByUsersForBooth);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  /*   const calculateAveragePoints = () => {

    const array = [];
    vexRateData.forEach((el) => array.push(el.average_point));
    console.log(array);
    const average = array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / array.length;

    return average.toFixed(1);
  }; */
  /* 
  const calculateAveragePoints = () => {
    const array = [];
    vexRateData.forEach((el) => array.push(el.average_point));
    if (array.length > 0) {
      const average = array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / array.length;
      return average.toFixed(1);
    }
  }; */

  const getMainIcon = () => {
    switch (stantItem.status) {
      case 1:
        return stantYayindaIcon;
      case 2:
        return stantYayinBitenIcon;
      case 3:
        return stantYayinBekleyenIcon;
      default:
        break;
    }
  };

  const footerComponent = () => {
    if (loading) {
      return <ActivityIndicator color="#00AA9F" size="large" />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <MainHeader
        text={selectedComponent === 0 ? "VexRate" : "VexRate - Puanlama"}
        backBtnFunction={() => (selectedComponent !== 0 ? setSelectedComponent(0) : setSelectedMenuItem(0))}
      />

      <View style={styles.container}>
        <StantInfoHeader stant={stantItem} rating={stantItem.rating} />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            {
              {
                0: (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={footerComponent}
                    /*   onEndReached={() => getData()}
              onEndReachedThreshold={0.2} */
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    data={vexRateData}
                    renderItem={({ item, index }) => (
                      <VexRateListItem
                        item={item}
                        setSelectedComponent={setSelectedComponent}
                        setSelectedItem={setSelectedItem}
                      />
                    )}
                    keyExtractor={(itm, index) => index.toString()}
                  />
                ),
                1: <Puanlama setSelectedComponent={setSelectedComponent} selectedItem={selectedItem} />,
              }[selectedComponent]
            }
          </View>

          {/* main button - seçilenleri sil */}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.mainButton} onPress={() => console.log(calculateAvaragePoints())}>
              <Text style={styles.mainButtonText}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VexRateMain;

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

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
