/* eslint-disable react-native/no-unused-styles */
import React, {useState} from "react";

import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity, StyleSheet} from "react-native";
import GoBackPng from "../../../../../assets/forgotpass/go-back-black.png";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import ListItemFiltrele from "./ListItemFiltrele";
import { postInvoicesFiltered } from "../../../../helpers/muhasebeConnection";
import { useUserValue } from "../../../../contexts/UserContext";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;

const FaturaFiltrele = ({
    activeState,
    setSelectedComponent,
    filterAreaList,
    listItems,
    setListItems
  }) => {
const [filterPayloads, setFilterPayloads] = useState([])
const [loading, setLoading] = useState(false);
const [offset, setOffset] = useState(1);
const [{ user }] = useUserValue();
// eslint-disable-next-line no-undef
const postData = new FormData();

    const stateSetter = () => {
      if (activeState === "Muhasebe - Fatura") {
       return "Fatura Filtrele"
     } if (activeState === "Muhasebe - Tahsilat Makbuzu") {
       return "Tahsilat Makbuzu Filtrele"
     } if (activeState === "Muhasebe - Banka Hesap Bilgileri") {
       return "Banka Hesap Bilgileri Filtrele"
     } if (activeState === "Muhasebe - Gelirler") {
       return "Gelirler Filtrele"
     } if (activeState === "Muhasebe - Giderler") {
       return "Giderler Filtrele"
     } if (activeState === "Muhasebe - İptal & İade") {
       return "İptal & İade Filtrele"
   } return "Muhasebe - Fatura"
  }
    const clearFilter = () => {
      setFilterPayloads([])
    }
    const goruntule = () => {
    //  console.log(filterPayloads);
      getInvoiceFilteredData()
    }
    const getInvoiceFilteredData = async () => {
      //  setLoading(true);
    //  postData.append("main_type", "aa"); //
      postData.append("page", offset);
     
      filterPayloads.forEach(element => {
       // console.log(element);
      //  console.log("obje keyii");
      // console.log(Object.keys(element)[0]); 
      // console.log("obje value");
      // console.log(Object.values(element)[0]);
         postData.append(Object.keys(element)[0], Object.values(element)[0])
         console.log(postData);
      }       
      )
     
      
  
    await postInvoicesFiltered(postData, user.token)
        .then((res) => {
           console.log(res);
          // setOffset(offset + 1);  sonraki sayfa ayarlanacak
          setListItems([...listItems, ...res.invoices]);
          //  setLoading(false);
        }) // console.log(res.streams)  setStreamData(res.streams)
        .catch((err) => console.log(err));
    };
    return (
      <>
        <View style={styles.headFrame}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between", flex: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center",}}>
            <TouchableOpacity onPress={() => setSelectedComponent(1)}>
              <Image
                style={{ height: relativeWidthNum(25), width:  relativeWidthNum(25), marginRight:relativeWidthNum(10) }}
                source={GoBackPng}
                resizeMode="contain"
              />
            </TouchableOpacity>
           
            
            <Text style={{ color: "#6C757D", fontSize: 15 }}>
              {stateSetter()}
            </Text>
            </View>
            <View style={{marginRight:relativeWidthNum(28)}}>
              <TouchableOpacity onPress={()=>{clearFilter()}}>
              <Text style={{color:"#00AA9F", fontSize:15}}>Filtreyi Temizle</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
  
        <View style={styles.container}>
          <ListItemFiltrele
            // item={item}
            // index={index}
            // selectedIndex={selectedIndex}
            //  setSelectedIndex={setSelectedIndex}
            activeState={activeState}
            filterAreaList={filterAreaList}
            listItems={listItems}
            setListItems={setListItems}
            filterPayloads={filterPayloads}
            setFilterPayloads={setFilterPayloads}            
            // listItems={listItems}
            // setListItems={setListItems}
            // setActiveState={setActiveState}
            // setOnProcessItem={setOnProcessItem}
            // stateIsReceived={stateIsReceived}
          />
        </View>
        {/* Görüntüle Buton */}
        <View
          style={{
            // flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: relativeHeightNum(40),
          }}
        >
          <TouchableOpacity style={styles.mainButton}  onPress={()=>goruntule()}>
            <Text style={styles.mainButtonText}>Görüntüle</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  export default FaturaFiltrele;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      // marginHorizontal:Math.trunc( WIDTH_WINDOW*15/360 ),
      // marginVertical: Math.trunc( HEIGHT_WINDOW*50/360 )
      // alignItems: "center",
   
    },
    headFrame: {
      flexDirection: "row",
      height: 50,
      backgroundColor: "#EFEFEF",
      alignItems: "center",
      justifyContent: "space-between",
    },
    imageContainer: {
      width: relativeWidthNum(94),
      height: relativeWidthNum(94),
      backgroundColor: "#FFFFFF",
      borderWidth: 0.5,
      borderColor: "#707070",
      justifyContent: "center",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
      
    },
    imageBorderContainer: {
      width: relativeWidthNum(94),
      height: relativeWidthNum(94),
      backgroundColor: "#FFFFFF",
      borderWidth: 0.2,
      borderColor: "#707070",
      justifyContent: "center",
      alignSelf: "center",
      
      
    },
    image: {
      width: "60%",
      height: "60%",
      alignSelf: "center",
    },
    text: {
      alignSelf: "center",
      fontSize: 10,
    },
    textComman: {
      fontSize: 10,
      color: "#6C757D",
      paddingVertical: 13,
    },
    textRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      borderColor: "#c1c1c1",
      borderBottomWidth: 0.5,
      // borderColor: "#707070",
      //  borderWidth: 0.2,
      borderStyle: "solid",
      shadowColor: "gray",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 8,
      paddingBottom: 0.2,
    },
    mainButton: {
      borderWidth: 0.5,
      borderColor: "#00AA9F",
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
      width: WIDTH_WINDOW - 30,
      height: 45,
      backgroundColor: "#00AA9F",
    },
  
    mainButtonText: {
      color: "#FFFFFF",
      fontSize: 15,
    },
    roundsRow : {
      // marginTop:10, 
       alignItems:"center",
       flex:1,
        width:'100%', 
        flexDirection:"row",
         justifyContent:"space-around", 
     },
     box: {
      width:relativeWidthNum(60),
      height:relativeWidthNum(60),
      borderColor:"#707070",
      borderWidth:0.2,
      justifyContent:"center",
      alignItems:"center"
     },
     round: {
       width:relativeWidthNum(90),
       height:relativeHeightNum(60),
       borderColor:"#707070",
       borderWidth:0.2,
       justifyContent:"center",
       alignItems:"center",
       borderRadius:10
      },
      bigRound: {
       width:relativeWidthNum(121),
       height:relativeHeightNum(75),
       borderColor:"#707070",
       borderWidth:0.2,
       justifyContent:"center",
       alignItems:"center",
       borderRadius:15
      },
     boxText : {
       color: "#6C757D",
       fontSize:10
     },
     roundText : {
       color: "#6C757D",
       fontSize:12
     }, 
  });