/* eslint-disable no-else-return */

import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { useDataCountries } from "../../../helpers/connections";



const CountryTile = ({ country }) => (
  <TouchableOpacity onPress={() => console.log("on pressed.", country.countryname)} style={styles.item}>
    <View>
 
      <Text style={styles.title}>{country.countryname}</Text>
    </View>
  </TouchableOpacity>
);

const CountryModal = ({ closePress }) => {
  const { data, isLoading, isError } = useDataCountries();

  const renderItem = ({ item }) => <CountryTile country={item} />;
  /** onTouchMove={closePress} */
  if (isLoading) {
    return (
      <View style={styles.innerModal}>
        <Text style={{ alignSelf: "center" }}>Loading...</Text>
      </View>
    );
  } else if (isError) {
    return (
      <View style={styles.innerModal}>
        <Text style={{ alignSelf: "center" }}>Error...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.innerModal}>
        <FlatList data={data} shouldItemU renderItem={renderItem} keyExtractor={(item) => item.countryid.toString()} />
      </View>
    );
  }
};

export default CountryModal;

const styles = StyleSheet.create({
  innerModal: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    height: "90%",
  },

  item: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
});
