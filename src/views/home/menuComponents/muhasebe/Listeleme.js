/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
  ScrollView,
  Pressable,
  Button,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import GoBackPng from "../../../../../assets/forgotpass/go-back-black.png";
import Fuar from "../../../../../assets/muhasebe/fuar.png";
import Reklam from "../../../../../assets/muhasebe/reklam.png";
import ListeItem from "./ListeItem";
import SearchAndFilterMuhasebeComponant from "./SearchAndFilterMuhasebeComponant";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import ContentOpenIcon from "../../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../../assets/vexmail/icerik-kapa.png";
import Tarih from "../../../../../assets/muhasebe/tarih.png";
import Etkilesim from "../../../../../assets/reklam/etkilesim.png";
import Erisim from "../../../../../assets/muhasebe/erisim.png";
import OzelSalon from "../../../../../assets/muhasebe/ozel-salon-turkuaz.png";
import ReklamYayinBilgisi from "./ReklamYayinBilgisi";
import ItemView from "./ItemView";
import FaturaFiltrele from "./FaturaFiltrele";




const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;
const dummyArray = [
  {
    id: "1",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "2",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "3",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "4",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "5",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "6",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "7",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "8",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "9",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "10",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
];

const faturaArray = [
  {
    id: "1",
    value: "Seri No",
  },
  {
    id: "2",
    value: "Hizmet Kodu",
  },
  {
    id: "3",
    value: "????lem Kodu",
  },
  {
    id: "4",
    value: "Sipari?? Kodu",
  },
  {
    id: "5",
    value: "Referans No",
  },
  {
    id: "6",
    value: "??deme Tipi",
  },
  {
    id: "7",
    value: "Tutar",
  },
  {
    id: "8",
    value: "Ba??lang???? Tarihi",
  },
  {
    id: "9",
    value: "Biti?? Tarihi",
  },
];
const tahsilatMakbuzuArray = [
  {
    id: "1",
    value: "Firma ??smi",
  },
  {
    id: "2",
    value: "Tahsilat Konusu",
  },
  {
    id: "3",
    value: "Seri No",
  },
  {
    id: "4",
    value: "Sicil No",
  },
  {
    id: "5",
    value: "Ba??lang???? Tarihi",
  },
  {
    id: "6",
    value: "Biti?? Tarihi",
  },
  {
    id: "7",
    value: "Makbuz Tarihi",
  },
];
const bankaHesapBilgileriArray = [
  {
    id: "1",
    value: "Hesap Ad??",
  },
  {
    id: "2",
    value: "Banka Ad??",
  },
  {
    id: "3",
    value: "??ube",
  },
  {
    id: "4",
    value: "??lke",
  },
  {
    id: "5",
    value: "??l",
  },
  {
    id: "6",
    value: "??l??e",
  },
  {
    id: "7",
    value: "Olu??turma Tarihi",
  },
];
const gelirlerArray = [
  {
    id: "1",
    value: "Yay??n Durumu",
  },
  {
    id: "2",
    value: "Mod??l Se??imi",
  },
  {
    id: "3",
    value: "Sipari?? T??r??",
  },
  {
    id: "4",
    value: "Sipari?? Tarihi",
  },
  {
    id: "5",
    value: "Sipari?? Tutar??",
  },
  {
    id: "6",
    value: "Sipari?? Kuru Se??imi",
  },
  {
    id: "7",
    value: "Teslimat Tarihi",
  },
  {
    id: "8",
    value: "Onay Tarihi",
  },
  {
    id: "9",
    value: "Tahsilat Tutar??",
  },
  {
    id: "9",
    value: "Tahsilat Kuru",
  },
  {
    id: "9",
    value: "Tahsilat Tarihi",
  },
];
const giderlerArray = [
  {
    id: "1",
    value: "Yay??n Durumu",
  },
  {
    id: "2",
    value: "Mod??l Se??imi",
  },
  {
    id: "3",
    value: "Gider T??r??",
  },
  {
    id: "4",
    value: "Gider Tarihi",
  },
  {
    id: "5",
    value: "Gider Tutar??",
  },
  {
    id: "6",
    value: "Gider Kuru",
  },
  {
    id: "7",
    value: "Teslimat Tarihi",
  },
  {
    id: "8",
    value: "Onay Tarihi",
  },
  {
    id: "9",
    value: "Tahsilat Tutar??",
  },
  {
    id: "9",
    value: "Tahsilat Kuru",
  },
  {
    id: "9",
    value: "Tahsilat Tarihi",
  },
];

const Listeleme = ({
    activeState,
    setSelectedComponent,
    listItems,
    setListItems,
    filteredData,
    setFilteredData,
    prevActiveState,
    setPrevActiveState,
  }) => {
   
    return (
      <>
      {/* Header */}
        <View style={styles.headFrame}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
            <TouchableOpacity onPress={() => {setListItems([]); setSelectedComponent(0)}}>
              <Image
                style={{ height: relativeWidthNum(25), width:  relativeWidthNum(25), marginRight:relativeWidthNum(10) }}
                source={GoBackPng}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={{ color: "#6C757D", fontSize: 15 }}>{activeState}</Text>
          </View>
        </View>
  
        <View style={styles.container}>
          <FlatList
            data={listItems} // listItems
            //   onEndReached={() => getData()} bu method ana componentte active state e uygun get methodunu ??a????racak
            renderItem={({ item, index }) => (
              <ListeItem
                item={item}
                index={index}
                setPrevActiveState={setPrevActiveState}
                setSelectedComponent={setSelectedComponent}
                // selectedIndex={selectedIndex}
                //  setSelectedIndex={setSelectedIndex}
                activeState={activeState}
                // listItems={listItems}
                // setListItems={setListItems}
                // setActiveState={setActiveState}
                // setOnProcessItem={setOnProcessItem}
                // stateIsReceived={stateIsReceived}
              />
            )}
            ListHeaderComponent={
              <SearchAndFilterMuhasebeComponant
                setListItems={setListItems}
                listItems={listItems}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setSelectedComponent={setSelectedComponent}
                activeState={activeState}
  
              />
            }
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </>
    );
  };
  export default Listeleme;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      // marginHorizontal:Math.trunc( WIDTH_WINDOW*15/360 ),
      // marginVertical: Math.trunc( HEIGHT_WINDOW*50/360 )
      // alignItems: "center",
   
    },
    headFrame: {
      flexDirection: "row",
      height: 50,
      backgroundColor: "#EFEFEF",
      alignItems: "center",
      justifyContent: "space-between",
    },
    
  });