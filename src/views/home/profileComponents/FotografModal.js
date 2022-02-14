
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, FlatList, Alert } from "react-native";
import { Tooltip } from "react-native-elements";

import FullScreenImageModal from "../homeComponents/FullScreenImageModal";

import FolderFotografModal from "./FolderFotografModal";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import FotografIcon from "../../../../assets/profileitems/fotograf-icon.png";
import AddIcon from "../../../../assets/add.png";
import FolderIcon from "../../../../assets/folder.png";
import ThreeDotIcon from "../../../../assets/three-dot-h.png";

import DeleteIcon from "../../../../assets/tooltip/delete.png";
import EditIcon from "../../../../assets/tooltip/edit.png";

const HEIGHT_WINDOWS = Dimensions.get("window").height;
const WIDTH_WINDOWS = Dimensions.get("window").width;

const FotografModal = ({ closePress, selectedIndex, setSelectedIndex }) => {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [fullScreenModal, setFullScreenModal] = useState(false);
  const [selectImgIndex, setSelectImgIndex] = useState(0);
  const [tooltipVpos, setTooltipVpos] = useState(2000);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedIndexFolder, setSelectedIndexFolder] = useState([]);

  const dotRef = useRef(null);

  const openImageFullScreen = (index) => {
    setSelectImgIndex(index);
    setFullScreenModal(true);
  };

  const openFolder = (folder) => {
    if (!selectedIndex.length > 0) {
      setSelectedFolder(folder);
      setFolderModalVisible(true);
    }
  };
  const openDeleteAlert = () => {
    Alert.alert(
      null,
      `Seçtiğiniz ${selectedIndex.length} adet fotoğrafı silmek 
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
    if (!selectedIndex.includes(index)) {
      setSelectedIndex((prevArray) => [...prevArray, index]);
    } else {
      setSelectedIndex(selectedIndex.filter((item) => item !== index));
    }

    console.log(selectedIndex);
  };

  const selectAllImages = () => {
    Object.keys(images).map(
      (el) =>
        !selectedIndex.includes(parseInt(el, 10)) && setSelectedIndex((prevArray) => [...prevArray, parseInt(el, 10)])
    );
  };

  const openSelectModeOn = (index) => {
    ChangeSelectedIndex(index);
  };
  const closeSelectModeOn = () => {
    setSelectedIndex([]);
  };

  const renderrItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        onPress={selectedIndex.length > 0 ? () => ChangeSelectedIndex(index) : () => openImageFullScreen(index)}
        onLongPress={selectedIndex.length > 0 ? () => ChangeSelectedIndex(index) : () => openSelectModeOn(index)}
        delayLongPress={350}
      >
        <Image
          style={{ height: WIDTH_WINDOWS / 2 - 20, width: WIDTH_WINDOWS / 2 - 20, margin: 5 }}
          source={{ uri: item }}
          resizeMode="cover"
        />
        
      </TouchableOpacity>
      {selectedIndex.length > 0 &&
          (selectedIndex.includes(index) ? (
            <View style={styles.selectButton}>
              <View style={{ backgroundColor: "#00AA9F", width: 12, height: 12 }} />
            </View>
          ) : (
            <View style={styles.selectButton} />
          ))}
    </View>
  );

  const headerComponent = () => (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
      {/*  folder item */}
      <View style={{ width: "50%" }}>
        <TouchableOpacity onPress={() => openFolder("LIGHTHOUSE")} >
          <View
            style={{
              margin: 5,
              shadowColor: "#c1c1c1",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 3,
              borderColor: "#FFFFFF",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: WIDTH_WINDOWS / 3, height: WIDTH_WINDOWS / 3 }}
              source={FolderIcon}
              resizeMode="contain"
            />
            <Text style={{ textAlign: "center", color: "#6C757D" }}>LIGHTHOUSE</Text>
            <View style={{ position: "absolute", top: 5, right: 10 }}>
              <Tooltip
                onOpen={() => dotRef.current.measure((a, b, width, height, px, py) => setTooltipVpos(py))}
                containerStyle={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#EEEEEE",
                  top: tooltipVpos + 20,
                  left: WIDTH_WINDOWS / 2 - 20,
                }}
                //          overlayColor="#00AA9F30"
                skipAndroidStatusBar
                height={120}
                width={160}
                backgroundColor="#FFFFFF"
                withPointer={false}
                popover={tooltipPopover("LIGHTHOUSE")}
              >
                <Image
                  ref={dotRef}
                  style={{
                    width: WIDTH_WINDOWS / 15,
                    height: WIDTH_WINDOWS / 15,
                  }}
                  source={ThreeDotIcon}
                  resizeMode="contain"
                />
              </Tooltip>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/*  folder item end */}

      {/*  folder item */}
      <View style={{ width: "50%" }}>
        <TouchableOpacity onPress={() => openFolder("AMINTHAS")}>
          <View
            style={{
              margin: 5,
              shadowColor: "#c1c1c1",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 3,
              borderColor: "#FFFFFF",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: WIDTH_WINDOWS / 3, height: WIDTH_WINDOWS / 3 }}
              source={FolderIcon}
              resizeMode="contain"
            />
            <Text style={{ textAlign: "center", color: "#6C757D" }}>AMINTHAS</Text>
            <View style={{ position: "absolute", top: 5, right: 10 }}>
              <Tooltip
                onOpen={() => dotRef.current.measure((a, b, width, height, px, py) => setTooltipVpos(py))}
                containerStyle={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#EEEEEE",
                  top: tooltipVpos + 20,
                  left: WIDTH_WINDOWS / 2 - 20,
                }}
                //          overlayColor="#00AA9F30"
                skipAndroidStatusBar
                height={120}
                width={160}
                backgroundColor="#FFFFFF"
                withPointer={false}
                popover={tooltipPopover("AMINTHAS")}
              >
                <Image
                  ref={dotRef}
                  style={{
                    width: WIDTH_WINDOWS / 15,
                    height: WIDTH_WINDOWS / 15,
                  }}
                  source={ThreeDotIcon}
                  resizeMode="contain"
                />
              </Tooltip>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/*  folder item end */}

      {/*  folder item */}
      <View style={{ width: "50%" }}>
        <TouchableOpacity onPress={() => openFolder("GER.COM.TR")}>
          <View
            style={{
              margin: 5,
              shadowColor: "#c1c1c1",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 3,
              borderColor: "#FFFFFF",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: WIDTH_WINDOWS / 3, height: WIDTH_WINDOWS / 3 }}
              source={FolderIcon}
              resizeMode="contain"
            />
            <Text style={{ textAlign: "center", color: "#6C757D" }}>GER.COM.TR</Text>
            <View style={{ position: "absolute", top: 5, right: 10 }}>
              <Tooltip
                onOpen={() => dotRef.current.measure((a, b, width, height, px, py) => setTooltipVpos(py))}
                containerStyle={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#EEEEEE",
                  top: tooltipVpos + 20,
                  left: WIDTH_WINDOWS / 2 - 20,
                }}
                //          overlayColor="#00AA9F30"
                skipAndroidStatusBar
                height={120}
                width={160}
                backgroundColor="#FFFFFF"
                withPointer={false}
                popover={tooltipPopover("GER.COM.TR")}
              >
                <Image
                  ref={dotRef}
                  style={{
                    width: WIDTH_WINDOWS / 15,
                    height: WIDTH_WINDOWS / 15,
                  }}
                  source={ThreeDotIcon}
                  resizeMode="contain"
                />
              </Tooltip>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/*  folder item end */}

      {/*  folder item */}
      <View style={{ width: "50%" }}>
        <TouchableOpacity onPress={() => openFolder("VEXPO BİLİSİM")}>
          <View
            style={{
              margin: 5,
              shadowColor: "#c1c1c1",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 3,
              borderColor: "#FFFFFF",
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: WIDTH_WINDOWS / 3, height: WIDTH_WINDOWS / 3 }}
              source={FolderIcon}
              resizeMode="contain"
            />
            <Text style={{ textAlign: "center", color: "#6C757D" }}>VEXPO BİLİSİM</Text>
            <View style={{ position: "absolute", top: 5, right: 10 }}>
              <Tooltip
                onOpen={() => dotRef.current.measure((a, b, width, height, px, py) => setTooltipVpos(py))}
                containerStyle={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#EEEEEE",
                  top: tooltipVpos + 20,
                  left: WIDTH_WINDOWS / 2 - 20,
                }}
                //          overlayColor="#00AA9F30"
                skipAndroidStatusBar
                height={120}
                width={160}
                backgroundColor="#FFFFFF"
                withPointer={false}
                popover={tooltipPopover("VEXPO BİLİSİM")}
              >
                <Image
                  ref={dotRef}
                  style={{
                    width: WIDTH_WINDOWS / 15,
                    height: WIDTH_WINDOWS / 15,
                  }}
                  source={ThreeDotIcon}
                  resizeMode="contain"
                />
              </Tooltip>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/*  folder item end */}
    </View>
  );

  const tooltipPopover = (folder) => {
    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity style={styles.tooltipItems} onPress={() => openFolder(folder)}>
          <Image source={FolderIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>Aç</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Sil tıklandı")}>
          <Image source={DeleteIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>Sil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Yeniden Adlandır tıklandı")}>
          <Image source={EditIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>Yeniden Adlandır</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const tooltipPopoverInfoBar = () => {
    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Fotoğraf Ekle")}>
          <Image source={FotografIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>Fotoğraf Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Klasör Oluştur")}>
          <Image source={FolderIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>Klasör Oluştur</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/** @@@@@  HEAD @@@@@ */}
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          {selectedIndex.length > 0 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => closeSelectModeOn()}>
                <Image style={{ height: 40, width: 40, marginRight: 10 }} source={DeleteIcon} resizeMode="contain" />
              </TouchableOpacity>
              <Text style={{ color: "#6C757D", fontSize: 17 }}>{selectedIndex.length} adet seçildi</Text>
            </View>
          ) : (
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={closePress}>
              <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
              <Text style={{ color: "#6C757D", fontSize: 20 }}>Profilim</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          {selectedIndex.length > 0 && (
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
                  shadowColor: "#c1c1c1",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                {images.length === selectedIndex.length ? (
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
            <Text style={{ color: "#6C757D", fontSize: 18 }}>Fotoğraf</Text>
          </View>

          {!selectedIndex.length > 0 && (
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
              ListHeaderComponent={headerComponent} // null geçilebilir
              renderItem={renderrItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              key={1}
            />
            {selectedIndex.length > 0 && <SelectedButtons />}
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
            <Modal
              transparent
              animationType="fade"
              visible={folderModalVisible}
              onRequestClose={
                selectedIndexFolder.length > 0
                  ? () => setSelectedIndexFolder([])
                  : () => setFolderModalVisible((prev) => !prev)
              }
            >
              <FolderFotografModal
                closePress={() => setFolderModalVisible(false)}
                folder={selectedFolder}
                selectedIndexFolder={selectedIndexFolder}
                setSelectedIndexFolder={setSelectedIndexFolder}
              />
            </Modal>
          </>
        </View>
      </View>
    </View>
  );
};

export default FotografModal;

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
