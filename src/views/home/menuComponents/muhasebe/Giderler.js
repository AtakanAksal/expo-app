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



import {
  relativeHeightNum,
  relativeWidthNum,
  transformDateFormatFromIsoToShort,
} from "../../../../utils/HelperFunctions";

import ContentOpenIcon from "../../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../../assets/vexmail/icerik-kapa.png";
import Goruntule from "../../../../../assets/notification/goruntule.png";
import Profil from "../../../../../assets/notification/profil.png";
import YayinDetaylari from "../../../../../assets/muhasebe/yayin-bilgisi.png";
import SiparisDetayi from "../../../../../assets/muhasebe/muhasebe.png";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const Giderler = ({ nav, item }) => {
    return (
      <View
        style={
          // activeState === "bildirimler-sikayet" ||
          // activeState === "bildirimler-davet" ||
          // activeState === "bildirimler-yorum" ||
          // activeState === "bildirimler-basvuru"
          true ? { height: relativeHeightNum(395) } : { height: 200 }
        }
      >
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Gider Modülü</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Gider Türü</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Gider Tarihi</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Gider Tutarı</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={[styles.textRow, { borderTopWidth: 0.5 }]}>
          <Text style={styles.textComman}>Gider Kuru</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Teslimat Tarihi</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Onay Tarihi</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tahsilat Tutarı</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tahsilat Kuru</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>Tahsilat Tarihi</Text>
          <Text style={styles.textComman}>
          Statik Veri
          </Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.textComman}>İşlem</Text>
  
          <View style={{ flexDirection: "row" }}>
            {/* Profil */}
            <TouchableOpacity
              style={styles.bildirimCardView}
              onPress={() => nav.navigate("OtherProfile", { userID: 21 })} // item.sender_user.id
            >
              <Image
                style={styles.bildirimItemImg}
                source={Profil}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* Yayın Detayları */}
            <TouchableOpacity
              style={styles.bildirimCardView}
              onPress={() => null}
            >
              <Image
                style={styles.bildirimItemImg}
                source={YayinDetaylari}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* Sipariş Detayı */}
            <TouchableOpacity
              style={styles.bildirimCardView}
              onPress={() => null}
            >
              <Image
                style={styles.bildirimItemImg}
                source={YayinDetaylari}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* Ödeme Detayı */}
            <TouchableOpacity
              style={styles.bildirimCardView}
              onPress={() => null}
            >
              <Image
                style={styles.bildirimItemImg}
                source={SiparisDetayi}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  export default Giderler;
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