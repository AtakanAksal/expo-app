import React from 'react'
import Constants from 'expo-constants';


import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



 
// const a= await SecureStore.setItemAsync('secure_deviceid', JSON.stringify(uuid));
// let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
// console.log(fetchUUID)

// eslint-disable-next-line import/prefer-default-export
export const createUuidToStore = async () => {
    const uuid = uuidv4();
    await SecureStore.setItemAsync('secure_deviceid', JSON.stringify(uuid));
    // const fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
    // console.log(fetchUUID)     
  };
export const deleteUuidfromStore = async () => {
    
    await SecureStore.deleteItemAsync('secure_deviceid');
    console.log("delete from store çalıştı");
    // const fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
    // console.log(fetchUUID)     
  };