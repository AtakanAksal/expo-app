import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, FlatList, ActivityIndicator, Dimensions, TextInput, SafeAreaView} from "react-native";
import YayinBekleyenIcon from "../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import YayinBekleyenGriIcon from "../../../../assets/stant/stant-cerceve-gri.png";
import YayinBitenIcon from "../../../../assets/stant/stant-cerceve-yayin-biten.png";
import YayindaIcon from "../../../../assets/stant/stant-cerceve-yayinda.png";
import RateIcon from "../../../../assets/vex-rate.png";
import FuarYayinBekleyen from "../../../../assets/notification/ozelfuar/ozel-fuar-yayin-bekleyen.png"
import SalonYayinBekleyen from "../../../../assets/notification/ozelsalon/ozel-salon-yayin-bekleyen.png"
import { postYayindakiStantlar, postBeklemedeStantlar, postBitenStantlar } from "../../../helpers/connections";
import { useUserValue } from "../../../contexts/UserContext";
import Arama from "../../../../assets/vexmail/arama.png";

const WIDTH_WINDOW = Dimensions.get("window").width;
const KonumSec = ({setActiveState, konum, setKonum, selectedIndexList, setSelectedIndexList}) => {
    const [stantData, setStantData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [{ user }] = useUserValue(); 
    // eslint-disable-next-line no-undef
    const postData = new FormData();

     
  const AramaComponent = () => {
    return(
      <View style={styles.headerComponent}>
      <TextInput style={{color:'#00AA9F'}} placeholder="Başvuru İçin Stant Seçin"  placeholderTextColor="#00AA9F"/>
      <Image style={styles.menuItemImg} source={Arama} resizeMode="contain" /> 
    </View>
    )    
  };
  const dummyArray = [
    { id: '1', value: 'A1' },
    { id: '2', value: 'B1' },
    { id: '3', value: 'C1' },
    { id: '4', value: 'A2' },
    { id: '5', value: 'B2' },
    { id: '6', value: 'C2' },
    { id: '7', value: 'A3' },
    { id: '8', value: 'B3' },
    { id: '9', value: 'C3' },
    { id: '10', value: 'A4' },
    { id: '11', value: 'B4' },
    { id: '12', value: 'C4' },
    { id: '13', value: 'A1' },
    { id: '21', value: 'B1' },
    { id: '31', value: 'C1' },
    { id: '41', value: 'A2' },
    { id: '51', value: 'B2' },
    { id: '61', value: 'C2' },
    { id: '71', value: 'A3' },
   
   
  ];


      
    const footerComponent = () => {
        if (loading) {
          return <ActivityIndicator color="#00AA9F" size="large" />;
        }
        return null;
      };
    return(
        <SafeAreaView style={styles.container}>
        <FlatList
       //   horizontal
          data={dummyArray}
          renderItem={({ item, index }) => (
            <Fuar
              item={item}
              index={index}
              setActiveState={setActiveState}
              setKonum={setKonum}
              selectedIndexList={selectedIndexList}
              setSelectedIndexList={setSelectedIndexList}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
        />
      </SafeAreaView>
  );}
  export default KonumSec
  const styles = StyleSheet.create({
    container: {
      flex: 1,
     justifyContent:'center',
      alignItems: "center",
      paddingBottom:10
    },
   
    
    imageContainer: {
    
      width: WIDTH_WINDOW / 5.5,
      height: WIDTH_WINDOW / 5.5,
      borderWidth: 0.5,
      borderColor: "#c1c1c1",
      justifyContent: "center",
      alignItems:'center',
      elevation: 6,
   
    },
    text: {
     fontSize:10,   
     color:'#6C757D',
     justifyContent:'center',
     alignItems:'center'
    },
    headerComponent:{
      width:'80%',
      flexDirection: "row",
      height: 45,
      marginVertical: 15,    
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-between',
     
    },
    menuItemImg: {
      height:25,
      width:25,
      
    },
  });
  
  const Fuar = ({ item, setActiveState, setKonum, selectedIndexList, setSelectedIndexList }) => {
 
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View style={{ width: '33%', justifyContent:'center', alignItems:'center'}}>
        <Text style={[styles.text, { color: "#6C757D", marginTop: 9, }]}>{item.value}</Text>
      <TouchableOpacity style={[styles.imageContainer, (selectedIndexList.includes(item.id))  ? { backgroundColor:"#00AA9F"} : { backgroundColor: "#FFFFFF",} ]}
       onPress={() => {
           setSelectedIndexList([]) // tekrar seçim isterse resetler, tek stant secim hakkı var
           setSelectedIndexList(prevList => [...prevList, item.id]); 
           setKonum(item.value); 
           setActiveState("bildirimler-davet-stantseciniz-basvuruyutamamla");           
           }}>
      <View style={{width:'80%', flexDirection:'column', justifyContent:'center', alignItems:'center', }}>
      <Text style={[styles.text,  (selectedIndexList.includes(item.id))  ?  {color:'#FFFFFF'} : { color:'#6C757D'} ] }>KONUMA</Text>
      <Text style={[styles.text,  (selectedIndexList.includes(item.id))  ?  {color:'#FFFFFF'} : { color:'#6C757D'} ] }>BAŞVUR</Text>
      </View>
      </TouchableOpacity>
      </View>
    );
  };
