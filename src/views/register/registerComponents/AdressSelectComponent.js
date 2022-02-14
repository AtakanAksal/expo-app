import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";

const AdressSelectComponent = ({ selectValue, setSelectValue, selectedLocation, list, firstPlaceholder }) => {
  return (
    <View
      style={
        selectedLocation && selectedLocation !== "seciniz"
          ? StylesRegister.pickerContainer
          : StylesRegister.pickerContainerDisable
      }
    >
      <Picker
        selectedValue={selectValue}
        onValueChange={(itemValue) => setSelectValue(itemValue)}
        mode="dialog"
        style={selectedLocation !== "seciniz" ? StylesRegister.picker : StylesRegister.pickerDisable}
        enabled={selectedLocation !== "seciniz"}
      >
        <Picker.Item label={firstPlaceholder} value="seciniz" enable={false} />
        {list &&
          list.map((el) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={el.cityid} label={el.cityname} value={el.cityid} />
          ))}
      </Picker>
    </View>
  );
};

export default AdressSelectComponent;
