import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";

import {
  Select,
  VStack,
  CheckIcon,
  Center,
  NativeBaseProvider,
} from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useAnalyticValue,

} from "../../../../../../contexts/AnalyticContext";
import Raporlar from "../../../../../../../assets/stant/menu/raporlar.png";
import Erisim from "../../../../../../../assets/stant/menu/analitik/erisim.png";
import Filter from "../../../../../../../assets/vexmail/filtrele.png";
import Indir from "../../../../../../../assets/stant/menu/analitik/indir-yeni.png";
import MainHeader from "../../../../MainHeader";
import StantInfoHeader from "../../StantInfoHeader";
// import all basic components
import ExpoPieChart from "./ExpoPieChart";
import ExpoBarChart from "./ExpoBarChart";
import Liste from "./Liste";
import Charts from "./Charts";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../../../utils/HelperFunctions";
import { useUserValue } from "../../../../../../contexts/UserContext";
import {
  fetchGetWithId,
  fetchAllVisitorWithPage,
} from "../../../../../../helpers/analiticConnection";
import { defineCodeFullName, defineCountName, headerDefiner } from "./utils";
import FilterComponent from "./FilterComponent";
import FilterHeader from "./FilterHeader";


const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const Analitik = ({ stantItem, setSelectedMenuItem }) => {
  const [analaticState, setAnalaticState] = useState("Ülke");
  // const [filterState, setFilterState] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterScreenOn, setFilterScreenOn] = useState(false)

  const [{ analyticStream, filter }, dispatch] = useAnalyticValue();

  const [streamData, setStreamData] = useState([]);
  // const [filteredStreamData, setFilteredStreamData] = useState([])

  const [loading, setLoading] = useState(true);
  // const [service, setService] = useState("Ülke")

  const [{ user }] = useUserValue();
  // eslint-disable-next-line no-undef
  const postData = new FormData();

  useEffect(() => {
    setLoading(true)
   
   fetchData();
  }, [analaticState, filterScreenOn]);

  const fetchData = async () => {
  console.log(filter);
   // postData.append()
   console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
   console.log(filter.countryStats);
   postData.append("countryStats", filter.countryStats);
   postData.append("sectorStats", filter.sectorStats);
   postData.append("accountStats", filter.accountStats);
   postData.append("genderStats", filter.genderStats);
    postData.append("tab", "product");

    await fetchGetWithId(postData, user.token)
      .then((res) => {
        // dispatch({
        //   type: "addAnalyticStream",
        //   // xAnalyticStream: { ulke_data: res?.ulke, sektor_data: res?.sectors, kullanicituru_data: res?.accountTypeAll, cinsiyet_data: res?.cinsiyetAll},
        //   xAnalyticStream: {
        //     ulke_analytic: res?.ulke,
        //     sektor_analytic: res?.sectors,
        //     kullanicituru_analytic: res?.accountTypeAll,
        //     cinsiyet_analytic: res?.cinsiyetAll,
        //   },
        // });
        console.log(res);
        if (analaticState === "Ülke") {
          setStreamData(res?.ulke);
        }
        if (analaticState === "Sektör") {
          console.log("çalıştı");
          setStreamData(res?.sectors);
        }
        if (analaticState === "KullanıcıTürü") {
          setStreamData(res?.accountTypeAll);
        }
        if (analaticState === "Cinsiyet") {
          setStreamData(res?.cinsiyetAll);
        }
        // setFilterState("");
        setLoading(false);
       
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

 
  

  const LoadingComponent = () => {
    if (loading) {
      return <ActivityIndicator color="#00AA9F" size="large" />;
    }
    return null;
  };

  const DropDownComp = () => {
    return (
      <View style={{ height: relativeHeightNum(40), marginTop: 20 }}>
        <NativeBaseProvider>
          <VStack alignItems="center" space={4}>
            <Select
              selectedValue={analaticState}
              minWidth="220"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "#00AA9F",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setLoading(true);
                setAnalaticState(itemValue);
              }}
              color="#00AA9F"
            >
              <Select.Item label="Ülkeye Göre Analitik" value="Ülke" />
              <Select.Item label="Sektöre Göre Analitik" value="Sektör" />
              <Select.Item label="Etkileşime Göre Analitik" value="Etkileşim" />
              <Select.Item label="Güne Göre Analitik" value="Gün" />
              <Select.Item
                label="Kullanıcı Türüne Göre Analitik"
                value="KullanıcıTürü"
              />
              <Select.Item label="Cinsiyet Göre Analitik" value="Cinsiyet" />
            </Select>
          </VStack>
        </NativeBaseProvider>
      </View>
    );
  };
  const ErisimComponent = () => {
    const code = defineCountName(analaticState);
    const defineNumber = () => {
      if(isFiltered)return(streamData[0]?.[code])
      return(streamData[0]?.[code])
    }
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: relativeHeightNum(20),
        }}
      >
        <Image
          style={{
            height: relativeWidthNum(30),
            width: relativeWidthNum(30),
            marginRight: 10,
          }}
          source={Erisim}
          resizeMode="contain"
        />

        <View style={{ backgroundColor: "#00AA9F", paddingHorizontal: 5 }}>
          <Text style={{ color: "white", fontSize: 15 }}>
            {defineNumber()  } 
          </Text>
        </View>
      </View>
    );
  };

  const Main = () => {
    return (
      <View style={styles.mainFrame}>
        <MainHeader
          text="Analitik"
          backBtnFunction={() => setSelectedMenuItem(0)}
        />
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StantInfoHeader stant={stantItem} />
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsFiltered(true)
                setFilterScreenOn(true)
             //   setFilterState(headerDefiner(analaticState));
              }}
            >
              <Image
                style={{
                  height: relativeWidthNum(25),
                  width: relativeWidthNum(25),
                  marginRight: 10,
                }}
                source={Filter}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                
              }}
            >
              <Image
                style={{
                  height: relativeWidthNum(25),
                  width: relativeWidthNum(25),
                  marginRight: 10,
                }}
                source={Indir}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <DropDownComp />
          <ErisimComponent />
          {
            {
              Ülke: !loading && (
                <Charts
                  isFiltered={isFiltered}
                  analaticState={analaticState}
                  streamData={streamData}
                />
              ),
              Sektör: !loading && (
                <Charts
                  isFiltered={isFiltered}
                  analaticState={analaticState}                 
                  streamData={streamData}
                />
              ),
              Etkileşim: !loading && (
                <Charts
                  isFiltered={isFiltered}
                  analaticState={analaticState}                 
                  streamData={streamData}
                />
              ),
              Gün: !loading && (
                <Charts
                  isFiltered={isFiltered}
                  analaticState={analaticState}                 
                  streamData={streamData}
                />
              ),
              KullanıcıTürü : !loading && (
                <Charts
                  isFiltered={isFiltered}
                  analaticState={analaticState}                
                  streamData={streamData}
                />
              ),
              Cinsiyet: !loading && (
                <Charts
                  isFiltered={isFiltered}
                  analaticState={analaticState}                  
                  streamData={streamData}
                />
              ),
            }[analaticState]
          }
          <LoadingComponent />

          
        </View>
      </View>
    );
  };


  if (filterScreenOn) {
    return (
      <View style={styles.mainFrame}>
        {/* <Text>{analyticStream.ulke_data}</Text> */}
        <FilterHeader
          text={headerDefiner(analaticState)}
          backBtnFunction={() => {setIsFiltered(false); setFilterScreenOn(false)}}
        />
        <FilterComponent        
          analaticState={analaticState}
          streamData={streamData}         
          setFilterScreenOn={setFilterScreenOn}
          setLoading={setLoading}
          setIsFiltered={setIsFiltered}
        />
      </View>
    );
  }
  return <Main />;
};

export default Analitik;
const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
  },
  
  // eslint-disable-next-line react-native/no-unused-styles
  bildirimCardTextNumber: {
    color: "#00AA9F",
    fontSize: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  headerText: {
    fontSize: 15,
    color: "#00AA9F",
    marginBottom: relativeHeightNum(24),
  },
});