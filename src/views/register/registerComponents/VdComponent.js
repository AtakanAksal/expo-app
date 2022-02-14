import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../StylesRegister";
import { useGetTaxCenter } from "../../../helpers/connections";

const VdComponent = ({selectValue, setSelectValue}) => {
  const { data, isLoading, isError } = useGetTaxCenter();
  return (
    <View style={StylesRegister.pickerContainer}>
      <Picker
        selectedValue={selectValue}
        onValueChange={(itemValue) => setSelectValue(itemValue)}
        mode="dialog"
        style={StylesRegister.picker}
      >
        <Picker.Item label="Vergi Dairesi Seçiniz..." value="seciniz" enable={false} />
        {!(isLoading || isError) &&
              data.map((el) => <Picker.Item key={el.id} label={el.department} value={el} />)}

      </Picker>
    </View>
  );
};

export default VdComponent;
