/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList, Modal } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Tooltip } from "react-native-elements";

import { Flags } from "../../../../../../components/FlagExporter";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import FileJpeg from "../../../../../../../assets/fileformat/jpg.png";
import FilePng from "../../../../../../../assets/fileformat/png.png";
import FilePdf from "../../../../../../../assets/fileformat/pdf.png";
import FileWord from "../../../../../../../assets/fileformat/docx.png";
import FileExcel from "../../../../../../../assets/fileformat/xlsx.png";
import FilePowerpoint from "../../../../../../../assets/fileformat/pptx.png";

import File from "../../../../../../../assets/fileformat/file.png";

import GelenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-kartvizit.png";
import GidenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/giden-kartvizit.png";
import GelenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-brosur.png";
import GidenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/giden-brosur.png";
import GelenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-vexdrive.png";
import GidenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/giden-vexdrive.png";

import stantYayindaIcon from "../../../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import FullScreenImageModal from "../../../../homeComponents/FullScreenImageModal";

import { documentsSaveToDrive } from "../../../../../../helpers/connections";
import { useUserValue } from "../../../../../../contexts/UserContext";
import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";
import StantInfoHeader from "../../StantInfoHeader";

// import TDotH from "../../../../../../assets/three-dot-h.png";

const WIDTH_WINDOW = Dimensions.get("window").width;

