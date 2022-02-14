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
import {
  postNotificationButtonDelete,
  postNotificationDeleteByUser,
} from "../../../helpers/connections";
import { useUserValue } from "../../../contexts/UserContext";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const SecilenleriSilOnayModal = ({
  setOpenModal,
  setOpenOnayModal,
  selectedIndex,
  setSelectedIndex,
  listItems,
  setListItems,
  activeState,
  setActiveState,
  setRefreshComponent
}) => {
  // eslint-disable-next-line no-undef
  const postData = new FormData();
  const [{ user }] = useUserValue();

  const postDeletionRequest = () => {
    //  console.log(selectedIndex);
    //  console.log(listItems);

   

    // Silme api için seçili bildirimlerin id bilgilerini içeren list oluştur
    const arrayIds = [];
    
    selectedIndex.forEach((element) => {
      arrayIds.push(listItems[element].id);
    });

    console.log(arrayIds);
    //  setLoading(true);

    //  postData.append("ids[]", 101958 ); // arrayIds

    //  postData.append("type", "like"); // findNotificationType(type)
    //  postData.append("page", 1);
    console.log(activeState);
    if (activeState === "bildirimler-guncelleme") { 
      const payload = {
        id: arrayIds[0] // buranın array alıyor olması lazım
      };
      postNotificationDeleteByUser(payload, user.token)
        .then((res) => {
          console.log(res);
          console.log(" guncelleme deletion calıstı");
          setSelectedIndex([])
         // if(res!==null){}
        //  setActiveState("bildirimler");

        })  // console.log(res.streams)  setStreamData(res.streams)
        .catch((err) => console.log(err));
    } else {
      const type = listItems[0].sender_message.main_type;
      const payload = {
        ids: arrayIds,
        type: findNotificationType(type),
        page: 1,
      };
      postNotificationButtonDelete(payload, user.token)
        .then((res) => {
          console.log(res);
          console.log("deletion calıstı");
          setSelectedIndex([])
          setActiveState("bildirimler");
         // setRefreshComponent((prev)=>!prev)

           // SEÇİLİ İNDEXLİLERİN listItems listesinden çıkarma işlemi
    //  selectedIndex.forEach(element => {
    //   const newData = listItems.filter((item) => {
    //     return  listItems.indexOf(item)  !== element
    //   });
    //   setListItems(newData);
    //   // const tempState=activeState;
    //   // setActiveState(tempState); 
    //   });


            //   setActiveState(tempState);
        }) // console.log(res.streams)  setStreamData(res.streams)
        .catch((err) => console.log(err));
    }
  };

  // notification_message_types tablo değerlerinden web front end kulanımı
  const findNotificationType = (typeId) => {
    switch (typeId) {
      case 1:
        return "follow";
      case 2:
        return "like"; // doğruandı
      case 3:
        return "block";
      case 4:
        return "complaint"; // doğruandı
      case 5:
        return "invitation";
      case 6:
        return "comment";
      case 7:
        return "thank";
      case 8:
        return "application";
      case 9:
        return "gift";
      case 10:
        return "documant";
      case 11:
        return "onay";
      case 12:
        return "kayıt güncelleme";

      default:
        return null;
    }
  };

  return (
    <View style={styles.frame}>
      <View style={styles.innerFrame}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            <Text style={{ color: "#00AA9F", fontSize: 10 }}>
              Bildirimlerinizden{" "}
            </Text>
            <Text style={{ color: "#6C757D", fontSize: 10 }}>
              seçimlerinizi kaldırmak istediğinize emin misiniz ?
            </Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 14,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                postDeletionRequest();
                setOpenModal(false);
                setOpenOnayModal(true);
              }}
              style={{
                backgroundColor: "#00AA9F",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontSize: 10, paddingVertical: 8 }}
              >
                Sil
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: WIDTH / 13.84 }}>
            <TouchableOpacity
              onPress={() => {
                setOpenModal(false);
              }}
              style={{
                borderColor: "#00AA9F",
                borderWidth: 0.2,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#6C757D", fontSize: 10 }}>Vazgeç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SecilenleriSilOnayModal;
const styles = StyleSheet.create({
  frame: {
    height: HEIGHT / 6.4,
    width: WIDTH / 1.44,
    backgroundColor: "#FFFFFF",
    marginVertical: HEIGHT / 2.19,
    marginHorizontal: WIDTH / 6.54,
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
  innerFrame: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
