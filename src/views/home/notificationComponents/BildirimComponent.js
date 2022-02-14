/* eslint-disable react-native/no-unused-styles */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableHighlight,
  TextInput,
  Modal,
} from "react-native";
import SecilenleriSilOnayModal from "./SecilenleriSilOnayModal";
import Geri from "../../../../assets/forgotpass/go-back-black.png";
import Filtrele from "../../../../assets/vexmail/filtrele.png";
import Arama from "../../../../assets/vexmail/arama.png";
import Profil from "../../../../assets/vexmail/profil-example.png";
import IcerikAc from "../../../../assets/vexmail/icerik-ac.png";
import IcerikKapa from "../../../../assets/vexmail/icerik-kapa.png";
import UcNokta from "../../../../assets/vexmail/uc-nokta.png";
import Attach from "../../../../assets/vexmail/attach.png";
import Bayrak from "../../../../assets/vexmail/bayrak.png";
import SearchAndFilterComponant from "./SearchAndFilter";
import SecilenleriSilButon from "./SecilenleriSilButon";
import Checkbox from "../../../../assets/notification/checkbox.png";
import CheckboxSelected from "../../../../assets/notification/checkbox-selected.png";
import ListeItem from "./ListeItem";
import FilterListModal from "./FilterListModal";
import OnayModal from "./OnayModal";
import ListeItemKayitGuncelle from "./ListeItemKayitGuncelle";

