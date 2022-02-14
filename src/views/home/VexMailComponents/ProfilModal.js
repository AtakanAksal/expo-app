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

import Geri from "../../../../assets/forgotpass/go-back-black.png";
import Filtrele from "../../../../assets/vexmail/filtrele.png";
import Arama from "../../../../assets/vexmail/arama.png";
import Profil from "../../../../assets/vexmail/profil-placeholder.jpg";
import IcerikAc from "../../../../assets/vexmail/icerik-ac.png";
import IcerikKapa from "../../../../assets/vexmail/icerik-kapa.png";
import UcNokta from "../../../../assets/vexmail/uc-nokta.png";
import Attach from "../../../../assets/vexmail/attach.png";
import Bayrak from "../../../../assets/vexmail/bayrak.png";
// eslint-disable-next-line import/no-cycle
import FilterProfilListModal from "./FilterProfilListModal";
import { setUyelikTuru } from "../../../utils/HelperFunctions";
import { Flags } from "../../../components/FlagExporter";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const ProfilModal = ({
  setProfilModalOpen,
  mailToProfilArray,
  setMailToProfilArray,
  listType,
  ccProfilArray,
  setCcProfilArray,
  bccProfilArray,
  setBccProfilArray,
  conAddToReceiver, 
  conAddCcReceiver,
  conAddBccReceiver,
  listItems
}) => {
  const renderItem = ({ item }) => <Item item={item} />;
  const [searchActive, setSearchActive] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const BackComponent = () => {
    return (
      <View style={styles.back}>
        <View>
          
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={() => setProfilModalOpen(false)}>
              <Image style={{ height: 45, width: 45 }} source={Geri} resizeMode="contain" />
              </TouchableOpacity>        
              <Text style={{ color: "#00AA9F", fontSize: 15 }}>VexMail Profil Liste</Text>
              </View>
            </View>
      

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 14 }}>
            <TouchableOpacity onPress={() => setSearchActive(true)}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ height: 25, width: 25 }} source={Arama} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 14 }}>
            <TouchableOpacity onPress={() => setFilterModalOpen(true)}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ height: 25, width: 25 }} source={Filtrele} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const openProfil = async (item) => {
    alert("Id : " + item.id.toString() + " Value : " + item.first_name);

    if (listType === "to") {
      if (!Object.keys(mailToProfilArray.filter((el) => el.id === item.id)).length > 0) {
        setMailToProfilArray((prevArray) => [...prevArray, item]);
        conAddToReceiver(item.id)

      } else {
        console.log("aynı item EKLENMEDİ");
      }
    } else if (listType === "cc") {
      if (!Object.keys(ccProfilArray.filter((el) => el.id === item.id)).length > 0) {
        setCcProfilArray((prevArray) => [...prevArray, item]);
        conAddCcReceiver(item.id);
      } else {
        console.log("aynı item EKLENMEDİ");
      }
    } else if (listType === "bcc") {
      if (!Object.keys(bccProfilArray.filter((el) => el.id === item.id)).length > 0) {
        setBccProfilArray((prevArray) => [...prevArray, item]);
        conAddBccReceiver(item.id);
      } else {
        console.log("aynı item EKLENMEDİ");
      }
    }
    setProfilModalOpen(false)
  };

  const DATA = [
    {
        id: 56,
        first_name: "George",
        last_name: "Hagi",
        expo_mail: "emreo\u011flu",
        expo_mail_domain: "avmmerkezi.com",
        country_id: 212,
        picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
        binarycode: "TR"
    },
    {
      id: 57,
        first_name: "George",
        last_name: "Hagi",
        expo_mail: "emreo\u011flu",
        expo_mail_domain: "avmmerkezi.com",
        country_id: 212,
        picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
        binarycode: "TR"
    },
    {
      id: 58,
      first_name: "George",
      last_name: "Hagi",
      expo_mail: "emreo\u011flu",
      expo_mail_domain: "avmmerkezi.com",
      country_id: 212,
      picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
      binarycode: "TR"
    },
    {
      id: 59,
        first_name: "George",
        last_name: "Hagi",
        expo_mail: "emreo\u011flu",
        expo_mail_domain: "avmmerkezi.com",
        country_id: 212,
        picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
        binarycode: "TR"
    },
    {
      id: 60,
      first_name: "George",
      last_name: "Hagi",
      expo_mail: "emreo\u011flu",
      expo_mail_domain: "avmmerkezi.com",
      country_id: 212,
      picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
      binarycode: "TR"
    },
    {
      id: 61,
        first_name: "George",
        last_name: "Hagi",
        expo_mail: "emreo\u011flu",
        expo_mail_domain: "avmmerkezi.com",
        country_id: 212,
        picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
        binarycode: "TR"
    },
    {
      id: 62,
        first_name: "George",
        last_name: "Hagi",
        expo_mail: "emreo\u011flu",
        expo_mail_domain: "avmmerkezi.com",
        country_id: 212,
        picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
        binarycode: "TR"
    },
    {
      id: 63,
        first_name: "George",
        last_name: "Hagi",
        expo_mail: "emreo\u011flu",
        expo_mail_domain: "avmmerkezi.com",
        country_id: 212,
        picture: "https://s3.eu-central-1.amazonaws.com/static-content-vexpo/expo/profilecontent/photos/Z43VONMq9hQD4jyO7DosxWKGNPxEZ4yEqQvIVbu9.png",
        binarycode: "TR"
    },
    
  ];
  const HeaderComponent = () => {
    if (searchActive) {
      return <AramaComponent />;
    }
    return null;
  };
  const AramaComponent = () => {
    return (
      <View style={styles.headerComponent}>
        <Image style={styles.menuItemImg} source={Arama} resizeMode="contain" />
        <TextInput placeholder="Arama" />
      </View>
    );
  };
  const Item = ({ item }) => {
    const [open, setopen] = useState(false);

    return (
      <TouchableOpacity style={styles.item} onPress={() => openProfil(item)} activeOpacity={1}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", padding: 8 }}>
          <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <Image style={{ height: 35, width: 35 }} source={ (item.picture !==null) ? { uri: item.picture }: Profil  } resizeMode="contain" />
            <View style={{ paddingLeft: 10 }}>
              <View>
                <Text>{`${item.first_name} ${item.last_name}`}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Image style={{ height: 10, width: 10 }}  source={Flags[item.binarycode.toLowerCase()]} resizeMode="contain" />
                <Text style={{ color: "#6C757D", fontSize: 5, marginLeft: 2 }}>{item.binarycode}</Text>
                <Text style={{ color: "#6C757D", fontSize: 5, paddingLeft: 9 }}>{setUyelikTuru(item.id)}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainFrame}>
      <BackComponent />
      <View style={styles.body}>
        <View style={styles.header}>
          <HeaderComponent />
        </View>
        <View style={styles.listingArea}>
          <FlatList data={listItems} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
      </View>

      {/*  FilterProfilListModal                             */}
      <View>
        <Modal
          visible={filterModalOpen}
          onRequestClose={() => {
            setFilterModalOpen((prev) => !prev);
          }}
        >
          <FilterProfilListModal setFilterModalOpen={setFilterModalOpen} />
        </Modal>
      </View>
    </View>
  );
};

export default ProfilModal;

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  body: {
    margin: 5,
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
  back: {
    flexDirection: "row",
    margin: 5,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },

  item: {
    marginBottom: 5,
    flex: 1,
    // height:HEIGHT/9.15,
    backgroundColor: "white",
    borderColor: "#6C757D",
    borderWidth: 0.2,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
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
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
  },
  headerComponent: {
    flex: 1,
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
});
