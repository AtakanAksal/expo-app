/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView, 
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ImageBackground
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { useUserValue } from "../../contexts/UserContext";
import RequestResponse from "../tests/RequestResponse";
import Arama from "../../../assets/vexmail/arama.png";
import GelenMail from "../../../assets/vexmail/gelen-mail.png";
import GonderilenMail from "../../../assets/vexmail/gonderilen-mail.png";
import Klasor from "../../../assets/vexmail/klasor.png";
import Imza from "../../../assets/vexmail/imza.png";
import Attach from "../../../assets/vexmail/attach.png";
import Ucnokta from "../../../assets/vexmail/uc-nokta.png";
import Geri from "../../../assets/forgotpass/go-back-black.png";
import YeniMail from "../../../assets/vexmail/yeni-mail-b.png";
import NewMailModal from "./vexMailComponents/NewMailModal";
import ReceivedMailModal from "./vexMailComponents/ReceivedMailModal";
import SentMailModal from "./vexMailComponents/SentMailModal";
import FolderModal from "./vexMailComponents/FolderModal";
import ProfilModal from "./vexMailComponents/ProfilModal";
import SignatureModal from "./vexMailComponents/SignatureModal";
import AttachedFilesModal from "./vexMailComponents/AttachedFilesModal";
import { postReceivedMail, postSentMail } from "../../helpers/mailConnection";
import { relativeHeightNum, relativeWidthNum } from "../../utils/HelperFunctions";
import UcNoktaModal from "./vexMailComponents/UcNoktaModal";
import ItemView from "./vexMailComponents/ItemView";


