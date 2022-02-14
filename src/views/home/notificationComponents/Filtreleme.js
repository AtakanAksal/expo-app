/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
import React, { useState } from "react";

import CheckBox from "@react-native-community/checkbox";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList, Pressable, ScrollView } from "react-native";
import {transformDateFormatFromIsoToShort} from "../../../utils/HelperFunctions"
import { useUserValue } from "../../../contexts/UserContext";
import { Flags } from "../../../components/FlagExporter";

import ContentOpenIcon from "../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../assets/vexmail/icerik-kapa.png";
import IslemCards from "./IslemCards";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const Filtreleme = () => {
  const [contentOpen, setContentOpen] = useState(false);
  const [{ user }] = useUserValue();
  console.log("benim log");
console.log(user);

  const setUyelikTuru = (itm) => {
    if (itm.sender_user_detail.company_type_id === 1) {
      return "Bireysel";
    }
    if (itm.sender_user_detail.company_type_id === 2) {
      return "Ticari";
    }
    if (itm.sender_user_detail.company_type_id === 3) {
      return "Kamu";
    }
    if (itm.sender_user_detail.company_type_id === 4) {
      return "STK";
    }
  };



  return (
    <ScrollView>
    <Pressable
      style={{
     //   width: WIDTH_WINDOW - 50,
   //     height: contentOpen ? 180 : 80, // contentOpen ? 80 : 180
        margin: 5,
        elevation: 6,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
      }}
      onPress={() => setContentOpen((prevState) => !prevState)}
    >
      <View style={{ flex:1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" , paddingVertical: 8, paddingHorizontal:5  }}>

        <View style={{flexDirection:'row', flex:1}}>
        {/* checkbox */}
        
        {/* ? setSelectedIndex((prevArray) => [...prevArray, index])
            : setSelectedIndex(selectedIndex.filter((itm) => itm !== index)) */}

       

        {/* kullanıcı bilgi */}
        <View style={{ flex:1,  justifyContent: "center", alignItems: "flex-start",  paddingLeft: 10   }}>
          <View style={{flex:1, flexDirection:'row',}}>
          <Text  style={{color: "#6C757D", fontSize: 13, flexWrap:'wrap'  }}>
        qqqq
          </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 2 }}>
            <Text  style={{color: "#6C757D", fontSize: 13, flexWrap:'wrap'  }}>
        qqqq
          </Text>
            </View>
            <Text style={styles.textUserInfo}>ddd</Text>
            <Text style={[styles.textUserInfo, {paddingLeft:10}] }>ddd</Text>
          </View>
        </View>

        </View>
      
       <View>
        {/* yukarı aşağı ok */}
        <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
          <Image
            style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
            source={contentOpen ? ContentCloseIcon : ContentOpenIcon}
            resizeMode="contain"
          />
        </View>
      </View>


      </View>
      {/* itemların altında açılan info tab ı */}
      {contentOpen && (
        <View
          style={{height: 250}  }
        >
         <View style={[styles.textRow, {borderTopWidth:0.5}]}><Text style={styles.textComman}>Gönderen Kişi Adı</Text><Text style={styles.textComman}>dd</Text></View>
         <View style={styles.textRow}><Text style={styles.textComman}>Gönderilen Kişi Adı</Text><Text style={styles.textComman}>ddd</Text></View>
         <View style={styles.textRow}><Text style={styles.textComman}>Durum</Text><Text style={styles.textComman}>ddd</Text></View>
         <View style={styles.textRow}><Text style={styles.textComman}>Tarih</Text><Text style={styles.textComman}> ddd</Text></View>
         <View style={{ flex:1, justifyContent:'flex-start', alignItems:'center',paddingLeft:15, flexDirection:"row" }}><Text style={styles.textComman}>İşlem</Text></View>
          </View>
      )}
    </Pressable>
    </ScrollView>
  );
};

export default Filtreleme;

const styles = StyleSheet.create({
  textUserInfo: {
    textAlignVertical: "center",
    fontSize: 10,
    color: "#6C757D",
    marginLeft: 2
  },
  textComman: {
    fontSize:10,
    color:'#6C757D',
    paddingVertical:13
  }, 
  textRow: {
    
    
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    paddingHorizontal:15,
    borderColor: "#c1c1c1",
    borderBottomWidth: 0.5,
   // borderColor: "#707070",
  //  borderWidth: 0.2,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    paddingBottom:0.2
    
  },

});
