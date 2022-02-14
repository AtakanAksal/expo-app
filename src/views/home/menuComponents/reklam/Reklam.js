/* eslint-disable no-undef */

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
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { useUserValue } from "../../../../contexts/UserContext";

import GoBackPng from "../../../../../assets/forgotpass/go-back-black.png";

import YayindaIcon from "../../../../../assets/reklam/fuar_cercevesiz.png";
import YayinBekleyenIcon from "../../../../../assets/reklam/fuar_cerceveli.png";
import YayinBitenIcon from "../../../../../assets/reklam/salon_cerceveli.png";

import YayindaVideo from "../../../../../assets/reklam/yayinda_video.png";
import YayinBekleyenVideo from "../../../../../assets/reklam/yayin_bekleyen_video.png";
import YayinBitenVideo from "../../../../../assets/reklam/yayin_biten_video.png";

import YayindaAnons from "../../../../../assets/reklam/yayinda_anons.png";
import YayinBekleyenAnons from "../../../../../assets/reklam/yayin_bekleyen_anons.png";
import YayinBitenAnons from "../../../../../assets/reklam/yayin_biten_anons.png";

import YayindaBayrak from "../../../../../assets/reklam/yayinda_bayrak.png";
import YayinBekleyenBayrak from "../../../../../assets/reklam/yayin_bekleyen_bayrak.png";
import YayinBitenBayrak from "../../../../../assets/reklam/yayin_biten_bayrak.png";

import YayindaAltyazi from "../../../../../assets/reklam/yayinda_text.png";
import YayinBekleyenAltyazi from "../../../../../assets/reklam/yayin_bekleyen_text.png";
import YayinBitenAltyazi from "../../../../../assets/reklam/yayin_biten_text.png";

import Filtrele from "../../../../../assets/vexmail/filtrele.png";
import Arama from "../../../../../assets/vexmail/arama.png";

import ReklamIcon from "../../../../../assets/reklam/reklam_icon.gif";
import Basvurular from "../../../../../assets/reklam/basvurular.png";

import VideoGri from "../../../../../assets/reklam/video_gri.png";
import AnonsGri from "../../../../../assets/reklam/anons_gri.png";
import BannerGri from "../../../../../assets/reklam/banner_gri.png";
import AltyaziGri from "../../../../../assets/reklam/text_gri.png";

import ExpoExample from "../../../../../assets/reklam/expo-example.png";
import Ucnokta from "../../../../../assets/vexmail/uc-nokta.png";
import ExpoFuarTurkuaz from "../../../../../assets/fuar/expo-fuar-turkuaz.png";
import DownArrow from "../../../../../assets/vexmail/down-arrow.png";

import Etkilesim from "../../../../../assets/reklam/etkilesim.png";
import Grup from "../../../../../assets/reklam/grup.png";
import VexPoint from "../../../../../assets/reklam/vexPoint.png";
import OzelSalonTurkuaz from "../../../../../assets/reklam/ozel-salon-turkuaz.png";

import RateIcon from "../../../../../assets/vex-rate.png";
import StantMenu from "../stant/StantMenu";

import {
  postYayindakiStantlar,
  postBeklemedeStantlar,
  postBitenStantlar,
  postAdvertisementWithType,
  postAdvertisementFilter
} from "../../../../helpers/connections";

