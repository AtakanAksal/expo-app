import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, FlatList, ActivityIndicator, Dimensions, TextInput} from "react-native";
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
import Ok from "../../../../assets/check-icon.png"

const WIDTH_WINDOW = Dimensions.get("window").width;
const BasvuruyuTamamla = ({setActiveState, konum, setKonum}) => {
    const [stantData, setStantData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [{ user }] = useUserValue(); 
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    const [activeComponent, setActiveComponent] = useState("basvur")
    
     
  const AramaComponent = () => {
    return(
      <View style={styles.headerComponent}>
      <TextInput style={{color:'#00AA9F'}} placeholder="Başvuru İçin Stant Seçin"  placeholderTextColor="#00AA9F"/>
      <Image style={styles.menuItemImg} source={Arama} resizeMode="contain" /> 
    </View>
    )    
  };
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
    { id: '11', value: 'K' },
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
    { id: '26', value: 'Z' },
  ];


      const Fuar = ({ item }) => {
        return (
          // Single Comes here which will be repeatative for the FlatListItems
          <View style={{width: '40%', justifyContent:'center', alignItems:'center'}}>

          <TouchableOpacity style={styles.imageContainer} onPress={() => setActiveState("bildirimler-davet-stantseciniz-yayındakiler")}>
          <Image style={styles.image} source={FuarYayinBekleyen} resizeMode="contain"/>
          </TouchableOpacity>

          <Text style={[styles.text, { color: "#6C757D", marginTop: 9, marginBottom:15 }]}>Kayseri Büyükşehir</Text>

          </View>
        );
      };
      const Salon = ({ item }) => {
        return (
          // Single Comes here which will be repeatative for the FlatListItems
          <View style={{width: '40%', justifyContent:'center', alignItems:'center'}}>

          <TouchableOpacity style={styles.imageContainer} onPress={() => setActiveState("bildirimler-davet-stantseciniz-yayındakiler")}>
          <Image style={styles.image} source={SalonYayinBekleyen} resizeMode="contain"/>
          </TouchableOpacity>

          <Text style={[styles.text, { color: "#6C757D", marginTop: 9, marginBottom:15 }]}>Turizm ve Seyahat</Text>

          </View>
        );
      };
      const Stant = ({ item }) => {
        return (
          // Single Comes here which will be repeatative for the FlatListItems
          <View style={{width: '40%', justifyContent:'center', alignItems:'center'}}>

          <TouchableOpacity style={[styles.imageContainer, { width: WIDTH_WINDOW / 3.18, height: WIDTH_WINDOW / 3.18,}]} onPress={() => setActiveState("bildirimler-davet-stantseciniz-yayındakiler")}>
          <Image style={[styles.image, {width:  WIDTH_WINDOW / 5.1,height: WIDTH_WINDOW / 5.1,}]} source={YayinBekleyenIcon} resizeMode="contain"/>
          <Text style={[styles.text, { color: "#17A2B8", marginTop: 1, marginBottom:15 }]}>Yayın Bekleyen</Text>
          </TouchableOpacity>

          <Text style={ { color: "#6C757D", marginTop: 9, marginBottom:15, fontSize:19 }}>Adobe</Text>

          </View>
        );
      };
      
    const footerComponent = () => {
        if (loading) {
          return <ActivityIndicator color="#00AA9F" size="large" />;
        }
        return null;
      };
    const BodyComponent = () => {
      if(activeComponent==="basvur"){
      return(
        <View style={styles.body}>
        {(konum!=="") &&<View><Text style={{fontSize:25, color:"#00AA9F"}}>{konum}</Text></View> }
     <Stant/>
     {(konum==="") &&         <TouchableOpacity onPress={ ()=> setActiveState("bildirimler-davet-stantseciniz-konumsec")} style={{marginVertical:17, alignSelf:'flex-end', marginRight:45}}>
        <Text style={{fontSize:10, fontStyle:'italic'}}>Konum Seçerek Başvur</Text>
      </TouchableOpacity> }
      <TouchableOpacity onPress={()=> setActiveComponent("diger")} style={{backgroundColor:'#00AA9F', width:'90%', justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:15, color:'#FFFFFF',  marginVertical:7}}>Başvuruyu Tamamla</Text>
      </TouchableOpacity> 
     </View>
      // eslint-disable-next-line no-else-return
      )} 
      // eslint-disable-next-line no-else-return
      else {
      return (
        <View style={{ justifyContent:'space-around',  alignItems:'center',  flex:2,  width:'95%', backgroundColor:'white',}}>
        <Image style={[styles.image, {width:  180,height: 180, }]} source={Ok} resizeMode="contain"/>
        {(konum!=="") &&<View><Text style={{fontSize:25, color:"#00AA9F"}}>{konum}</Text></View> }
        <Text style={{color:'#6C757D', fontSize:18, textAlign: 'center'}}>Başvurunuz {"\n"} Başarıyla  İletilmiştir</Text>
       <TouchableOpacity onPress={()=> setActiveComponent("diger")} style={{backgroundColor:'#00AA9F', width:'90%', justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:15, color:'#FFFFFF',  marginVertical:7}}>Yetkiliye Mesaj Gönder</Text>
        </TouchableOpacity>
        </View>
      )}

    }
    return(
    <> 
      <View style={styles.container}>

       <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
       <Fuar/>
       <Salon/>
       </View>
      <BodyComponent/>
      

      </View>
    </>
  );}
  export default BasvuruyuTamamla
  const styles = StyleSheet.create({
    container: {
      flex: 1,
     justifyContent:'center',
      alignItems: "center",
      paddingBottom:10
    },
    body: {
      justifyContent:'center',
      alignItems:'center',
      flex:2,
      width:'95%', 
      backgroundColor:'white',
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
    image: {
      width:  WIDTH_WINDOW / 8.5,
      height: WIDTH_WINDOW / 8.5,
      alignSelf: "center",
    },
    imageContainer: {
      width: WIDTH_WINDOW / 5.5,
      height: WIDTH_WINDOW / 5.5,
      backgroundColor: "#FFFFFF",
      borderWidth: 0.5,
      borderColor: "#c1c1c1",
      justifyContent: "center",
      elevation: 6,
    },
    text: {
      alignSelf: "center",
      fontSize:10
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
  