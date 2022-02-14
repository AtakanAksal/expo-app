/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import {
  transformDateFormatFromIsoToShort,
  relativeWidthAndHeightForSquare,
  relativeWidth,
  relativeHeight,
} from "../../../utils/HelperFunctions";
import { useUserValue } from "../../../contexts/UserContext";
import LogoYatay from "../../../../assets/expo_logo_yatay.png";
import Kamera from "../../../../assets/camera.png";
import DosyaEkle from "../../../../assets/vexmail/ekle.png";
import Gonder from "../../../../assets/vexmail/sent.png";
import { postNotificationMalevolance } from "../../../helpers/connections";
import IslemBasariliModal from "./IslemBasariliModal";
import KapatGri from "../../../../assets/vexmail/kapat-gri.png";
import PdfIcon from "../../../../assets/vexmail/pdf-icon.png";

const BildirimlerKotuyeKullanim = ({ onProcessItem, setActiveState }) => {
  const [value, onChangeText] = useState("");
  const [openIslemBasariliModal, setOpenIslemBasariliModal] = useState(false);
  // eslint-disable-next-line no-undef
  const postData = new FormData();
  const [{ user }] = useUserValue();
  const [attachedFilesArray, setAttachedFilesArray] = useState([]);
  const [showAttachList, setShowAttachList] = useState(true);
  const attachSwitcher = () => {
    setShowAttachList((prev) => !prev);
  };
  // const pickDoc = async () => {
  //   const result = await DocumentPicker.getDocumentAsync({});
  // //  console.log("test");
  //   console.log(result);
  //   if (result.type !== "cancel") {
  //     setAttachedFilesArray((prevArray) => [
  //       ...prevArray,
  //       {
  //         name: result.name,
  //         size: result.size,
  //         type: "image/jpeg",
  //         uri:   result.uri,
  //       },
  //     ]);
  //   }
  // };

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          // eslint-disable-next-line no-alert
          // eslint-disable-next-line no-undef
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const postMalevolanceButton = () => {
    //  setLoading(true);
    console.log("art niyet bildir calıstı");
    if (value !== "") {
      postData.append("sender_id", onProcessItem.sender_id); //
      postData.append("receiver_id", onProcessItem.receiver_id);
      postData.append("description", value);
      postData.append( "malevolencable_type",  onProcessItem.notifiable.complainable_type);
      postData.append("malevolencable_id", onProcessItem.id);
    //   // console.log(attachedFilesArray);
    //   postData.append("files[]", [image]);

      /*      postData.append("files[]",  {
      uri: "attachedFilesArray.uri",
      tmp_name: "asdas",
      name: "attachedFilesArray.name",
      type: "image/jpeg",
      size: 3344,
    } */


      // attachedFilesArray.forEach((element) => {
      //    postData.append("files[]", element);
      //   // console.log(element);
      // });
      // console.log(attachedFilesArray);
      // const payload = {
      //   "sender_id" :  onProcessItem.sender_id,
      //   "receiver_id": onProcessItem.receiver_id,
      //   "description": value,
      //   "malevolencable_type": onProcessItem.notifiable.complainable_type,
      //   "malevolencable_id" : onProcessItem.id
      // };

      postNotificationMalevolance(postData, user.token)
        .then((res) => {
          console.log(res);
          setOpenIslemBasariliModal(true);
        }) // console.log(res.streams)  setStreamData(res.streams)
        .catch((err) => console.log(err));
    } else {
      console.log("Açıklama girilmeli");
    }
  };

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
      <View style={{ marginRight: 10 }}>
        <View>
          <Text style={{ color: "#6C757D", fontSize: 10 }}>{item.name}</Text>
        </View>
        <View>
          <Text style={{ color: "#6C757D", fontSize: 6 }}>
            {(item.size / 1024 / 1024).toFixed(2)} MB
          </Text>
        </View>
      </View>
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

  return (
    <View style={styles.mainFrame}>
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <Image
          style={[relativeWidth(150), relativeHeight(55)]}
          source={LogoYatay}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={styles.textStyle}>Kullanıcı Adı :</Text>
          <Text style={styles.textStyle}>
            {onProcessItem.receiver_user.username}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.textStyle}>Yayın Türü :</Text>
          <Text style={styles.textStyle}>
            {" "}
            {onProcessItem.sender_message_id === 32 ||
            onProcessItem.sender_message_id === 7
              ? "Profil"
              : "Stant"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.textStyle}>Tarih :</Text>
          <Text style={styles.textStyle}>
            {" "}
            {transformDateFormatFromIsoToShort(new Date())}{" "}
          </Text>
        </View>

        <View style={[styles.row, { flexWrap: "wrap", flex: 1 }]}>
          <TextInput
            multiline
            numberOfLines={6}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            style={styles.textStyle}
            placeholder="Ne Düşünüyorsun ?"
            placeholderTextColor="#6C757D"
          />
        </View>

        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={pickImage}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={[
                  relativeWidthAndHeightForSquare(20),
                  { marginRight: 15 },
                ]}
                source={Kamera}
                resizeMode="contain"
              />
              <Image
                style={[
                  relativeWidthAndHeightForSquare(20),
                  { marginRight: 15 },
                ]}
                source={DosyaEkle}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <AttachListComponent />
          <TouchableOpacity onPress={postMalevolanceButton}>
            <Image
              style={[relativeWidthAndHeightForSquare(20), { marginRight: 15 }]}
              source={Gonder}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/*  IslemBasariliModal                             */}
      <View>
        <Modal
          transparent
          visible={openIslemBasariliModal}
          onRequestClose={() => {
            setOpenIslemBasariliModal((prev) => !prev);
          }}
        >
          <IslemBasariliModal
            setOpenIslemBasariliModal={setOpenIslemBasariliModal}
            setActiveState={setActiveState}
          />
        </Modal>
      </View>
    </View>
  );
};
export default BildirimlerKotuyeKullanim;
const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    borderColor: "#6C757D",
    borderWidth: 0.4,
  },
  textStyle: {
    color: "#6C757D",
    fontSize: 10,
    margin: 10,
  },
  mainFrame: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rowButtons: {
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#6C757D",
    borderWidth: 0.4,
  },
});
