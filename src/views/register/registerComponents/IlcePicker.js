import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetTowns } from "../../../helpers/connections";

const IlcePicker = ({ selectValue, setSelectValue, selectedLocation, cityID }) => {
  const { data, isError, isLoading } = useGetTowns(cityID);
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
        <Picker.Item label="İlce Seçiniz.." value="seciniz" enable={false} />
        {!(isError || isLoading) &&
          data.map((el) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={el.countyid} label={el.countyname} value={el} />
          ))}
      </Picker>
    </View>
  );
};

export default IlcePicker;
