/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

import {
  relativeHeightNum,
} from "../../../../utils/HelperFunctions";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const IptalIade = ({item}) => {
  return (
    <View
      style={
  
        true ? { height: relativeHeightNum(295) } : { height: 200 }
      }
    >
      <View style={styles.textRow}>
        <Text style={styles.textComman}>Hizmet Kodu</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.textComman}>İşlem Kodu</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.textComman}>Sipariş Kodu</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.textComman}>Referans No</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
      <View style={[styles.textRow, { borderTopWidth: 0.5 }]}>
        <Text style={styles.textComman}>Ödeme Şekli</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.textComman}>Tutar</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.textComman}>Tarih</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.textComman}>İşlem</Text>
        <Text style={styles.textComman}>
        Statik Veri
        </Text>
      </View>
    </View>
  );
};
export default IptalIade;
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