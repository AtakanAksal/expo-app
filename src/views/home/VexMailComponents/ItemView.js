/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";

// eslint-disable-next-line import/no-unresolved
import Attach from "../../../../assets/vexmail/attach.png";
import Ucnokta from "../../../../assets/vexmail/uc-nokta.png";
import { relativeHeightNum, relativeWidthNum } from "../../../utils/HelperFunctions";
import UcNoktaModal from "./UcNoktaModal";




const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const ItemView = ({ item, activeState,openEmail , index }) => {
    const [modalOpenState, setModalOpenState] = useState("off")
// console.log(item?.mailuserdetails[0].is_read);
  
   return (
     // Single Comes here which will be repeatative for the FlatListItems
     <View style={[styles.item, item?.mailuserdetails[0].is_read ? {opacity:0.4} : {opacity:1}  ]} >
       <View
         style={{
           flexDirection: "row",
           flex: 1,
           justifyContent: "space-between",
         }}
       >
         {/* Mail açılması için tıklanabilecek alan */}
         <TouchableOpacity style={{ flex: 6, justifyContent: "center", marginHorizontal: 15 }}  onPress={() => openEmail(item)}>
           <Text style={{ color: "#6C757D", fontWeight: "bold", fontSize: 12, marginBottom:5 }}>{(activeState === "inbox" || activeState === "cardMenu") ? (`${item.sender.first_name}  ${item.sender.last_name}`)  : (`${item.receivers[0].user.first_name} ${item.receivers[0].user.last_name}`  ) }</Text>
           <Text style={{ color: "#6C757D", fontSize: 6,  marginBottom:3 }}>{item.sent_date}</Text>
           <Text style={{ color: "#6C757D", fontSize: 12 }}>{item.subject}</Text>
         </TouchableOpacity>
           {/* Attach ve Üç Nokta Butonları          */}
         <View style={{ flexDirection: "row", flex: 1, marginTop:5 }}>
           <TouchableOpacity style={{ flex: 1,  marginRight:10 }} onPress={() => console.log(index) }>
           {item.attachments.length>0 ?
             <ImageBackground style={{ height: relativeWidthNum(22), width: relativeWidthNum(22), }} source={Attach} resizeMode="contain" >
               <View>               
               <View style={{backgroundColor:"#00AA9F", width:relativeWidthNum(10), height:relativeWidthNum(10), justifyContent:"center", alignItems:"center", position: 'absolute',  top: 0, right:0 }}><Text style={{color:"white", fontSize:8}} >{item.attachments.length}</Text></View>
               </View>              
               </ImageBackground>
               : null
             }
           </TouchableOpacity> 
           <TouchableOpacity style={{ flex: 1, marginRight: 5 }} onPress={() =>setModalOpenState("UcNoktaModal") }>
             <Image style={{ height: relativeWidthNum(22), width: relativeWidthNum(22) }} source={Ucnokta} resizeMode="contain" />
           </TouchableOpacity>
         </View>
       </View>
  
     {/*  UcNoktaModal                             */}
          <View>
           <Modal
             visible={(modalOpenState==="UcNoktaModal")}
             onRequestClose={() => {
               setModalOpenState("off");
             }}
             transparent
           >
             <UcNoktaModal setModalOpenState={setModalOpenState} index={index} />
           </Modal>
         </View>
             
     </View>
   );
 };
export default ItemView;
 const styles = StyleSheet.create({
  
    item: {
      marginBottom: 15,
      flex: 1,
      height: relativeHeightNum(70),
      borderRadius: 3,
      backgroundColor: "white",
      borderColor: "#eeeeee",
      borderWidth: 1,
      borderStyle: "solid",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "gray",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
       
    },
 
  });
  