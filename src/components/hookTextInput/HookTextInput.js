import React, { useEffect } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { Controller } from "react-hook-form";

const HookTextInput = ({ name, rules, control, formState, watch, trigger, placeholder }) => {
  const watchShowAge = watch(name);

  useEffect(() => {
    if (watchShowAge) trigger(name);
  }, [watchShowAge, trigger, name]);

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={
              // eslint-disable-next-line no-nested-ternary
              formState.errors[name]?.message ? styles.inputError : value === "" ? styles.input : styles.inputValid
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
          />
        )}
        name={name}
        defaultValue=""
      />
      <View style={{ height: 10 }}>
        {formState.errors[name]?.message && <Text style={styles.messageTxt}>{formState.errors[name].message}</Text>}
      </View>
    </>
  );
};

export default HookTextInput;

const styles = StyleSheet.create({
  messageTxt: {
    color: "#d10404",
    fontSize: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    fontSize: 15,
    backgroundColor: "#fff",
    height: 40,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 2,
    padding: 5,
    borderWidth: 1,
  },
  inputError: {
    fontSize: 15,
    backgroundColor: "#fff",
    height: 40,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 2,
    padding: 5,
    borderWidth: 2,
    borderColor: "#d10404",
  },

  inputValid: {
    fontSize: 15,
    backgroundColor: "#fff",
    height: 40,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 2,
    padding: 5,
    borderWidth: 2,
    borderColor: "#0d940a",
  },

  inputDisable: {
    backgroundColor: "#6C757D",
    height: 45,
    margin: 5,
    paddingLeft: 10,
    borderWidth: 1,
    fontSize: 15,
    color: "#fff",
  },
});
