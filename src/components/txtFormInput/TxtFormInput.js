import React from "react";
import { TextInput } from "react-native";
import StylesTxtInput from "./StylesTxtInput";

const TxtFormInput = ({ content, writedValue, placeHolder, onChangeText, onFocus, onEndEditing, max10, isPhone, isPass }) => {
  return (
    <TextInput
      value={writedValue}
      keyboardType={isPhone ? "phone-pad" : "default"}
      onFocus={onFocus}
      onEndEditing={onEndEditing}
      style={content !== "" ? StylesTxtInput.inputEnable : StylesTxtInput.inputDisable}
      editable={content !== ""}
      onChangeText={(txt) => onChangeText(txt)}
      placeholder={placeHolder}
      placeholderTextColor={content !== "" ? "#b8b8b8" : "#ededed"}
      maxLength={max10 ? 10 : 500}
    />
  );
};

export default TxtFormInput; 
