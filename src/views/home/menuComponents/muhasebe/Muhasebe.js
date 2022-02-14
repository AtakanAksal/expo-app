/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
  ScrollView,
  Pressable,
  Button,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useNavigation } from '@react-navigation/native';
import { useUserValue } from "../../../../contexts/UserContext";
import GoBackPng from "../../../../../assets/forgotpass/go-back-black.png";
import Fuar from "../../../../../assets/muhasebe/fuar.png";
import Reklam from "../../../../../assets/muhasebe/reklam.png";
import ListeItem from "./ListeItem";
import SearchAndFilterMuhasebeComponant from "./SearchAndFilterMuhasebeComponant";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import ContentOpenIcon from "../../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../../assets/vexmail/icerik-kapa.png";
import Tarih from "../../../../../assets/muhasebe/tarih.png";
import Etkilesim from "../../../../../assets/reklam/etkilesim.png";
import Erisim from "../../../../../assets/muhasebe/erisim.png";
import OzelSalon from "../../../../../assets/muhasebe/ozel-salon-turkuaz.png";
import ReklamYayinBilgisi from "./ReklamYayinBilgisi";
import ItemView from "./ItemView";
import Listeleme from "./Listeleme";
import FaturaFiltrele from "./FaturaFiltrele";
import { postInvoices } from "../../../../helpers/muhasebeConnection";




