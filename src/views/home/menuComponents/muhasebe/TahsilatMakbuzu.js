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



const TahsilatMakbuzu = ({item}) => {
    const goruntule = () => {};
    return (
      <View
        style={
          // activeState === "bildirimler-sikayet" ||
          // activeState === "bildirimler-davet" ||
          // activeState === "bildirimler-yorum" ||
          // activeState === "bildirimler-basvuru"
          true ? { height: relativeHeightNum(295) } : { height: 200 }
        }
      >
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tahsilat Konusu</Text>
          <Text style={styles.textComman}>
            {/* {item.value} */}
           Statik veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Seri No</Text>
          <Text style={styles.textComman}>
         { item.invoice_serial_number}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Sicil No</Text>
          <Text style={styles.textComman}>
          {item.user.userdetail.invoice_taxno}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Ödeme Şekli</Text>
          <Text style={styles.textComman}>
          {item.order.payment_type.name}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tutar</Text>
          <Text style={styles.textComman}>
          {item.amount}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Kur</Text>
          <Text style={styles.textComman}>
           {item.currency}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tarih</Text>
          <Text style={styles.textComman}>
          {transformDateFormatFromIsoToShort(item.created_at)} 
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>İşlem</Text>
          <TouchableOpacity style={styles.bildirimCardView} onPress={goruntule}>
            <Image
              style={styles.bildirimItemImg}
              source={Goruntule}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  export default TahsilatMakbuzu;
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
    bildirimCardView: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: 5,
    },
    bildirimItemImg: {
      height: relativeWidthNum(25),
      width: relativeWidthNum(25),
      // marginBottom: 2,
      //  marginHorizontal: 10,
    },
  });