const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const VexMail = () => {
  const [activeState, setActiveState] = useState("cardMenu");
  const [activeItem, setActiveItem] = useState(null);
  const [listItems, setListItems] = useState(dummyArray);
  // const [backButtonVisible, setBackButtonVisible] = useState(false);
  // const [newMailModalOpen, setNewMailModalOpen] = useState(false);
  // const [receivedMailModalOpen, setReceivedMailModalOpen] = useState(false);
  // const [sentMailModalOpen, setSentMailModalOpen] = useState(false);
  // const [folderModalOpen, setFolderModalOpen] = useState(false);
  // const [profilModalOpen, setProfilModalOpen] = useState(false);
  // const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  // const [attachedFilesModalOpen, setAttachedFilesModalOpen] = useState(false);
  const [modalOpenState, setModalOpenState] = useState("off");
  
  const [{ user }] = useUserValue();

  // const [streamReceivedData, setReceivedStreamData] = useState([]);
  // const [streamSentData, setStreamSentData] = useState([]);
  const [streamData, setStreamData] = useState([]);
  const postData = new FormData();


  useEffect(() => {
    clearStreamData();
    getReceivedMailData();
  }, []);

  const clearStreamData = () => {
    console.log("silme calisti.................................................");
    setStreamData([]);
  };
  const getReceivedMailData = () => {
    //  setLoading(true);
    // postData.append("main_type", type); //
    postData.append("is_read", true);
    postData.append("order", "desc");
    postData.append("search", "");
    postData.append("type", null);
    postData.append("page", 1);

    postReceivedMail(postData, user.token)
      .then((res) => {
        // console.log("-----------------------------------------------------------------------------------------------------------------");
        // console.log(res?.data.data);
        // console.log("-----------------------------------------------------------------------------------------------------------------");
        // console.log(res);
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData((prevState) => [...prevState, ...res?.data.data]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const getSentMailData = () => {
    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("is_read", true);
    postData.append("order", "desc");
    postData.append("search", "");
    postData.append("type", 1);
    postData.append("page", 1);
    console.log(
      "streamData icerigi ..........................................................................................."
    );
    // console.log(streamData);
    postSentMail(postData, user.token)
      .then((res) => {
        // console.log("-----------------------------------------------------------------------------------------------------------------");
        // console.log(res?.data.data);
        // console.log("-----------------------------------------------------------------------------------------------------------------");
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData((prevState) => [...prevState, ...res?.data.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
 

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
  const headerComponent = () => {
    if (
      activeState === "cardMenu" ||
      activeState === "folder" ||
      activeState === "sign" ||
      activeState === "search" ||
      activeState === "newMail"
    ) {
      return <CardMenu />;
    }
    return <AramaComponent />;
  };
  const AramaComponent = () => {
    return (
      <View style={styles.headerComponent}>
        <Image style={styles.menuItemImg} source={Arama} resizeMode="contain" />
        <TextInput placeholder="Arama" />
      </View>
    );
  };

  const openEmail = (item) => {
    // Function for click on an item
    setActiveItem(item)
    // eslint-disable-next-line prefer-template
    //  alert('Id : ' + item.id + ' Value : ' + item.value);
    if (activeState === "inbox" || activeState === "cardMenu") {
      setModalOpenState("ReceivedMailModal")         // setReceivedMailModalOpen(true);
    } else if (activeState === "outbox") {
      setModalOpenState("SentMailModal")               // setSentMailModalOpen(true);
    }
  };

  // Activation with Card Menu
  const activateInbox = () => {
    clearStreamData();

    // console.log("----- *** ---- ");
    // console.log(streamData);
    getReceivedMailData();
    setActiveState("inbox");
  };
  const activateOutbox = () => {
    clearStreamData();
    getSentMailData();
    setActiveState("outbox");
  };
  const activateFolder = () => {
    setActiveState("folder");
    setModalOpenState("FolderModal")              // setFolderModalOpen(true);
  };
  const activateSignature = () => {
    setActiveState("sign");
    setModalOpenState("SignatureModal")           // setSignatureModalOpen(true);
  };
  const activateSearch = () => {
    setActiveState("search");
    setModalOpenState("AttachedFilesModal")       // setAttachedFilesModalOpen(true);
  };
  const activateNewMail = () => {
    setActiveState("newMail");
    setModalOpenState("NewMailModal");
  };

  // Menu
  const CardMenu = () => {
    return (
      <View style={styles.butonArea}>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateInbox()}>
          <Image style={styles.menuItemImg} source={GelenMail} resizeMode="contain" />
          <Text style={styles.cardText}>Gelen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateOutbox()}>
          <Image style={styles.menuItemImg} source={GonderilenMail} resizeMode="contain" />
          <Text style={styles.cardText}>Gönderilen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateFolder()}>
          <Image style={styles.menuItemImg} source={Klasor} resizeMode="contain" />
          <Text style={styles.cardText}>Klasör</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateSignature()}>
          <Image style={styles.menuItemImg} source={Imza} resizeMode="contain" />
          <Text style={styles.cardText}>İmza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateSearch()}>
          <Image style={styles.menuItemImg} source={Arama} resizeMode="contain" />
          <Text style={styles.cardText}>Arama</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Header = () => {
    if (activeState === "cardMenu") {
      return <Text style={{ color: "#6C757D", paddingVertical: 16, fontSize:15 }}>VexMail - Gelen</Text>;
      // eslint-disable-next-line no-else-return
    } else if (activeState === "inbox") {
      return (
        <TouchableOpacity style={styles.header} onPress={() => setActiveState("cardMenu")}>
          <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          <Text style={{ color: "#6C757D", paddingVertical: 16, fontSize:15 }}>VexMail - Gelen</Text>
        </TouchableOpacity>
      );
    } else if (activeState === "outbox") {
      return (
        <TouchableOpacity style={styles.header} onPress={() =>{ clearStreamData(); getReceivedMailData(); setActiveState("cardMenu");  }}>
          <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          <Text style={{ color: "#6C757D", paddingVertical: 16, fontSize:15 }}>VexMail - Gönderilen</Text>
        </TouchableOpacity>
      );
    } else return <Text style={{ color: "#6C757D", paddingVertical: 16, fontSize:15 }}>VexMail - Gelen</Text>;
  };
  const butonClicked = () => {
   // console.log(getItemLayout);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.body}>
        <View style={styles.listingArea}>
          <FlatList
            data={streamData} //  dummyArray
            // Item Separator View
            renderItem={ ({item, index})=><ItemView item={item} activeState={activeState} openEmail={openEmail} index={index} />}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={headerComponent}
            showsVerticalScrollIndicator={false}
            // getItemLayout={(data, index) => {
            //   return {
            //     index,
            //     length: 60, // itemHeight is a placeholder for your amount
            //     offset: index * 60,
            //   };          }}
          />

        {/* Yeni mail butonu */}
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              marginTop: relativeHeightNum(450),
              marginLeft: relativeWidthNum(260), 
            }}
          >
            <TouchableOpacity style={styles.newMail} onPress={() => {activateNewMail(); butonClicked()}}>
              <Image style={styles.menuItemImg} source={YeniMail} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/*  NewMailModal                             */}
          <View>
            <Modal
               visible={(modalOpenState==="NewMailModal")}
              onRequestClose={() => {
                setModalOpenState("off");
              }}
            >
              <NewMailModal setModalOpenState={setModalOpenState} />
            </Modal>
          </View>

          {/*  ReceivedMailModal                             */}
          <View>
            <Modal
              visible={(modalOpenState==="ReceivedMailModal")}
              onRequestClose={() => {
                setModalOpenState("off");
              }}
            >
              <ReceivedMailModal setModalOpenState={setModalOpenState} activeItem={activeItem} />
            </Modal>
          </View>

          {/*  SentMailModal                                   */}
          <View>
            <Modal
               visible={(modalOpenState==="SentMailModal")}
              onRequestClose={() => {
                setModalOpenState("off");
              }}
            >
              <SentMailModal setModalOpenState={setModalOpenState}  activeItem={activeItem}/>
            </Modal>
          </View>

          {/*  FolderModal                             */}
          <View>
            <Modal
              visible={(modalOpenState==="FolderModal")}
              onRequestClose={() => {
                setModalOpenState("off");
              }}
            >
              <FolderModal setModalOpenState={setModalOpenState} />
            </Modal>
          </View>
       

          {/*  SignatureModal                             */}
          <View>
            <Modal
              visible={(modalOpenState==="SignatureModal")}
              onRequestClose={() => {
                setModalOpenState("off");
              }}
            >
              <SignatureModal setModalOpenState={setModalOpenState} />
            </Modal>
          </View>

          {/*  AttachedFilesModal                             */}
          <View>
            <Modal
               visible={(modalOpenState==="AttachedFilesModal")}
              onRequestClose={() => {
                setModalOpenState("off");
              }}
            >
              <AttachedFilesModal setModalOpenState={setModalOpenState} />
            </Modal>
          </View>

    

        </View>
      </View>
    </View>
  );
};

export default VexMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  body: {
    flex: 9,
    backgroundColor: "white",
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
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuItem: {
    padding: 5,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
  },
  menuItemImg: {
    height: 25,
    width: 25,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 2,
  },
  menuItemText: {
    color: "#6C757D",
    textAlign: "center",
    paddingBottom: 5,
  },
  butonArea: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listingArea: {
    marginHorizontal: 15,
    flexGrow: 1,
  },
  subCardView: {
    height: 45,
    width: 45,
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
  newMail: {
    height: 45,
    width: 45,
    borderRadius: 3,
    backgroundColor: "#00AA9F",
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
  cardText: {
    color: "#6C757D",
    fontSize: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginBottom: 15,
    flex: 1,
    height: relativeHeightNum(70),
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
  headerComponent: {
    flex: 1,
    flexDirection: "row",
    height: 45,
    marginVertical: 15,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
});
