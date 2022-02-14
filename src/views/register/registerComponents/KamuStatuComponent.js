import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetInstitutionType } from "../../../helpers/connections";

const KamuStatuComponent = ({ selectValue, setSelectValue }) => {
  const { data, isLoading, isError } = useGetInstitutionType();

  return (
    <View style={StylesRegister.pickerContainer}>
      <Picker
        selectedValue={selectValue}
        onValueChange={(itemValue) => setSelectValue(itemValue)}
        mode="dialog"
        style={StylesRegister.picker}
      >
        <Picker.Item label="Türünü Seçiniz..." value="seciniz" enable={false} />

        {data &&
          data.map((el) => (
            // eslint-disable-next-line react/no-array-index-key
            <Picker.Item key={el.id} label={el.type} value={el.id} />
          ))}
      </Picker>
    </View>
  );
};

export default KamuStatuComponent;
