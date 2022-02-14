/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
import React, { useState } from "react";

import CheckBox from "@react-native-community/checkbox";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import {
  transformDateFormatFromIsoToShort,
  transformDateFormatToDDMMYYYY,
} from "../../../utils/HelperFunctions";
import { useUserValue } from "../../../contexts/UserContext";
import { Flags } from "../../../components/FlagExporter";

import ContentOpenIcon from "../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../assets/vexmail/icerik-kapa.png";
import GeriBildirimKirmizi from "../../../../assets/notification/geri-bildirim-kirmizi.png";
import GeriBildirimYesil from "../../../../assets/notification/geri-bildirim-yesil.png";
import GeriBildirimSari from "../../../../assets/notification/geri-bildirim-sari.png";
import GeriBildirimTurkuaz from "../../../../assets/notification/geri-bildirim-turkuaz.png";
import IslemCards from "./IslemCards";
import ProfileBox from "../../../components/profileComponent/ProfileBox";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const ListeItemKayitGuncelle = ({
  item,
  index,
  setSelectedIndex,
  activeState,
  setActiveState,
  selectedIndex,
  listItems,
  setListItems,
  setOnProcessItem,
  stateIsReceived,
}) => {
  const [contentOpen, setContentOpen] = useState(false);
  const [{ user }] = useUserValue();
  console.log("benim log");
  console.log(user);

  const setUyelikTuru = (itm) => {
    if (itm.user.userdetail.company_type_id === 1) {
      return "Bireysel";
    }
    if (itm.user.userdetail.company_type_id === 2) {
      return "Ticari";
    }
    if (itm.user.userdetail.company_type_id === 3) {
      return "Kamu";
    }
    if (itm.user.userdetail.company_type_id === 4) {
      return "STK";
    }
  };

  const ImageManipulator = () => {
    if (item.authority_change_status_type_id === 1 ) {
      return (
        <Image
          style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
          source={GeriBildirimTurkuaz}
          resizeMode="contain"
        />
      );
    // eslint-disable-next-line no-else-return
    } else if (item.authority_change_status_type_id === 2 ){
      return (
        <Image
          style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
          source={GeriBildirimSari}
          resizeMode="contain"
        />
      );
    }
    else if (item.authority_change_status_type_id === 3 ){
      return (
        <Image
          style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
          source={GeriBildirimKirmizi}
          resizeMode="contain"
        />
      );
    }
    else if (item.authority_change_status_type_id === 4 ){
      return (
        <Image
          style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
          source={GeriBildirimYesil}
          resizeMode="contain"
        />
      );
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
            paddingHorizontal: 5,
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            {/* checkbox */}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <CheckBox
                tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
                disabled={false}
                value={selectedIndex.includes(index)}
                onValueChange={() => {
                  setSelectedIndex((prevArray) => {
                    console.log("setSelectedIndex render");
                    if (prevArray.includes(index)) {
                      return prevArray.filter((itm) => itm !== index);
                    }
                    return [...prevArray, index];
                  });
                }}
              />
            </View>
            {/* ? setSelectedIndex((prevArray) => [...prevArray, index])
            : setSelectedIndex(selectedIndex.filter((itm) => itm !== index)) */}

            {/* foto */}
            {/* <View style={{  justifyContent: "center", alignItems: "flex-start" }}>
          <Image
            style={{ height: WIDTH_WINDOW / 10, width: WIDTH_WINDOW / 10 }}
            source={{ uri: item.user.userdetail.picture }}
            resizeMode="contain"
          />
        </View> */}

            {/* kullanıcı bilgi */}
            {/* <View style={{ flex:1,  justifyContent: "center", alignItems: "flex-start",  paddingLeft: 10   }}>
          <View style={{flex:1, flexDirection:'row',}}>
          <Text  style={{color: "#6C757D", fontSize: 13, flexWrap:'wrap'  }}>
            {item.user.userdetail.name}
          </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 2 }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={Flags.tr} // .country.binarycode.toLowerCase()   item.sender_user.userdetail.country.binarycode.toLowerCase()
                resizeMode="contain"
              />
            </View>
            <Text style={styles.textUserInfo}>{item.user.country_id}</Text>
            <Text style={[styles.textUserInfo, {paddingLeft:10}] }>{setUyelikTuru(item)}</Text>
          </View>
        </View> */}
            <ProfileBox
              roleID={item.user.userrole_id}
              userID={item.user.id}
              userAvatar={item.user.userdetail.picture}
              fullName={item.user.userdetail.name}
              institutionName={item.user.userdetail.full_institution_name}
              countryBinary={item.user.userdetail.country.binarycode}
            />
          </View>

          <View>
            {/* yukarı aşağı ok */}
            <View
              style={{ justifyContent: "center", alignItems: "flex-start" }}
            >
              <Image
                style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
                source={contentOpen ? ContentCloseIcon : ContentOpenIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        {/* itemların altında açılan info tab ı */}
        {contentOpen && (
          <View style={{ height: 250 }}>
            <View style={[styles.textRow, { borderTopWidth: 0.5 }]}>
              <Text style={styles.textComman}>Okunma Durumu</Text>
              <Text style={styles.textComman}>
                {item.readen_by_user ? "Okundu" : "Okunmadı"}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textComman}>Durum</Text>
              <View>
                <ImageManipulator />
              </View>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textComman}>Düzenlenme Tarihi</Text>
              <Text style={styles.textComman}>
                {transformDateFormatFromIsoToShort(item.created_at)}{" "}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textComman}>Gönderme Tarihi</Text>
              <Text style={styles.textComman}>
                {" "}
                {transformDateFormatToDDMMYYYY(item.sending_date.slice(0, 16))}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textComman}>Gönderim Tipi</Text>
              <Text style={styles.textComman}> {item.sendingtype.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 15,
                flexDirection: "row",
              }}
            >
              <Text style={styles.textComman}>İşlem</Text>
              <IslemCards
                activeState={activeState}
                setActiveState={setActiveState}
                item={item}
                setOnProcessItem={setOnProcessItem}
              />
            </View>
          </View>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default ListeItemKayitGuncelle;

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
});
