/* eslint-disable no-unused-expressions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import filter from "lodash.filter";

import SearchableDropdown from "react-native-searchable-dropdown";

import BackButton from "../../components/btnNavigationBack/BtnNavigationBack";
import { useUpdateValue } from "../../contexts/UpdateContext";
import MainLogo from "../../components/mainLogo/MainLogo";
import InfoIcon from "./userUpdateComponents/InfoIcon";
import InfoModal from "./userUpdateComponents/InfoModal";
import BtnMain from "../../components/btnMain/BtnMain";
import StylesUserUpdate from "./StylesUserUpdate";
import StylesUserUpdateForSearch from "./StyleUserUpdateForSearch";
import { getAllUser } from "../../helpers/connections";
import TxtFormInput from "../../components/txtFormInput/TxtFormInput";

const UserUpdate0Username = ({ setSelectedPage }) => {
  const [writedText, setWritedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [serverData2, setServerData2] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const window = useWindowDimensions();
  const nav = useNavigation();
  const [, dispatch] = useUpdateValue();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardOpened(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardOpened(false));

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", () => setKeyboardOpened(true));
      Keyboard.removeAllListeners("keyboardDidHide", () => setKeyboardOpened(false));
    };
  }, []);

  useEffect(() => {
    getAllUser()
      .then((res) => setServerData2(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (text) => {
    setWritedText(text);

    const filteredData = filter(serverData2, (user) => {
      return contains(user, text);
    });
    setData(filteredData);
    Keyboard.dismiss;
  };

  const contains = ({ name }, query) => {
    if (name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  };
  /* const handleNext = () => {
    // eslint-disable-next-line radix
    dispatch({ type: "doUpdate", newUpdate: { user_id: parseInt(selectedItem.id),  } });
    setSelectedPage(1);
  }; */

  const handleNext = () => {
    dispatch({ type: "doUpdate", newUpdate: { user_id: 344 } });
    setSelectedPage(1);
  };

  return (
    <View style={StylesUserUpdate.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />

      <MainLogo keyboardUp />
      <View>
        <Text style={StylesUserUpdate.mainText}>ESKİ KAYDI GÜNCELLE</Text>
        <InfoIcon setModalVisible={setModalVisible} />

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <InfoModal closePress={() => setModalVisible(false)} />
        </Modal>
      </View>

      <TxtFormInput
        content="notNull"
        writedValue={writedText}
        onChangeText={(text) => handleSearch(text)}
        placeHolder="Kullanıcı İsmi"
      />
      {console.log(keyboardOpened)}
      {writedText.length > 0 && (
        <View
          style={
            keyboardOpened
              ? styles.containerListWithKeyboard
              : {
                  flex: 1,
                  backgroundColor: "white",
                  margin: 5,
                  borderWidth: 1,
                  padding: 10,
                  marginBottom: window.height / 7,
                }
          }
        >
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={data}
              windowSize={10}
              maxToRenderPerBatch={20}
              initialNumToRender={10}
              keyboardShouldPersistTaps="always"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <TouchableWithoutFeedback onPress={() => handleSearch(item.name)}>
                    <Text style={styles.listItemText}>{item.name}</Text>
                  </TouchableWithoutFeedback>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      )}

      {/** 
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        // On text change listner on the searchable input
        onItemSelect={(item) => setselectedItem(item)}
        // onItemSelect called after the selection from the dropdown
        containerStyle={StylesUserUpdateForSearch.containerStyle}
        // suggestion container style
        textInputStyle={StylesUserUpdateForSearch.textInputStyle}
        itemStyle={StylesUserUpdateForSearch.itemStyle}
        itemTextStyle={StylesUserUpdateForSearch.itemTextStyle}
        itemsContainerStyle={StylesUserUpdateForSearch.itemsContainerStyle}
        items={serverData2}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        selectedItems={selectedItem}
        // mapping of item array
        defaultIndex="3"
        // default selected item index
        placeholder="Kullanıcı Adı"
        // place holder for the search input
        resetValue={false}
        // reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        // To remove the underline from the android input
      ></SearchableDropdown>
*/}

      <BtnMain
        buttonDisabled={!(writedText !== "" && filter(data, { name: writedText }).length > 0)}
        onPress={handleNext}
        txt="Kaydet ve İlerle"
      />
    </View>
  );
};

export default UserUpdate0Username;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },

  containerListWithKeyboard: {
    flex: 1,
    backgroundColor: "white",
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headingText: {
    padding: 8,
  },

  listItem: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  listItemText: {
    fontSize: 15,
  },
});
