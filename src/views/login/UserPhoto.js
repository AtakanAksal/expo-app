import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { relativeHeightNum, relativeWidthNum } from '../../utils/HelperFunctions';
import Foto from "../../../assets/register/example.png";

import BtnMain from '../../components/btnMain/BtnMain';


const UserPhoto = ({loginPassScreen, setLoginPassScreen, data, }) => {

    return(
        <View style={{ justifyContent:"center", alignItems:"center", 
        marginTop:relativeHeightNum(85)
        }}>  
           
        <Image
        style={{
          height: relativeHeightNum(131),
          width: relativeWidthNum(125),
          marginBottom: relativeWidthNum(20), 
             
        }}
        resizeMode="contain"
        source={data?.picture ? data.picture :  Foto}
      />
      <Text style={{fontSize:20, color:"#6C757D", }}>Sayın</Text>
      <Text style={{fontSize:20, color:"#6C757D", marginBottom: relativeHeightNum(36)}}>{data?.full_institution_name}</Text>
      {loginPassScreen==="only-photo" ? 
      <Text style={{fontSize:12, color :"#6C757D", fontStyle: 'italic', marginTop:relativeHeightNum(55),  marginBottom:relativeHeightNum(22), marginLeft:relativeWidthNum(175)  }}>Bu profil bana ait değil</Text>
        : null
    }

      {/* Buton */}
      {(loginPassScreen === "only-photo") ? 
      <TouchableOpacity
      style={styles.button}
      onPress={()=> setLoginPassScreen("photo-password")}       
    >
      <Text style={ styles.buttonText}>Giriş Yap</Text>
    </TouchableOpacity> : null
    }
      


       </View>
    )
}
export default UserPhoto;
const styles = StyleSheet.create({

    button: {
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#00AA9F",
      backgroundColor: "#00AA9F",
      padding: 10,
      height: relativeHeightNum(40),
      width: relativeWidthNum(280),
    },
  
    buttonText: {
      fontSize: 15,
      color: "#fff",
    },
  
  });
  