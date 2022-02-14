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
  Alert,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FlatListSlider } from "react-native-flatlist-slider";
import * as ImagePicker from "expo-image-picker";
import { useUserValue } from "../../../contexts/UserContext";
import Bayrak from "../../../../assets/flag/tr.png";
import Logo1 from "../../../../assets/expologo.png";
import Camera from "../../../../assets/camera.png";
import Attach from "../../../../assets/attach.png";
import Plus from "../../../../assets/add.png";
import Geri from "../../../../assets/forgotpass/go-back-black.png";
import { postStream } from "../../../helpers/streamConnections";

const ekran = Dimensions.get("screen");
const calculatedSize = ekran.width / 5;
const calculatedSizeOfWidht = ekran.width;
const calculatedSizeOfHeight = ekran.height;
const CreatePostModal = ({ setModalOpen, setImageModelOpen, imagesToServer, setImagesToServer, camOn, setCamOn }) => {
  const [{ user }] = useUserValue();
  const [text, setText] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);
  const tempArray = [];
  const [document, setDocument] = useState(null);

  const [streamData, setStreamData] = useState();

  useEffect(() => {
    setImagesToServer([]); // iptal sonrası data sıfırlama
    if (camOn === true) {
      openCamera();
      setCamOn(false);
    }
    return () => {};
  }, [camOn]);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
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
      allowsMultipleSelection: true,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  const pickMulImage = async () => {
    setImageModelOpen(true);
  };
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Explore the result
    // console.log(result);

    if (!result.cancelled) {
      setImage(result);
      // console.log(result.uri);
    }
  };
  const calculateSize = (imageWidth, imageHeight) => {
    const imageSize = (imageWidth * imageHeight * 3) / 1024;
    return imageSize;
  };
  const sendMultipleImage = async () => {
    // console.log(imagesToServer);

    imagesToServer.forEach((element) => {
      // console.log(element);
      if (element.mediaType === "photo") {
        tempArray.push({
          uri: element.uri,
          tmp_name: element.filename,
          name: element.filename,
          type: "image/jpeg",
          size: calculateSize(element.width, element.height),
        });
      } else if (element.mediaType === "video") {
        tempArray.push({
          uri: element.uri,
          tmp_name: element.filename,
          name: element.filename,
          type: "video/mp4",
          size: calculateSize(element.width, element.height),
        });
      }
    });
    // console.log(tempArray);
    // console.log("calculatedSizeOfWidhtansheight");
    // console.log(calculatedSizeOfWidht);
    // console.log(calculatedSizeOfHeight);
    const postData = new FormData();
    postData.append("profile_id", 21);
    postData.append("text_content", text);
    // const width = image.width;
    // const height = image.height;
    // const imageSize = (width * height * 3) / 1024;
    tempArray.forEach((element) => {
      postData.append("files[]", element); // burada backend files[] olarak almalı hem videoyu hem image ı. display edilirken type kontrolu olmalı
    });
    await postStream(postData, user.token)
      .then((res) => setStreamData(res.streams)) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => setStreamData("err"));
    /*
    {
      uri: image.uri,
      tmp_name: image.uri,
      name: image.uri.substring(image.uri.lastIndexOf("/") + 1),
      type: "image/jpeg",
      size: imageSize,
    } 
    */
    // postData.append("video", []);
    // postData.append("document", []);

    console.log("veritabanına gönderildi");
    console.log(postData);

    setModalOpen(false);
  };
  const sendFromCamera = async () => {
    console.log("cameramod calıstı");

    const postData = new FormData();
    postData.append("profile_id", 21);
    postData.append("text_content", text);
    const width = image.width;
    const height = image.height;
    const imageSize = (width * height * 3) / 1024;
    postData.append("files[]", {
      uri: image.uri,
      tmp_name: image.uri,
      name: image.uri.substring(image.uri.lastIndexOf("/") + 1),
      type: "image/jpeg",
      size: imageSize,
    });
    await postStream(postData, user.token)
      .then((res) => setStreamData(res.streams)) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => setStreamData("err"));
    setModalOpen(false);
  };
  const sendDoc = async () => {
    console.log("sendDoc calıstı");
    console.log(document);

    const postData = new FormData();
    postData.append("profile_id", 21);
    postData.append("text_content", text);
    postData.append("files2[]", {
      uri: document.uri,
      tmp_name: document.name,
      name: document.name,
      type: "document/pdf",
      size: document.size,
    });
    await postStream(postData, user.token)
      .then((res) => setStreamData(res.streams)) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => setStreamData("err"));
    setModalOpen(false);
  };

  const onPress = async () => {
    if (image != null) {
      sendFromCamera();
    } else if (document != null) {
      sendDoc();
    } else sendMultipleImage();
  };
  const toTempArray = (array) => {
    const tempraryArray = [];
    array.forEach((element) => {
      tempraryArray.push({
        image: element.uri,
      });
    });
    return tempraryArray;
  };
  const pickDoc = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    //  console.log(result);
    setDocument({
      name: result.name,
      size: result.size,
      type: result.type,
      uri: result.uri,
    });

    console.log(document);
  };

  return (
    <View style={styles.mainFrame}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => setModalOpen(false)}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Image style={{ height: 45, width: 45 }} source={Geri} resizeMode="contain" />
            <Text style={{ color: "#6C757D", fontSize: 20 }}>Gönderi Oluştur</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.topRow}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ justifyContent: "flex-start", height: calculatedSize, width: calculatedSize }}
              source={Logo1}
              resizeMode="contain"
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 12, color: "#6C757D" }}>Kullanıcı Adı</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <Image style={{ height: 20, width: 20, marginRight: 2 }} source={Bayrak} resizeMode="contain" />
                <Text style={{ fontSize: 10, textAlignVertical: "center", color: "#6C757D" }}>TR</Text>

                <Text style={{ paddingLeft: 10, fontSize: 8, textAlignVertical: "center", color: "#6C757D" }}>
                  Bireysel
                </Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#6C757D", fontSize: 12, padding: 10 }} onPress={onPress}>
                PAYLAŞ
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 7 }}>
          <View style={styles.neDusunuyorsun}>
            <TextInput
              style={styles.neDusunuyorsunText}
              placeholder="Ne Düşünüyorsun ?"
              onChangeText={setText}
              value={text}
              multiline
            />
            <View style={{ flex: 4, alignSelf: "center" }}>
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: calculatedSizeOfWidht / 1.15,
                    height: calculatedSizeOfHeight / 3.3,
                    alignSelf: "center",
                    marginVertical: 30,
                  }}
                />
              )}

              {imagesToServer.length > 0 ? (
                /* <Image
              source={{ uri: imagesToServer[0].uri }}
              style={{
                width: calculatedSizeOfWidht / 1.15,
                height: calculatedSizeOfHeight / 3.3,
                alignSelf: "center",
                marginVertical: 30,
              }}
            /> */
                <FlatListSlider
                  data={toTempArray(imagesToServer)}
                  contentContainerStyle={{}}
                  timer={9000}
                  autoscroll={false}
                />
              ) : null}
            </View>
            <View style={{ flex: 1 }}>{document && <Text>{document.name}</Text>}</View>
          </View>
        </View>
      </View>

      <View style={styles.ekle}>
        <Text style={styles.ekleText}>Fotoğraf veya Video Ekle</Text>
        <TouchableOpacity onPress={pickMulImage}>
          <Image style={{ height: 25, width: 25, marginRight: 15 }} source={Camera} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickDoc}>
          <Image style={{ height: 25, width: 25, marginRight: 15 }} source={Attach} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePostModal;

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  neDusunuyorsun: {
    flex: 7,
    backgroundColor: "#FFF",
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    height: "100%",
  },
  neDusunuyorsunText: {
    fontSize: 15,
    color: "#6C757D",
    flex: 2,
  },
  button: {
    borderColor: "#00AA9F",
    borderWidth: 1,
  },
  ekle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    height: 50,
  },
  ekleText: {
    flex: 1,
    fontSize: 15,
    color: "#6C757D",
    padding: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 85,
  },
  back: {
    flexDirection: "row",
    margin: 5,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  mainContainer: {
    flexDirection: "column",
    flex: 10,
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
});
