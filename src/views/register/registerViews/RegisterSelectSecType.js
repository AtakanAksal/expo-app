/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";
import { useRegisterValue } from "../../../contexts/RegisterContext";
import { useGetSectors, useGetJobs } from "../../../helpers/registerConnection";

import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../components/mainLogo/MainLogo";

import StylesRegister from "../StylesRegister";

import BtnMain from "../../../components/btnMain/BtnMain";
import BackgroundImage from "../../../../assets/register_background.jpg";
import DownIcon from "../../../../assets/down-icon.png";
import TicariBilgilendirmeModal from "./TicariBilgilendirmeModal";
import Info from "../../../../assets/register/info-yeni.png";
import SektorDigerModal from "../registerComponents/SektorDigerModal";

const RegisterSelectSecType = () => {
  const [selectedType, setSelectedType] = useState(0);

  const [selectedJob, setSelectedJob] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const [{ register }, dispatch] = useRegisterValue();
  const { data, isLoading, isError } = useGetSectors();
  // eslint-disable-next-line prefer-const
  let tempData;
  if (!(isLoading || isError)) {
    // console.log("data", data);
    tempData = Object.values(data);
    // console.log(data.length);
    tempData.push({ id: data.length + 1, name: "DİĞER" });

    //  console.log("tempDta", tempData);
  }

  // const { data2, isLoading2, isError2 } = useGetJobs();

  const nav = useNavigation();

  useEffect(() => {
    setSelectedIndex([])
    if (selectedType === data?.length + 1) {
      setModalVisible(true);
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedType === 0||selectedIndex.length===0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [selectedType, selectedIndex]);

  const selectType = () => {
    //   // seçiniz : 0,  Bireysel :1,  Ticari: 2, Kamu :3, Stk :4
    dispatch({
      type: "changeRegister",
      newRegister: {
        sector_id: selectedType.id,
        sector_job_id: selectedIndex,
      },
    });

    if (register.countryId === 212) {
      nav.navigate("Bireysel2Adress");
    } else {
      nav.navigate("Yabanci2Adress");
    }
  };
  console.log("selectedType  sector:  ", selectedType);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={BackgroundImage}
    >
      <View style={StylesRegister.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />

        <MainLogo />

        <Text style={StylesRegister.mainText}>Sektör ve Faaliyet Seçin</Text>
        {/* Sektör Seçimi */}
        <View style={selectedType === 0 ? StylesRegister.pickerContainer : StylesRegister.pickerContainerSelected }>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedType(itemValue);
            }}
            mode="dialog"
            style={StylesRegister.picker}
          >
            <Picker.Item label="Sektör" value="seciniz" enable={false} />
            {!(isLoading || isError) &&
              tempData.map((el, i) => {
                // console.log(el);
                return (
                  <Picker.Item key={el.id} label={el.name} value={el.id} />
                );
              })}
          </Picker>
        </View>

        {/* Faaliyet alanı (JobType) seçimi */}
        <View style={{ justifyContent: "center", alignItems: "center", marginTop:relativeHeightNum(20) }}>
          {selectedType !== data?.length + 1 && selectedType !== 0 && (
            <JobPickerHolder
              id={selectedType}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
            />
          )}
        </View>

        <BtnMain
          buttonDisabled={buttonDisabled}
          onPress={() => selectType()}
          txt="Kaydet ve İlerle"
        />

        {/*  TicariBilgilendirmeModal                                   */}
        <View>
          <Modal
            transparent
            animationType="fade"
            visible={modalOpenState}
            onRequestClose={() => {
              setModalOpenState(false);
            }}
          >
            <TicariBilgilendirmeModal setModalOpenState={setModalOpenState} />
          </Modal>
        </View>

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <SektorDigerModal setModalVisible={setModalVisible} />
        </Modal>
      </View>
    </ImageBackground>
  );
};

const JobPickerHolder = ({ id, setSelectedIndex, selectedIndex }) => {
  const { data, isLoading, isError } = useGetJobs(id);
  const [selectedType, setSelectedType] = useState(0);
 
  console.log(selectedIndex);
  // console.log(data);
  const [openList, setOpenList] = useState(false);
  // console.log("selectedType", selectedType);

  const ItemView = ({ item, index }) => {
    const [sozlesmeChecked, setSozlesmeChecked] = useState(false);
    // const valueChange = (check) => {
    //   setSozlesmeChecked(check);
    //   if (!sozlesmeChecked) {
    //     addItem()
    //     console.log("ekledi");
    //   }
    //   // removeItem()
    //   else console.log("çıkardı");
    // };
    // const addItem = () => {
    //   setChoosenObjects((prev) => [...prev, { id: item.id, name: item.name }]);
    // };
    // const removeItem = () => {
    //   setChoosenObjects((prevArray) =>
    //     prevArray.filter((l) => l.id !== item.id)
    //   );
    // };

    return (
      <View style={StylesRegister.jobListItem}>
        <Text style={{ fontSize: 12, color: "#6C757D" }}>{item.name.substring(0, 22)}</Text>
        <>
          <CheckBox
            tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
            disabled={false}
            value={selectedIndex.includes(index)}
            onValueChange={() => {
              setSelectedIndex((prevArray) => {
                // console.log("setSelectedIndex render");
                if (prevArray.includes(index)) {
                  return prevArray.filter((itm) => itm !== index);
                }
                return [...prevArray, index];
              });
            }}
          />
        </>
      </View>
    );
  };

  return (
    <View style={openList ? StylesRegister.jobListView : null}>
      {/* <Picker
      selectedValue={selectedType}
      onValueChange={(itemValue) =>{ setSelectedType(itemValue); setSelectedJob(itemValue) }}
      mode="dialog"
      style={StylesRegister.picker}
    >
      <Picker.Item label="Faaliyet" value="seciniz" enable={false} /> */}

      <TouchableOpacity
        style={
          !openList
            ? StylesRegister.jobPicker
            : StylesRegister.jobPickerDisabled
        }
        onPress={() => {
          setOpenList((prev) => !prev);
        }}
      >
        <Text style={{ fontSize: 12, color: "#6C757D" }}>
          Faaliyet Alanınızı Seçin
        </Text>
        <Image
          style={{ width: 25, height: 25 }}
          resizeMode="contain"
          source={DownIcon}
        />
      </TouchableOpacity>
      {/* (selectedType!== data?.length+1 )&& selectedType!==0 ) */}
      {!(isLoading || isError) && openList && (
        //   data.map((el) => {
        //  return <Picker.Item key={el.id} label={el.name} value={el} />
        //   })

        <FlatList
          data={data} //  dummyArray
          renderItem={({ item, index }) => <ItemView item={item} index={index} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* </Picker> */}
    </View>
  );
};

export default RegisterSelectSecType;
