import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";

import StantInfoHeader from "../../StantInfoHeader";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import FuarIcon from "../../../../../../../assets/fuar/expo-fuar-turkuaz.png";
import SalonIcon from "../../../../../../../assets/salon/expo-salon-turkuaz.png";
import KonumIcon from "../../../../../../../assets/general/location.png";
import YayinBilgiIcon from "../../../../../../../assets/stant/menu/yayin-bilgisi/period.png";
import BaslangicIcon from "../../../../../../../assets/stant/menu/yayin-bilgisi/atstart.png";
import BitisIcon from "../../../../../../../assets/stant/menu/yayin-bilgisi/atfinish.png";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;

const YayinBilgisiMain = ({ stantItem, setSelectedMenuItem, backtoStant }) => {
  console.log(stantItem);
  return (
    <>
      {backtoStant ? (
        <MainHeader text="Yayın Bilgisi" backBtnFunction={backtoStant} />
      ) : (
        <MainHeader text="Yayın Bilgisi" />
      )}

      <View style={styles.container}>
        <StantInfoHeader stant={stantItem} />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            {/* <RenderComp /> */}
            <View style={{ flexDirection: "row" }}>
              <InfoItem title="Fuar: " txt={stantItem?.hall?.expo?.name} img={FuarIcon} />
              <InfoItem title="Salon: " txt={stantItem?.hall?.name} img={SalonIcon} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <InfoItem title="Konum: " txt={stantItem?.boothcontent?.template_positionname} img={KonumIcon} />
              <InfoItem title="Yayın Süresi: " txt={`${stantItem?.time_period} Gün`} img={YayinBilgiIcon} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <InfoItem
                title="Başlangıç Tarihi: "
                txt={dayjs(new Date(stantItem.started_at)).format("DD.MM.YYYY - HH.mm")}
                img={BaslangicIcon}
              />
              <InfoItem
                title="Bitiş Tarihi: "
                txt={dayjs(new Date(stantItem.finished_at)).format("DD.MM.YYYY - HH.mm")}
                img={BitisIcon}
              />
            </View>
          </View>

          {/* main button - seçilenleri sil */}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default YayinBilgisiMain;

const InfoItem = ({ txt, img }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 10, marginBottom: 5 }}>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#00AA9F",
          margin: 10,
          width: WIDTH_WINDOW / 3.5,
          height: WIDTH_WINDOW / 3.5,
          backgroundColor: "#FFFFFF",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image style={{ flex: 1 }} source={img} resizeMode="contain" />
      </View>
      <Text style={{ color: "#6C757D", textAlign: "center" }}>{txt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
  },

  mainButton: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#00AA9F",
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

