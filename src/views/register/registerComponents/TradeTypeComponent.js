import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetCompanyType } from "../../../helpers/connections";

const TradeTypeComponent = ({ selectValue, setSelectValue, list, }) => {
  const { data, isLoading, isError } = useGetCompanyType();
  return (
    <View style={StylesRegister.pickerContainer}>
      <Picker
        selectedValue={selectValue}
        onValueChange={(itemValue) => setSelectValue(itemValue)}
        mode="dialog"
        style={StylesRegister.picker}
      >
        <Picker.Item label="Türünü Seçiniz..." value="seciniz" enable={false} />
        {!(isLoading || isError) &&
              data.map((el) => <Picker.Item key={el.id} label={el.type} value={el} />)}

        {/* list &&
          list.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={index} label={el} value={el} />
          )) */}
      </Picker>
    </View>
  );
};

export default TradeTypeComponent;