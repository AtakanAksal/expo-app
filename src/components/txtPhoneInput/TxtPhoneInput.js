/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image, Modal } from "react-native";
import PhoneInput from "react-native-phone-input";
import { Controller } from "react-hook-form";
import CountryPicker from "react-native-country-picker-modal";

import CheckIcon from "../../../assets/check-icon.png";
import ErrorIcon from "../../../assets/error-icon.png";
import PickerCountryModal from "./PickerCountryModal";
import { relativeHeightNum, relativeWidthNum } from "../../utils/HelperFunctions";

const TxtPhoneInput = ({
  content,
  placeHolder,
  setPhone,
  countryCallingCode,
  onFocus,
  onEndEditing,
  isPhone,
  isPass,
  name,
  rules,
  control,
  formState,
  watch,
  trigger,
}) => {
  const watchShowAge = watch(name);

  useEffect(() => {
    if (watchShowAge) trigger(name);
  }, [watchShowAge, trigger, name]);

  const inpCheck = useCallback(
    (v) => {
      if (content !== "") {
        if (formState.errors[name]?.message) {
          return styles.inputError;
        }
        if (v !== "") {
          return styles.inputValid;
        }
        return styles.inputEnable;
      }
      return styles.inputDisable;
    },
    [content, formState.errors] // name ?
  );

  let phoneInputRef = useRef(null);
  const [country, setCountry] = useState(null);
  const [mVisible, setMVisible] = useState(false);

  const onSelect = (v) => {
    phoneInputRef.selectCountry(v.binarycode.toLowerCase());
    setCountry(v);
   
  };

  const getColor = () => {
    if (content === "") {
      return "#fff";
    }
    return "#1E1E1C";
  };

  return (
    <View style={{alignSelf:"center"}} >
      <Controller
        control={control}
        rules={rules}
        name={name}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <PhoneInput
              ref={(ref) => {
                phoneInputRef = ref;
              }}
              disabled={content === ""}
              style={inpCheck(value)}
              initialValue={country ? country.phonecode : countryCallingCode}
              onChangePhoneNumber={onChange}
              onBlur={onBlur}
              textProps={{
                placeholder: placeHolder,
                placeholderTextColor: "#6C757D",
                fontSize:12
              }}
              textStyle={{ color: getColor() }}
              onPressFlag={() => setMVisible(true)}
            />
            <View style={styles.flagButton}>
              <Modal
                animationType="fade"
                visible={mVisible}
                onRequestClose={() => {
                  setMVisible((prev) => !prev);
                }}
              >
                <PickerCountryModal closePress={() => setMVisible(false)} onSelect={onSelect} />
              </Modal>

              {/** 
                <CountryPicker
                visible={mVisible}
                withFilter
                withCallingCode
                withEmoji
                preferredCountries={["TR"]}
                onSelect={(val) => onSelect(val)}
                onClose={() => setMVisible(false)}
                onOpen={() => setMVisible(true)}
              />
               */}
            </View>
          </View>
        )}
      />
      <View style={{ }}>
        {formState.errors[name]?.message && <Text style={styles.messageTxt}>{formState.errors[name].message}</Text>}
      </View>

      <View style={styles.checkIcon}>
        {Object.keys(formState?.dirtyFields).includes(name) ? (
          formState.errors[name]?.message ||
          formState.errors[name]?.message !== undefined ||
          typeof formState.errors[name]?.message !== "undefined" ? (
            <Image style={{ height: relativeHeightNum(30), width: relativeHeightNum(30), marginBottom: relativeHeightNum(10) }} resizeMode="center" source={ErrorIcon} />
          ) : (
            <>
              <Image style={{ height: relativeHeightNum(30), width: relativeHeightNum(30) }} resizeMode="center" source={CheckIcon} />
              {/* console.log(`${formState.errors[name]?.message}--22  -${name}`) */}
            </>
          )
        ) : null}
      </View>
    </View>
  );
};

export default TxtPhoneInput;

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputContainer: {
    height: 45,
    margin: 5,
   // borderWidth: 1,
  },

  flagButton: {
    paddingLeft: 5,
    zIndex: -2,
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },

  inputEnable: {
    color: "#6C757D",
    backgroundColor: "#fff",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
  //  borderWidth: 1,
    fontSize: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputDisable: {
    backgroundColor: "#6C757D",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
    borderWidth: 1,
    fontSize: 12,
    color: "#fff",
  },

  messageTxt: {
    color: "#FF0018",
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 10,
    marginTop: -5,
  },

  checkIcon: {
    // paddingLeft: 5,
    zIndex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "70%",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  inputError: {
    color: "#6C757D",
    fontSize: 12,
    backgroundColor: "#fff",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
    borderWidth: 2,
    borderColor: "#FF0018",
  },

  inputValid: {
    color: "#6C757D",
    fontSize: 12,
    backgroundColor: "#fff",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
    borderWidth: 2,
    borderColor: "#00AA9F",
  },
});
