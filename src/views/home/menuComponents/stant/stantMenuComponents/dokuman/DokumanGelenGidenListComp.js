/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect, useState, useMemo } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Modal } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import DokumanListeItem from "./DokumanListeItem";
import DokumanItemDetailModal from "./DokumanItemDetailModal";
import VexDriveModal from "./VexDriveModal";

import { useUserValue } from "../../../../../../contexts/UserContext";

import { getCloudFilesTaken } from "../../../../../../helpers/connections";
import StantInfoHeader from "../../StantInfoHeader";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;

const DokumanGelenGidenListComp = ({ dItem, documentType, setSelectDocument }) => {
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [vexDriveModalVisible, setVexDriveModalVisible] = useState(false);
  const [documentsData, setDocumentsData] = useState([]);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [{ user }] = useUserValue();

  // const { data, isLoading, isError } = useGetCloudFilesTaken(dItem.booth_id, categoriesId, ofset, user.token);
  // const { data, isLoading, isError } = useGetCloudFilesTaken(documentType, 62, offset, user.token);

  /*   if (!(isLoading || isError)) {
    console.log(data.userbags);
    setDocumentsData([...documentsData, ...data.userbags]);
  }
 */

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      if (documentType === "gelen-vexdrive" || documentType === "giden-vexdrive") {
        setVexDriveModalVisible(true);
      } else {
        setDetailModalVisible(true);
      }
    }
  }, [selectedItem]);

  const getData = () => {
    // setLoading(true);

    getCloudFilesTaken(documentType, dItem.booth_id /* 62 */, offset, user.token)
      .then((res) => {
        setOffset(offset + 1);
        // console.log(res);
        if (documentType === "gelen-vexdrive" || documentType === "giden-vexdrive") {
          setDocumentsData([...documentsData, ...res.expodrives]);
          setDocumentsCount(res.expodrives_count);
        } else {
          setDocumentsData([...documentsData, ...res.userbags]);
          setDocumentsCount(res.userbags_count);
        }

        // setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const footerComponent = () => {
    return (
      <TouchableOpacity onPress={() => getData()}>
        <Text>yükle</Text>
      </TouchableOpacity>
    );
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

  const selectAllItems = () => {
    if (selectedIndex.length === documentsData.length) {
      setSelectedIndex([]);
    } else {
      Object.keys(documentsData).map(
        (el) =>
          !selectedIndex.includes(parseInt(el, 10)) && setSelectedIndex((prevArray) => [...prevArray, parseInt(el, 10)])
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MainHeader text={`${dItem.name} - ${getMainText()}`} backBtnFunction={() => setSelectDocument(0)} />

      <View style={styles.container}>
        <StantInfoHeader stant={dItem} count={documentsCount} />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            {/* <RenderComp /> */}

            <View style={{ marginLeft: 5, alignItems: "center", alignSelf: "flex-start" }}>
              <CheckBox
                tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
                disabled={false}
                value={selectedIndex.length === documentsData.length}
                onValueChange={() => {
                  selectAllItems();
                }}
              />
              <Text style={{ color: "#6C757D", fontSize: 8 }}>Tümünü Seç</Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={10}
              data={documentsData}
              onEndReached={() => getData()}
              onEndReachedThreshold={0.1}
              // ListFooterComponent={footerComponent}
              renderItem={({ item, index }) => (
                <DokumanListeItem
                  item={item}
                  index={index}
                  setSelectedIndex={setSelectedIndex}
                  documentType={documentType}
                  selectedIndex={selectedIndex}
                  setSelectedItem={setSelectedItem}
                />
              )}
              keyExtractor={(itm, index) => index.toString()}
            />

            {useMemo(() => console.log("usememo render"), [])}
          </View>

          {/* main button - seçilenleri sil */}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity
              style={selectedIndex.length > 0 ? styles.mainButton : styles.mainButtonDisabled}
              disabled={!(selectedIndex.length > 0)}
              onPress={() => setOffset((prev) => prev + 1)}
            >
              <Text style={selectedIndex.length > 0 ? styles.mainButtonText : styles.mainButtonTextDisabled}>
                Seçilileri Sil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={detailModalVisible}
        onRequestClose={() => {
          setDetailModalVisible(false);
          setSelectedItem(null);
        }}
      >
        <DokumanItemDetailModal
          closePress={() => {
            setDetailModalVisible(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
          documentType={documentType}
          dItem={dItem}
        />
      </Modal>

      <Modal
        animationType="slide"
        visible={vexDriveModalVisible}
        onRequestClose={() => {
          setVexDriveModalVisible(false);
          setSelectedItem(null);
        }}
      >
        <VexDriveModal
          closePress={() => {
            setVexDriveModalVisible(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
          documentType={documentType}
          dItem={dItem}
        />
      </Modal>
    </View>
  );
};

export default DokumanGelenGidenListComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
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
  mainButtonDisabled: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#FFFFFF",
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  mainButtonTextDisabled: {
    color: "#6C757D",
    fontSize: 18,
  },
});
