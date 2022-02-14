import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetDistricts } from "../../../helpers/connections";

const MahallePicker = ({ selectValue, setSelectValue, selectedLocation, countyID }) => {
  const { data, isLoading, isError } = useGetDistricts(countyID);
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
        <Picker.Item label="Mahalle Seçiniz.." value="seciniz" enable={false} />
        {!(isError || isLoading) &&
          data.map((el) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={el.countyid} label={el.areaname} value={el.areaid} />
          ))}
      </Picker>
    </View>
  );
};

export default MahallePicker;
