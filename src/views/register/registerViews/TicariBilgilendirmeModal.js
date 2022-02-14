import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { relativeHeightNum, relativeWidthNum } from '../../../utils/HelperFunctions';
import Info from "../../../../assets/register/info-yeni.png"

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const TicariBilgilendirmeModal = ({setModalOpenState}) => {
    return (
      <Pressable style={{ flex: 1 }} >
      <View style={styles.outerModal}>
        <View style={styles.innerModal}>


        {/* <View style={styles.container}> */}
        <Image style={{ height: relativeHeightNum(115), width: relativeWidthNum(115), paddingVertical: relativeHeightNum(16) }} source={Info} resizeMode="contain" />
         <Text style={styles.textDescription}>
         * Üyeliğinize Bireysel Üye olarak devam
edilecektir. Bu üyelik ile sadece ziyaretlerde
bulunabilir ve Katılımcı firmalar konusunda
bilgilere ulaşabilirsiniz.  
         </Text>  
         <Text style={styles.textDescription}>
         * Ticari faaliyette bulunan Bireysel Üyeler
sektör ve faaliyet alanlarını belirterek ilgili
konulara dair gelişmelerden haberdar
olabilirler. 
        </Text>

        {/* Buton */}
        <TouchableOpacity style={styles.butonView} onPress={()=>{setModalOpenState(false)}}>
<Text style={styles.textButon }>Kapat</Text>
        </TouchableOpacity>  
        {/* </View> */}

</View>
</View>
</Pressable>
    );
}

export default TicariBilgilendirmeModal;
const styles=   StyleSheet.create(
    {
      // eslint-disable-next-line react-native/no-unused-styles
      container: {
        height:relativeHeightNum(382),
        width: relativeWidthNum(250), 
        alignSelf:'center',
        backgroundColor:'#FFFFFF',
        marginVertical:relativeHeightNum(129),
        justifyContent:"space-evenly",
        alignItems:"center"
       // marginHorizontal:WIDTH/6.54,
      },
      innerModal: {
        height:relativeHeightNum(382),
        width: relativeWidthNum(250), 
        alignSelf:'center',
       
        marginVertical:relativeHeightNum(129),
        justifyContent:"space-evenly",
        alignItems:"center",
        // margin: 25,
        backgroundColor: "#f1f1f1",
        
     
        // alignSelf:"center"
      },
      outerModal: {
        justifyContent: "center",
        alignItems:"center",
        flex: 1,
        backgroundColor: "#000000a1",
      },
      textDescription : {
          fontSize:10,
          width:"80%"
      },
      butonView: {
          width : "80%",
          paddingVertical: relativeHeightNum(6),
          backgroundColor:"#00AA9F",
          alignItems:"center"
      },
      textButon : {
        fontSize:10,
        color: "#FFFFFF",
        
      }
        

    }
)