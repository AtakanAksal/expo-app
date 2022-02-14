/* eslint-disable no-unneeded-ternary */
/* eslint-disable global-require */
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, FlatList, Alert } from "react-native";
import { Tooltip } from "react-native-elements";

import FullScreenImageModal from "../homeComponents/FullScreenImageModal";

import ShareKartvizitModal from "./ShareKartvizitModal";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import FotografIcon from "../../../../assets/profileitems/fotograf-icon.png";
import AddIcon from "../../../../assets/add.png";
import FolderIcon from "../../../../assets/folder.png";
import ThreeDotIcon from "../../../../assets/three-dot-h.png";

import DeleteIcon from "../../../../assets/tooltip/delete.png";
import EditIcon from "../../../../assets/tooltip/edit.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const FolderFotografModal = ({ closePress, folder, selectedIndexFolder, setSelectedIndexFolder }) => {
  const images = [
    "https://img-s1.onedio.com/id-5587b3254bc978ec635e7859/rev-0/w-900/h-600/f-jpg/s-3dad1d943752fba224959578f57478ba2c7215ba.jpg",
    "https://i2.cnnturk.com/i/cnnturk/75/800x400/60be1b085cf3b018dc25efdf",
    "https://img-s1.onedio.com/id-5587b3254bc978ec635e7859/rev-0/w-900/h-600/f-jpg/s-3dad1d943752fba224959578f57478ba2c7215ba.jpg",
    "https://www.fotografdergisi.com/wp-content/uploads/2018/01/1502107912_gorsel_5.jpg",
    "https://www.haberso.com/sites/367/uploads/2020/10/31/large/281da668a96e2e4c-1604163873-1604163885.jpg",
    "https://i2.cnnturk.com/i/cnnturk/75/800x400/60be1b085cf3b018dc25efdf",
    "https://www.fotografdergisi.com/wp-content/uploads/2018/01/1502107912_gorsel_5.jpg",
    "https://i2.cnnturk.com/i/cnnturk/75/800x400/60be1b085cf3b018dc25efdf",
    "https://www.haberso.com/sites/367/uploads/2020/10/31/large/281da668a96e2e4c-1604163873-1604163885.jpg",
    "https://img-s1.onedio.com/id-5587b3254bc978ec635e7859/rev-0/w-900/h-600/f-jpg/s-3dad1d943752fba224959578f57478ba2c7215ba.jpg",
    "https://i2.cnnturk.com/i/cnnturk/75/800x400/60be1b085cf3b018dc25efdf",
    "https://www.fotografdergisi.com/wp-content/uploads/2018/01/1502107912_gorsel_5.jpg",
    "https://www.haberso.com/sites/367/uploads/2020/10/31/large/281da668a96e2e4c-1604163873-1604163885.jpg",
    "https://img-s1.onedio.com/id-5587b3254bc978ec635e7859/rev-0/w-900/h-600/f-jpg/s-3dad1d943752fba224959578f57478ba2c7215ba.jpg",
    "https://www.fotografdergisi.com/wp-content/uploads/2018/01/1502107912_gorsel_5.jpg",
    "https://i2.cnnturk.com/i/cnnturk/75/800x400/60be1b085cf3b018dc25efdf",
    "https://www.haberso.com/sites/367/uploads/2020/10/31/large/281da668a96e2e4c-1604163873-1604163885.jpg",
  ];

  const [fullScreenModal, setFullScreenModal] = useState(false);
  const [selectImgIndex, setSelectImgIndex] = useState(0);

  const openImageFullScreen = (index) => {
    setSelectImgIndex(index);
    setFullScreenModal(true);
  };

  const openDeleteAlert = () => {
    Alert.alert(
      null,
      `Seçtiğiniz ${selectedIndexFolder.length} Adet fotoğrafı silmek 
      istediğinizden emin misiniz?`,
      [
        {
          text: "Hayır",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Evet", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: true }
    );
  };
  const SelectedButtons = () => (
    <View style={{ height: 60, width: "100%", flexDirection: "row", padding: 5 }}>
      <TouchableOpacity
        style={{
          margin: 5,
          backgroundColor: "#00AA9F",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={openDeleteAlert}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Sil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          margin: 5,
          backgroundColor: "#00AA9F",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Taşı</Text>
      </TouchableOpacity>
    </View>
  );

  const ChangeSelectedIndex = (index) => {
    if (!selectedIndexFolder.includes(index)) {
      setSelectedIndexFolder((prevArray) => [...prevArray, index]);
    } else {
      setSelectedIndexFolder(selectedIndexFolder.filter((item) => item !== index));
    }

    console.log(selectedIndexFolder);
  };

  const selectAllImages = () => {
    Object.keys(images).map(
      (el) =>
        !selectedIndexFolder.includes(parseInt(el, 10)) &&
        setSelectedIndexFolder((prevArray) => [...prevArray, parseInt(el, 10)])
    );
  };

  const openSelectModeOn = (index) => {
    ChangeSelectedIndex(index);
  };
  const closeSelectModeOn = () => {
    setSelectedIndexFolder([]);
  };

  const renderrItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        onPress={selectedIndexFolder.length > 0 ? () => ChangeSelectedIndex(index) : () => openImageFullScreen(index)}
        onLongPress={selectedIndexFolder.length > 0 ? () => ChangeSelectedIndex(index) : () => openSelectModeOn(index)}
        delayLongPress={350}
      >
        <Image
          style={{ height: WIDTH_WINDOWS / 2 - 20, width: WIDTH_WINDOWS / 2 - 20, margin: 5 }}
          source={{ uri: item }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      {selectedIndexFolder.length > 0 &&
        (selectedIndexFolder.includes(index) ? (
          <View style={styles.selectButton}>
            <View style={{ backgroundColor: "#00AA9F", width: 12, height: 12 }} />
          </View>
        ) : (
          <View style={styles.selectButton} />
        ))}
    </View>
  );

  const tooltipPopoverInfoBar = () => {
    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Sil tıklandı")}>
          <Image source={FotografIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>Fotoğraf Ekle</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/** @@@@@  HEAD @@@@@ */}
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          {selectedIndexFolder.length > 0 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => closeSelectModeOn()}>
                <Image style={{ height: 40, width: 40, marginRight: 10 }} source={DeleteIcon} resizeMode="contain" />
              </TouchableOpacity>
              <Text style={{ color: "#6C757D", fontSize: 17 }}>{selectedIndexFolder.length} adet seçildi</Text>
            </View>
          ) : (
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={closePress}>
              <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
              <Text style={{ color: "#6C757D", fontSize: 20 }}>Fotoğraf</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          {selectedIndexFolder.length > 0 && (
            <TouchableOpacity onPress={() => selectAllImages()}>
              <View
                style={{
                  marginTop: 5,
                  borderWidth: 0.5,
                  borderColor: "#c1c1c1",
                  width: 20,
                  height: 20,
                  backgroundColor: "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {images.length === selectedIndexFolder.length ? (
                  <View style={{ backgroundColor: "#00AA9F", width: 12, height: 12 }} />
                ) : (
                  <View style={{ backgroundColor: "#FFFFFF", width: 12, height: 12 }} />
                )}
              </View>
              <Text style={{ color: "#6C757D", fontSize: 8, marginTop: 3 }}>Hepsi</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/** @@@@@  MİDD @@@@@ */}
      <View style={styles.midFrame}>
        <View style={styles.infoTab}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
            <Image
              style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5 }}
              source={FotografIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D", fontSize: 18 }}>{folder}</Text>
          </View>

          {!selectedIndexFolder.length > 0 && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Tooltip
                containerStyle={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#EEEEEE",
                  top: 90,
                  left: WIDTH_WINDOWS / 2 - 10,
                }}
                //          overlayColor="#00AA9F30"
                skipAndroidStatusBar
                height={80}
                width={150}
                backgroundColor="#FFFFFF"
                withPointer={false}
                popover={tooltipPopoverInfoBar()}
              >
                <Image
                  style={{ height: HEIGHT_WINDOWS / 20, width: HEIGHT_WINDOWS / 20, margin: 5 }}
                  source={AddIcon}
                  resizeMode="contain"
                />
              </Tooltip>
            </View>
          )}
        </View>

        <View style={styles.mainFrame}>
          <>
            <FlatList
              maxToRenderPerBatch={10}
              data={images}
              renderItem={renderrItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              key={1}
            />

            {selectedIndexFolder.length > 0 && <SelectedButtons />}

            <Modal
              transparent
              animationType="fade"
              visible={fullScreenModal}
              onRequestClose={() => {
                setFullScreenModal((prev) => !prev);
              }}
            >
              <FullScreenImageModal closePress={() => setFullScreenModal(false)} img={images[selectImgIndex]} />
            </Modal>
          </>
        </View>
      </View>
    </View>
  );
};

export default FolderFotografModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  headFrame: {
    flexDirection: "row",
    margin: 5,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  midFrame: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  infoTab: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    padding: 5,
  },
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },

  // tooltips styles
  tooltipContainer: {
    alignSelf: "flex-start",
  },

  tooltipItems: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  tooltipImage: {
    height: 25,
    width: 25,
  },

  tooltipText: {
    color: "#6C757D",
    marginLeft: 10,
  },
  selectButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#c1c1c1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
});
