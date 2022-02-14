/* eslint-disable no-unneeded-ternary */
import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetCities } from "../../../helpers/connections";

const IlPicker = ({ selectValue, setSelectValue, selectedLocation, firstPlaceholder }) => {
  const { data, isLoading, isError } = useGetCities();
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
        <Picker.Item label={firstPlaceholder ? firstPlaceholder : "İl Seçiniz.."} value="seciniz" enable={false} />
        {!(isError || isLoading) &&
          data.map((el) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={el.cityid} label={el.cityname} value={el} />
          ))}
      </Picker>
    </View>
  );
};

export default IlPicker;
