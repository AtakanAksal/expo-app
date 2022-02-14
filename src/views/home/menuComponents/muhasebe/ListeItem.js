/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import Fatura from "./Fatura";
import TahsilatMakbuzu from './TahsilatMakbuzu';
import BankaHesapBilgileri from './BankaHesapBilgileri';
import Gelirler from './Gelirler';
import Giderler from './Giderler';
import IptalIade from "./IptalIade";
import {relativeWidthNum} from "../../../../utils/HelperFunctions";
import ContentOpenIcon from "../../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../../assets/vexmail/icerik-kapa.png";
import SiparisDetayi from "../../../../../assets/muhasebe/muhasebe.png";
import firstLineTextKey from './firstLineTextKey';



const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const ListeItem = ({
  item,
  index,
  setPrevActiveState,
  setSelectedComponent,
  // setSelectedIndex,
  activeState,
  // setActiveState,
  // selectedIndex,
  // listItems,
  // setListItems,
  // setOnProcessItem,
  // stateIsReceived,
}) => {
  const [contentOpen, setContentOpen] = useState(false);
  const nav = useNavigation();
  // const [{ user }] = useUserValue();

  // console.log("benim log");
  // console.log(user);

  const isPersonalAccount = () => {
    if (item.sender_user_detail.company_type_id === 1) {
      return true;
    }
    return false;
  };

  const setUyelikTuru = (itm) => {
    if (itm.sender_user_detail.company_type_id === 1) {
      return "Bireysel";
    }
    if (itm.sender_user_detail.company_type_id === 2) {
      return "Ticari";
    }
    if (itm.sender_user_detail.company_type_id === 3) {
      return "Kamu";
    }
    if (itm.sender_user_detail.company_type_id === 4) {
      return "STK";
    }
  };
  return (
    <ScrollView>
      <Pressable
        style={{
          //   width: WIDTH_WINDOW - 50,
          //     height: contentOpen ? 180 : 80, // contentOpen ? 80 : 180
          margin: 5,
          elevation: 6,
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
        }}
        onPress={() => setContentOpen((prevState) => !prevState)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingHorizontal: 5,
            //   paddingVertical: 5,
          }}
        >
          {/* Liste Ana Satır */}
          <FirstLine
            contentOpen={contentOpen}
            activeState={activeState}
            item={item}
          />
          <View>
            {/* yukarı aşağı ok */}
            <View
              style={{ justifyContent: "center", alignItems: "flex-start" }}
            >
              <Image
                style={{
                  height: relativeWidthNum(25),
                  width: relativeWidthNum(25),
                  marginRight: 5,
                }}
                source={contentOpen ? ContentCloseIcon : ContentOpenIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* itemların altında açılan info tab ı */}
        {contentOpen &&
          {
            "Muhasebe - Fatura": <Fatura item={item} />,
            "Muhasebe - Tahsilat Makbuzu": <TahsilatMakbuzu  item={item}/>,
            "Muhasebe - Banka Hesap Bilgileri": <BankaHesapBilgileri  item={item}/>,
            "Muhasebe - Gelirler": (
              <Gelirler
                nav={nav}
                item={item}
                setSelectedComponent={setSelectedComponent}
              />
            ),
            "Muhasebe - Giderler": <Giderler nav={nav} item={item} />,
            "Muhasebe - İptal & İade": <IptalIade  item={item}/>,
          }[activeState]}
      </Pressable>
    </ScrollView>
  );
};

export default ListeItem;

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  textUserInfo: {
    textAlignVertical: "center",
    fontSize: 10,
    color: "#6C757D",
    marginLeft: 2,
  },
  textComman: {
    fontSize: 10,
    color: "#6C757D",
    paddingVertical: 13,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 15,
    borderColor: "#c1c1c1",
    borderBottomWidth: 0.5,
    // borderColor: "#707070",
    //  borderWidth: 0.2,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    paddingBottom: 0.2,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  listItemText: {
    //  marginLeft: relativeWidthNum(20),
  },
 
});

const Durum = () => {
  const [paid, setPaid] = useState(true);
  return (
    <Image
      style={{ height: relativeWidthNum(25), width: relativeWidthNum(25) }}
      source={paid ? SiparisDetayi : SiparisDetayi}
      resizeMode="contain"
    />
  );
};

const FirstLineTextValue = ({ activeState, item }) => {
  switch (activeState) {
    case "Muhasebe - Fatura":
      return item.invoice_serial_number;
    case "Muhasebe - Tahsilat Makbuzu":
      return item.user.userdetail.company_name;
    case "Muhasebe - Banka Hesap Bilgileri":
      return "Firma İsmi";
    case "Muhasebe - Gelirler":
      return "Durum";
    case "Muhasebe - Giderler":
      return "Durum";
    case "Muhasebe - İptal & İade":
      return "Seri No";
    default:
      return null;
  }
};
const FirstLine = ({ contentOpen, activeState, item }) => {
  //
  return (
    <View
      style={[styles.textRow, { justifyContent: "space-between", flex: 1 }]}
    >
      <Text
        style={[
          styles.textComman,
          contentOpen ? { color: "#00AA9F" } : { color: "#6C757D" },
        ]}
      >
        {firstLineTextKey(activeState)}
      </Text>
      <Text style={styles.textComman}><FirstLineTextValue activeState={activeState} item={item}/></Text>
    </View>
  )
};