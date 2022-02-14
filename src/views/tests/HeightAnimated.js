/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Animated, TouchableOpacity, Button } from "react-native";

const { height, width } = Dimensions.get("window");

const ListItem = (props) => {
  const animationDuration = 200;
  const [checkInModal, setCheckInModal] = useState(false);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);
  const [someVariable, setSomeVariable] = useState(true);

  const toggleDropdown = () => {
    if (expanded === true) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        setExpanded(!expanded);
      }, animationDuration);
    } else {
      setExpanded(!expanded);
      // expand dropdown
      Animated.timing(animatedHeight, {
        toValue: 200,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } 
  };

  const renderAdditionalContent = () => {
    if (someVariable === true) {
      return (
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Text>
      );
    }
  };

  const interpolatedHeight = animatedHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View>
      <Animated.View style={[styles.container, { height: interpolatedHeight }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.leftContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.title}>Title</Text>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => toggleDropdown()} style={styles.toggleBtn}>
              <Text>Expand/Collapse</Text>
            </TouchableOpacity>
          </View>
        </View>
        {expanded === true ? (
          <View>
            <Text>Subject</Text>

            <Text>Subject Content</Text>
            <Text>Subject</Text>

            <Text>Subject Content</Text>
            <Text>Subject</Text>

            <Text>Subject Content</Text>
            <Text>Subject</Text>

            <Text>Subject Content</Text>
            <Text>Subject</Text>

            <Text>Subject Content</Text>

            {renderAdditionalContent()}
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    borderRadius: 25,
    width: width * 0.95,
    marginBottom: 5,
    marginHorizontal: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    minHeight: 60,
    overflow: "hidden",
  },
  leftContainer: {
    justifyContent: "space-between",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#454A66",
  },
  toggleBtn: {
    borderWidth: 1,
    borderRadius: 7,
    paddingTop: 4,
    paddingBottom: 2.5,
    paddingHorizontal: 4,
    marginLeft: 10,
  },
/*   bottomContainer: {
    marginVertical: 20,
  }, */
});

export default ListItem;
