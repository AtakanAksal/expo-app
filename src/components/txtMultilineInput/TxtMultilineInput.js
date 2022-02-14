import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { relativeWidthNum } from "../../utils/HelperFunctions";

const TxtMultilineInput = ({
  pickerContent,
  content,
  placeHolder,
  onChangeText,
  onFocus,
  onEndEditing,
  writedValue,
}) => {
  return (
    <TextInput
      value={writedValue}
      blurOnSubmit
      multiline
      textAlignVertical="top"
      onFocus={onFocus}
      onEndEditing={onEndEditing}
      style={content !== "" && pickerContent !== "seciniz" ? styles.inputEnable : styles.inputDisable}
      editable={content !== "" && pickerContent !== "seciniz"}
      onChangeText={(txt) => onChangeText(txt)}
      placeholder={placeHolder}
      placeholderTextColor={content !== "" && pickerContent !== "seciniz" ? "#b8b8b8" : "#ededed"}
    />
  );
};

export default TxtMultilineInput;

const styles = StyleSheet.create({
  inputEnable: {
    backgroundColor: "#fff",
    margin: 5,
    padding: 10,
    borderWidth: 1,
    height: 100,
    paddingLeft: 10,
    fontSize: 15,
    color: "#1E1E1C",
    width:relativeWidthNum(280),
    alignSelf:"center"
    
  },
  inputDisable: {
    backgroundColor: "#6C757D",
    margin: 5,
    padding: 10,
    borderWidth: 1,
    height: 100,
    paddingLeft: 10,
    fontSize: 15,
    color: "#fff",
    width:relativeWidthNum(280),
    alignSelf:"center"
  },
});