import {
  relativeWidthAndHeightForSquare,
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import SearchAndFilterReklamComponant from "./reklamMenuComponents/SearchAndFilterReklamComponant";

// Reklam tipleri
// Video : "video" announcement_type_id : 1
// Ses : "audio"     announcement_type_id : 2
// Banner : "flag"   announcement_type_id : 3
// Alt yazı : "subtitle" announcement_type_id : 4

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;
const dummyArray = [
  {
    id: "1",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "2",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "3",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "4",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "5",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "6",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "7",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "8",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "9",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "10",
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  { id: "11", value: "K" },
  { id: "12", value: "L" },
  { id: "13", value: "M" },
  { id: "14", value: "N" },
  { id: "15", value: "O" },
  { id: "16", value: "P" },
  { id: "17", value: "Q" },
  { id: "18", value: "R" },
  { id: "19", value: "S" },
  { id: "20", value: "T" },
  { id: "21", value: "U" },
  { id: "22", value: "V" },
  { id: "23", value: "W" },
  { id: "24", value: "X" },
  { id: "25", value: "Y" },
  { id: "26", value: "Z" },
];
const Reklam = ({ setSelectedMenu }) => {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [stantData, setStantData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedStantData, setSelectedStantData] = useState(null);
  const [activeState, setActiveState] = useState("");
  const [listItems, setListItems] = useState(dummyArray);
  const [filteredData, setFilteredData] = useState(dummyArray);
  const [streamData, setStreamData] = useState([]);

  const [{ user }] = useUserValue();
  const nav = useNavigation();

  const handleBackButtonClick = () => {
    if (selectedComponent !== 0) {
      setSelectedComponent(0);
    } else {
    ///  setSelectedMenu(0);
    nav.goBack();    }
    return true;
  };

  useEffect(() => {
    console.log(selectedComponent);
    
    // setStantData([]);
    // setOffset(1);
    switch (activeState) {
      case 1:
        getAdvertisementWithType();
        break;

      case 2:
        getStantBeklemede();
        break;

      case 3:
        getStantBiten();
        break;

      default:
        break;
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, [selectedComponent]);

  const openStantMenu = (item) => {
    setSelectedStantData(item);
    setSelectedComponent(5);
  };

  const postData = new FormData();

  const getStantYayinda = () => {
    setLoading(true);
    postData.append("currentPage", offset);

    postYayindakiStantlar(postData, user.token)
      .then((res) => {
        setOffset(offset + 1);
        console.log(res);
        setStantData([...stantData, ...res.booths]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getStantBeklemede = () => {
    setLoading(true);
    postData.append("currentPage", offset);

    postBeklemedeStantlar(postData, user.token)
      .then((res) => {
        setOffset(offset + 1);
        console.log(res);
        setStantData([...stantData, ...res.booths]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getStantBiten = () => {
    setLoading(true);
    postData.append("currentPage", offset);

    postBitenStantlar(postData, user.token)
      .then((res) => {
        setOffset(offset + 1);
        console.log(res);
        setStantData([...stantData, ...res.booths]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getAdvertisementWithType = (typeValue) => {
   // setLoading(true);
    postData.append("currentPage", offset);
    postData.append("type", typeValue)

    postAdvertisementWithType(postData, user.token)
      .then((res) => {
        //  setOffset(offset + 1);
        //  console.log("res yazılıyor ---------------------------------------------------------------------------------");
        //  console.log(res);
        setStreamData([...streamData, ...res.announcements]);
        // setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // announcement_status tablosunda 
// 1	"Onay Bekleyen"
// 2	"Ödeme Bekleyen"
// 3	"Yayın Bekleyen"
// 4	"Yayında"
// 5	"Red Edilen"
// 6	"Yayından Kaldırılan"
// 7	"Yayın Biten"
// 8	"Özelleştirme Bekleyen"
  const getAdvertisementFilter = (typeValue, tabValue, statusValue) => {
    // setLoading(true);
     postData.append("currentPage", offset);
     postData.append("type", typeValue);
     postData.append("tab", tabValue);
     postData.append("status", statusValue);
 
     postAdvertisementFilter(postData, user.token)
       .then((res) => {
       //  setOffset(offset + 1);
     //  console.log("res yazılıyor ---------------------------------------------------------------------------------");
      //  console.log(res);
          setStreamData([...streamData, ...res.announcements]);
         // setLoading(false);
       })
       .catch((err) => console.log(err));
   };

  const MainSelection = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() =>  nav.goBack()  }>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Reklam - Yayınla</Text>
        </View>
      </View>
      <View style={styles.containerMain}>
        <TouchableOpacity style={styles.imageContainerMain} onPress={() => setSelectedComponent(1)}>
          <Image style={styles.image} source={ReklamIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#00AA9F" }]}>Reklamlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainerMain} onPress={() => setSelectedComponent(2)}>
          <Image style={styles.image} source={Basvurular} resizeMode="contain" />
          <Text style={[styles.text, { color: "#00AA9F" }]}>Başvurular</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  const ReklamSelection = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(0)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Reklam</Text>
        </View>
      </View>

      <View style={styles.containerReklamlar}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.imageContainerReklamlar}
            onPress={() => {
              setSelectedComponent(3);
              setActiveState("Reklam - Video");
            }}
          >
            <Image style={styles.image} source={VideoGri} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageContainerReklamlar}
            onPress={() => {
              setSelectedComponent(4);
              setActiveState("Reklam - Anons");
            }}
          >
            <Image style={styles.image} source={AnonsGri} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>Anons</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.imageContainerReklamlar}
            onPress={() => {
              setSelectedComponent(5);
              setActiveState("Reklam - Banner");
            }}
          >
            <Image style={styles.image} source={BannerGri} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>Banner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageContainerReklamlar}
            onPress={() => {
              setSelectedComponent(6);
              setActiveState("Reklam - Alt Yazı");
            }}
          >
            <Image style={styles.image} source={AltyaziGri} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>Altyazı</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const VideoReklam = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(1)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Reklam - Video</Text>
        </View>
      </View>
      <View style={styles.containerMain}>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Video - Yayında");
          }}
        >
          <Image style={styles.image} source={YayindaVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Video - Yayın Bekleyen");
          }}
        >
          <Image style={styles.image} source={YayinBekleyenVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Video - Yayın Biten");
          }}
        >
          <Image style={styles.image} source={YayinBitenVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>YayınBiten</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  const AnonsReklam = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(1)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Reklam - Anons</Text>
        </View>
      </View>
      <View style={styles.containerMain}>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Anons - Yayında");
          }}
        >
          <Image style={styles.image} source={YayindaAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Anons - Yayın Bekleyen");
          }}
        >
          <Image style={styles.image} source={YayinBekleyenAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Anons - Yayın Biten");
          }}
        >
          <Image style={styles.image} source={YayinBitenAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>YayınBiten</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  const BannerReklam = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(1)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Reklam - Banner</Text>
        </View>
      </View>
      <View style={styles.containerMain}>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Banner - Yayında");
          }}
        >
          <Image style={styles.image} source={YayindaBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Banner - Yayın Bekleyen");
          }}
        >
          <Image style={styles.image} source={YayinBekleyenBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Banner - Yayın Biten");
          }}
        >
          <Image style={styles.image} source={YayinBitenBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>YayınBiten</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  const AltyaziReklam = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(1)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Reklam - Alt Yazı</Text>
        </View>
      </View>
      <View style={styles.containerMain}>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Alt Yazı - Yayında");
          }}
        >
          <Image style={styles.image} source={YayindaAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Alt Yazı - Yayın Bekleyen");
          }}
        >
          <Image style={styles.image} source={YayinBekleyenAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainerReklamlar}
          onPress={() => {
            setSelectedComponent(18);
            setActiveState("Reklam - Alt Yazı - Yayın Biten");
          }}
        >
          <Image style={styles.image} source={YayinBitenAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>YayınBiten</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  const YayindaHeader = () => {
    return (
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          marginRight: Math.trunc((WIDTH_WINDOW * 20) / 360),
          marginTop: Math.trunc((WIDTH_WINDOW * 20) / 360),
        }}
      >
        <Image style={[relativeWidthAndHeightForSquare(35), {}]} source={Arama} resizeMode="contain" />
        <Image
          style={[relativeWidthAndHeightForSquare(25), { alignSelf: "center" }]}
          source={Filtrele}
          resizeMode="contain"
        />
      </View>
    );
  };

  const RenderItem = ({ item }) => {
    console.log("item yazılıyor");
    console.log(item);
    return (
      <View style={{ marginTop: 16, marginHorizontal: Math.trunc((WIDTH_WINDOW * 70) / 360) }}>
        <Item setSelectedComponent={setSelectedComponent} activeState={activeState} />
        <Text style={[styles.text, { color: "#6C757D", marginTop: 8 }]}>{item.broadcastable?.name}</Text>
      </View>
    );
  };
  const Listeleme = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity
            onPress={() => {
              switch (activeState) {
                case "Reklam - Video - Yayında":
                  setSelectedComponent(3);
                  return;
                case "Reklam - Video - Yayın Bekleyen":
                  setSelectedComponent(3);
                  return;
                case "Reklam - Video - Yayın Biten":
                  setSelectedComponent(3);
                  return;
                case "Reklam - Anons - Yayında":
                  setSelectedComponent(4);
                  return;
                case "Reklam - Anons - Yayın Bekleyen":
                  setSelectedComponent(4);
                  return;
                case "Reklam - Anons - Yayın Biten":
                  setSelectedComponent(4);
                  return;
                case "Reklam - Banner - Yayında":
                  setSelectedComponent(5);
                  return;
                case "Reklam - Banner - Yayın Bekleyen":
                  setSelectedComponent(5);
                  return;
                case "Reklam - Banner - Yayın Biten":
                  setSelectedComponent(5);
                  return;
                case "Reklam - Alt Yazı - Yayında":
                  setSelectedComponent(6);
                  return;
                case "Reklam - Alt Yazı - Yayın Bekleyen":
                  setSelectedComponent(6);
                  return;
                case "Reklam - Alt Yazı - Yayın Biten":
                  setSelectedComponent(6);
                  return;
                // eslint-disable-next-line no-unused-expressions
                default : null
              }
            }}
          >
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>{activeState}</Text>
        </View>
      </View>

      <View style={{}}>
        <FlatList
          contentContainerStyle={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={streamData}
          ListHeaderComponent={YayindaHeader} // null geçilebilir
          renderItem={RenderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          //  key={1}
        />
      </View>
    </>
  );

  const Yayin = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(0)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Stant - Yayında Olanlar</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={stantData}
          // ListHeaderComponent={headerComponent} // null geçilebilir
          ListFooterComponent={footerComponent}
          renderItem={renderrItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          key={1}
        />
      </View>
    </>
  );

  const BasvurularSelection = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(0)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Stant - Yayın Bekleyen</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={stantData}
          // ListHeaderComponent={headerComponent} // null geçilebilir
          ListFooterComponent={footerComponent}
          renderItem={renderrItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          key={1}
        />
      </View>
    </>
  );

  const BitenStantSelection = () => (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(0)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Stant - Yayını Biten</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={stantData}
          // ListHeaderComponent={headerComponent} // null geçilebilir
          ListFooterComponent={footerComponent}
          renderItem={renderrItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          key={1}
        />
      </View>
    </>
  );

  const renderrItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={[
          item.status !== 4 ? styles.imageContainer : styles.imageContainerDisable,
          { marginHorizontal: 15, marginVertical: 5 },
        ]}
        onPress={() => openStantMenu(item)}
        disabled={item.status === 4}
      >
        <Image
          style={styles.image}
          source={
            {
              1: YayindaIcon,
              2: YayinBitenIcon,
              3: YayinBekleyenIcon,
              4: YayinBekleyenGriIcon,
            }[item.status]
          }
          resizeMode="contain"
        />

        {
          {
            1: <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>,
            2: <Text style={[styles.text, { color: "#FF0000" }]}>Bitti</Text>,
            3: <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>,
            4: <Text style={[styles.text, { color: "#6C757D" }]}>Bekleyen</Text>,
          }[item.status]
        }
        {item.rating && (item.status === 1 || item.status === 2) && (
          <View style={{ position: "absolute", top: 0, right: -22 }}>
            <Image style={styles.ratting} source={RateIcon} resizeMode="contain" />
            <Text
              style={{
                position: "absolute",
                top: 3,
                right: 0,
                left: 0,
                textAlign: "center",
                fontSize: 11,
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              {item.rating}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={[styles.text, { color: "#6C757D", marginBottom: 15 }]}>{item.name}</Text>
    </View>
  );
  const footerComponent = () => {
    if (loading) {
      return <ActivityIndicator color="#00AA9F" size="large" />;
    }
    return null;
  };
  return (
    <View style={{ flex: 1 }}>
      {
        {
          0: <MainSelection />,
          1: <ReklamSelection />,
          2: <BasvurularSelection />,
          3: <VideoReklam />,
          4: <AnonsReklam />,
          5: <BannerReklam />,
          6: <AltyaziReklam />,

          11: <StantMenu item={selectedStantData} setSelectedComponent={setSelectedComponent} />,
          18: <Listeleme />,
          19: (
            <ReklamAltyaziGoster
              activeState={activeState}
              setSelectedComponent={setSelectedComponent}
              listItems={listItems}
              setListItems={setListItems}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
            />
          ),
        }[selectedComponent]
      }
    </View>
  );
};
// ------------------
const ReklamAltyaziGoster = ({activeState, setSelectedComponent, listItems, setListItems, filteredData, setFilteredData}) => {
  const [openList, setOpenList] = useState(false)
  
 // console.log(activeState);
  return (
    <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => setSelectedComponent(18)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>{activeState}</Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 12, flex: 1 }}>
        <View style={styles.containerAltyaziGoster}>
          {/* Row 1 */}
          <View
            style={[
              styles.reklamXGosterRow,
              { flex: 0.5, width: "100%", flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <View style={{ flex: 1 }}>
              <ItemStatusIcon setSelectedComponent={setSelectedComponent} activeState={activeState} />
            </View>
            <View style={{ flex: 5 }}>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting.jpg</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: WIDTH_WINDOW / 10, height: WIDTH_WINDOW / 10 }}
                source={Ucnokta}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Image Row */}
          <View style={[styles.reklamXGosterRow, { width: "100%" }]}>
            <Image
              style={{
                width: "100%",
                // relativeWidthNum(300),
                height: relativeHeightNum(150),
              }}
              source={ExpoExample}
              resizeMode="contain"
            />
          </View>

          {/* Açılır Alan  Row */}
          {/* <View style={styles.acilirAlanRow}>
       <Image
              style={{ width : 30,  height: 30,  }}
              source={ExpoFuarTurkuaz}
              resizeMode="contain"
            />
            
      
       <Image
              style={{ width : 30,
                height: 30, marginHorizontal:10 }}
              source={DownArrow}
              resizeMode="contain"
            />
       </View>  */}

          {/* FlatList ile Açılır Alan  Row */}
          <View
            style={[styles.flatList, openList ? { height: relativeHeightNum(160) } : { height: relativeHeightNum(50) }]}
          >
            <FlatList
              data={filteredData} // listItems
              //   onEndReached={() => getData()} bu method ana componentte active state e uygun get methodunu çağıracak
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => setOpenList(false)}>
                  <View>
                    <Text>{item.value}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ListHeaderComponent={
                <SearchAndFilterReklamComponant
                  setListItems={setListItems}
                  listItems={listItems}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  setOpenList={setOpenList}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/* Rounds */}
          <RoundsRowComponent activeState={activeState} />

          {/* Boxes     */}
          <BoxesComponent activeState={activeState} />
          {/* Buton   */}
          <View style={[styles.butonRow, {}]}>
            <Text style={{ fontSize: 15, color: "#FFFFFF" }}>Yayınla</Text>
          </View>
        </View>
      </View>
    </>
  );
};
const Item = ({ setSelectedComponent, activeState }) => {
  switch (activeState) {
    case "Reklam - Video - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Video - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Video - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    default:
      return null;
  }
};
const ItemStatus = ({ setSelectedComponent, activeState }) => {
  switch (activeState) {
    case "Reklam - Video - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Video - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Video - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenVideo} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenAnons} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenBayrak} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayindaAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBekleyenAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerReklamlar} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.image} source={YayinBitenAltyazi} resizeMode="contain" />
          <Text style={[styles.text, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    default:
      return null;
  }
};
const ItemStatusIcon = ({ setSelectedComponent, activeState }) => {
  switch (activeState) {
    case "Reklam - Video - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayindaVideo} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Video - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBekleyenVideo} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Video - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBitenVideo} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayindaAnons} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBekleyenAnons} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Anons - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBitenAnons} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayindaBayrak} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBekleyenBayrak} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Banner - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBitenBayrak} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayında":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayindaAltyazi} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#26A94A" }]}>Yayında</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayın Bekleyen":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBekleyenAltyazi} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#1BA3B9" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
      );
    case "Reklam - Alt Yazı - Yayın Biten":
      return (
        <TouchableOpacity style={styles.imageContainerIcon} onPress={() => setSelectedComponent(19)}>
          <Image style={styles.imageIcon} source={YayinBitenAltyazi} resizeMode="contain" />
          <Text style={[styles.textIcon, { color: "#ED2024" }]}>Yayın Biten</Text>
        </TouchableOpacity>
      );
    default:
      return null;
  }
};
const RoundsRowComponent = ({ activeState }) => {
  if (
    activeState === "Reklam - Banner - Yayında" ||
    activeState === "Reklam - Banner - Yayın Bekleyen" ||
    activeState === "Reklam - Banner - Yayın Biten"
  ) {
    return (
      <View style={styles.roundsRow}>
        <View style={styles.bigRound}>
          <Text style={{ color: "#00AA9F", fontSize: 12 }}>Banner Yayın Saati 1 Gün</Text>
          <Text style={styles.roundText}>Başlangıç : 11:00 - Bitiş : 11:00</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.roundsRow}>
      <View style={styles.round}>
        <Text style={{ color: "#00AA9F", fontSize: 12 }}>1.Yayın</Text>
        <Text style={styles.roundText}>11:00-19:00</Text>
      </View>
      <View style={styles.round}>
        <Text style={{ color: "#00AA9F", fontSize: 12 }}>2.Yayın</Text>
        <Text style={styles.roundText}>20:00-04:00</Text>
      </View>
      <View style={styles.round}>
        <Text style={{ color: "#00AA9F", fontSize: 12 }}>3.Yayın</Text>
        <Text style={styles.roundText}>04:00-11:00</Text>
      </View>
    </View>
  );
};
const BoxesComponent = ({ activeState }) => {
  return (
    <View style={[styles.boxRow, {}]}>
      <View style={styles.box}>
        <Image style={{ width: 30, height: 30 }} source={Grup} resizeMode="contain" />
        <Text style={styles.boxText}>123456</Text>
      </View>
      {activeState === "Reklam - Alt Yazı - Yayında" ||
      activeState === "Reklam - Alt Yazı - Yayın Bekleyen" ||
      activeState === "Reklam - Alt Yazı - Yayın Biten" ? (
        <View style={styles.box}>
          <Image style={{ width: 30, height: 30 }} source={Etkilesim} resizeMode="contain" />
          <Text style={styles.boxText}>123456</Text>
        </View>
      ) : null}
      <View style={styles.box}>
        <Image style={{ width: 30, height: 30 }} source={OzelSalonTurkuaz} resizeMode="contain" />
        <Text style={styles.boxText}>123456</Text>
      </View>
      <View style={styles.box}>
        <Image style={{ width: 30, height: 30 }} source={VexPoint} resizeMode="contain" />
        <Text style={styles.boxText}>123456</Text>
      </View>
    </View>
  );
};
export default Reklam;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerAltyaziGoster: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerReklamlar: {
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: Math.trunc((WIDTH_WINDOW * 15) / 360),
    marginVertical: Math.trunc((HEIGHT_WINDOW * 50) / 360),
    // alignItems: "center",
  },
  imageContainerMain: {
    width: WIDTH_WINDOW / 2,
    height: WIDTH_WINDOW / 2,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    justifyContent: "center",
    elevation: 6,
  },
  imageContainerReklamlar: {
    width: WIDTH_WINDOW / 3,
    height: WIDTH_WINDOW / 3,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 6,
  },
  imageContainerIcon: {
    width: WIDTH_WINDOW / 12,
    height: WIDTH_WINDOW / 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignSelf: "center",
  },
  imageContainerDisable: {
    width: WIDTH_WINDOW / 3,
    height: WIDTH_WINDOW / 3,
    backgroundColor: "#c1c1c1",
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    justifyContent: "center",
    elevation: 6,
  },
  image: {
    width: "60%",
    height: "60%",
    alignSelf: "center",
  },
  imageIcon: {
    width: WIDTH_WINDOW / 14,
    height: WIDTH_WINDOW / 14,
    alignSelf: "center",
  },
  ratting: {
    width: WIDTH_WINDOW / 8,
    height: WIDTH_WINDOW / 8,
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 10,
  },
  textIcon: {
    alignSelf: "center",
    fontSize: 5,
  },

  headFrame: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reklamXGosterRow: {
    // marginTop:10,
    alignItems: "center",
  },
  boxRow: {
    // marginTop:10,
    alignItems: "center",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  butonRow: {
    // marginTop:10,
    alignItems: "center",
    backgroundColor: "#00AA9F",
    height: relativeHeightNum(35),
    width: "100%",
    justifyContent: "center",
    marginBottom: 40,
  },
  roundsRow: {
    // marginTop:10,
    alignItems: "center",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // eslint-disable-next-line react-native/no-unused-styles
  acilirAlanRow: {
    marginTop: 10,
    alignItems: "center",
    height: relativeHeightNum(40),
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    elevation: 6,
  },
  box: {
    width: relativeWidthNum(60),
    height: relativeWidthNum(60),
    borderColor: "#707070",
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  round: {
    width: relativeWidthNum(90),
    height: relativeHeightNum(60),
    borderColor: "#707070",
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  bigRound: {
    width: relativeWidthNum(300),
    height: relativeHeightNum(60),
    borderColor: "#707070",
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  boxText: {
    color: "#6C757D",
    fontSize: 10,
  },
  roundText: {
    color: "#6C757D",
    fontSize: 12,
  },
  flatList: {
    width: "100%",
  },
});
