/* eslint-disable react/no-array-index-key */
import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { useRegisterValue } from "../../../../contexts/RegisterContext";
import { GlobalStyles } from "../../../../styles/globals.css";
import BackgroundImage from "../../../../../assets/register_background.jpg";


const Overview = ({ setSelectedPage }) => {
  const [{ register }] = useRegisterValue();

  const handleConfirm = () => {
    setSelectedPage(5);
  };
  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={GlobalStyles.container}>
      <View>
        {Object.keys(register).map((el, index) => {
          return <Text style={GlobalStyles.whiteText} key={index}>{JSON.stringify(register[el])}</Text>;
        })}
      </View>
      <View>
        <TouchableOpacity style={GlobalStyles.button} onPress={handleConfirm}>
          <Text>Onayla</Text>
        </TouchableOpacity>
      </View>
    </View>
        </ImageBackground>

  );
};

export default Overview;