// eslint-disable-next-line import/no-cycle

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const BildirimComponent = ({
  activeState,
  setActiveState,
  streamData,
  setOnProcessItem,
  stateIsReceived,
  user,
  setRefreshComponent
}) => {
  const [listItems, setListItems] = useState(streamData);
  const [filteredData, setFilteredData] = useState(streamData);
  // const RenderItem = ({ item }) => <Item item={item} />;
  const [searchActive, setSearchActive] = useState(false);

  const [arrayOfSelected, setArrayOfSelected] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState([]);
  const [openFilterListModal, setOpenFilterListModal] = useState(false);
  const [openOnayModal, setOpenOnayModal] = useState(false);
  const [thanksActive, setThanksActive] = useState(false);

  const [data, setData] = useState([
    { id: 1, name: "Mike", city: "philps", state: "New York" },
    { id: 2, name: "Steve", city: "Square", state: "Chicago" },
    { id: 3, name: "Jhon", city: "market", state: "New York" },
    { id: 4, name: "philps", city: "booket", state: "Texas" },
    { id: 5, name: "smith", city: "brookfield", state: "Florida" },
    { id: 6, name: "Broom", city: "old street", state: "Florida" },
  ]);

  useEffect(() => {
    if (activeState !== "bildirimler-guncelleme") {
      if (stateIsReceived) {
        // gelenleri filtrele
        //  setListItems((prevArray) => prevArray.filter((l) => l.receiver_id !==(user.user_id))) ;

        // const filterListValue = listItems.filter(item => {
        //   return item.receiver_id.includes(user.user_id);
        // });

        // setListItems(filterListValue);
        // console.log(listItems);

        const filteredArray = listItems.filter(
          (obje) => obje.receiver_id.toString() === user.userid.toString()
        );
        setFilteredData(filteredArray);
      } else {
        // gönderilenleri filtrele
        // setListItems((prevArray) => prevArray.filter((l) => l.sender_id !==(user.user_id))) ;
        //   data = data.filter((item) => item.state == 'New York')
        //  const filterListValue = listItems.filter(prevArray => {
        //   return prevArray.receiver_id.includes(user.user_id);
        // });
        // setListItems(filterListValue);
        // console.log("else calısti ----------------------------------------------------");
        const filteredArray = listItems.filter(
          (obje) => obje.sender_id.toString() === user.userid.toString()
        );
        setFilteredData(filteredArray);
      }
    } 
  }, [stateIsReceived]);

  const dummyData = [
    {
      userdetail: {
        name: "Muğla Büyükşehir Belediyesi Emniyet Müdürlüğü",
        userrole_id: 3,
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
        country_id: 212,
        full_institution_name: null,
        country: {
          countryid: 212,
          binarycode: "TR",
        },
      },
      booth: {
        id: 100540,
        hall_id: 8,
        name: "DEMO",
        rating: "4.7",
        date: "01.01.2021",
        hall: {
          id: 8,
          name: "Test Salonu",
          expo_id: 2,
          expo: {
            id: 2,
            name: "TURİZM ve SEYAHAT",
          },
        },
      },
    },
    {
      userdetail: {
        name: "Atakan Aksal",
        userrole_id: 1,
        picture: "https://coderkadir.com/coderkadir.png",
        country_id: 212,
        full_institution_name: null,
        country: {
          countryid: 212,
          binarycode: "TR",
        },
      },
      booth: {
        id: 100486,
        hall_id: 8,
        name: "Ata Stant demo",
        rating: "7.1",
        date: "01.01.2021",
        hall: {
          id: 8,
          name: "Test Salonu",
          expo_id: 2,
          expo: {
            id: 2,
            name: "Muğla Büyükşehir Belediyesi Sanayiciler Fuarı",
          },
        },
      },
    },
    {
      userdetail: {
        name: "Lighthouse Tic. Aş",
        userrole_id: 2,
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
        country_id: 212,
        full_institution_name: null,
        country: {
          countryid: 212,
          binarycode: "TR",
        },
      },
      booth: {
        id: 100540,
        hall_id: 8,
        name: "DEMO",
        rating: "4.7",
        date: "01.01.2021",
        hall: {
          id: 8,
          name: "Test Salonu",
          expo_id: 2,
          expo: {
            id: 2,
            name: "TURİZM ve SEYAHAT",
          },
        },
      },
    },
    {
      userdetail: {
        name: "Atakan Aksal",
        userrole_id: 2,
        picture: "https://coderkadir.com/coderkadir.png",
        country_id: 212,
        full_institution_name: null,
        country: {
          countryid: 212,
          binarycode: "TR",
        },
      },
      booth: {
        id: 100486,
        hall_id: 8,
        name: "Ata Stant demo",
        rating: "7.1",
        date: "01.01.2021",
        hall: {
          id: 8,
          name: "Test Salonu",
          expo_id: 2,
          expo: {
            id: 2,
            name: "Muğla Büyükşehir Belediyesi Sanayiciler Fuarı",
          },
        },
      },
    },
    {
      userdetail: {
        name: "Rıfat Yalınız",
        userrole_id: 1,
        picture:
          "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/EvV1Ll4x2W8I4bBWU1WT2ODhVHZRGgRuzQR4XVfM.png",
        country_id: 212,
        full_institution_name: null,
        country: {
          countryid: 212,
          binarycode: "TR",
        },
      },
      booth: {
        id: 100540,
        hall_id: 8,
        name: "DEMO",
        rating: "4.7",
        date: "01.01.2021",
        hall: {
          id: 8,
          name: "Test Salonu",
          expo_id: 2,
          expo: {
            id: 2,
            name: "TURİZM ve SEYAHAT",
          },
        },
      },
    },
    {
      userdetail: {
        name: "Atakan Aksal",
        userrole_id: 2,
        picture: "https://coderkadir.com/coderkadir.png",
        country_id: 212,
        full_institution_name: null,
        country: {
          countryid: 212,
          binarycode: "TR",
        },
      },
      booth: {
        id: 100486,
        hall_id: 8,
        name: "Ata Stant demo",
        rating: "7.1",
        date: "01.01.2021",
        hall: {
          id: 8,
          name: "Test Salonu",
          expo_id: 2,
          expo: {
            id: 2,
            name: "Muğla Büyükşehir Belediyesi Sanayiciler Fuarı",
          },
        },
      },
    },
  ];

  //  console.log(listItems);

  const secilenleriSil = () => {
    setOpenModal(true);
  };
  // console.log(streamData);
  return (
    <View
      style={[styles.mainFrame, openModal ? { opacity: 0.3 } : { opacity: 1 }]}
    >
      <View style={styles.body}>
        <View style={styles.listingArea}>
          <View style={{ flex: 7 }}>
            <FlatList
              data={(activeState === "bildirimler-guncelleme") ? streamData : filteredData} // listItems
               //   onEndReached={() => getData()} bu method ana componentte active state e uygun get methodunu çağıracak
              renderItem={({ item, index }) =>
                activeState === "bildirimler-guncelleme" ? (
                  <ListeItemKayitGuncelle
                    item={item}
                    index={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    activeState={activeState}
                    listItems={listItems}
                    setListItems={setListItems}
                    setActiveState={setActiveState}
                    setOnProcessItem={setOnProcessItem}
                    stateIsReceived={stateIsReceived}
                  />
                ) : (
                  <ListeItem
                    item={item}
                    index={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    activeState={activeState}
                    listItems={listItems}
                    setListItems={setListItems}
                    setActiveState={setActiveState}
                    setOnProcessItem={setOnProcessItem}
                    stateIsReceived={stateIsReceived}
                
                  />
                )
              }
              ListHeaderComponent={
                <SearchAndFilterComponant
                  setListItems={setListItems}
                  listItems={listItems}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  queryString = 'sender_user'
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={{ flex: 1 }}>
            {/* main button - seçilenleri sil */}
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={
                  selectedIndex.length > 0
                    ? styles.mainButton
                    : styles.mainButtonDisabled
                }
                disabled={!(selectedIndex.length > 0)}
                onPress={secilenleriSil}
              >
                <Text
                  style={
                    selectedIndex.length > 0
                      ? styles.mainButtonText
                      : styles.mainButtonTextDisabled
                  }
                >
                  Seçilileri Sil
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*  SecilenleriSilOnayModal                             */}
        <View>
          <Modal
            transparent
            visible={openModal}
            onRequestClose={() => {
              setOpenModal((prev) => !prev);
            }}
          >
            <SecilenleriSilOnayModal
              setOpenModal={setOpenModal}
              setOpenOnayModal={setOpenOnayModal}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              listItems={listItems}
              setListItems={setListItems}
              activeState={activeState}
              setActiveState={setActiveState}
              setRefreshComponent={setRefreshComponent}
            />
          </Modal>
        </View>

        {/*  FilterListModal                             */}
        <View>
          <Modal
            transparent
            visible={openFilterListModal}
            onRequestClose={() => {
              setOpenFilterListModal((prev) => !prev);
            }}
          >
            <FilterListModal setOpenFilterListModal={setOpenFilterListModal} />
          </Modal>
        </View>

        {/*  OnayModal                             */}
        <View>
          <Modal
            transparent
            visible={openOnayModal}
            onRequestClose={() => {
              setOpenOnayModal((prev) => !prev);
            }}
          >
            <OnayModal
              setOpenOnayModal={setOpenOnayModal}
              thanksActive={thanksActive}
              setThanksActive={setThanksActive}
            />
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default BildirimComponent;

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  body: {
    // margin: 5,
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },

  item: {
    marginBottom: 5,
    // height:HEIGHT/9.15,
    backgroundColor: "white",
    borderColor: "#6C757D",
    borderWidth: 0.2,
    borderStyle: "solid",
    borderRadius: 3,
    shadowColor: "#EFEFEF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  title: {
    fontSize: 32,
  },
  listingArea: {
    marginHorizontal: 10,
    flexGrow: 1,
    paddingTop: 5,
  },

  headerComponent: {
    flexDirection: "row",
    height: 45,
    marginVertical: 15,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItemImg: {
    height: 25,
    width: 25,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 2,
  },
  checkbox: {
    height: 35,
    width: 35,
  },
  mainButton: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH - 20,
    height: 45,
    backgroundColor: "#00AA9F",
  },
  mainButtonDisabled: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH - 20,
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