const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;
const dummyArray = [
  {
    id: "1",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "2",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "3",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "4",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "5",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "6",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "7",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "8",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "9",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "10",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
];

const faturaArray = [
  {
    id: "1",
    value: "Seri No",
  },
  {
    id: "2",
    value: "Hizmet Kodu",
  },
  {
    id: "3",
    value: "İşlem Kodu",
  },
  {
    id: "4",
    value: "Sipariş Kodu",
  },
  {
    id: "5",
    value: "Referans No",
  },
  {
    id: "6",
    value: "Ödeme Tipi",
  },
  {
    id: "7",
    value: "Tutar",
  },
  {
    id: "8",
    value: "Başlangıç Tarihi",
  },
  {
    id: "9",
    value: "Bitiş Tarihi",
  },
];
const tahsilatMakbuzuArray = [
  {
    id: "1",
    value: "Firma İsmi",
  },
  {
    id: "2",
    value: "Tahsilat Konusu",
  },
  {
    id: "3",
    value: "Seri No",
  },
  {
    id: "4",
    value: "Sicil No",
  },
  {
    id: "5",
    value: "Başlangıç Tarihi",
  },
  {
    id: "6",
    value: "Bitiş Tarihi",
  },
  {
    id: "7",
    value: "Makbuz Tarihi",
  },
];
const bankaHesapBilgileriArray = [
  {
    id: "1",
    value: "Hesap Adı",
  },
  {
    id: "2",
    value: "Banka Adı",
  },
  {
    id: "3",
    value: "Şube",
  },
  {
    id: "4",
    value: "Ülke",
  },
  {
    id: "5",
    value: "İl",
  },
  {
    id: "6",
    value: "İlçe",
  },
  {
    id: "7",
    value: "Oluşturma Tarihi",
  },
];
const gelirlerArray = [
  {
    id: "1",
    value: "Yayın Durumu",
  },
  {
    id: "2",
    value: "Modül Seçimi",
  },
  {
    id: "3",
    value: "Sipariş Türü",
  },
  {
    id: "4",
    value: "Sipariş Tarihi",
  },
  {
    id: "5",
    value: "Sipariş Tutarı",
  },
  {
    id: "6",
    value: "Sipariş Kuru Seçimi",
  },
  {
    id: "7",
    value: "Teslimat Tarihi",
  },
  {
    id: "8",
    value: "Onay Tarihi",
  },
  {
    id: "9",
    value: "Tahsilat Tutarı",
  },
  {
    id: "9",
    value: "Tahsilat Kuru",
  },
  {
    id: "9",
    value: "Tahsilat Tarihi",
  },
];
const giderlerArray = [
  {
    id: "1",
    value: "Yayın Durumu",
  },
  {
    id: "2",
    value: "Modül Seçimi",
  },
  {
    id: "3",
    value: "Gider Türü",
  },
  {
    id: "4",
    value: "Gider Tarihi",
  },
  {
    id: "5",
    value: "Gider Tutarı",
  },
  {
    id: "6",
    value: "Gider Kuru",
  },
  {
    id: "7",
    value: "Teslimat Tarihi",
  },
  {
    id: "8",
    value: "Onay Tarihi",
  },
  {
    id: "9",
    value: "Tahsilat Tutarı",
  },
  {
    id: "9",
    value: "Tahsilat Kuru",
  },
  {
    id: "9",
    value: "Tahsilat Tarihi",
  },
];

const Muhasebe = ({ setSelectedMenu }) => {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [filterAreaList, setFilterAreaList] = useState([]);
  const [filteredData, setFilteredData] = useState(dummyArray);
  const [activeState, setActiveState] = useState("");
  const [prevActiveState, setPrevActiveState] = useState("");

  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(1);
 // const [streamData, setStreamData] = useState([]);
  // SecureStore.deleteItemAsync("mobile-token");
  const [{ user }] = useUserValue();
  const nav = useNavigation();
  // eslint-disable-next-line no-undef
  const postData = new FormData();

  useEffect(() => {
    if (activeState === "Muhasebe - Fatura") {
      setFilterAreaList(faturaArray);      
    } else if (activeState === "Muhasebe - Tahsilat Makbuzu") {
      setFilterAreaList(tahsilatMakbuzuArray);
    } else if (activeState === "Muhasebe - Banka Hesap Bilgileri") {
      setFilterAreaList(bankaHesapBilgileriArray);
    } else if (activeState === "Muhasebe - Gelirler") {
      setFilterAreaList(gelirlerArray);
    } else if (activeState === "Muhasebe - Giderler") {
      setFilterAreaList(giderlerArray);
    } else if (activeState === "Muhasebe - İptal & İade") {
      setFilterAreaList(faturaArray);
    }
  }, [activeState]);


  const getInvoiceData = async () => {
    //  setLoading(true);
  //  postData.append("main_type", "aa"); //
    postData.append("page", offset);
console.log(postData);
  await postInvoices(postData, user.token)
      .then((res) => {
       // console.log(res);
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setListItems([...listItems, ...res.invoices]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };


  const MainSelection = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Image
              style={{ height: relativeWidthNum(25), width:  relativeWidthNum(25), marginRight:relativeWidthNum(10) }}
              source={GoBackPng}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 15 }}>Muhasebe</Text>
        </View>
      </View>

      <View style={[styles.container, { margin:30}]}>

      <Text style={{ color: "#00AA9F", fontSize: 15, alignSelf:"center" }}>Muhasebe</Text>


        {/* Row 1 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
             getInvoiceData(); 
                         
              setActiveState("Muhasebe - Fatura");              
              setSelectedComponent(1);
            }}
          >
            <Image style={styles.image} source={Fuar} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>Fatura</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              getInvoiceData(); 
              setSelectedComponent(1);
              setActiveState("Muhasebe - Tahsilat Makbuzu");
            }}
          >
            <Image style={styles.image} source={Fuar} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>
              Tahsilat Makbuzu
            </Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              getInvoiceData(); 
              setSelectedComponent(1);
              setActiveState("Muhasebe - Banka Hesap Bilgileri");
            }}
          >
            <Image style={styles.image} source={Reklam} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>
              Banka Hesap Bilgileri
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              getInvoiceData(); 
              setSelectedComponent(1);
              setActiveState("Muhasebe - Gelirler");
            }}
          >
            <Image style={styles.image} source={Reklam} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>Gelirler</Text>
          </TouchableOpacity>
        </View>

        {/* Row 3 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              getInvoiceData(); 
              setSelectedComponent(1);
              setActiveState("Muhasebe - Giderler");
            }}
          >
            <Image style={styles.image} source={Fuar} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>Giderler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              getInvoiceData(); 
              setSelectedComponent(1);
              setActiveState("Muhasebe - İptal & İade");
            }}
          >
            <Image style={styles.image} source={Fuar} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>
              İptal & İade
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      {
        {
          0: <MainSelection />,
          1: (
            <Listeleme
              activeState={activeState}
              setActiveState={setActiveState}
              listItems={listItems}
              setListItems={setListItems}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setSelectedComponent={setSelectedComponent}
              prevActiveState={prevActiveState}
              setPrevActiveState={setPrevActiveState}
            />  
          ),
          2: (
            <FaturaFiltrele
              setSelectedComponent={setSelectedComponent}
              activeState={activeState}
              filterAreaList={filterAreaList}
              listItems={listItems}
              setListItems={setListItems}
              // prevActiveState={prevActiveState}
              // setPrevActiveState={setPrevActiveState}
            />
          ),
          // 3: <TahsilatMakbuzuFiltrele />,
          // 4: <BankaHesapBilgileriFiltrele />,
          // 5: <GelirFiltrele />,
          // 6: <GiderFiltrele />,
          // 7: <IadeIptalFiltrele />,
          8: <ReklamYayinBilgisi setSelectedComponent={setSelectedComponent}/>
        }[selectedComponent]
      }
    </View>
  );
};
export default Muhasebe;
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




const TahsilatMakbuzuFiltrele = () => {
  return <Text>a</Text>;
};
const BankaHesapBilgileriFiltrele = () => {
  return <Text>a</Text>;
};
const GelirFiltrele = () => {
  return <Text>a</Text>;
};
const GiderFiltrele = () => {
  return <Text>a</Text>;
};
const IadeIptalFiltrele = () => {
  return <Text>a</Text>;
};