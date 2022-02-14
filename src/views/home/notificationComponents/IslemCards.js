import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Dimensions, Image, StyleSheet, Text, Modal } from "react-native";
import {
  postNotificationButtonThank,
  postNotificationButtonDelete,
  postNotificationButtonSetAsRead,
} from "../../../helpers/connections";
import { useUserValue } from "../../../contexts/UserContext";
import Goruntule from "../../../../assets/notification/goruntule.png";
import Profil from "../../../../assets/notification/profil.png";
import Tesekkur from "../../../../assets/notification/tesekkur.png";
import Sil from "../../../../assets/notification/sil.png";
import Okundu from "../../../../assets/notification/okundu.png";
import ArtNiyetBildir from "../../../../assets/notification/art-niyet-bildir.png";
import ContentOpenIcon from "../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../assets/vexmail/icerik-kapa.png";
import OnayModal from "./OnayModal";
import SecilenleriSilOnayModal from "./SecilenleriSilOnayModal";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const IslemCards = ({ activeState, setActiveState, item, setOnProcessItem }) => {
  const nav = useNavigation();
  console.log(item);
  const [openOnayModal, setOpenOnayModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [thanksActive, setThanksActive] = useState(false);
  const [{ user }] = useUserValue();
  // console.log(user);
  const [deletionApproved, setDeletionApproved] = useState(false);

  // eslint-disable-next-line no-undef
  const postData = new FormData();
  // useEffect(() => {
  //   postThanksButton();

  // }, [])
  const thanksClicked = () => {
    setOpenOnayModal(true);
    setThanksActive(true);
    postThanksButton();
  };
  const goruntule = () => {
    setOnProcessItem(item);
    if (activeState === "bildirimler-sikayet") {
      setActiveState("bildirimler-sikayet-goruntule");
    } else if (activeState === "bildirimler-davet") {
      setActiveState("bildirimler-davet-goruntule");
    } else if (activeState === "bildirimler-yorum") {
      setActiveState("bildirimler-yorum-goruntule");
    }
  };
  const postThanksButton = () => {
    //  setLoading(true);
    console.log("thank calıstı");
    postData.append("receiver_id", item.sender_id); //

    postNotificationButtonThank(postData, user.token)
      .then((res) => {
        // console.log(res);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const postSetAsReadButton = () => {
    //  setLoading(true);
    postData.append("notificationId", item.id); //  item.sender_id

    postNotificationButtonSetAsRead(postData, user.token)
      .then((res) => {
        //  console.log(res);
        console.log("okundu calıstı");
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const kotuyeKullanimBildir = () => {
    setOnProcessItem(item);
    setActiveState("bildirimler-kotuye-kullanim");
  };

  return (
    <View
      style={{
        flex: 1,
        marginLeft: 39,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {activeState === "bildirimler-guncelleme" && (
        <TouchableOpacity
          style={[styles.bildirimCardView, { flexDirection: "row", width: 60, justifyContent: "space-around" }]}
          onPress={null}
        >
          <Text style={[styles.bildirimCardText, { fontSize: 8 }]}>Posta</Text>
          <Image style={styles.postaItemImg} source={ContentOpenIcon} resizeMode="contain" />
        </TouchableOpacity>
      )}
      {(activeState === "bildirimler-sikayet" ||
        activeState === "bildirimler-davet" ||
        activeState === "bildirimler-yorum" ||
        activeState === "bildirimler-basvuru" ||
        activeState === "bildirimler-guncelleme") && (
        <TouchableOpacity style={styles.bildirimCardView} onPress={goruntule}>
          <Image style={styles.bildirimItemImg} source={Goruntule} resizeMode="contain" />
          <Text style={styles.bildirimCardText}>Görüntüle</Text>
        </TouchableOpacity>
      )}
      {(activeState === "bildirimler-takip" ||
        activeState === "bildirimler-begeni" ||
        activeState === "bildirimler-engel" ||
        activeState === "bildirimler-sikayet" ||
        activeState === "bildirimler-davet" ||
        activeState === "bildirimler-yorum" ||
        activeState === "bildirimler-tesekkur" ||
        activeState === "bildirimler-basvuru" ||
        activeState === "bildirimler-hediye") && (
        <TouchableOpacity
          style={styles.bildirimCardView}
          onPress={() => nav.navigate("OtherProfile", {userID: item.sender_user.id})}
        >
          <Image style={styles.bildirimItemImg} source={Profil} resizeMode="contain" />
          <Text style={styles.bildirimCardText}>Profil</Text>
        </TouchableOpacity>
      )}
      {(activeState === "bildirimler-takip" ||
        activeState === "bildirimler-begeni" ||
        activeState === "bildirimler-sikayet" ||
        activeState === "bildirimler-davet" ||
        activeState === "bildirimler-yorum" ||
        activeState === "bildirimler-basvuru" ||
        activeState === "bildirimler-hediye") && (
        <TouchableOpacity
          style={styles.bildirimCardView}
          onPress={() => {
            thanksClicked();
          }}
        >
          <Image style={styles.bildirimItemImg} source={Tesekkur} resizeMode="contain" />
          <Text style={styles.bildirimCardText}>Teşekkür Et</Text>
        </TouchableOpacity>
      )}
      {(activeState === "bildirimler-takip" ||
        activeState === "bildirimler-begeni" ||
        activeState === "bildirimler-engel" ||
        activeState === "bildirimler-sikayet" ||
        activeState === "bildirimler-davet" ||
        activeState === "bildirimler-yorum" ||
        activeState === "bildirimler-tesekkur" ||
        activeState === "bildirimler-basvuru" ||
        activeState === "bildirimler-hediye" ||
        activeState === "bildirimler-guncelleme") && (
        <TouchableOpacity
          style={styles.bildirimCardView}
          onPress={() => {
            setOpenModal(true);
          }}
        >
          <Image style={styles.bildirimItemImg} source={Sil} resizeMode="contain" />
          <Text style={styles.bildirimCardText}>Sil</Text>
        </TouchableOpacity>
      )}
      {(activeState === "bildirimler-takip" ||
        activeState === "bildirimler-begeni" ||
        activeState === "bildirimler-engel" ||
        activeState === "bildirimler-sikayet" ||
        activeState === "bildirimler-davet" ||
        activeState === "bildirimler-yorum" ||
        activeState === "bildirimler-tesekkur" ||
        activeState === "bildirimler-basvuru" ||
        activeState === "bildirimler-hediye" ||
        activeState === "bildirimler-guncelleme") && (
        <TouchableOpacity
          style={styles.bildirimCardView}
          onPress={() => {
            setOpenOnayModal(true);
            postSetAsReadButton();
          }}
        >
          <Image style={styles.bildirimItemImg} source={Okundu} resizeMode="contain" />
          <Text style={styles.bildirimCardText}>Okundu</Text>
        </TouchableOpacity>
      )}
      {( activeState === "bildirimler-sikayet") && (
        <TouchableOpacity style={styles.bildirimCardView} onPress={kotuyeKullanimBildir}>
          <Image style={styles.bildirimItemImg} source={ArtNiyetBildir} resizeMode="contain" />
          <Text style={styles.bildirimCardText}>Art Niyet Bildir</Text>
        </TouchableOpacity>
      )}

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

      {/*  SecilenleriSilOnayModal                             */}
      <View>
        <Modal
          transparent
          visible={openModal}
          onRequestClose={() => {
            setOpenModal((prev) => !prev);
          }}
        >
          <SecilenleriSilOnayModal setOpenModal={setOpenModal} setOpenOnayModal={setOpenOnayModal} item={item} />
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bildirimCardView: {
    marginBottom: 10,
    marginRight: 10,
    height: 30,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    //   marginBottom:HEIGHT/18.82,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",

    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  bildirimItemImg: {
    height: 20,
    width: 20,
    marginBottom: 2,
    marginHorizontal: 10,
  },
  postaItemImg: {
    height: 12,
    width: 12,

    marginBottom: 2,
  },
  bildirimCardText: {
    color: "#6C757D",
    fontSize: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
});
export default IslemCards;
