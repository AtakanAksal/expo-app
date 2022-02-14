import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetNonMetropolCities } from "../../../helpers/connections";

const KucuksehirPicker = ({ selectValue, setSelectValue, selectedLocation }) => {
  const { data, isLoading, isError } = useGetNonMetropolCities();
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
        <Picker.Item label="İl Seçiniz..." value="seciniz" enable={false} />
        {!(isError || isLoading) &&
          data.map((el) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={el.cityid} label={el.cityname} value={el} />
          ))}
      </Picker>
    </View>
  );
};

export default KucuksehirPicker;
