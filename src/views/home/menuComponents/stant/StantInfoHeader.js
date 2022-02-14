import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import dayjs from "dayjs";

import stantYayindaIcon from "../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import YayinBekleyenGriIcon from "../../../../../assets/stant/stant-cerceve-gri.png";
import vexRateIcon from "../../../../../assets/vex-rate.png";
import TDotV from "../../../../../assets/three-dot-v.png";

const WIDTH_WINDOW = Dimensions.get("window").width;

const StantInfoHeader = ({ stant, count, rating, optionMenu }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: WIDTH_WINDOW / 5,
        justifyContent: "space-between",
        paddingHorizontal: 5,
        width: "100%",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", height: WIDTH_WINDOW / 5, flex: 1 }}>
        <View style={{ alignItems: "center", marginHorizontal: 5 }}>
          <Image
            style={{ height: WIDTH_WINDOW / 9, width: WIDTH_WINDOW / 9, margin: 5 }}
            source={getMainIcon(stant.status)}
            resizeMode="contain"
          />
          {stant.status === 1 && <Text style={{ fontSize: 10, color: "#28A745" }}>Yayında</Text>}
          {stant.status === 2 && <Text style={{ fontSize: 10, color: "#FF0000" }}>Yayını Biten</Text>}
          {stant.status === 5 && <Text style={{ fontSize: 10, color: "#17A2B8" }}>Yayın Bekleyen</Text>}
          {stant.status === 7 && <Text style={{ fontSize: 10, color: "#6C757D" }}>Taslak</Text>}
          {stant.status === 8 && <Text style={{ fontSize: 10, color: "#6C757D" }}>Taslak</Text>}
          {stant.status === 4 && <Text style={{ fontSize: 10, color: "#6C757D" }}>Özelleştirme Bekliyor</Text>}
        </View>
        <View style={{ height: "100%", paddingVertical: 10 }}>
          <Text style={{ color: "#6C757D", fontSize: 16, marginBottom: 5 }}>{stant.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#6C757D", fontSize: 9, marginRight: 15 }}>
              Başlangıç: {dayjs(new Date(stant.started_at)).format("DD.MM.YYYY")}
            </Text>
            <Text style={{ color: "#6C757D", fontSize: 9 }}>
              Başlangıç: {dayjs(new Date(stant.finished_at)).format("DD.MM.YYYY")}
            </Text>
          </View>
        </View>
      </View>
      {count ? (
        <View style={{ backgroundColor: "#00AA9F", marginRight: 10, paddingVertical: 10, paddingHorizontal: 15 }}>
          <Text style={{ color: "#FFFFFF" }}>{count}</Text>
        </View>
      ) : null}
      {rating ? (
        <View style={{ alignItems: "center", justifyContent: "flex-start", top: -6 }}>
          <Text style={{ color: "#FFFFFF", textAlign: "center", position: "absolute", zIndex: 1, top: 5, right: 5 }}>
            {rating}
          </Text>
          <Image style={{ width: 30, height: 60 }} source={vexRateIcon} resizeMode="contain" />
        </View>
      ) : null}
      {optionMenu ? (
        <View>
          <Image
            style={{ height: WIDTH_WINDOW / 9, width: WIDTH_WINDOW / 9, margin: 5 }}
            source={TDotV}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );
};

export default StantInfoHeader;

const styles = StyleSheet.create({});

const getMainIcon = (status) => {
  switch (status) {
    case 1:
      return stantYayindaIcon;
    case 2:
      return stantYayinBitenIcon;
    case 5:
      return stantYayinBekleyenIcon;
    case 7:
      return YayinBekleyenGriIcon;
    case 8:
      return YayinBekleyenGriIcon;
    case 4:
      return YayinBekleyenGriIcon;
    default:
      return null;
  }
};
