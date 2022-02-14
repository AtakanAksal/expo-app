/* eslint-disable no-unneeded-ternary */
import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetCities } from "../../../helpers/connections";
import { useGetWorldCities } from "../../../helpers/registerConnection";

const YabanciIlPicker = ({ selectValue, setSelectValue, selectedCountry, firstPlaceholder }) => {
  const { data, isLoading, isError } = useGetWorldCities(selectedCountry);
  return (
    <View
      style={StylesRegister.pickerContainer}
    >
      <Picker
        selectedValue={selectValue}
        onValueChange={(itemValue) => setSelectValue(itemValue)}
        mode="dialog"
        style={StylesRegister.picker }
      
      >
        <Picker.Item label={firstPlaceholder ? firstPlaceholder : "İl Seçiniz.."} value="seciniz" enable={false} />
        {!(isError || isLoading) &&
          data.map((el) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={el.city_ascii} label={el.city} value={el} />
          ))}
      </Picker>
    </View>
  );
};

export default YabanciIlPicker;
