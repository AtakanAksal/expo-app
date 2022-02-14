import React from 'react'
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
/* eslint-disable import/prefer-default-export */
export const transformDateFormatFromIsoToShort = (DateString) => {
  // const d = new Date("2015-03-25T12:00:00Z"); ISO Dates (Date-Time)
  const date = new Date(DateString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const timezone=date.getTimezoneOffset();
  console.log(timezone);

  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  const finalDate = `${day}.${month}.${year}  ${hour}:${minutes}`;
  return finalDate;
};

export const transformDateFormatToDDMMYYYY = (DateString) => {
  // Converts YYYY/MM/DD HH/MM to DD.MM.YYYY HH.MM

  const year = DateString.slice(0, 4);
  const month = DateString.slice(5, 7);
  const day = DateString.slice(8, 10);
  const hour = DateString.slice(11, 13);
  const minutes = DateString.slice(14, 16);

  const finalDate = `${day}.${month}.${year}  ${hour}:${minutes}`;
  return finalDate;
};

export const relativeWidthAndHeightForSquare = (objectWidthOnDesign) => {
  return {
    width: Math.trunc((width * objectWidthOnDesign) / 360),
    height: Math.trunc((width * objectWidthOnDesign) / 360),
  }; // XD Design ekran genişliği 360 kabul edilmiştir.
};

export const relativeWidth = (objectWidthOnDesign) => {
  return {
    width: Math.trunc((width * objectWidthOnDesign) / 360),
  }; // XD Design ekran genişliği 360 kabul edilmiştir.
};
export const relativeHeight = (objectHeightOnDesign) => {
  return {
    height: Math.trunc((height * objectHeightOnDesign) / 640),
  }; // XD Design ekran genişliği 640 kabul edilmiştir.
};
export const relativeHeightNum = (objectHeightOnDesign) => {
  const x = Math.trunc((height * objectHeightOnDesign) / 640);
  // XD Design ekran genişliği 640 kabul edilmiştir.
  // console.log("yükseklik");
  // console.log(x);
  // console.log("cihazınki");
  // console.log(height);
  return x;
};
export const relativeWidthNum = (objectWidthOnDesign) => {
  const x = Math.trunc((width * objectWidthOnDesign) / 360); // XD Design ekran genişliği 360 kabul edilmiştir.
  // console.log("genişlik");
  // console.log(x);
  return x;
};

export const setUyelikTuru = (itmId) => {
  if (itmId === 1) {
    return "Bireysel";
  }
  if (itmId=== 2) {
    return "Ticari";
  }
  if (itmId === 3) {
    return "Kamu";
  }
  if (itmId === 4) {
    return "STK";
  }
  return null;
};

export const convertArrayOfObjectsIntoArrayOfProperties = (inputData) => {

  // eslint-disable-next-line camelcase
  const result = inputData.map(({ country_name, country_count }) => [country_name, country_count]);

console.log(result);
return result;
}
