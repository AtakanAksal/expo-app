import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { Flags } from "../../../../../../components/FlagExporter";
import { relativeHeightNum, relativeWidthNum } from "../../../../../../utils/HelperFunctions";

function ListeItem({item, analaticState}) {
  const defineCountName = () => {   
    switch (analaticState) {
        case "Ülke":
          return "country_count";
        case "Sektör":
          return "sector_count";
        case "Etkileşim":
          return "sector_count";
        case "Gün":
          return "sector_count";
        case "KullanıcıTürü":
          return "role_count";
        case "Cinsiyet":
          return "gender_type_count";
          default:
            return "";
        }
}   
const defineCodeName = () => {
    switch (analaticState) {
        case "Ülke":
          return "country_code";
        case "Sektör":
          return "sector_name";
        case "Etkileşim":
          return "sector_count";
        case "Gün":
          return "sector_count";
        case "KullanıcıTürü":
          return "user_type";
        case "Cinsiyet":
          return "gender_type";
          default:
            return "";
        }
} 
const defineCodeFullName = () => {
  switch (analaticState) {
      case "Ülke":
        return "country_name";
      case "Sektör":
        return "sector_name";
      case "Etkileşim":
        return "sector_count";
      case "Gün":
        return "sector_count";
      case "KullanıcıTürü":
        return "user_type";
      case "Cinsiyet":
        return "gender_type";
        default:
          return "";
      }
} 
const defineFlagName = () => {
return item?.[name]?.toLowerCase()    
}
const NameRow = () => {  
    switch (analaticState) {
      case "Ülke":
        return  <Text style={styles.textCountry} >{item?.[name]} - {item?.[fullName]}</Text>;
      case "Sektör":
        return <Text style={styles.textCountry} >{item?.[name]}</Text>;
      case "Etkileşim":
        return <Text style={styles.textCountry} >{item?.[name]}</Text>;
      case "Gün":
        return <Text style={styles.textCountry} >{item?.[name]}</Text>;
      case "KullanıcıTürü":
        return <Text style={styles.textCountry} >{item?.[name]}</Text>;
      case "Cinsiyet":
        return <Text style={styles.textCountry} >{item?.[name]}</Text>;
        default:
          return null;
      }  
}
const count=defineCountName(); const name=defineCodeName(); const fullName= defineCodeFullName(); const flagName = defineFlagName();
  return (
    <View style={styles.row}>
        <View style={styles.leftPart}>          
        <Image style={styles.img} source={Flags?.[flagName]} resizeMode="contain" />
       <NameRow/>
       </View>

        <View style={styles.valueBox}>
          <Text style={styles.textValueBox}>{item?.[count]}</Text>
        </View>
    </View>
    
);
  }
  export default ListeItem;
  const styles= StyleSheet.create({
    img: {
           width:  relativeWidthNum(30),
           height:  relativeHeightNum(20),
           marginHorizontal:10
    },
    row: {
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"#FFFFFF",
        marginBottom:11,
        marginHorizontal:20,
        paddingVertical:15,
        borderColor: "#707070",
        borderWidth: 0.2
    },
    textCountry: {
      fontSize:12,
      color:"#6C757D",
      alignSelf:"center"
    },
    textValueBox: {
      fontSize:15,
      color:"#FFFFFF",
      alignSelf:"center",
      marginHorizontal: 8,
      marginVertical:4

    },
    valueBox: {
    backgroundColor:"#016E66",
    marginRight:18
    },
    leftPart : {
  flexDirection:"row",
  alignItems:"center",

    }
})