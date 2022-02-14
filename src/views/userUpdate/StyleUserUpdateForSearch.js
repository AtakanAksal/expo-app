import { StyleSheet } from "react-native";

const StylesUserUpdateForSearch = StyleSheet.create({
    containerStyle:{        
        backgroundColor: "#ffffff",
    borderWidth: 1,
    margin: 5,
     },
    // suggestion container style
    textInputStyle:{
      // inserted text style
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#FAF7F6',
    },
    itemStyle:{
      // single dropdown item style
      padding: 10,
      marginTop: 1,
      backgroundColor: '#FAF9F8',
      borderColor: '#bbb',
      
    },
    itemTextStyle:{
      // text style of a single dropdown item
      color: "#282830",
    },
    itemsContainerStyle:{
      // items container style you can pass maxHeight
      // to restrict the items dropdown hieght
      maxHeight: '100%',
      margin: 5,
      height:180
    },
});

export default StylesUserUpdateForSearch;
