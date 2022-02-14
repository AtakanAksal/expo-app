/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";


import Goruntule from "../../../../../assets/notification/goruntule.png";

import {
  relativeHeightNum,
  relativeWidthNum,
  transformDateFormatFromIsoToShort,
} from "../../../../utils/HelperFunctions";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;




const BankaHesapBilgileri = ({item}) => {
    return (
      <View
        style={
          // activeState === "bildirimler-sikayet" ||
          // activeState === "bildirimler-davet" ||
          // activeState === "bildirimler-yorum" ||
          // activeState === "bildirimler-basvuru"
          true ? { height: relativeHeightNum(230) } : { height: 200 }
        }
      >
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Hesap Adı</Text>
          <Text style={styles.textComman}>
           {item.card_owner}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Banka Adı</Text>
          <Text style={styles.textComman}>
            {item.bank_reference_no}
            {/* {transformDateFormatFromIsoToShort(item.created_at)} */}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Şube</Text>
          <Text style={styles.textComman}>
            {" "}
            {/* {transformDateFormatFromIsoToShort(item.created_at)} */}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Ülke</Text>
          <Text style={styles.textComman}>
          {item.user.userdetail.country.countryname}
          </Text>
        </View>
        <View style={[styles.textRow, { borderTopWidth: 0.5 }]}>
          <Text style={styles.textComman}>İl</Text>
          <Text style={styles.textComman}>
            {/* {item.value} */}
            Statik
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>İlçe</Text>
          <Text style={styles.textComman}>
          Statik
            {/* {transformDateFormatFromIsoToShort(item.created_at)} */}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Oluşturulma Tarihi</Text>
          <Text style={styles.textComman}>
          {transformDateFormatFromIsoToShort(item.created_at)} 
          </Text>
        </View>
      </View>
    );
  };
  export default BankaHesapBilgileri;
  const styles = StyleSheet.create({

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