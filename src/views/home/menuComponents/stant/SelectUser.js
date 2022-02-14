import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
} from "react-native";

import GoBackPng from "../../../../../assets/forgotpass/go-back-black.png";

const SelectUser = ({ pagerRef }) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchOption, setSearchOption] = useState(0);

  const openModal = (option) => {
    setSearchOption(option);
    setSearchModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(0 /* getPrevPage() */)}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Kullanıcı Ara</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={{ color: "#00AA9F", fontSize: 25 }}>Kullanıcı Seç</Text>
        <Text style={{ color: "#6C757D", fontSize: 10, textAlign: "center", marginVertical: 30 }}>
          Görüntülemek istediğiniz kullanıcıyı aşağıdaki seçeneklerden herhangi birini seçerek hızlı arama
          yapabilirsiniz
        </Text>
        <TouchableOpacity style={styles.selectButton} onPress={() => openModal(1)}>
          <Text style={styles.selectText}>Kullanıcı Koduna Göre Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectButton} onPress={() => openModal(2)}>
          <Text style={styles.selectText}>Kullanıcı Adına Göre Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectButton} onPress={() => openModal(3)}>
          <Text style={styles.selectText}>E-Mail Adresine Göre Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectButton} onPress={() => openModal(4)}>
          <Text style={styles.selectText}>Cep Telefonuna Göre Ara</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={searchModalVisible}
        onRequestClose={() => {
          setSearchModalVisible(false);
        }}
      >
        <SearchModal closePress={() => setSearchModalVisible(false)} searchOption={searchOption} />
      </Modal>
    </View>
  );
};

export default SelectUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  headFrame: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectButton: {
    backgroundColor: "#FFFFFF",
    elevation: 5,
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
  selectText: {
    color: "#6C757D",
    fontSize: 13,
    fontStyle: "italic",
  },
});

const SearchModal = ({ closePress, searchOption }) => {
  const getPlaceHolder = () => {
    switch (searchOption) {
      case 1:
        return "Kullanıcı Koduna Göre Ara";
      case 2:
        return "Kullanıcı Adına Göre Ara";
      case 3:
        return "E-Mail Adresine Göre Ara";
      case 4:
        return "Cep Telefonuna Göre Ara";

      default:
        return null;
    }
  };

  const searchData = {
    data: [
      { id: 65, name: "Fethiye Belediyesi" },
      { id: 21, name: "Atakan Fethiye" },
    ],
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={{ marginVertical: 10 }}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Pressable
      style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#00000060" }}
      onPress={() => closePress()}
    >
      <TouchableWithoutFeedback>
        <View style={{ backgroundColor: "#FFFFFF", height: "80%", width: "90%", alignItems: "center" }}>
          <TextInput
            style={{
              backgroundColor: "#FFFFFF",
              elevation: 5,
              width: "90%",
              padding: 10,
              marginVertical: 20,
            }}
            placeholder={getPlaceHolder()}
          />
          <FlatList
            style={{ width: "100%", paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={10}
            data={searchData.data}
            //   onEndReached={stantData.length > 10 ? () => setOffset((prev) => prev + 1) : null}
            //   onEndReachedThreshold={1}
            // ListHeaderComponent={headerComponent} // null geçilebilir
            // ListFooterComponent={footerComponent}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            //   numColumns={2}
            //   key={1}
          />
        </View>
      </TouchableWithoutFeedback>
    </Pressable>
  );
};
