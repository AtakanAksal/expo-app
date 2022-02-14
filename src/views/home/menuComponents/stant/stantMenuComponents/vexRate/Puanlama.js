
import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from "react-native";
import VexRateListItem from "./VexRateListItem";

import starIcon from "../../../../../../../assets/star.png";
import starNullIcon from "../../../../../../../assets/star-null.png";

const WIDTH_WINDOW = Dimensions.get("window").width;

const Puanlama = ({ setSelectedComponent, selectedItem }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VexRateListItem item={selectedItem} />
      <RateObject rateName="Tasarım" rateCount={selectedItem.tasarim} />
      <RateObject rateName="Döküman" rateCount={selectedItem.dokuman} />
      <RateObject rateName="İçerik" rateCount={selectedItem.icerik} />
      <RateObject rateName="İleşim" rateCount={selectedItem.iletisim} />
      {selectedItem.comment && (
        <View
          style={{
            alignItems: "flex-start",
            margin: 5,
            elevation: 5,
            backgroundColor: "#FFFFFF",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text style={{ paddingBottom: 5, color: "#6C757D", fontSize: 15 }}>Yorum:</Text>
          <Text style={{ color: "#6C757D", fontSize: 14 }}>
           {selectedItem.comment}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Puanlama;

const styles = StyleSheet.create({});

const RateObject = ({ rateName, rateCount }) => {
  const stars = [];

  for (let i = 0; i < 10; i += 1) {
    stars.push(
      <Image
        key={i}
        style={{ height: 20, width: 20, marginHorizontal: 1 }}
        source={rateCount > i ? starIcon : starNullIcon}
        resizeMode="contain"
      />
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        margin: 5,
        elevation: 5,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "#6C757D", fontSize: 15, width: WIDTH_WINDOW / 5 }}>{rateName}</Text>
        <View style={{ flexDirection: "row" }}>{stars}</View>
      </View>
      <Text style={{ color: "#6C757D", fontSize: 18 }}>{rateCount}</Text>
    </View>
  );
};
