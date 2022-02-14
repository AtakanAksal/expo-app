import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Dimensions } from "react-native";

import VexChatIcon from "../../../../assets/share/vexchat.png";
import VexMailIcon from "../../../../assets/share/vexmail.png";
import WhatsappIcon from "../../../../assets/share/whatsapp.png";
import FacebookIcon from "../../../../assets/share/facebook.png";
import InstagramIcon from "../../../../assets/share/instagram.png";
import LinkedinIcon from "../../../../assets/share/linkedin.png";
import YoutubeIcon from "../../../../assets/share/youtube.png";
import TwitterIcon from "../../../../assets/share/twitter.png";
import MailIcon from "../../../../assets/share/email.png";



const HEIGHT_WINDOWS = Dimensions.get("window").height;

const ShareKartvizitModal = ({ closePress }) => {

  const ShareItem = ({ text, img, onPressHandle }) => {
    const goToShare = () => {
      console.log(onPressHandle);
      // ? paylaşma işlemi
    };

    return (
      <TouchableOpacity onPress={() => goToShare()}>
        <View
          style={{
            width: HEIGHT_WINDOWS / 10,
            height: HEIGHT_WINDOWS / 10,
            padding: HEIGHT_WINDOWS / 50,
            borderWidth: 0.5,
            borderColor: "#c1c1c1",
          }}
        >
          <Image style={{ width: "100%", height: "100%" }} source={img} resizeMode="contain" />
        </View>

        <Text
          style={{
            textAlign: "center",
            color: "#6C757D",
            paddingTop: 10,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Pressable style={styles.outerModal} onPress={closePress}>
      <Pressable style={styles.innerModal} onPress={() => console.log("asd")}>
        <Text style={styles.mainText}>Kartvizit Paylaş</Text>
        <View style={{ flex: 1 }}>
          <View style={styles.shareRow}>
            <ShareItem text="VexChat" img={VexChatIcon} onPressHandle="vexchat" />
            <ShareItem text="VexMail" img={VexMailIcon} onPressHandle="VexMail" />
            <ShareItem text="Whatsapp" img={WhatsappIcon} onPressHandle="Whatsapp" />
          </View>
          <View style={styles.shareRow}>
            <ShareItem text="Facebook" img={FacebookIcon} onPressHandle="Facebook" />
            <ShareItem text="Instagram" img={InstagramIcon} onPressHandle="Instagram" />
            <ShareItem text="Linkedin" img={LinkedinIcon} onPressHandle="Linkedin" />
          </View>
          <View style={styles.shareRow}>
            <ShareItem text="Youtube" img={YoutubeIcon} onPressHandle="Youtube" />
            <ShareItem text="Twitter" img={TwitterIcon} onPressHandle="Twitter" />
            <ShareItem text="Mail" img={MailIcon} onPressHandle="eMail" />
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
};

export default ShareKartvizitModal;

const styles = StyleSheet.create({
  innerModal: {
    marginHorizontal: 12,
    backgroundColor: "#fff",
    height: HEIGHT_WINDOWS / 1.2,
    justifyContent: "flex-start",
  },
  outerModal: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#000000a1",
  },
  mainText: {
    marginVertical: HEIGHT_WINDOWS / 15,
    textAlign: "center",
    fontSize: 20,
    color: "#00AA9F",
  },

  shareRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

});
