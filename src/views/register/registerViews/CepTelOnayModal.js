import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useForm } from "react-hook-form";
import { relativeHeightNum, relativeWidthNum } from '../../../utils/HelperFunctions';
import Info from "../../../../assets/register/info-yeni.png"
import TxtPhoneInput from '../../../components/txtPhoneInput/TxtPhoneInput';
import StylesRegister from "../StylesRegister";
import { checkPhoneExists } from "../../../helpers/connections";
import { useRegisterValue } from "../../../contexts/RegisterContext";



const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const CepTelOnayModal = ({setModalOpenState}) => {

  // eslint-disable-next-line no-undef
  const postData = new FormData();
  const methods = useForm();
  const [{ register }, dispatch] = useRegisterValue();

  // const rulesPhone = {
  //   minLength: { value: 13, message: "Lütfen Cep Telefon Numarası Yazınız." }, // ? kontrol edilecek. mask
  //   required: { value: true, message: "Bu alan gerekli." },
  //   validate: {
  //     checkUrl: async () =>
  //       (await (postData.append("phoneNumber", methods.getValues("ipnPhone").substring(1)), // ? timeout yada oneditingend de yapılacak.
  //       // console.log(" render count"),
  //       checkPhoneExists(postData)
  //         .then((res) => !res.success) 
  //         .catch((err) => console.log(err)))) || "Bu Numara Başka Bir Hesap Tarafından Kullanımdadır",
  //   },
  // };
    return (
      <Pressable style={{ flex: 1 }} >
      <View style={styles.outerModal}>
        <View style={styles.innerModal}>
        {/* <View style={styles.container}> */}
         <Text style={styles.textDescription}>
         * Cep Telefon numaranızın doğru olduğundan emin olunuz
         </Text>  
         {/* <TxtPhoneInput
          // content={
          //   (typeof methods.watch("ipnName") === "undefined" ? "" : methods.watch("ipnName")) &&
          //   (typeof methods.watch("ipnSurname") === "undefined" ? "" : methods.watch("ipnSurname"))
          // }
        
          name="ipnPhone"
          // setPhone={setPhone}
          rules={rulesPhone}
          placeHolder={register.phonenumber}
          countryCallingCode={register.ulkeDetay.phonecode}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...methods}
        />      */}
      <View style={styles.phoneContainer} >
        <Text style={styles.phoneText} >+{register.phonenumber}</Text>
      </View>

        {/* Buton */}
        <TouchableOpacity style={styles.butonView} onPress={()=>{setModalOpenState("PhoneValidationModal")}}>
          <Text style={styles.textButon }>Onayla ve İlerle</Text>
        </TouchableOpacity>  
        {/* </View> */}

        </View>
      </View>
    </Pressable>
    );
}

export default CepTelOnayModal;
const styles=   StyleSheet.create(
    {
      // eslint-disable-next-line react-native/no-unused-styles
      container: {
        height:relativeHeightNum(270),
        width: relativeWidthNum(320), 
        alignSelf:'center',
        backgroundColor:'#FFFFFF',
        marginVertical:relativeHeightNum(129),
        justifyContent:"space-evenly",
        alignItems:"center",
       // marginHorizontal:WIDTH/6.54,
      },
      innerModal: {
        height:relativeHeightNum(270),
        width: relativeWidthNum(320), 
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
          fontSize:11,
          width:"80%"
      },
      butonView: {
        width: relativeWidthNum(280), 
          paddingVertical: relativeHeightNum(6),
          backgroundColor:"#00AA9F",
          alignItems:"center"
      },
      textButon : {
        fontSize:15,
        color: "#FFFFFF",
        
      },
      phoneContainer : {
        paddingVertical:9,
        borderColor:"#00AA9F",
        borderWidth:1,
        height:relativeHeightNum(40),
        width: relativeWidthNum(280), 
        paddingHorizontal:relativeWidthNum(10)
      },
      phoneText:{
        fontSize:15,
        color:"#6C757D"
      }
        

    }
)