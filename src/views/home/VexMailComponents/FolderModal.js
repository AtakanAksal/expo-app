/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableHighlight,
  TextInput,
  RefreshControl,
  ActivityIndicator
} from "react-native";

import Geri from "../../../../assets/forgotpass/go-back-black.png";
import Ekle from "../../../../assets/vexmail/ekle.png";
import Arama from "../../../../assets/vexmail/arama.png";
import Klasor from "../../../../assets/vexmail/klasor.png";
import IcerikAc from "../../../../assets/vexmail/icerik-ac.png";
import IcerikKapa from "../../../../assets/vexmail/icerik-kapa.png";
import UcNokta from "../../../../assets/vexmail/uc-nokta.png";
import Attach from "../../../../assets/vexmail/attach.png";
import {
  postAddNewFolder,
  postGetFolders,
} from "../../../helpers/mailConnection";
import { useUserValue } from "../../../contexts/UserContext";


const ekran = Dimensions.get("screen");
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const FolderModal = ({ setModalOpenState }) => {
  const [ccOpen, setCcOpen] = useState(false);
  const [bccOpen, setBccOpen] = useState(false);
  const [mailToProfilArray, setMailToProfilArray] = useState([]);
  const [ccProfilArray, setCcProfilArray] = useState([]);
  const [bccProfilArray, setBccProfilArray] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [writedTextNewFolder, setWritedTextNewFolder] = useState("");
  const [writedTextFolderSearch, setWritedTextFolderSearch] = useState("");
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [mailFolders, setMailFolders] = useState([]);
  const [refresing, setRefresing] = useState(false);
  const postData = new FormData();
  const [{ user }] = useUserValue();
  const [refreshing, setRefreshing] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [writedTextSearch, setWritedTextSearch] = useState("");
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    conGetFolders();
  }, []);

  const  refreshPage =() => {
    setMailFolders([]); // eski datayı sıfırla   
    conGetFolders();
     setRefreshing(true); // reefreshle
  //   setRefreshing(false); // refreshi bitir


  }

  const dummyArray = [
    { id: "1", value: "A" },
    { id: "2", value: "B" },
    { id: "3", value: "C" },
    { id: "4", value: "D" },
    { id: "5", value: "E" },
    { id: "6", value: "F" },
    { id: "7", value: "G" },
    { id: "8", value: "H" },
    { id: "9", value: "I" },
    { id: "10", value: "J" },
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
  const conPostAddNewFolder = async () => {
    postData.append("name", writedTextNewFolder);
    await postAddNewFolder(postData, user.token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const conGetFolders = async () => {
    postData.append("search", "");
    await postGetFolders(postData, user.token)
      .then((res) => {
        setIsFetching(false);
        console.log(res);
        setMailFolders((prevState) => [...prevState, ...res?.mail_folders]);
      })
      .catch((err) => console.log(err));
  };
  const conSearchText = async (text) => {
   console.log("-----------");

   console.log(text);
    postData.append("search", text);
    await postGetFolders(postData, user.token)
      .then((res) => {
        setIsFetching(false);
        console.log(res);
        setMailFolders(res?.mail_folders);
      })
      .catch((err) => console.log(err));
  };
  const renderItem = ({ item }) => (
    <Item title={item.name} folderMailList={item.mailuserdetails} />
  );

  const addTobccProfilArray = () => {
    setBccProfilArray([...bccProfilArray, { id: "1", name: "Emre Emreoğlu" }]);
  };
 
  const handleRemoteSearch = (text) => {
    console.log("handleRemoteSearch calisti");
    console.log(text);
   /// setWritedText(text);
    if (text !== "") {
      conSearchText(text);
    }else {
      // setFilteredData(listItems);
    }
      
  }
  const HeaderText = () => {
    if (!searchActive)
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setModalOpenState("off")}>
            <Image
              style={{ height: 45, width: 45 }}
              source={Geri}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ color: "#00AA9F", fontSize: 15 }}>
            VexMail Klasör Liste
          </Text>
        </View>
      );

    
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setSearchActive(false)}>
          <Image
            style={{ height: 45, width: 45 }}
            source={Geri}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TextInput placeholder="Ara"
         onChangeText={(txt) =>{ handleRemoteSearch(txt)}}
         value= {writedTextSearch}
         />
      </View>
    );
  };
  const BackComponent = () => {
    return (
      <View style={styles.back}>
        <HeaderText />
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 14 }}>
            <TouchableOpacity onPress={() => setSearchActive(true)}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={Arama}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 14 }}>
            <TouchableOpacity onPress={() => setNewFolderOpen(true)}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={Ekle}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const openEmail = (item) => {
    // Function for click on an item
    // eslint-disable-next-line prefer-template
    alert("Id : " + item.id + " Value : " + item.value);
  };
  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity
        style={styles.innerItem}
        onPress={() => openEmail(item)}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flex: 6, justifyContent: "center", marginHorizontal: 15 }}
          >
            <Text
              style={{ color: "#6C757D", fontWeight: "bold", fontSize: 12 }}
            >
              Emre Emreoğlu
            </Text>
            <Text style={{ color: "#6C757D", fontSize: 6 }}>
              10.06.2021 - 18:00
            </Text>
            <Text style={{ color: "#6C757D", fontSize: 12 }}>
              Lorem Ipsum is simply dummy text of the
            </Text>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ height: 16, width: 16 }}
                source={Attach}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Image
                style={{ height: 16, width: 16 }}
                source={UcNokta}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const DATA = [
    {
      id: "1",
      title: "Deneme Klasör 1",
    },
    {
      id: "2",
      title: "Deneme Klasör 2",
    },
    {
      id: "3",
      title: "Deneme Klasör 3",
    },
    {
      id: "4",
      title: "Deneme Klasör 4",
    },
    {
      id: "5",
      title: "Deneme Klasör 5",
    },
    {
      id: "6",
      title: "Deneme Klasör 6",
    },
    {
      id: "7",
      title: "Deneme Klasör 7",
    },
    {
      id: "8",
      title: "Deneme Klasör 8",
    },
    {
      id: "9",
      title: "Deneme Klasör 9",
    },
    {
      id: "10",
      title: "Deneme Klasör 10",
    },
  ];

  const Item = ({ title, folderMailList }) => {
    const [open, setopen] = useState(false);
    const onPress = () => {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setopen(!open);
    };
    return (
      <TouchableOpacity
        style={[styles.item, !open && { height: 40 }]}
        onPress={onPress}
        activeOpacity={1}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            paddingVertical: 11,
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Image
              style={{ height: 25, width: 25 }}
              source={Klasor}
              resizeMode="contain"
            />
            <Text style={{ marginLeft: 15, color: "#00AA9F" }}>{title}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {!open && (
              <Image
                style={{ height: 25, width: 25 }}
                source={IcerikAc}
                resizeMode="contain"
              />
            )}
            {open && (
              <Image
                style={{ height: 25, width: 25 }}
                source={IcerikKapa}
                resizeMode="contain"
              />
            )}
            <Image
              style={{ height: 25, width: 25, marginLeft: 8 }}
              source={UcNokta}
              resizeMode="contain"
            />
          </View>
        </View>
        {open && (
          <View style={{ flex: 1, flexGrow: 1 }}>
            <FlatList
              data={folderMailList}
              // Item Separator View
              renderItem={ItemView}
              keyExtractor={(item) => item.id}
              // ListHeaderComponent={headerComponent}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  const onRefresh = () => {
    setIsFetching(true);
    conGetFolders();
  };

  return (
    <SafeAreaView style={styles.mainFrame}>
      <BackComponent />
      <View style={styles.body}>
        {newFolderOpen && (
          <NewFolder
            setWritedTextNewFolder={setWritedTextNewFolder}
            writedTextNewFolder={writedTextNewFolder}
            conPostAddNewFolder={conPostAddNewFolder}
            conGetFolders={conGetFolders}
            setMailFolders={setMailFolders}
            setRefresing={setRefresing}
            refreshPage= {refreshPage}
            setIsFetching={setIsFetching}
          />
        )}
        <View style={styles.listingArea}>
        {refreshing ? <ActivityIndicator /> : null}
          <FlatList
            data={mailFolders}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onRefresh ={onRefresh}
            refreshing={isFetching}           
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={conGetFolders} />
            // }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FolderModal;

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
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
  body: {
    margin: 5,
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    borderColor: "#eeeeee",
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

  item: {
    marginBottom: 5,
    //  flex: 1,
    // height:HEIGHT/9.15,
    backgroundColor: "white",
    borderColor: "#6C757D",
    borderWidth: 0.2,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  title: {
    fontSize: 32,
  },
  listingArea: {
    marginHorizontal: 10,
    flexGrow: 1,
    marginBottom:20
  },
  innerItem: {
    marginBottom: 15,
    flex: 1,
    height: HEIGHT / 9.15,
    width: WIDTH - 50,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  newFolder: {
    height: 40,
    flexGrow: 1,
    borderWidth: 0.2,
    borderColor: "gray",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

const NewFolder = ({
  writedTextNewFolder,
  setWritedTextNewFolder,
  conPostAddNewFolder,
  conGetFolders,
  setMailFolders,
  setRefresing,
  refreshPage,
  setIsFetching
}) => {
  const addNewFolder = () => {
    setMailFolders([]);   
    conPostAddNewFolder();
    setWritedTextNewFolder("");
    setIsFetching(true)
    conGetFolders();
    setIsFetching(false)
   // refreshPage();
  //  setRefresing(true)
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.newFolder}>
        <TextInput
          style={{ flex: 1, marginHorizontal: 10 }}
          onChangeText={(txt) => {
            setWritedTextNewFolder(txt);
          }}
          placeholder="Klasör adı giriniz"
          value={writedTextNewFolder}
          onBlur={() => {}}
        />
      </View>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          addNewFolder();
        }}
      >
        <Text style={{ color: "#00AA9F" }}>Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
};
