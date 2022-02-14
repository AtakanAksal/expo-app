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

const Fatura = ({item}) => {
    const goruntule = () => {};
    return (
      <View
        style={
      
          true ? { height: relativeHeightNum(260) } : { height: 200 }
        }
      >
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Hizmet Kodu</Text>
          <Text style={styles.textComman}>
            {item.order.orderproducts[0].price.code}
           
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>İşlem Kodu</Text>
          <Text style={styles.textComman}>
            {item.bank_operation_code}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Sipariş Kodu</Text>
          <Text style={styles.textComman}>
            {item.bank_order_code}
            {/* {transformDateFormatFromIsoToShort(item.created_at)} */}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Referans No</Text>
          <Text style={styles.textComman}>
            {item.bank_reference_no}
            {/* {transformDateFormatFromIsoToShort(item.created_at)} */}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Ödeme Şekli</Text>
          <Text style={styles.textComman}>
            {item.order.payment_type.name}
            {/* {transformDateFormatFromIsoToShort(item.created_at)} */}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tutar</Text>
          <Text style={styles.textComman}>
            {item.amount}
            {/* {transformDateFormatFromIsoToShort(item.created_at)} */}
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tarih</Text>
          <Text style={styles.textComman}>
            {/* {item} */}
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
  export default Fatura;
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