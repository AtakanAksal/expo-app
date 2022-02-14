/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */

import React, { useCallback } from "react";
import { StyleSheet, FlatList, Text, Image, View, TouchableOpacity } from "react-native";

import { Flags } from "../FlagExporter";
import { useDataCountries } from "../../helpers/connections";

const PickerCountryModal = ({ onSelect, closePress }) => {
  const { data, isLoading, isError } = useDataCountries();
  console.log("-render 1 - - PickerCountryModal");

  const handleSelect = (v) => {
    closePress();
    onSelect(v);
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.tile}>
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <View style={styles.innerTile}>
            <Image source={Flags[item.binarycode.toLowerCase()]} resizeMode="stretch" style={styles.image} />
            <Text style={styles.text}>{item.countryname}</Text>
            <Text> (+{item.phonecode})</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }, []);

  if (isLoading) {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text>Loading...</Text>
      </View>
    );
  } else if (isError) {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text>Error...</Text>
      </View>
    );
  } else {
    return (
      // ! optimizasyon- liste bitmeden tıklamaya izin vermiyor.
      // ? optimizasyon- liste bitmeden tıklamaya izin vermiyor.
      <View style={styles.container}>
        {console.log("-render 2 - - PickerCountryModal ---------- ")}
        <FlatList
          data={data}
          windowSize={250}
          // removeClippedSubviews
          updateCellsBatchingPeriod={10}
          maxToRenderPerBatch={5}
          keyExtractor={(item) => item.countryid.toString()}
          initialNumToRender={5}
          decelerationRate={0.9}
          getItemLayout={(data, index) => ({ length: 30, offset: 30 * index, index })}
          renderItem={renderItem}
        />
      </View>
    );
  }
};

export default PickerCountryModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  tile: {
    borderBottomWidth: 0.5,
    borderColor: "black",
    padding: 7,
    marginLeft: 5,
    marginRight: 5,
  },

  innerTile: {
    flexDirection: "row",
    margin: 5,
  },

  image: {
    height: 20,
    width: 30,
    marginRight: 5,
  },

  text: {
    fontSize: 16,
  },
});

/** 
 * 
 *     <ScrollView>
        {data &&
          data.map((el, index) => (
            <View key={index} style={{ flexDirection: "row", margin: 5 }}>
              <View>
                <Image
                  source={Flags[el.binarycode.toLowerCase()]}
                  //  source={Flags[el.binarycode.toLowerCase()]}
                  resizeMode="stretch"
                  style={{ height: 20, width: 30, marginRight: 5 }}
                />
              </View>
              <Text>{el.countryname}</Text>
            </View>
          ))}
      </ScrollView>
 */

/** 
       * 
       *   <FlatList
          data={data}
          keyExtractor={(item) => item.countryid.toString()}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log(" tıklandı ", item.countryname)}>
              <View style={{ flexDirection: "row", margin: 5 }}>
                <Image
                  source={Flags.TR}
                  resizeMode="stretch"
                  style={{ height: 20, width: 30, marginRight: 5 }}
                />
                <Text>{item.countryname}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
       */

/** 
         * 
         *      <VirtualizedList
        data={data}
        initialNumToRender={4}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.countryname} onPress={() => console.log(" tıklandı ", item.countryname)}>
            <View style={{ flexDirection: "row", margin: 5 }}>
            <Image
                source={Flags.TR}
                resizeMode="stretch"
                style={{ height: 20, width: 30, marginRight: 5 }}
              />
              <Text>{item.countryname}</Text>
            </View>
          </TouchableOpacity>
        )}
        
        getItemCount={getItemCount}
        getItem={getItem(data, item.countryname)}
      />
         */
