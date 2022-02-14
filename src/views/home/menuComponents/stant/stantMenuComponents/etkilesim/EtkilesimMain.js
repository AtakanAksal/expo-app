/* eslint-disable consistent-return */
/* eslint-disable no-lonely-if */

import React, { useEffect, useState, useMemo } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import filter from "lodash.filter";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import stantYayindaIcon from "../../../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import EtkilesimListItem from "./EtkilesimListItem";

import FilterIcon from "../../../../../../../assets/filter-low-gray.png";
import SearchIcon from "../../../../../../../assets/search-low-gray.png";
import FiltersModal from "./FiltersModal";

import { useUserValue } from "../../../../../../contexts/UserContext";
import { getEtkilesim } from "../../../../../../helpers/connections";
import StantInfoHeader from "../../StantInfoHeader";
import MainHeader from "../../../../MainHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;

const EtkilesimMain = ({ stantItem, setSelectedMenuItem }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [writedText, setWritedText] = useState("");
  const [etkilesimData, setEtkilesimData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [offset, setOffset] = useState(1);

  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [{ user }] = useUserValue();

  /* 
  const handleBackButtonClick = () => {
    if (selectDocument !== 0) {
      setSelectDocument(0);
    } else {
        setSelectedMenuItem(0);
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []); */

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedRole !== 0) {
      if (selectedCountry) {
        const filtered = filter(etkilesimData, {
          user: { userrole_id: selectedRole, userdetail: { country: { binarycode: selectedCountry.binarycode } } },
        });
        if (filtered.length > 0) {
          setFilteredData(filtered);
        } else {
          setFilteredData([]);
        }
      } else {
        const filtered = filter(etkilesimData, {
          user: { userrole_id: selectedRole },
        });
        if (filtered.length > 0) {
          setFilteredData(filtered);
        } else {
          setFilteredData([]);
        }
      }
    } else {
      if (selectedCountry) {
        const filtered = filter(etkilesimData, {
          user: { userdetail: { country: { binarycode: selectedCountry.binarycode } } },
        });
        if (filtered.length > 0) {
          setFilteredData(filtered);
        } else {
          setFilteredData([]);
        }
      } else {
        setFilteredData(null);
      }
    }
  }, [selectedRole, selectedCountry]);

  const getData = () => {
    setLoading(true);

    getEtkilesim(stantItem?.boothcontent?.booth_id /* 62 */, offset, user.token)
      .then((res) => {
        setOffset(offset + 1);
        //  console.log(res.visitors.interactionUser.boothUsers);
        // res.visitors.boothUser.boothUsers.map((el)=>(setErisimData([...erisimData, el])))
        setEtkilesimData([...etkilesimData, ...res.visitors.interactionUser.boothUsers]);
        setTotalItemCount(res.visitors.interactionUser.total);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const contains = (data, query) => {
    if (data?.toString().toLowerCase().includes(query.toString().toLowerCase())) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    setWritedText(text);
    const filtered = filter(etkilesimData, (singledata) => {
      return contains(singledata?.user?.userdetail?.name, text);
    });
    setFilteredData(filtered);
  };

  const footerComponent = () => {
    if (loading) {
      return <ActivityIndicator color="#00AA9F" size="large" />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <MainHeader text="Etkileşim" backBtnFunction={() => setSelectedMenuItem(0)} />

      <View style={styles.container}>
        <StantInfoHeader stant={stantItem} count={totalItemCount} />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            {/* arama - filtreleme /> */}
            <View style={{ marginRight: 10, alignItems: "center", alignSelf: "flex-end", flexDirection: "row" }}>
              {searchVisible ? (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
                    <TextInput
                      style={{ borderBottomWidth: 0.5, flex: 1, marginLeft: 15 }}
                      autoFocus
                      onChangeText={(txt) => handleSearch(txt)}
                      value={writedText}
                    />
                  </View>

                  <View style={{ flex: 1, alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSearchVisible(false);
                        setWritedText("");
                        setFilteredData(null);
                        setSelectedCountry(null);
                        setSelectedRole(0);
                      }}
                    >
                      <Image style={{ height: 45, width: 45 }} source={SearchIcon} resizeMode="contain" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={() => setSearchVisible(true)}>
                    <Image style={{ width: 45, height: 45 }} source={SearchIcon} resizeMode="contain" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFiltersModalVisible(true)}>
                    <Image style={{ width: 38, height: 38 }} source={FilterIcon} resizeMode="contain" />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={footerComponent}
              onEndReached={() => getData()}
              onEndReachedThreshold={0.2}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              data={filteredData || etkilesimData}
              renderItem={({ item, index }) => <EtkilesimListItem item={item} />}
              keyExtractor={(itm, index) => index.toString()}
            />

            {useMemo(() => console.log("usememo render"), [])}
          </View>

          {/* main button - seçilenleri sil */}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={filtersModalVisible}
        onRequestClose={() => {
          setFiltersModalVisible(false);
        }}
      >
        <FiltersModal
          closePress={() => {
            setFiltersModalVisible(false);
          }}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          /* selectedItem={selectedItem}
          documentType={documentType}
          dItem={dItem} */
        />
      </Modal>
    </View>
  );
};

export default EtkilesimMain;

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

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
