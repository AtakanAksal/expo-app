/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useCallback } from "react";
import {
  TextInput,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Controller } from "react-hook-form";
import StylesTxtInput from "./StylesTxtInput";

import CheckIcon from "../../../assets/check-icon.png";
import ErrorIcon from "../../../assets/error-icon.png";

import ShowPass from "../../../assets/pass-show.png";
import ShowPassWhite from "../../../assets/pass-show-w.png";
import DontShowPass from "../../../assets/pass-dontshow.png";
import DontShowPassWhite from "../../../assets/pass-dontshow-w.png";

const TxtValidationUserCode = ({
  pickerContent,
  content,
  placeHolder,
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
  longInfoText,
  max10,
  noUppercase,
  showPassword,
  setShowPassword,
  
 
}) => {
  const watchShowAge = watch(name);

  useEffect(() => {
    if (watchShowAge) trigger(name);
  }, [watchShowAge, trigger, name]);

  const inpCheck = useCallback(
    (v) => {
   
      if (content !== "") {
        if (formState.errors[name]?.message) {
          return StylesTxtInput.inputError;
        }
        if (v !== "") {
          return StylesTxtInput.inputValid;
        }
        return StylesTxtInput.inputEnable;
      }
      return StylesTxtInput.inputDisable;
    },
    [formState.errors, content]
  );

  return (
    <View>
      <Controller
        control={control}
        rules={rules}
        name={name}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={inpCheck(value)}
            keyboardType={isPhone ? "phone-pad" : "default"}
            secureTextEntry={showPassword}
            onFocus={onFocus}
            onEndEditing={onEndEditing}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            editable={content !== ""}
            placeholder={placeHolder}
            textProps={{
              fontSize:12
            }}
            placeholderTextColor={content !== "" ? "#6C757D" : "#ededed"}
            maxLength={max10 ? 10 : 500}
            autoCapitalize={noUppercase}
             
          />
        )}
      />

     {/* Hata mesajı */}
      {formState.errors[name]?.message && (
        <View style={longInfoText ? { height: 15 } : { height: 15 }}>
          <Text style={StylesTxtInput.messageTxt}>
            {formState.errors[name].message}
          </Text>
        </View>
      )}


    {/* Uyarı butonları */}
      {Object.keys(formState?.dirtyFields).includes(name) ? (
        formState.errors[name]?.message ||
        formState.errors[name]?.message !== undefined ||
        typeof formState.errors[name]?.message !== "undefined" ? (
          <View style={StylesTxtInput.errorIcon}>
            <Image
              style={{ height: 35, width: 35 }}
              resizeMode="center"
              source={ErrorIcon}
            />
          </View>
        ) : (
          <>
            <View style={StylesTxtInput.checkIcon}>
              <Image
                style={{ height: 40, width: 40 }}
                resizeMode="center"
                source={CheckIcon}
              />
            </View>
          </>
        )
      ) : null}



      
      {isPass && (
        <View style={StylesTxtInput.showpass}>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {content === "" ? (
              showPassword ? (
                <Image
                  style={{ height: 35, width: 35 }}
                  resizeMode="center"
                  source={DontShowPassWhite}
                />
              ) : (
                <Image
                  style={{ height: 35, width: 35 }}
                  resizeMode="center"
                  source={ShowPassWhite}
                />
              )
            ) : showPassword ? (
              <Image
                style={{ height: 35, width: 35 }}
                resizeMode="center"
                source={DontShowPass}
              />
            ) : (
              <Image
                style={{ height: 35, width: 35 }}
                resizeMode="center"
                source={ShowPass}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TxtValidationUserCode;
