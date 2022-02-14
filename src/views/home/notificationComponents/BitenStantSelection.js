import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, FlatList, ActivityIndicator, Dimensions, TextInput} from "react-native";
import YayinBekleyenIcon from "../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import YayinBekleyenGriIcon from "../../../../assets/stant/stant-cerceve-gri.png";
import YayinBitenIcon from "../../../../assets/stant/stant-cerceve-yayin-biten.png";
import YayindaIcon from "../../../../assets/stant/stant-cerceve-yayinda.png";
import RateIcon from "../../../../assets/vex-rate.png";
import { postYayindakiStantlar, postBeklemedeStantlar, postBitenStantlar } from "../../../helpers/connections";
import { useUserValue } from "../../../contexts/UserContext";
import Arama from "../../../../assets/vexmail/arama.png";

const WIDTH_WINDOW = Dimensions.get("window").width;
const BitenStantSelection = ({setActiveState}) => {
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


      const ItemView = ({ item }) => {
        return (
          // Single Comes here which will be repeatative for the FlatListItems
          <View style={{width: '40%'}} >
          <TouchableOpacity style={styles.imageContainer} onPress={() => setActiveState("bildirimler-davet-stantseciniz-basvuruyutamamla")}>
          <Image style={styles.image} source={YayinBitenIcon} resizeMode="contain"/>
          <Text style={[styles.text, { color: "#FF0000" }]}>Yayın Biten</Text>
          </TouchableOpacity>
          <Text style={[styles.text, { color: "#6C757D", marginTop: 9, marginBottom:15 }]}>Nakhal</Text>
          </View>
        );
      };

    const footerComponent = () => {
        if (loading) {
          return <ActivityIndicator color="#00AA9F" size="large" />;
        }
        return null;
      };
    return(
    <>
      
      <View style={styles.container}>
       <AramaComponent/>
      <FlatList
        data={dummyArray}         
        // Item Separator View
        renderItem={ItemView}
        keyExtractor={item => item.id} 
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}         
      />  
        
      </View>
    </>
  );}
  export default BitenStantSelection
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBottom:10
    },
    image: {
      width: "60%",
      height: "60%",
      alignSelf: "center",
    },
    imageContainer: {
      width: WIDTH_WINDOW / 3.6,
      height: WIDTH_WINDOW / 3.6,
      backgroundColor: "#FFFFFF",
      borderWidth: 0.5,
      borderColor: "#c1c1c1",
      justifyContent: "center",
      elevation: 6,
    },
    text: {
      alignSelf: "center",
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
  