/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
import React, { useMemo, useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Image} from 'react-native';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons,  AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MediaType } from 'expo-media-library';
import CustomNavigator from './createPostComponents/CustomNavigator';
import StatusBarPlaceHolder from './createPostComponents/StatusBarPlaceholder';
import camera from '../../../../assets/camera2.png'
import folder from '../../../../assets/folder.png'

const ForceInset = {
  top: 'never',
  bottom: 'never',
};


const ImageModal=({setImageModelOpen, imagesToServer, setCamOn })=> {



  const onSuccess = (data) => {
    //  console.log(data)
    
     
    data.forEach(element => {
      imagesToServer.push(element)
    });
   
  
    // console.log(imagesToServer)
    Alert.alert('',data.length + ' adet seçildi')
    setImageModelOpen(false)
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions: 'Please Allow media gallery permissions.',
        hasErrorWithLoading: 'There was error while loading images.',
        hasErrorWithResizing: 'There was error while loading images.',
        hasNoAssets: 'No images found.',
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      maxSelection: 5,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: 'jpeg',
    }),
    []
  );

  const _textStyle = {
    color: 'white',
  };

  const _buttonStyle = {
    backgroundColor: '#00AA9F',
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'TAMAM',
        back: 'İPTAL',
        selected: 'seçildi',
      },
      midTextColor: 'black',
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {setImageModelOpen(false)},
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: 'blue',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: '#00AA9F',
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#00AA9F',
        size: 26,
      },
    }),
    []
  );
const openCameraMode = ()=>{
  setImageModelOpen(false)
  setCamOn(true)
  console.log("testttt");
}
  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={ForceInset} style={styles.container}>
        <StatusBarPlaceHolder />
        <View style={styles.container}>
          <AssetsSelector
            Settings={widgetSettings}
            Errors={widgetErrors}
            Styles={widgetStyles}
            Navigator={widgetNavigator}
            // Resize={widgetResize} know how to use first , perform slower results.
          />
          <View style={styles.footer}>
      
           
          <View >
          <TouchableOpacity onPress={()=>(openCameraMode())} >
        <Image style={{ height: 45, width: 45,   backgroundColor:'white',  }} source={camera}  resizeMode="contain" />
      </TouchableOpacity>
          </View> 
          
            
      </View> 
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection:'row',
    justifyContent:'center'

  }
 
});
export default ImageModal;