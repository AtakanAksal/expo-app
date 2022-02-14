/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
  FlatList,
  Alert
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Geri from "../../../../assets/forgotpass/go-back-black.png";
import SignSelect from "../../../../assets/vexmail/sign-select.png";
import Sent from "../../../../assets/vexmail/sent.png";
import Attach from "../../../../assets/vexmail/attach.png";
import Profil from "../../../../assets/vexmail/profil.png";
import Kapat from "../../../../assets/vexmail/kapat-turkuaz.png";
import KapatBeyaz from "../../../../assets/vexmail/kapat-beyaz.png";
import ProfilModal from "./ProfilModal";
import Add from "../../../../assets/add.png";
import DownArrow from "../../../../assets/vexmail/down-arrow.png";
import UpArrow from "../../../../assets/vexmail/up-arrow.png";
import PdfIcon from "../../../../assets/vexmail/pdf-icon.png";
import KapatGri from "../../../../assets/vexmail/kapat-gri.png";
import EkleTurkuaz from "../../../../assets/vexmail/ekle-turkuaz.png";
import ProfilPlaceHolder from "../../../../assets/vexmail/profil-placeholder.jpg";
import {
  postToSearchInFollowings,
  postAddToReceiver,
  postAddCcReceiver,
  postAddBccReceiver,
  postRemoveTo,
  postRemoveCC,
  postRemoveBCC,
  postMailId,
  postUpdateContent,
  postUpdateMailFile,
  postDeleteMailFile,
  postMakeSent,
  postImza,
  postUserList,
  postAddNewFolder
} from "../../../helpers/mailConnection";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";
import EkleModal from "./EkleModal";
import { useUserValue } from "../../../contexts/UserContext";





  const ekran = Dimensions.get("screen");
 const HEIGHT = Dimensions.get("window").height;
  const WIDTH = Dimensions.get("window").width;

  const NewMailModal = ({ setModalOpenState }) => {
  const [ccOpen, setCcOpen] = useState(false);
  const [bccOpen, setBccOpen] = useState(false);
  const [mailToProfilArray, setMailToProfilArray] = useState([]);
  const [ccProfilArray, setCcProfilArray] = useState([]);
  const [bccProfilArray, setBccProfilArray] = useState([]);
  const [profilModalOpen, setProfilModalOpen] = useState(false);
  const [listType, setListType] = useState("");
  const [attachedFilesArray, setAttachedFilesArray] = useState([]);
  const [showAttachList, setShowAttachList] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState("");
  const [listItems, setListItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [contentOpen, setContentOpen] = useState("");
  const [choosenValueTo, setChoosenValueTo] = useState(false);
  const [choosenValueCc, setChoosenValueCc] = useState(false);
  const [choosenValueBcc, setChoosenValueBcc] = useState(false);
  //  const [choosenValue, setChoosenValue] = useState(false)
  //  const [writedText, setWritedText] = useState("")
  const [writedTextTo, setWritedTextTo] = useState("");
  const [writedTextCc, setWritedTextCc] = useState("");
  const [writedTextBcc, setWritedTextBcc] = useState("");
  const [writedTextSubject, setWritedTextSubject] = useState("")
  const [writedTextContent, setWritedTextContent] = useState("");
  const [{ user }] = useUserValue();
  const [mailId, setMailId] = useState(null);
  const postData = new FormData();

  useEffect(() => {
    getToSearchInFollowings();
    conMailId(); // mailId yi çekip set ediyor    
    // console.log(mailId);
  }, []);

  const sendEmail = () => {
    conPostMakeSent();
    conPostImza();
  };

  const getToSearchInFollowings = async (keyword) => {

    // console.log(mailToProfilArray);
    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("query", keyword);
    // console.log(
    //   "streamData icerigi ..........................................................................................."
    // );
    // console.log(streamData);
    setListItems([]);
    await postToSearchInFollowings(postData, user.token)
      .then((res) => {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        console.log(res);
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setListItems((prevState) => [...prevState, ...res?.userList.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  // Profil Ekleme Connection Çağrıları
  const conAddToReceiver = async (userId) => {

    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("mail_id", mailId);
    postData.append("userId", userId);
    // console.log(
    //   "streamData icerigi ..........................................................................................."
    // );
    // console.log(streamData);
   await postAddToReceiver(postData, user.token)
      .then((res) => {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        console.log(res);
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        // setListItems((prevState) => [...prevState, ...res?.userList.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const conAddCcReceiver = async (userId) => {
    
    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("mail_id", mailId);
    postData.append("userId", userId);
    // console.log(
    //   "streamData icerigi ..........................................................................................."
    // );
    // console.log(streamData);
   await postAddCcReceiver(postData, user.token)
      .then((res) => {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        console.log(res);
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        // setListItems((prevState) => [...prevState, ...res?.userList.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const conAddBccReceiver = async (userId) => {
   
    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("mail_id", mailId);
    postData.append("userId", userId);
    // console.log(
    //   "streamData icerigi ..........................................................................................."
    // );
    // console.log(streamData);
   await postAddBccReceiver(postData, user.token)
      .then((res) => {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        console.log(res);
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        // setListItems((prevState) => [...prevState, ...res?.userList.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  // Profil Çıkarma Connection Çağrıları
  const conRemoveToReceiver = async (userId) => {
    
    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("mail_id", mailId);
    postData.append("userId", userId);
    // console.log(
    //   "streamData icerigi ..........................................................................................."
    // );
    // console.log(streamData);
  await  postRemoveTo(postData, user.token)
      .then((res) => {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        console.log(res);
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        // setListItems((prevState) => [...prevState, ...res?.userList.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const conRemoveCcReceiver = async (userId) => {
    
    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("mail_id", mailId);
    postData.append("userId", userId);
    // console.log(
    //   "streamData icerigi ..........................................................................................."
    // );
    // console.log(streamData);
  await  postRemoveCC(postData, user.token)
      .then((res) => {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        console.log(res);
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        // setListItems((prevState) => [...prevState, ...res?.userList.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const conRemoveBccReceiver = async (userId) => {

    //  setLoading(true);
    // postData.append("main_type", type); //
    // postData.append("page", offset);
    postData.append("mail_id", mailId);
    postData.append("userId", userId);
    // console.log(
    //   "streamData icerigi ..........................................................................................."
    // );
    // console.log(streamData);
  await  postRemoveBCC(postData, user.token)
      .then((res) => {
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        console.log(res);
        console.log(
          "-----------------------------------------------------------------------------------------------------------------"
        );
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        // setListItems((prevState) => [...prevState, ...res?.userList.data]);

        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };


  const conMailId = async () => {
   
    postData.append("content", "");
    postData.append("mail_type_id", 3);
    // filterPayloads.forEach(element => {
    //      postData.append(Object.keys(element)[0], Object.values(element)[0])
    //      console.log(postData);
    //   }
    //   )
    //  postData.append("receivers[]", 33); // alıcı mailToProfilArray
    postData.append("subject", "");

    await postMailId(postData, user.token)
      .then((res) => {
        console.log(res.mail.id);
        setMailId(res.mail.id);
      })
      .catch((err) => console.log(err));
  };
  const conPostUpdateContent = async () => {
   
    postData.append("content", writedTextContent);
    postData.append("mail_id", mailId);
    // filterPayloads.forEach(element => {
    //      postData.append(Object.keys(element)[0], Object.values(element)[0])
    //      console.log(postData);
    //   }
    //   )
    //  postData.append("receivers[]", 33); // alıcı mailToProfilArray
    postData.append("subject", writedTextSubject);

    await postUpdateContent(postData, user.token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const conPostUpdateMailFile = async () => {
   
const a= {
  "name": "IMG-20211116-WA0009.jpg",
  "size": 246239,
  "type": "success",
  "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fexpo-app-demo-1f37a778-54ef-4794-9bc2-8c1fb616c684/DocumentPicker/934347f6-f998-4915-993c-1e2f8b5e6837.jpg",
}
  
    // const data = {name: "a" , type : "jpg"}; // string, arrary buffer, typed array, blob, ...
     const name = 'abc.txt';
     const type = 'text/plain';
    // const fd = new FormData();
    // // use file object
    // const file = new File([data], name, {type}); // add filename here
    // fd.append('file', file);
    // fd.append("cloudfile_categories_id", 6);
    // fd.append("mail_id", mailId); 
   
   
   // attachedFilesArray.forEach(element => {
      // const name = element.name;
      // const type= element.type;
      // console.log("element.........................................");
      // console.log(element);
     // const file = new File([""], "filename.txt")
         
        const formdata = new FormData();
       formdata.append("cloudfile_categories_id", "6");
       formdata.append("mail_id", "2216");
       formdata.append("file", a, "/C:/Users/musta/OneDrive/Masaüstü/expo eski/MENU BAR/Ana Sayfa Iconlar/boş.png");
   //  })    
     console.log("potData verisi ................................................");
     console.log(postData);
    await postUpdateMailFile(formdata, user.token)
      .then((res) => {
        console.log("postUpdateMailFile donusu ..................................................................");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  
  const conPostDeleteMailFile = async () => {

    postData.append("file", "");
    postData.append("cloudfile_categories_id", 6);
    // filterPayloads.forEach(element => {
    //      postData.append(Object.keys(element)[0], Object.values(element)[0])
    //      console.log(postData);
    //   }
    //   )
    //  postData.append("receivers[]", 33); // alıcı mailToProfilArray
    postData.append("mail_id", mailId);

    await postDeleteMailFile(postData, user.token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const conPostMakeSent = async () => {

    if(mailToProfilArray.length>0){
      postData.append("mail_id", mailId);

      await postMakeSent(postData, user.token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    }else{
      emptyReceiverAlert();
    }
   
     
  };
  const conPostImza = async () => {
    
    postData.append("user_id", user.userid);

    await postImza(postData, user.token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const conPostUserList = async () => { 

    await postUserList(postData, user.token)
      .then((res) => {
        console.log(res);
        setListItems((prevState) => [...prevState, ...res?.userList.data]);

      })
      .catch((err) => console.log(err));
  };


  const pickDoc = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if (result.type !== "cancel") {
      setAttachedFilesArray((prevArray) => [
        ...prevArray,
        {
          name: result.name,
          size: result.size,
          type: result.type,
          uri: result.uri,
        },
      ]);
    }
    // console.log(attachedFilesArray);    
  };
  const addToProfilArray = () => {
    /*  if(mailToProfilArray.length>0){ // eklemeyip vazgeçerse kontrolü
    setMailToProfilArray([...mailToProfilArray,{ id: '1', name: 'Emre Emreoğlu'}])
  } */
    // Manuel ekleme iptal zaten profil modal da profilarray set ediliyor
  };
  const addToccProfilArray = () => {
    setCcProfilArray([...ccProfilArray, { id: "1", name: "Emre Emreoğlu" }]);
  };
  const addTobccProfilArray = () => {
    setBccProfilArray([...bccProfilArray, { id: "1", name: "Emre Emreoğlu" }]);
  };

  const BackComponent = () => {
    return (
      <View style={styles.back}>
        {/* Sol Kısım        */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Geri Butonu */}
            <TouchableOpacity onPress={() => setModalOpenState("off")}>
              <Image
                style={{ height: 45, width: 45 }}
                source={Geri}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Başlık */}
            <Text style={{ color: "#00AA9F", fontSize: 15 }}>VexMail Yeni</Text>
          </View>
        </View>

        {/* Sağ Kısım */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setAddModalOpen(true);
            }}
            style={{ marginRight: 10 }}
          >
            <Image
              style={{
                height: relativeWidthNum(25),
                width: relativeWidthNum(25),
              }}
              source={EkleTurkuaz}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Border />

          {/* Mail Gönderim */}
          <View style={{ marginHorizontal: 10 }}>
            <TouchableOpacity onPress={() => sendEmail() }> 
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: relativeWidthNum(25),
                    width: relativeWidthNum(25),
                  }}
                  source={Sent}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const Border = () => {
    return (
      <View
        style={{
          borderLeftWidth: 1,
          borderLeftColor: "#707070",
          height: HEIGHT / 18,
          opacity: 0.2,
        }}
      />
    );
  };
  const emptyReceiverAlert = () =>
  Alert.alert('Hata!', 'Maile alıcı girmeniz gerekmektedir.', [
    {
      text: 'İptal',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ]);
  const ProfilNameFlatList = () => {
    return (
      <FlatList
        data={mailToProfilArray}
        renderItem={ProfilNameHolder}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    );
  };
  const CCProfilNameFlatList = () => {
    return (
      <FlatList
        data={ccProfilArray}
        renderItem={CCProfilNameHolder}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    );
  };
  const BCCProfilNameFlatList = () => {
    return (
      <FlatList
        data={bccProfilArray}
        renderItem={BCCProfilNameHolder}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    );
  };
  const ProfilNameHolder = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00AA9F",
          borderColor: "#00AA9F",
          borderRadius: 5,
          marginVertical: relativeHeightNum(12),
          marginHorizontal: relativeWidthNum(5),
        }}
      >
        <Text style={{ fontSize: 12, color: "white", margin: 5 }}>
          {`${item.first_name}  ${item.last_name}`}
        </Text>
        <TouchableOpacity onPress={() => closeProfilTag("to", item)}>
          <Image
            style={{ height: 20, width: 20 }}
            source={KapatBeyaz}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const CCProfilNameHolder = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00AA9F",
          borderColor: "#00AA9F",
          borderRadius: 5,
          marginVertical: relativeHeightNum(12),
          marginHorizontal: relativeWidthNum(5),
        }}
      >
        <Text style={{ fontSize: 12, color: "white", margin: 5 }}>
        {`${item.first_name}  ${item.last_name}`}
        </Text>
        <TouchableOpacity onPress={() => closeProfilTag("cc", item)}>
          <Image
            style={{ height: 20, width: 20 }}
            source={KapatBeyaz}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const BCCProfilNameHolder = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00AA9F",
          borderColor: "#00AA9F",
          borderRadius: 5,
          marginVertical: relativeHeightNum(12),
          marginHorizontal: relativeWidthNum(5),
        }}
      >
        <Text style={{ fontSize: 12, color: "white", margin: 5 }}>
        {`${item.first_name}  ${item.last_name}`}
        </Text>
        <TouchableOpacity onPress={() => closeProfilTag("bcc", item)}>
          <Image
            style={{ height: 20, width: 20 }}
            source={KapatBeyaz}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const MailToList = () => {
    if (mailToProfilArray.length > 0) {
      return <ProfilNameFlatList />;
    }
    return null;
  };
  const CCToList = () => {
    if (ccProfilArray.length > 0) {
      return <CCProfilNameFlatList />;
    }
    return null;
  };
  const BCCToList = () => {
    if (bccProfilArray.length > 0) {
      return <BCCProfilNameFlatList />;
    }
    return null;
  };
  const openProfilList = () => {
    setProfilModalOpen(true);
  };
  const toProfilButton = () => {
    conPostUserList();
    setListType("to");
    openProfilList();
  };
  const ccProfilButton = () => {
    setListType("cc");
    openProfilList();
  };
  const bccProfilButton = () => {
    setListType("bcc");
    openProfilList();
  };
 
  const Subject = () => {
    return (
      <View style={styles.row}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, color: "#6C757D" }}>Konu</Text>
          <Border />
        </View>
        <View
          style={{ flex: 14, alignItems: "flex-start", paddingHorizontal: 11 }}
        >
          <TextInput 
          style={{ flex: 1, flexGrow: 1, width: "100%" }}
          onChangeText={(txt) => {
            setWritedTextSubject(txt);
          }}
          autoFocus
          value= {writedTextSubject}
          onBlur = { ()=> {
            // console.log("test subject onBlur ---------------------------------------------------------------------");
            // console.log(writedTextSubject); 
            conPostUpdateContent();        
          } }
          />
        </View>
      </View>
    );
  };

  const NewMail = () => {
    return (
      <View style={{ flexGrow: 1, height: "100%" }}>
        <TextInput
          placeholder="İletinizi Yazın"
          multiline
          textAlign="left"
          textAlignVertical="top"
          style={{
            flexGrow: 1,
            marginHorizontal: 15,
            marginVertical: 20,
            fontSize: 14,
            height: "100%",
          }}
          onChangeText={(txt) => {
            setWritedTextContent(txt);
          }}
          autoFocus
          value= {writedTextContent}
          onBlur = { ()=> {
            // console.log("test subject onBlur ---------------------------------------------------------------------");
            // console.log(writedTextSubject); 
            conPostUpdateContent();        
          } }
        />
      </View>
    );
  };
  const SearchListItem = ({ item, index, payload }) => {
    return (
      <View style={[styles.row, { justifyContent: "flex-start" }]}>
        <Image
          style={{ height: 25, width: 25 }}
          source={ProfilPlaceHolder}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={{ marginLeft: relativeWidthNum(75) }}
          onPress={() => {
            if (payload === "to") {
              setMailToProfilArray((prevArray) => [
                ...prevArray,
                {
                  id: item.id.toString(),
                  first_name:  item.first_name,
                  last_name: item.last_name
                },
              ]);
              setChoosenValueTo(true);
              setWritedTextTo("");
              conAddToReceiver(item.id);
            }
            if (payload === "cc") {
              setCcProfilArray((prevArray) => [
                ...prevArray,
                {
                  id: item.id.toString(),
                  first_name:  item.first_name,
                  last_name: item.last_name
                },
              ]);
              setChoosenValueCc(true);
              setWritedTextCc("");
              conAddCcReceiver(item.id);
            }
            if (payload === "bcc") {
              setBccProfilArray((prevArray) => [
                ...prevArray,
                {
                  id: item.id.toString(),
                  first_name:  item.first_name,
                  last_name: item.last_name
                },
              ]);
              setChoosenValueBcc(true);
              setWritedTextBcc("");
              conAddBccReceiver(item.id);
            }
            setListItems([]);
          }}
        >
          <Text>{`${item.first_name} ${item.last_name}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const SearchListView = ({ payload }) => {
    return (
      <View style={styles.toSearchScreen}>
        <FlatList
          data={listItems} // listItems
          //   onEndReached={() => getData()} bu method ana componentte active state e uygun get methodunu çağıracak
          renderItem={({ item, index }) => (
            <SearchListItem item={item} index={index} payload={payload} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const handleSearch = (text, tip) => {
    if (tip === "to") {
      setWritedTextTo(text);
    }
    if (tip === "cc") {
      setWritedTextCc(text);
    }
    if (tip === "bcc") {
      setWritedTextBcc(text);
    }

    if (text !== "") {
      getToSearchInFollowings(text);
    } else {
      // setFilteredData(listItems);
      setListItems([]);
    }
  };
  const SearchInToFollowings = () => {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <TextInput
          placeholder=""
          //  multiline
          textAlign="left"
          autoFocus
          textAlignVertical="top"
          value={choosenValueTo ? "" : writedTextTo}
          placeholderTextColor="#6C757D"
          onFocus={() => {}}
          onChangeText={(txt) => {
            handleSearch(txt, "to");
            setContentOpen("to");
            setChoosenValueTo(false);
          }}
        //  blurOnSubmit={false}
          style={{
            flexGrow: 1,
            marginHorizontal: 10,
            marginVertical: 20,
            fontSize: 14,
            height: "100%",
          }}
        />
      </View>
    );
  };
  const SearchInCcFollowings = () => {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <TextInput
          placeholder=""
          //  multiline
          textAlign="left"
          autoFocus
          textAlignVertical="top"
          value={choosenValueCc ? "" : writedTextCc}
          placeholderTextColor="#6C757D"
          onFocus={() => {}}
          onChangeText={(txt) => {
            handleSearch(txt, "cc");
            setContentOpen("cc");
            setChoosenValueCc(false);
          }}
        //  blurOnSubmit={false}
          style={{
            flexGrow: 1,
            marginHorizontal: 10,
            marginVertical: 20,
            fontSize: 14,
            height: "100%",
          }}
        />
      </View>
    );
  };
  const SearchInBccFollowings = () => {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <TextInput
          placeholder=""
          //  multiline
          textAlign="left"
          autoFocus
          textAlignVertical="top"
          value={choosenValueBcc ? "" : writedTextBcc}
          placeholderTextColor="#6C757D"
          onFocus={() => {}}
          onChangeText={(txt) => {
            handleSearch(txt, "bcc");
            setContentOpen("bcc");
            setChoosenValueBcc(false);
          }}
         // blurOnSubmit={false}
          style={{
            flexGrow: 1,
            marginHorizontal: 10,
            marginVertical: 20,
            fontSize: 14,
            height: "100%",
          }}
        />
      </View>
    );
  };
  const MailToComponent = () => {
    return (
      <View style={styles.row}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, color: "#6C757D" }}>Kime</Text>
          <Border />
        </View>

        {/* Orta Kısım */}
        <View
          style={{ flex: 12, alignItems: "flex-start", paddingHorizontal: 11 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 4 }}>
              <SearchInToFollowings />
            </View>
            <View style={{ flex: 14 }}>
              <MailToList />
            </View>
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <TouchableOpacity
            onPress={toProfilButton}
            style={{ marginHorizontal: 5 }}
          >
            <Image
              style={{ height: 25, width: 25 }}
              source={Profil}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const CCToComponent = () => {
    return (
      <View style={styles.row}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, color: "#6C757D" }}>CC</Text>
          <Border />
        </View>
        {/* Orta Kısım */}
        <View
          style={{ flex: 10, alignItems: "flex-start", paddingHorizontal: 11 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 4 }}>
              <SearchInCcFollowings />
            </View>
            <View style={{ flex: 10 }}>
              <CCToList />
            </View>
          </View>
        </View>
        {/* <View
          style={{ flex: 12, alignItems: "flex-start", paddingHorizontal: 11 }}
        >
          <CCToList />
        </View> */}
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={ccProfilButton}
            style={{ marginHorizontal: 5 }}
          >
            <Image
              style={{ height: 25, width: 25 }}
              source={Profil}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Border />
          <TouchableOpacity
            onPress={() => {
              setCcOpen(false);
            }}
            style={{ marginLeft: 5 }}
          >
            <Image
              style={{ height: 25, width: 25 }}
              source={Kapat}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const BCCToComponent = () => {
    return (
      <View style={styles.row}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, color: "#6C757D" }}>BCC</Text>
          <Border />
        </View>
        {/* Orta Kısım */}
        <View
          style={{ flex: 10, alignItems: "flex-start", paddingHorizontal: 11 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 4 }}>
              <SearchInBccFollowings />
            </View>
            <View style={{ flex: 12 }}>
              <BCCToList />
            </View>
          </View>
        </View>

        {/* <View
          style={{ flex: 12, alignItems: "flex-start", paddingHorizontal: 11 }}
        >
          <BCCToList />
        </View> */}
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={bccProfilButton}
            style={{ marginHorizontal: 5 }}
          >
            <Image
              style={{ height: 25, width: 25 }}
              source={Profil}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Border />
          <TouchableOpacity
            onPress={() => {
              setBccOpen(false);
            }}
            style={{ marginLeft: 5 }}
          >
            <Image
              style={{ height: 25, width: 25 }}
              source={Kapat}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const attachSwitcher = () => {
    setShowAttachList((prev) => !prev);
  };
  const AttachComponent = () => {
    return (
      <View style={styles.row}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, color: "#6C757D" }}>Ekler</Text>
          <Border />
        </View>
        <View
          style={{ flex: 10, alignItems: "flex-start", paddingHorizontal: 11 }}
        >
          <Text style={{ color: "#6C757D", fontSize: 12 }}>
            {attachedFilesArray.length} Dosya (5MB-100MB)
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <TouchableOpacity onPress={pickDoc}>
            <Image
              style={{ height: 25, width: 25 }}
              source={Add}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Border />
          <TouchableOpacity onPress={attachSwitcher} style={{ marginRight: 5 }}>
            <Image
              style={{ height: 25, width: 25, alignSelf: "center" }}
              source={showAttachList ? UpArrow : DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const closeProfilTag = (componentType, item) => {
    // eger birden fazla profil tag ı eklenecekse arraylist yap foreach ile bas, yatay scroll yatay flatlist cozer

    // fix => listeye iki kere eklenebiliyor
    if (componentType === "to") {
      /* remove from  mailToProfilArray */
      setMailToProfilArray((prevArray) =>
        prevArray.filter((l) => l.id !== item.id)
      );
      // buradan Çıkarılan Kime profili end pointe gönderilmesi
      conRemoveToReceiver(item.id)


    } else if (componentType === "cc") {
      /* remove from  ccProfilArray */
      if (!(ccProfilArray.length - 1 > 0)) setCcOpen(false);
      setCcProfilArray((prevArray) =>
        prevArray.filter((l) => l.id !== item.id)      
      );
      //  Çıkarılan CC profili end pointe gönderilmesi
     conRemoveCcReceiver(item.id)
    } else if (componentType === "bcc") {
      /* remove from  bccProfilArray */
      if (!(bccProfilArray.length - 1 > 0)) setBccOpen(false);
      setBccProfilArray((prevArray) =>
        prevArray.filter((l) => l.id !== item.id)
      );
      if (!bccProfilArray.length > 0) {
        setBccOpen(false);
      }
       // Çıkarılan BCC profili end pointe gönderilmesi
       conRemoveBccReceiver(item.id)
    }
  };
  const DATA = [
    {
      id: "1",
      name: "denemedosya1.pdf",
    },
    {
      id: "2",
      name: "denemedosya2.pdf",
    },
    {
      id: "3",
      name: "denemedosya3.pdf",
    },
    {
      id: "4",
      name: "denemedosya4.pdf",
    },
    {
      id: "5",
      name: "denemedosya5.pdf",
    },
    {
      id: "6",
      name: "denemedosya6.pdf",
    },
    {
      id: "7",
      name: "denemedosya7.pdf",
    },
    {
      id: "8",
      name: "denemedosya8.pdf",
    },
    {
      id: "9",
      name: "denemedosya9.pdf",
    },
    {
      id: "10",
      name: "denemedosya10.pdf",
    },
  ];
  const removeAttachedFile = (item) => {
    console.log("listeden cıkar tıandı");
    //  setAttachedFilesArray((prevArray) => prevArray.filter((l) => l.id !== item.id)) ;
    setAttachedFilesArray((prevArray) =>
      prevArray.filter((l) => l.uri !== item.uri)
    );
  };

  const Item = ({ item }) => {
    // const [open, setopen] = useState(false);

    return (
      <TouchableOpacity style={styles.item} onPress={null} activeOpacity={1}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 3,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={{ height: 15, width: 12 }}
              source={PdfIcon}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              flex: 4,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text style={{ color: "#6C757D", fontSize: 10 }}>
                {item.name}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#6C757D", fontSize: 6 }}>
                {(item.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={() => removeAttachedFile(item)}>
              <Image
                style={{ height: 20, width: 20 }}
                source={KapatGri}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => <Item item={item} />;
  const AttachListComponent = () => {
    if (showAttachList || !(attachedFilesArray.length > 0)) {
      return (
        <View>
          <FlatList
            data={attachedFilesArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      );
    }
    return null;
  };

  const BelowOfToMailPart = () => {
    // if (writedTextTo === "") {
    //  console.log(mailToProfilArray.length);
      if ((listItems.length===0)||(writedTextTo === "")) {
      return (
        <>
          {ccOpen && <CCToComponent />}
          {contentOpen === "cc" && <SearchListView payload="cc" />}
          <BelowOfCcPart />
        </>
      );
    }
    return null;
  };
  const BelowOfCcPart = () => {
    if ((listItems.length===0)||(writedTextCc === "")) {
      return (
        <>
          {bccOpen && <BCCToComponent />}
          {contentOpen === "bcc" && <SearchListView payload="bcc" />}
          <BelowOfBccPart />
        </>
      );
    }
    return null;
  };

  const BelowOfBccPart = () => {
    if ((listItems.length===0)||(writedTextBcc === "")) {
      return (
        <>
          <Subject />
          <AttachComponent />
          {attachedFilesArray.length > 0 && <AttachListComponent />}
          <NewMail />
        </>
      );
    }
    return null;
  };
  return (
    <View style={styles.mainFrame}>
      <BackComponent />
      <View style={styles.mainContainer}>
        <MailToComponent />
        {contentOpen === "to" && listItems.length > 0 && (
          <SearchListView payload="to" />
        )}
        <BelowOfToMailPart />
      </View>

       {/* ProfilModal */}
      <View>
        <Modal
          visible={profilModalOpen}
          onRequestClose={() => {
            setProfilModalOpen(false);
          }}
        >
          <ProfilModal
            setProfilModalOpen={setProfilModalOpen}
            setMailToProfilArray={setMailToProfilArray}
            mailToProfilArray={mailToProfilArray}
            listType={listType}
            ccProfilArray={ccProfilArray}
            setCcProfilArray={setCcProfilArray}
            bccProfilArray={bccProfilArray}
            setBccProfilArray={setBccProfilArray}
            conAddToReceiver={conAddToReceiver}
            conAddCcReceiver={conAddCcReceiver}
            conAddBccReceiver={conAddBccReceiver}
            listItems={listItems}
          />
        </Modal>
      </View>
      {/*  EkleModal */}                           
      <View>
        <Modal
          visible={addModalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setAddModalOpen(false);
          }}
        >
          <EkleModal
            setAddModalOpen={setAddModalOpen}
            setCcOpen={setCcOpen}
            setBccOpen={setBccOpen}
            pickDoc={pickDoc}
          />
        </Modal>
      </View>
    </View>
  );
};

export default NewMailModal;

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
  mainContainer: {
    flexDirection: "column",
    flex: 10,

    backgroundColor: "#FFF",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    marginTop: 6,
  },
  row: {
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: HEIGHT / 14,
    paddingLeft: 12,
    paddingRight: 4,
  },
  item: {
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1,
    // height:HEIGHT/9.15,
    backgroundColor: "white",
    borderColor: "#6C757D",
    borderWidth: 0.2,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    shadowColor: "#EFEFEF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  toSearchScreen: {
    flexGrow: 1,
  },
});
