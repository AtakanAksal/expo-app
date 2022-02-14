import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Image, Dimensions, TouchableOpacity } from "react-native";
import filter from "lodash.filter";
import FilterImg from "../../../../../../assets/vexmail/filtrele.png";
import Arama from "../../../../../../assets/vexmail/arama.png";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SearchAndFilterReklamComponant = ({ setListItems, listItems, filteredData, setFilteredData, setOpenList }) => {
  const [writedText, setWritedText] = useState("");

  const contains = (data, query) => {
    if (data?.toString().toLowerCase().includes(query.toString().toLowerCase())) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    setWritedText(text);
    if (text !== "") {
      const filtered = filter(listItems, (singledata) => {
        // eslint-disable-next-line no-template-curly-in-string
        //   const obj = {
        //       [`${singledata}.${queryString}`]: singledata
        //   };
        //  const aaaa='first_name'
        //  const strQuery=`${singledata}${queryString}${aaaa}`
        return contains(singledata?.value, text); //         `${singledata}.${queryString}`
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(listItems);
    }
  };

  return (
    <View style={styles.searchAndFilterComponant}>
      <View style={{ flex: 2, backgroundColor: "white", marginHorizontal: 5 }}>
        <View style={styles.search}>
          <Image
            style={{ height: 25, width: 25, paddingVertical: 8, marginLeft: 10, marginRight: 5 }}
            source={Arama}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Hızlı Arama"
            style={{ borderBottomWidth: 0.5, flex: 1, marginLeft: 15 }}
            // autoFocus
            onFocus={() => {
              setOpenList(true);
            }}
            onChangeText={(txt) => handleSearch(txt)}
            value={writedText}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchAndFilterReklamComponant;

const styles = StyleSheet.create({
  searchAndFilterComponant: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    height: HEIGHT / 16,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
});
const Filter = () => {
  return (
    <View style={styles.filter}>
      <Image
        style={{ height: 25, width: 25, marginVertical: 8, marginRight: 5 }}
        source={FilterImg}
        resizeMode="contain"
      />
      <Text style={{ color: "#6C757D" }}>Filtrele</Text>
    </View>
  );
};
