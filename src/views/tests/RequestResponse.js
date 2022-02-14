/* eslint-disable no-else-return */
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import axios from "axios";

import { GlobalStyles } from "../../styles/globals.css";
import { useDataPosts } from "../../helpers/connections";

const RequestResponse = () => {
  const { data, isLoading, isError } = useDataPosts();

  /*   useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);
 */

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading..</Text>
      </SafeAreaView>
    );
  } else if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error.. = {isError}</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          ListHeaderComponent={headerComponent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.body}</Text>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
};

const headerComponent = () => (
  <View>
    <Text>asdasdsadasd</Text>
  </View>
);

export default RequestResponse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    flexDirection: "row",
    alignContent: "space-between",
    
  },
  card: {
    borderRadius: 2,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#9bb8c2",
    padding: 3,
    margin: 2,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 100,
  },
  title: {
    fontSize: 14,
    color: "#bf5e3c",
  },
  desc: {
    fontSize: 10,
    color: "#d8d8d8",
  },
});
