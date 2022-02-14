import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StylesRegister from "../../../StylesRegister";
import { useGetRegionType } from "../../../../../helpers/connections";
import BuyuksehirPicker from "../../../registerComponents/BuyuksehirPicker";
import KucuksehirPicker from "../../../registerComponents/KucuksehirPicker";
import IlPicker from "../../../registerComponents/IlPicker";
import IlcePicker from "../../../registerComponents/IlcePicker";

const BelediyePickerComponent = ({ bolge, setBolge, il, setIl, ilce, setIlce }) => {
  const { data, isLoading, isError } = useGetRegionType();

  return (
    <View>
      {
        {
          seciniz: (
            <View style={StylesRegister.pickerContainer}>
              <Picker
                selectedValue={bolge}
                onValueChange={(itemValue) => setBolge(itemValue)}
                mode="dialog"
                style={StylesRegister.picker}
              >
                <Picker.Item label="Bölge Seçiniz..." value="seciniz" enable={false} />

                {data &&
                  data.map((el) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Picker.Item key={el.id} label={el.type} value={el.id} />
                  ))}
              </Picker>
            </View>
          ),

          4: <BuyuksehirPicker selectValue={il} setSelectValue={setIl} selectedLocation />,

          3: <KucuksehirPicker selectValue={il} setSelectValue={setIl} selectedLocation />,
          2: (
            <>
              <IlPicker selectValue={il} setSelectValue={setIl} selectedLocation />

              <IlcePicker
                selectValue={ilce}
                setSelectValue={setIlce}
                selectedLocation={il}
                cityID={il === "seciniz" ? 0 : il.cityid}
              />
            </>
          ),
          1: (
            <>
              <IlPicker selectValue={il} setSelectValue={setIl} selectedLocation />

              <IlcePicker
                selectValue={ilce}
                setSelectValue={setIlce}
                selectedLocation={il}
                cityID={il === "seciniz" ? 0 : il.cityid}
              />
            </>
          ),
        }[bolge]
      }
    </View>
  );
};

export default BelediyePickerComponent;
