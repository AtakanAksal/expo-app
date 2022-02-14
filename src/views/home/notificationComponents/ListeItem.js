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
  relativeHeight,
  transformDateFormatFromIsoToShort,
} from "../../../utils/HelperFunctions";
import { useUserValue } from "../../../contexts/UserContext";
import { Flags } from "../../../components/FlagExporter";

import ContentOpenIcon from "../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../assets/vexmail/icerik-kapa.png";
import IslemCards from "./IslemCards";
import ProfileBox from "../../../components/profileComponent/ProfileBox";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const ListeItem = ({
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
            paddingHorizontal: 5,
            paddingVertical: 5,
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
            source={{ uri: item.sender_user_detail.picture }}
            resizeMode="contain"
          />
        </View> */}

            {/* kullanıcı bilgi */}
            {/* <View style={{ flex:1,  justifyContent: "center", alignItems: "flex-start",  paddingLeft: 10   }}>
          <View style={{flex:1, flexDirection:'row',}}>
          <Text  style={{color: "#6C757D", fontSize: 13, flexWrap:'wrap'  }}>
            {item.sender_user_detail.name}
          </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 2 }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={Flags[item.sender_user.userdetail.country.binarycode.toLowerCase()]} // .country.binarycode.toLowerCase()  
                resizeMode="contain"
              />
            </View>
            <Text style={styles.textUserInfo}>{item.sender_user_detail.country_id}</Text>
            <Text style={[styles.textUserInfo, {paddingLeft:10}] }>{setUyelikTuru(item)}</Text>
          </View>
        </View> */}
            <ProfileBox
              roleID={
                stateIsReceived
                  ? item.sender_user.userrole_id
                  : item.receiver_user.userrole_id
              }
              userID={
                stateIsReceived ? item.sender_user.id : item.receiver_user.id
              }
              userAvatar={
                stateIsReceived
                  ? item.sender_user_detail.picture
                  : item.receiver_user_detail.picture
              }
              fullName={
                stateIsReceived
                  ? item.sender_user_detail.name
                  : item.receiver_user_detail.name
              }
              institutionName={
                stateIsReceived
                  ? item.sender_user_detail.full_institution_name
                  : item.receiver_user_detail.full_institution_name
              }
              countryBinary={
                stateIsReceived
                  ? item.sender_user_detail.country.binarycode
                  : item.receiver_user_detail.country.binarycode
              }
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
          <View
            style={
              activeState === "bildirimler-sikayet" ||
              activeState === "bildirimler-davet" ||
              activeState === "bildirimler-yorum" ||
              activeState === "bildirimler-basvuru"
                ? { height: 250 }
                : { height: 200 }
            }
          >
            <View style={[styles.textRow, { borderTopWidth: 0.5 }]}>
              <Text style={styles.textComman}>Gönderen Kişi Adı</Text>
              <Text style={styles.textComman}>
                {item.sender_user.first_name}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textComman}>Gönderilen Kişi Adı</Text>
              <Text style={styles.textComman}>
                {item.receiver_user.first_name}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textComman}>Durum</Text>
              <Text style={styles.textComman}>
                {item.sender_id === user.userid
                  ? item.sender_message?.name
                  : item.receiver_message?.name}{" "}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textComman}>Tarih</Text>
              <Text style={styles.textComman}>
                {" "}
                {transformDateFormatFromIsoToShort(item.created_at)}
              </Text>
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
});
