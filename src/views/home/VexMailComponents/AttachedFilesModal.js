/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView, FlatList, StatusBar, TouchableHighlight
} from "react-native";

import Geri from "../../../../assets/forgotpass/go-back-black.png";
import Ekle from "../../../../assets/vexmail/ekle.png";
import Arama from "../../../../assets/vexmail/arama.png";
import Klasor from "../../../../assets/vexmail/klasor.png";
import IcerikAc from "../../../../assets/vexmail/icerik-ac.png";
import IcerikKapa from "../../../../assets/vexmail/icerik-kapa.png";
import UcNokta from "../../../../assets/vexmail/uc-nokta.png";
import Attach from "../../../../assets/vexmail/attach.png";

const ekran = Dimensions.get("screen");
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const SearchModal = ({ setModalOpenState, }) => {

 const [ccOpen, setCcOpen] = useState(false)
 const [bccOpen, setBccOpen] = useState(false)
 const [mailToProfilArray, setMailToProfilArray] = useState([])
const [ccProfilArray, setCcProfilArray] = useState([])
const [bccProfilArray, setBccProfilArray] = useState([])
const dummyArray = [
    { id: '1', value: 'A' },
    { id: '2', value: 'B' },
    { id: '3', value: 'C' },
    { id: '4', value: 'D' },
    { id: '5', value: 'E' },
    { id: '6', value: 'F' },
    { id: '7', value: 'G' },
    { id: '8', value: 'H' },
    { id: '9', value: 'I' },
    { id: '10', value: 'J' },
/*    { id: '11', value: 'K' },
    { id: '12', value: 'L' },
    { id: '13', value: 'M' },
    { id: '14', value: 'N' },
    { id: '15', value: 'O' },
    { id: '16', value: 'P' },
    { id: '17', value: 'Q' },
    { id: '18', value: 'R' },
    { id: '19', value: 'S' },
    { id: '20', value: 'T' },
    { id: '21', value: 'U' },
    { id: '22', value: 'V' },
    { id: '23', value: 'W' },
    { id: '24', value: 'X' },
    { id: '25', value: 'Y' },
    { id: '26', value: 'Z' }, */
  ];

const renderItem = ({ item }) => <Item title={item.title} />;

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
          <Text style={{ color: "#00AA9F", fontSize: 15 }}>VexMail Ekli Dosyalar</Text>
          </View>
        </TouchableOpacity>
        </View> 

        <View style={{flexDirection:'row', }}>
        <View style={{marginRight:20}}>
        <TouchableOpacity  onPress={() => setAttachedFilesModalOpen(false)}>
            <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
          <Image style={{ height: 25, width: 25 }} source={Arama} resizeMode="contain" />
          </View>
        </TouchableOpacity>
        </View> 
     
       
        </View>
      </View>
    )
}
const openEmail = (item) => {
    // Function for click on an item
    // eslint-disable-next-line prefer-template
    alert('Id : ' + item.id + ' Value : ' + item.value);
 
  }
const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity  style={styles.innerItem} onPress={() => openEmail(item)} >
        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
        <View style={{flex:6, justifyContent:'center', marginHorizontal:15}}>
          <Text style={{color:'#6C757D', fontWeight: 'bold', fontSize:12}}>Emre Emreoğlu</Text>
          <Text style={{color:'#6C757D', fontSize:6}}>10.06.2021 - 18:00</Text>
          <Text style={{color:'#6C757D',  fontSize:12}}>Lorem Ipsum is simply dummy text of the</Text>
        </View>
        <View style={{flexDirection:'row', flex:1}}>
            <View style={{flex:1}}><Image style={{ height:16, width:16,}} source={Attach} resizeMode="contain" /></View>
            <View style={{flex:1}}><Image style={{ height:16, width:16,}} source={UcNokta} resizeMode="contain" /></View>
        </View>
        </View>
      </TouchableOpacity>
    );
  };


const DATA = [
    {
      id: '1',
      title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant1.jpg'
    },
    {
      id: '2',
      title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant2.jpg',
    },
    {
      id: '3',
      title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant3.jpg',
    },
    {
        id: '4',
        title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant4.jpg',
      },
      {
        id: '5',
        title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant5.jpg',
      },
      {
        id: '6',
        title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant6.jpg',
      },
      {
        id: '7',
        title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant7.jpg',
      },
      {
        id: '8',
        title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant8.jpg',
      },
      {
        id: '9',
        title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant9.jpg',
      },
      {
        id: '10',
        title: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been thed stant10.jpg',
      },
     
  ];
  
  const Item = ({ title }) => {

  return (
    <TouchableOpacity style={styles.item} onPress={null} activeOpacity={1}>
    <View style={{flex:1, flexDirection:"row", flexGrow:1,  justifyContent:'space-between', alignItems:'center', paddingHorizontal:8, paddingVertical:11 }}>
        <View style={{flexDirection:"row", flex:1, flexGrow:1 }}>         
        <Text style={{marginLeft:15, color:'#00AA9F', fontSize:10}}>{title}</Text> 
        </View>

        <View style={{flexDirection:"row",  flex:1, justifyContent:'flex-end',}}> 
    <Image style={{height:25, width:25, marginLeft:8}} source={UcNokta} resizeMode="contain" />
       </View> 

    </View> 
   
    </TouchableOpacity>
  );
  
      }

  return (
    <View style={styles.mainFrame}>
      <BackComponent/>
<View style={styles.body}>
        
        <View style={styles.listingArea}>

      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    
</View>
</View>



      



      </View>
  );
};

export default SearchModal;

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
  body: {
      margin:5,
    flex:1,
    backgroundColor:'#FFFFFF',
    borderRadius: 3,
    borderColor: '#eeeeee',
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
  
 
  item: {
    marginBottom:15,
    flex:1, 
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexGrow:1
   

  },
  // eslint-disable-next-line react-native/no-unused-styles
  title: {
    fontSize: 32,
  },
  listingArea:{
    marginHorizontal:10,
    flexGrow:1,

},
innerItem: {
    marginBottom:15,
    flex:1, 
    height:HEIGHT/9.15,
    width: WIDTH-50,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },

});
