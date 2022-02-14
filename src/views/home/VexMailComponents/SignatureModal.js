/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
  FlatList,
  ImageBackground
} from "react-native";
import { useUserValue } from "../../../contexts/UserContext";
import { userDetailById } from "../../../helpers/connections";

import Geri from "../../../../assets/forgotpass/go-back-black.png";
import SignSelect from "../../../../assets/vexmail/sign-select.png";
import Sent from "../../../../assets/vexmail/sent.png";
import Attach from "../../../../assets/vexmail/attach.png";
import Profil from "../../../../assets/vexmail/profil.png";
import Kapat from "../../../../assets/vexmail/kapat-turkuaz.png";
import KapatBeyaz from "../../../../assets/vexmail/kapat-beyaz.png";
import CheckItem from "../../../../assets/vexmail/check-item2.png";
import CheckItemFill from "../../../../assets/vexmail/check-item-fill.png";
import RightArrow from "../../../../assets/vexmail/right-arrow.png";
import LeftArrow from "../../../../assets/vexmail/left-arrow.png";
import SignatureTemplate from "./SignatureTemplates";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const SignatureModal = ({ setModalOpenState }) => {
 
const [allFilter, setAllFilter] = useState(false)
const [followFilter, setFollowFilter] = useState(false)
const [followerFilter, setFollowerFilter] = useState(false)
const [lastMailSenders, setLastMailSenders] = useState(false)
const [userDetail, setUserDetail] = useState([]);
const [signTemplate, setSignTemplate] = useState(1) // seçilmiş template bilgisi serverdan çekilmeli
const [currentTemplate, setCurrentTemplate] = useState(signTemplate) // açılışta kayıtlı olan cıkmalı

const [{ user }] = useUserValue()
const [offset, setOffset] = useState(1);
const postData = new FormData();

useEffect(() => {
 
  getUserDetail();
}, []);

const getUserDetail = () => {
  console.log("-- getUserDetail Çalıştı ----");
  postData.append("user_id", user.userid);

  userDetailById(postData, user.token)
    .then((res) => {
      setUserDetail(res);
    })
    .catch((err) => console.log(err));
};

  const BackComponent = () => {
    return (
      <View style={styles.back}>
            <View>
          <TouchableOpacity onPress={() => setModalOpenState("off")}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Image style={{ height: 45, width: 45 }} source={Geri} resizeMode="contain" />
              <Text style={{ color: "#00AA9F", fontSize: 15 }}>VexMail İmza</Text>
            </View>
          </TouchableOpacity>
        </View>        
       
      </View>
    );
  };

  const Signatures = () => {
    return(
      <View style={styles.signatureArea}>
      <SignatureSelector/>
      </View>
    )
  }

  const SignatureSelector = () => {
    return (
      <SignatureTemplate tempateId={currentTemplate} userDetail={userDetail}/>
    )
  }
  const prevTemplate = () => {
    setCurrentTemplate((prev)=>prev-1)
  }
  const nextTemplate = () => {
    setCurrentTemplate((prev)=>prev+1)
  }
  const AllComponent = () => {
    
    return (
     <View>

      <View style={{marginVertical:10}}><Text style={{fontSize:10, color:'#6C757D'}}>*Kullanmak İstediğiniz Mail İmzayı Seçiniz</Text></View>
     
      <View style={styles.row}>
       <View ><TouchableOpacity onPress={prevTemplate}><Image style={{ height: 25, width: 25 }} source={LeftArrow} resizeMode="contain" /></TouchableOpacity></View>  
       <View>
         <Signatures/>
       </View>  
       <View><TouchableOpacity  onPress={nextTemplate}><Image style={{ height: 25, width: 25 }} source={RightArrow} resizeMode="contain" /></TouchableOpacity></View>  
       
      </View>

      </View>
    
    );
  };
  const selectSignature = () => {
    setSignatureModalOpen(false);
    setSignTemplate(currentTemplate)
    console.log(currentTemplate);
    
    // servera signTemplate bilgisini   "mail_imza_id": 19, profile gönder 

  }

  const SelectSignatureButton = () => {
    return( 
      <View style={{justifyContent:'center', alignItems:'center',  borderColor:'#00AA9F', backgroundColor:'#00AA9F', borderWidth:0.2, height:HEIGHT/18, width:WIDTH/1.2,}}>
      <TouchableOpacity onPress={selectSignature}>
        
        <Text style={{fontSize:15, color:'#FFFFFF'}}>İmzayı Seç </Text>       
        
      </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.mainFrame}>
      <BackComponent />

      <View style={styles.mainContainer} >
        <View style={{flex:10, justifyContent:'flex-start',}}>
        <AllComponent />
       
        </View>
        
      <View style={{ justifyContent:'center', alignItems:'center',  marginHorizontal:20, marginVertical:40}}>
      <SelectSignatureButton/>
      </View>
        
   
       
     
       
      </View>
      </View>
     
  );
};



export default SignatureModal;

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },

  back: {
    flexDirection: "row",
    margin: 5,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  mainContainer: {
    flexDirection: "column",
    flex: 10,
    justifyContent:'space-between',
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    marginTop: 6,
  },
  row: {
    flexGrow:1,
    justifyContent:'space-between',
    alignItems:'center',
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,

    flexDirection: "row",
    paddingVertical:8,
    paddingHorizontal: 10,
 },
 signatureArea: {
   marginHorizontal:7,
   marginVertical:31,
   overflow : "hidden",
   justifyContent: 'center',
   alignItems:'center'

 }
  
});