const VexDriveModal = ({ closePress, selectedItem, documentType, dItem }) => {
  const [handledUser, setHandledUser] = useState(null);
  const [selectedShareable, setSelectedShareable] = useState([]);

  const [{ user }] = useUserValue();

  useEffect(() => {
    if (documentType === "giden-kartvizit" || documentType === "giden-brosur" || documentType === "giden-vexdrive") {
      setHandledUser(selectedItem.contacted_user);
      // console.log(selectedItem);
    } else {
      setHandledUser(selectedItem.user);
      // console.log(selectedItem);
      /*   console.log("--------- 1111 -------------");
      selectedItem.shareable.expodrive_contents.map((el) => console.log(el.cloudfile.id));
      // console.log(selectedItem.shareable.expodrive_contents.cloudfile_id);
      console.log("--------- 22222 -------------"); */
    }
  }, []);

  const selectAllShareable = () => {
    selectedItem.shareable.expodrive_contents.map((el) => {
      if (!selectedShareable.includes(el.cloudfile.id)) {
        setSelectedShareable((prevArray) => [...prevArray, el.cloudfile.id]);
      }
      return true;
    });

    console.log(selectedShareable);
  };

  const postData = new FormData();

  const saveAllDocuments = () => {
    selectedShareable.map((el) => postData.append("shareable_ids[]", el));

    postData.append("contacted_user_id", 61);
    postData.append("is_profile", 0);
    postData.append("booth_id", -1);

    documentsSaveToDrive(postData, user.token)
      .then((res) => {
        console.log(res);
        setSelectedShareable([]);
      })
      .catch((err) => console.log(err));
  };

  const setUyelikTuru = () => {
    if (handledUser?.userrole_id === 1) {
      return "Bireysel";
    }
    if (handledUser?.userrole_id === 2) {
      return "Ticari";
    }
    if (handledUser?.userrole_id === 3) {
      return "Kamu";
    }
    if (handledUser?.userrole_id === 4) {
      return "STK";
    }
  };

  const setTypeIcon = () => {
    switch (documentType) {
      case "giden-kartvizit":
        return GidenKartvizitIcon;

      case "gelen-kartvizit":
        return GelenKartvizitIcon;

      case "giden-brosur":
        return GidenBrosurIcon;

      case "gelen-brosur":
        return GelenBrosurIcon;

      case "giden-vexdrive":
        return GidenVexDriveIcon;

      case "gelen-vexdrive":
        return GelenVexDriveIcon;

      default:
        break;
    }
  };

  const getMainText = () => {
    switch (documentType) {
      case "giden-kartvizit":
        return "Giden Kartvizit";

      case "gelen-kartvizit":
        return "Gelen Kartvizit";

      case "giden-brosur":
        return "Giden Broşür";

      case "gelen-brosur":
        return "Gelen Broşür";

      case "giden-vexdrive":
        return "Giden VexDrive";

      case "gelen-vexdrive":
        return "Gelen VexDrive";
      default:
        break;
    }
  };

  const getMainIcon = () => {
    switch (dItem.status) {
      case 1:
        return stantYayindaIcon;
      case 2:
        return stantYayinBitenIcon;
      case 3:
        return stantYayinBekleyenIcon;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={closePress}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>
            {dItem.name} - {getMainText()}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <StantInfoHeader stant={dItem} />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            <View
              style={{
                height: 65,
                width: WIDTH_WINDOW - 20,
                marginTop: 5,
                elevation: 6,
                backgroundColor: "#FFFFFF",
                justifyContent: "flex-start",
              }}
            >
              <View style={{ height: 65, flexDirection: "row", paddingHorizontal: 5 }}>
                {/* foto */}
                <View style={{ flex: 4.6, justifyContent: "center", alignItems: "flex-start" }}>
                  {handledUser && (
                    <ProfileBox
                      roleID={handledUser?.userrole_id}
                      userID={handledUser?.userdetail.user_id}
                      userAvatar={handledUser?.userdetail?.picture_url}
                      fullName={handledUser?.userdetail?.name}
                      institutionName={handledUser?.userdetail?.full_institution_name}
                      countryBinary={handledUser?.userdetail?.country?.binarycode}
                      /* timeCalculate */
                    />
                  )}
                </View>

                {/* dokuman tipi */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <View
                    style={{
                      height: WIDTH_WINDOW / 15,
                      width: WIDTH_WINDOW / 15,
                      backgroundColor: "#FFFFFF",
                      padding: 2,
                    }}
                  >
                    <Image style={{ height: "100%", width: "100%" }} source={setTypeIcon()} resizeMode="contain" />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flex: 10, paddingTop: 5 }}>
              <FlatList
                contentContainerStyle={{ alignItems: "flex-start" }}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={10}
                data={selectedItem.shareable.expodrive_contents}
                renderItem={({ item, index }) => (
                  <VexDriveListItem
                    listItem={item}
                    selectedShareable={selectedShareable}
                    setSelectedShareable={setSelectedShareable}
                    selectAllShareable={selectAllShareable}
                  />
                )}
                key={4}
                numColumns={4}
                keyExtractor={(itm, index) => index.toString()}
              />

              {Object.keys(selectedShareable).length > 0 && (
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                  <TouchableOpacity style={styles.mainButton} onPress={() => saveAllDocuments()}>
                    <Text style={styles.mainButtonText}>Seçilileri Kaydet</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VexDriveModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  headFrame: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "space-between",
  },

  tooltipContainer: {
    alignSelf: "flex-start",
  },

  tooltipItems: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  tooltipText: {
    color: "#6C757D",
    marginLeft: 10,
  },
  mainButton: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#00AA9F",
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

const VexDriveListItem = ({ listItem, selectedShareable, setSelectedShareable, selectAllShareable }) => {
  const [tooltipVpos, setTooltipVpos] = useState(2000);
  const [tooltipHpos, setTooltipHpos] = useState(2000);

  const [fullScreenModal, setFullScreenModal] = useState(false);

  const [{ user }] = useUserValue();

  const tooltipRef = useRef(null);
  const itemRef = useRef(null);

  /* console.log("--------- 1111 -------------");
  console.log(listItem);
  console.log("--------- 22222 -------------"); */

  const setFileType = (file) => {
    switch (file) {
      case "jpg":
        return FileJpeg;
      case "jpeg":
        return FileJpeg;

      case "png":
        return FilePng;

      case "pdf":
        return FilePdf;

      case "docx":
        return FileWord;
      case "doc":
        return FileWord;

      case "xlsx":
        return FileExcel;
      case "xls":
        return FileExcel;

      case "pptx":
        return FilePowerpoint;
      case "ppt":
        return FilePowerpoint;

      default:
        return File;
    }
  };

  const postData = new FormData();

  const saveDocuments = ({ selected }) => {
    console.log("-- saveDocuments Çalıştı ----");
    console.log(selected);

    postData.append("shareable_ids[]", selected);
    postData.append("contacted_user_id", 61);
    postData.append("is_profile", 0);
    postData.append("booth_id", -1);

    documentsSaveToDrive(postData, user.token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const changeSelectedShareable = (shareableID) => {
    console.log("--- çaşştımsdav...");
    if (!selectedShareable.includes(shareableID)) {
      setSelectedShareable((prevArray) => [...prevArray, shareableID]);
    } else {
      setSelectedShareable(selectedShareable.filter((item) => item !== shareableID));
    }

    console.log(selectedShareable);
  };

  const tooltipPopover = () => {
    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity
          style={styles.tooltipItems}
          onPress={() => {
            tooltipRef.current.toggleTooltip(false);
            changeSelectedShareable(listItem.cloudfile.id);
          }}
        >
          <Text style={styles.tooltipText}>Seç</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tooltipItems}
          onPress={() => {
            tooltipRef.current.toggleTooltip(false);
            saveDocuments({ selected: listItem.cloudfile.id });
          }}
        >
          <Text style={styles.tooltipText}>Kaydet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => setFullScreenModal(true)}>
          <Text style={styles.tooltipText}>Görüntüle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tooltipItems}
          onPress={() => {
            tooltipRef.current.toggleTooltip(false);
            selectAllShareable();
          }}
        >
          <Text style={styles.tooltipText}>Tümünü Seç</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Tooltip
      ref={tooltipRef}
      onOpen={() =>
        itemRef.current.measure((a, b, width, height, px, py) => {
          setTooltipVpos(py);
          setTooltipHpos(px);
        })
      }
      containerStyle={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#EEEEEE",
        top: tooltipVpos,
        right: tooltipHpos,
      }}
      // overlayColor="#00AA9F30"
      skipAndroidStatusBar
      height={160}
      width={110}
      backgroundColor="#FFFFFF"
      withPointer={false}
      popover={tooltipPopover()}
    >
      <TouchableOpacity /* outer view */
        style={{
          width: WIDTH_WINDOW / 4 - 5,
          height: WIDTH_WINDOW / 3 - 5,
          alignItems: "center",
          padding: 5,
        }}
        onLongPress={() => tooltipRef.current.toggleTooltip()}
        onPress={() =>
          Object.keys(selectedShareable).length > 0
            ? changeSelectedShareable(listItem.cloudfile.id)
            : setFullScreenModal(true)
        }
      >
        <View
          style={{
            width: "100%",
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 2,
            borderWidth: 0.5,
            borderColor: "#c1c1c1",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Image
            ref={itemRef}
            style={{ height: "70%", width: "70%" }}
            source={setFileType(listItem.cloudfile.file_name.split(".").pop())}
            resizeMode="contain"
          />

          {Object.keys(selectedShareable).length > 0 && (
            <View style={{ position: "absolute", top: -7, left: -7 }}>
              <CheckBox
                tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
                disabled={false}
                value={selectedShareable.includes(listItem.cloudfile.id)}
                onValueChange={() => {
                  setSelectedShareable((prevArray) => {
                    if (prevArray.includes(listItem.cloudfile.id)) {
                      return prevArray.filter((itm) => itm !== listItem.cloudfile.id);
                    }
                    return [...prevArray, listItem.cloudfile.id];
                  });
                  console.log(selectedShareable);
                }}
              />
            </View>
          )}

          {/* <Text>Dosya</Text> */}
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 10, color: "#6C757D", textAlign: "center" }}>
          {listItem.cloudfile.file_name}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent
        animationType="fade"
        visible={fullScreenModal}
        onRequestClose={() => {
          setFullScreenModal((prev) => !prev);
        }}
      >
        <FullScreenImageModal closePress={() => setFullScreenModal(false)} img={listItem.cloudfile.file_url} />
      </Modal>
    </Tooltip>
  );
};
