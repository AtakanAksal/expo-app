/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-native-elements";

import CheckBox from "@react-native-community/checkbox";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from "react-native";

import { Flags } from "../../../../../../components/FlagExporter";

import ContentOpenIcon from "../../../../../../../assets/vexmail/icerik-ac.png";
/* import ContentCloseIcon from "../../../../../../assets/vexmail/icerik-kapa.png";

import FuarCerceveIcon from "../../../../../../assets/fuar/fuar-cerceve-turkuaz.png";
import SalonCerceveIcon from "../../../../../../assets/salon/salon-cerceve-turkuaz.png";
import StantCerceveIcon from "../../../../../../assets/stant/stant-cerceve-turkuaz.png";

import TarihIcon from "../../../../../../assets/stant/menu/dokuman/tarih.png";
import SaatIcon from "../../../../../../assets/stant/menu/dokuman/saat.png";
import KonumIcon from "../../../../../../assets/stant/menu/dokuman/konum.png"; 
*/

import TDotV from "../../../../../../../assets/three-dot-v.png";
import vexRateIcon from "../../../../../../../assets/vex-rate.png";
import commentIcon from "../../../../../../../assets/comment-null.png";
import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";

const WIDTH_WINDOW = Dimensions.get("window").width;
/* { item, index, setSelectedIndex, documentType, selectedIndex, setSelectedItem } */
const VexRateListItem = ({ item, setSelectedComponent, setSelectedItem }) => {
  const [tooltipVpos, setTooltipVpos] = useState(2000);

  const itemRef = useRef(null);

  const setUyelikTuru = () => {
    if (item?.user?.userrole_id === 1) {
      return "Bireysel";
    }
    if (item?.user?.userrole_id === 2) {
      return "Ticari";
    }
    if (item?.user?.userrole_id === 3) {
      return "Kamu";
    }
    if (item?.user?.userrole_id === 4) {
      return "STK";
    }
  };

  const tooltipPopover = () => {
    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Profil tıklandı")}>
          <Text style={styles.tooltipText}>Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tooltipItems}
          onPress={() => {
            if (setSelectedItem) {
              setSelectedItem(item);
              setSelectedComponent(1);
            }
          }}
        >
          <Text style={styles.tooltipText}>Puanlama</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Mesaj tıklandı")}>
          <Text style={styles.tooltipText}>Mesaj</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Teşekkür et tıklandı")}>
          <Text style={styles.tooltipText}>Teşekkür Et</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Sil tıklandı")}>
          <Text style={styles.tooltipText}>Bildirimi Sil</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Pressable
      style={{
        width: WIDTH_WINDOW - 20,
        // height: contentOpen ? 170 : 70, // contentOpen ? 80 : 180
        height: 70,
        margin: 5,
        elevation: 6,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
      }}
      // onPress={() => setContentOpen((prevState) => !prevState)}
    >
      <View style={{ height: 70, flexDirection: "row", paddingHorizontal: 5 }}>
        {/* foto */}
        <View style={{ flex: 4.6, justifyContent: "center", alignItems: "flex-start" }}>
          {/*   {console.log(item?.user?.userdetail.name)}
          {console.log(item?.user?.userdetail.full_institution_name)}
          {console.log(item?.user?.userrole_id)} */}
          <ProfileBox
            roleID={item?.user?.userrole_id}
            userID={item?.user?.userdetail.user_id}
            userAvatar={item?.user?.userdetail?.picture}
            fullName={item?.user?.userdetail.name}
            institutionName={item?.user?.userdetail.full_institution_name}
            countryBinary={item?.user?.userdetail.country?.binarycode}
            // timeCalculate
          />
        </View>

        {/* yorum var */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          {item.comment && (
            <TouchableOpacity
              style={{
                height: "50%",
                width: "50%",
              }}
              onPress={() => {
                if (setSelectedItem) {
                  setSelectedItem(item);
                  setSelectedComponent(1);
                }
              }}
            >
              <Image style={{ height: "100%", width: "100%" }} source={commentIcon} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>

        {/* rate icon */}
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%",
            }}
            onPress={() => {
              if (setSelectedItem) {
                setSelectedItem(item);
                setSelectedComponent(1);
              }
            }}
          >
            <Image
              style={{ height: "80%", width: "80%", alignSelf: "center", backgroundColor: "#FFFFFF70" }}
              source={vexRateIcon}
              resizeMode="contain"
            />
            <Text
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                position: "absolute",
                zIndex: 1,
                top: 5,
                right: 0,
                left: 0,
              }}
            >
              {item.average_point}
            </Text>
          </TouchableOpacity>
        </View>
        {/* üç nokta */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
          <Tooltip
            onOpen={() =>
              itemRef.current.measure((a, b, width, height, px, py) => {
                setTooltipVpos(py);
              })
            }
            containerStyle={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#EEEEEE",
              top: tooltipVpos,
              left: WIDTH_WINDOW / 1.85,
            }}
            //          overlayColor="#00AA9F30"
            skipAndroidStatusBar
            height={200}
            width={120}
            backgroundColor="#FFFFFF"
            withPointer={false}
            popover={tooltipPopover()}
          >
            <Image
              ref={itemRef}
              style={{ height: WIDTH_WINDOW / 10, width: WIDTH_WINDOW / 10, alignSelf: "center" }}
              source={TDotV}
              resizeMode="contain"
            />
          </Tooltip>
        </View>
      </View>
    </Pressable>
  );
};

export default VexRateListItem;

const styles = StyleSheet.create({
  tooltipContainer: {
    alignSelf: "flex-start",
  },

  tooltipItems: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  tooltipText: {
    color: "#6C757D",
    marginLeft: 10,
  },
});
