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
  FlatList
} from "react-native";
import { WebView } from 'react-native-webview';

import Geri from "../../../../assets/forgotpass/go-back-black.png";
import SignSelect from "../../../../assets/vexmail/sign-select.png";
import UcNokta from "../../../../assets/vexmail/uc-nokta.png";
import Attach from "../../../../assets/vexmail/attach.png";
import Profil from "../../../../assets/vexmail/profil.png";
import Kapat from "../../../../assets/vexmail/kapat-turkuaz.png";
import KapatBeyaz from "../../../../assets/vexmail/kapat-beyaz.png";
import Kartvizit from "../../../../assets/vexmail/kartvizit.png";
import { useUserValue } from "../../../contexts/UserContext";
import { postImza } from "../../../helpers/mailConnection";
import Signatures from './Signatures';


const ekran = Dimensions.get("screen");
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const SentMailModal = ({ setModalOpenState, activeItem }) => {
  // console.log("---------------------------------------");
  // console.log(activeItem);
 const [ccOpen, setCcOpen] = useState(true)
 const [bccOpen, setBccOpen] = useState(true)
 const [mailToProfilArray, setMailToProfilArray] = useState([])
const [ccProfilArray, setCcProfilArray] = useState([])
const [bccProfilArray, setBccProfilArray] = useState([])
const [mailFrom, setmailFrom] = useState("Emre Emreoğlu")
const [userDetail, setUserDetail] = useState({})
const [{ user }] = useUserValue();

const postData = new FormData();

useEffect(() => {
  conSignatureData();  
}, [])

const conSignatureData = () => {
  postData.append("user_id", activeItem.sender_id);
  postImza(postData, user.token)
    .then((res) => {
      // setOffset(offset + 1);  sonraki sayfa ayarlanacak
      setUserDetail(res?.userDetails);
      console.log("----------------------userddaattaaillllll");
      console.log(res?.userDetails);
      //  setLoading(false);
    }) // console.log(res.streams)  setStreamData(res.streams)
    .catch((err) => console.log(err));
};

const addToProfilArray = () =>{
  setMailToProfilArray([...mailToProfilArray,{ id: '1', name: 'Emre Emreoğlu'}])
  
}
const addToccProfilArray = () =>{
  setCcProfilArray([...ccProfilArray,{ id: '1', name: 'Emre Emreoğlu'}])
  
}
const addTobccProfilArray = () =>{
  setBccProfilArray([...bccProfilArray,{ id: '1', name: 'Emre Emreoğlu'}])
  
}

const BackComponent = () =>{
    return(
        <View style={styles.back}>   
       <View>
        <TouchableOpacity  onPress={() => setModalOpenState("off")}>
            <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
          <Image style={{ height: 45, width: 45 }} source={Geri} resizeMode="contain" />
    <View> 
          <Text style={{ color: "#00AA9F", fontSize: 15 }}>VexMail Gönderilen</Text>
          <Text style={{fontSize:6, color:'#6C757D'}}>{activeItem.sent_date}</Text>
    </View> 
          </View>
        </TouchableOpacity>
        </View> 

        <View style={{flexDirection:'row', }}>
       
        <View style={{marginRight:14}}>
        <TouchableOpacity  onPress={() => setModalOpenState("off")}>
            <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
          <Image style={{ height: 25, width: 25 }} source={Attach} resizeMode="contain" />
          </View>
        </TouchableOpacity>
        </View> 
        <View style={{marginRight:14}}>
        <TouchableOpacity  onPress={() => setModalOpenState("off")}>
            <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
          <Image style={{ height: 25, width: 25 }} source={UcNokta} resizeMode="contain" />
          </View>
        </TouchableOpacity>
        </View> 
        </View>
      </View>
    )
}

const ProfilNameHolder = ({item}) =>{
    return(
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',   borderRadius:5, margin:5 }}>
      <Text style={{fontSize:12, color:'#6C757D', margin:5  }}>{item.user.first_name} {item.user.last_name}</Text>
      </View>
    )
}
const ProfilNameFlatList = ({activeData}) => {
  return (
    <FlatList
      data={activeData}
      renderItem={ProfilNameHolder}
      keyExtractor={(item) => item.id.toString()}
      horizontal
    />
  );
};
const MailToList = ({activeData}) => {
   if (activeItem.receivers.length > 0) {
    return <ProfilNameFlatList  activeData={activeData} /> ;
   }
   return null;
}; 

const MailFrom = () => {
  return ( <ProfilNameHolder/> ); 
 }
const CCToList = ({activeData}) => {
 
  if(activeItem.ccs.length>0) {return ( <ProfilNameFlatList  activeData={activeData} /> ); }
  return null
   
 }
 const BCCToList = ({activeData}) => {
 
  if(activeItem.bccs.length>0) {return (<ProfilNameFlatList  activeData={activeData} /> ); }
  return null
   
 }
const MailToComponent = () =>{
  return(
    <View style={styles.row}>
  
    <View  style={{flex: 3, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
      <Text style={{fontSize:14, color:'#6C757D'}}>Kime</Text>
      <Border/>
      </View>

 <View style={{flex: 12,alignItems:"flex-start",paddingHorizontal:11}}>
 <MailToList activeData={activeItem.receivers} />
   </View>
  </View>
  )
 
}
const MailFromComponent = () =>{
  return(
    <View style={styles.row}>
  
    <View  style={{flex: 3, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
      <Text style={{fontSize:14, color:'#6C757D'}}>Kimden</Text>
      <Border/>
      </View>

 <View style={{flex: 12,alignItems:"flex-start",paddingHorizontal:11}}>
 <Text style={{fontSize:12, color:'#6C757D', margin:5  }}>{activeItem.sender.first_name} {activeItem.sender.last_name}</Text>
   </View> 

  </View>
  )
 
}


const CCToComponent = () =>{
  return(
    <View style={styles.row}>
    <View  style={{flex: 3, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}><Text style={{fontSize:14, color:'#6C757D'}}>CC</Text><Border/></View>
 <View style={{flex: 12,alignItems:"flex-start",paddingHorizontal:11}}>
 <CCToList activeData={activeItem.ccs} />
   </View>
 
  </View>
  ) 
}
const BCCToComponent = () =>{
  return(
    <View style={styles.row}>
    <View  style={{flex: 3, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}><Text style={{fontSize:14, color:'#6C757D'}}>BCC</Text><Border/></View>
 <View style={{flex: 12,alignItems:"flex-start",paddingHorizontal:11}}>
 <BCCToList activeData={activeItem.bccs} />
   </View>
 

  </View>
  ) 
}
const closeProfilTag = () =>{ // eger birden fazla profil tag ı eklenecekse arraylist yap foreach ile bas, yatay scroll yatay flatlist cozer

console.log("profil tagi kapandı");
}

  return (
    <View style={styles.mainFrame}>
      <BackComponent/>

      <ScrollView style={styles.mainContainer} contentContainerStyle={{justifyContent: "flex-start",}}>
            <MailFromComponent/>
           <MailToComponent/>
           {(activeItem.ccs.length>0) &&  <CCToComponent/>}
           {(activeItem.bccs.length>0) &&  <BCCToComponent/>}
            <Subject activeItem={activeItem}/>
            <MailContent activeItem={activeItem} />
            <View>
            {  (Object.keys(userDetail).length > 0) ? ( <Signatures  tempateId={userDetail.userdetail.mail_imza_id}  userdetail={userDetail} />) :null    }
{/* <Image style={{ height:95, width: 222, marginTop:20, marginLeft:13,  }} source={Kartvizit} resizeMode="contain" /> */}
</View>
        </ScrollView>

      </View>
  );
};

export default SentMailModal;

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderStyle: 'solid',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
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
    borderStyle: 'solid',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,

  },
  mainContainer: {
    flexDirection: "column",
    flex: 1,
    
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    marginTop:6,
   
  },
  row: {
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderStyle: 'solid',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    
    flexDirection:'row',
    justifyContent:'space-between', alignItems:'center', height:HEIGHT/14, paddingLeft:12, paddingRight:4
  },

  container: {
   flex:1, justifyContent:'space-between', alignItems:'center', height:HEIGHT/3, paddingLeft:12, paddingRight:4, 
   resizeMode: 'cover',  
   
  },
});
const Screen = ({activeItem}) => {
return(
  <WebView 
  style={styles.container}
      originWhitelist={['*']}
      source={{ html: activeItem.content}}
 //     scalesPageToFit={false}
      injectedJavaScript={`
      const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      if (!iOS) {
        const meta = document.createElement('meta');
        let initialScale = 1;
        if(screen.width <= 800) {
         initialScale = ((screen.width / window.innerWidth) + 0.1).toFixed(2);
        }
        const content = 'width=device-width, initial-scale=' + initialScale ;
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', content);
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
    `}
     scalesPageToFit={Platform.OS === 'ios'}
     
/>
)
}

const Subject = ({activeItem}) => {
  return (
    <View style={styles.row}>
    <View  style={{flex: 3, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
      <Text style={{fontSize:14, color:'#6C757D'}}>Konu</Text><Border/></View>
   
    <View style={{flex: 12, justifyContent:"center", paddingHorizontal:11,}}>
      <Text style={{flex:1, flexGrow:1, width:'100%', color:'#6C757D', alignSelf:"center"}}>{activeItem.subject}</Text>
      </View>
  </View>
  )
  }
  const MailContent = ({activeItem}) => {
    return( <View style={{flex:1}} >
           <Screen activeItem={activeItem}/>
           </View>
  ) 
  }
  const Border = () =>{
    return(
        <View  style={{
            borderLeftWidth: 1,
            borderLeftColor: '#707070',
            height:HEIGHT/18,
            opacity:0.2
            }}
          />
    )
}
