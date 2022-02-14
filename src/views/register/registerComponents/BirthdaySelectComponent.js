import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import CalIcon from "../../../../assets/cal-icon.png";
import CalIconW from "../../../../assets/cal-icon-w.png";

const BirthdaySelectComponent = ({ date, setDate, inputCheck, selectCountDate, setSelectCountDate }) => {
  const [datePickerShow, setDatePickerShow] = useState(false);

  const onChange = (event, selectedDate) => {
    // setDatePickerShow(Platform.OS === "ios");
    console.log(event);
    setDatePickerShow(false);
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setSelectCountDate(true);
    }
  };

  const maxDate = dayjs().subtract(18, `year`);

  return (
    <Pressable style={styles.pressable}>
      <Text
        style={inputCheck() ? styles.textEnable : styles.textDisable}
        onPress={inputCheck() ? () => setDatePickerShow(true) : null}
      >
        {selectCountDate ? dayjs(new Date(date)).format("DD-MM-YYYY") : `Doğum Tarihi`}
      </Text>

      <Image resizeMode="contain" source={inputCheck() ? CalIcon : CalIconW} style={styles.downIcon} />

      {datePickerShow && ( // condition ? true-false : null    ile aynı şey
        <DateTimePicker
          maximumDate={new Date(maxDate)}
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </Pressable>
  );
};

export default BirthdaySelectComponent;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    justifyContent: "center",
  },
  textEnable: {
    color: "#1E1E1C",
    paddingLeft: 5,
    fontSize: 15,
  },
  textDisable: {
    color: "#fff",
    paddingLeft: 5,
    fontSize: 15,
  },
  downIcon: {
    position: "absolute",
    zIndex: -1,
    right: 5,
    width: 25,
    height: 25,
  },
});
