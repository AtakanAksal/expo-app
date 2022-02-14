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
  ImageBackground,
  LogBox
} from "react-native";

import { RadioButton } from 'react-native-paper';
import Geri from "../../../../assets/forgotpass/go-back-black.png";
import SignSelect from "../../../../assets/vexmail/sign-select.png";
import Sent from "../../../../assets/vexmail/sent.png";
import Attach from "../../../../assets/vexmail/attach.png";
import Profil from "../../../../assets/vexmail/profil.png";
import Kapat from "../../../../assets/vexmail/kapat-turkuaz.png";
import KapatBeyaz from "../../../../assets/vexmail/kapat-beyaz.png";
import CheckItem from "../../../../assets/vexmail/check-item2.png";
import CheckItemFill from "../../../../assets/vexmail/check-item-fill.png";



const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const FilterProfilListModal = ({ setFilterModalOpen }) => {
 
const [tumu, setTumu] = useState(false)
const [takipEden, setTakipEden] = useState(false)
const [takipEdilen, setTakipEdilen] = useState(false)
const [sonMailAtan, setSonMailAtan] = useState(false)


useEffect(() => {
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])
  const BackComponent = () => {
    return (
      <View style={styles.back}>
        <View>
          <TouchableOpacity onPress={() => setFilterModalOpen(false)}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Image style={{ height: 45, width: 45 }} source={Geri} resizeMode="contain" />
              <Text style={{ color: "#00AA9F", fontSize: 15 }}>Profil Liste Filtrele</Text>
            </View>
          </TouchableOpacity>
        </View>

        
       
      </View>
    );
  };


  const FilterButton = () => {
    return(
      <TouchableOpacity>
        <View style={[styles.buton, tumu||takipEden|| takipEdilen||sonMailAtan ? {backgroundColor:'#00AA9F'} : {backgroundColor:'white'}]}>
        <Text style={[styles.text, tumu||takipEden|| takipEdilen||sonMailAtan ? {color:'white'} : {color:'#6C757D'}]}>Görüntüle</Text>
        </View>
        
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.mainFrame}>
      <BackComponent />

      <View style={styles.mainContainer} >
        <View style={{flex:10, justifyContent:'flex-start',}}>

        <View style={{ marginTop:20}}>

        <View style={styles.row}>
          <Text style={styles.text}>Tümü</Text>
        <RadioButton
          value="Tümü"
          label="Carto Base MAp"
          status={tumu === true ? 'checked' : 'unchecked'}
          onPress={() => { setTumu((prev)=>!prev)
           }}
        />
        </View>

        <View style={styles.row}>
        <Text  style={styles.text}>Takip Edenler</Text>
        <RadioButton
          value="Takip Edenler"
          label="Carto Base MAp"
          status={takipEden === true ? 'checked' : 'unchecked'}
          onPress={() => { setTakipEden((prev)=>!prev) }}
        />
        </View>
        <View style={styles.row}>
        <Text  style={styles.text}>Takip Edilenler</Text>
        <RadioButton
          value="Takip Edilenler"
          status={takipEdilen === true ? 'checked' : 'unchecked'}
          onPress={() => {setTakipEdilen((prev)=>!prev) }}
        />
         </View>
         
        <View style={styles.row}>
        <Text  style={styles.text}>En Son Mail Atanlar</Text>
        <RadioButton
          value="En Son Mail Atanlar"
          status={sonMailAtan === true ? 'checked' : 'unchecked'}
          onPress={() => { setSonMailAtan((prev)=>!prev) }}
        />
         </View>
      </View>


      
        </View>
        
      <View style={{flex:1, justifyContent:'center', alignItems:'center', marginBottom:40}}>
      <FilterButton/>
      </View>
        
   
       
     
       
      </View>
      </View>
     
  );
};



export default FilterProfilListModal;

const styles = StyleSheet.create({
  mainFrame: {
    width:344,
    height:480,
    alignSelf:'center',
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
    
    justifyContent:'space-between',
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
    alignItems: "center",
    
    
  },
  text: {
    fontSize:15,
    color:'#6C757D'
  },
  buton:{
    justifyContent:'center', alignItems:'center', flexGrow:1, borderColor:'#00AA9F', borderWidth:0.2, height:HEIGHT/18, width:WIDTH/1.2,
  }
  
});
