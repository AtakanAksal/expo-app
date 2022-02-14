import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import StantIcon from "../../../assets/menuitems/stant.png";
import SalonIcon from "../../../assets/menuitems/salon.png";
import FuarIcon from "../../../assets/menuitems/fuar.png";
import NavigasyonIcon from "../../../assets/menuitems/navigasyon.png";
import ReklamIcon from "../../../assets/menuitems/reklam.png";
import EvrakIcon from "../../../assets/menuitems/evrak-cantam.png";
import RaporIcon from "../../../assets/menuitems/raporlar.png";
import MyVexIcon from "../../../assets/menuitems/myvex.png";
import MuhasebeIcon from "../../../assets/menuitems/muhasebe.png";
import CikisIcon from "../../../assets/menuitems/cikis.png";
import VexOfficeIcon from "../../../assets/menuitems/vexoffice.png";
import VexHibitionIcon from "../../../assets/menuitems/vexhibition.png";
import VexClassIcon from "../../../assets/menuitems/vexclass.png";
import VexClinicIcon from "../../../assets/menuitems/vexclinic.png";
import VexStoreIcon from "../../../assets/menuitems/vexstore.png";
import VexToranIcon from "../../../assets/menuitems/vextoran.png";
import VexDateIcon from "../../../assets/menuitems/vexdate.png";
import StantMain from "./menuComponents/stant/StantMain";
import NavigasyonMain from "./menuComponents/navigasyon/NavigasyonMain";
import Reklam from "./menuComponents/reklam/Reklam";

import Muhasebe from "./menuComponents/muhasebe/Muhasebe";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const nav = useNavigation();

  const MenuItem = ({ text, img, onPressHandle, cokYakinda }) => {
    const goToComp = () => {
      switch (onPressHandle) {
        case 1:
          nav.navigate("StantMain");
          break;
        case 5:
          nav.navigate("Reklam");
          break;       

        default:
          break;
      }
    };

    return (
      <TouchableOpacity style={styles.menuItem} onPress={() => goToComp()}>
        <Image style={styles.menuItemImg} source={img} resizeMode="contain" />
        <Text style={styles.menuItemText}>{text}</Text>
        {cokYakinda && (
          <View style={styles.cokYakindaa}>
            <Text style={styles.cokYakindaText}>ÇOK YAKINDA</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.menuContainer}>
      <ScrollView>
        <View style={styles.menuRow}> 
          <MenuItem text="Stant" img={StantIcon} onPressHandle={1} />
          <MenuItem text="Salon" img={SalonIcon} onPressHandle={2} />
          <MenuItem text="Fuar" img={FuarIcon} onPressHandle={3} />
        </View>
        <View style={styles.menuRow}>
          <MenuItem text="Navigasyon" img={NavigasyonIcon} onPressHandle={4} />
          <MenuItem text="Reklam" img={ReklamIcon} onPressHandle={5} />
          <MenuItem text="Evrak Çantası" img={EvrakIcon} onPressHandle={6} />
        </View>
        <View style={styles.menuRow}>  
          <MenuItem text="Rapor" img={RaporIcon} onPressHandle={7} />
          <MenuItem text="Muhasebe" img={MuhasebeIcon} onPressHandle={8} />
          <MenuItem text="Hediye" img={CikisIcon} onPressHandle={9} />
        </View>
        <View style={styles.menuRow}>
          <MenuItem text="Promo" img={RaporIcon} onPressHandle={10} />         
          <MenuItem text="VexRate" img={CikisIcon} onPressHandle={11} />
          <MenuItem text="VexWeb" img={MuhasebeIcon} onPressHandle={12} />
        </View>
        <View style={styles.menuRow}>
          <MenuItem text="Expo CV" img={RaporIcon} onPressHandle={13} />         
          <MenuItem text="Çıkış" img={CikisIcon} onPressHandle={14} />
          <MenuItem text="Expo Galeri" img={MuhasebeIcon} onPressHandle={15} cokYakinda />
        </View>
        <View style={styles.menuRow}> 
          <MenuItem
            text="Expo Ofis"
            img={VexOfficeIcon}
            onPressHandle={16}
            cokYakinda
          />
          <MenuItem
            text="Expo Doktor"
            img={VexClinicIcon}
            onPressHandle={17}
            cokYakinda
          />
          <MenuItem
            text="Expo Avukat"
            img={VexOfficeIcon}
            onPressHandle={18}
            cokYakinda
          />
        </View>
        <View style={styles.menuRow}>
          <MenuItem
            text="Expo Drive"
            img={VexHibitionIcon}
            onPressHandle={19}
            cokYakinda
          />
          <MenuItem
            text="Expo Mağaza"
            img={VexClassIcon}
            onPressHandle={20}
            cokYakinda
          />
          <MenuItem
            text="Expo AVM"
            img={VexClinicIcon}
            onPressHandle={21}
            cokYakinda
          />
        </View>
        <View style={styles.menuRow}>
          <MenuItem
            text="Expo Akademi"
            img={VexHibitionIcon}
            onPressHandle={22}
            cokYakinda
          />
          <MenuItem
            text="Expo Emlâk"
            img={VexClassIcon}
            onPressHandle={23}
            cokYakinda
          />
          <MenuItem
            text="Expo Araba"
            img={VexClinicIcon}
            onPressHandle={24}
            cokYakinda
          />
        </View>
        <View style={styles.menuRow}>
          <MenuItem
            text="Expo Etkinlik"
            img={VexHibitionIcon}
            onPressHandle={25}
            cokYakinda
          />
          <MenuItem
            text="Expo Bilet"
            img={VexClassIcon}
            onPressHandle={26}
            cokYakinda
          />
          <MenuItem
            text="Expo İhâle"
            img={VexClinicIcon}
            onPressHandle={27}
            cokYakinda
          />
        </View>
        <View style={styles.menuRow}>
          <MenuItem
            text="Expo Tatil"
            img={VexHibitionIcon}
            onPressHandle={28}
            cokYakinda
          />
          <MenuItem
            text="Expo Ticaret"
            img={VexClassIcon}
            onPressHandle={29}
            cokYakinda
          />
          <MenuItem
            text="VexToran"
            img={VexToranIcon}
            onPressHandle={30}
            cokYakinda
          />
        </View>
        <View style={styles.menuRow}>
          <MenuItem
            text="VexErvasyon"
            img={VexHibitionIcon}
            onPressHandle={31}
            cokYakinda
          />
          <MenuItem
            text="VexBank"
            img={VexClassIcon}
            onPressHandle={32}
            cokYakinda
          />
          <MenuItem
            text="Vexpo TV"
            img={VexClinicIcon}
            onPressHandle={33}
            cokYakinda
          />
        </View>
        <View style={styles.menuRow}>
          <MenuItem
            text="Vexpo City"
            img={VexStoreIcon}
            onPressHandle={34}
            cokYakinda
          />
           {/* boş menü itemlar - bir sırada 3 adet menü item olması gerek, düzgün ortalama için */}
          <View
            style={{
              padding: 5,
              margin: 5,
              height: WINDOW_HEIGHT / 5 - 45,
              width: WINDOW_HEIGHT / 5 - 45,
              borderWidth: 0.5,
              borderColor: "#FFFFFF",
            }}
          />

          {/* boş menü itemlar - bir sırada 3 adet menü item olması gerek, düzgün ortalama için */}
          <View
            style={{
              padding: 5,
              margin: 5,
              height: WINDOW_HEIGHT / 5 - 45,
              width: WINDOW_HEIGHT / 5 - 45,
              borderWidth: 0.5,
              borderColor: "#FFFFFF",
            }}
          />
          
        </View>
      </ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 3,
  },

  menuRow: {
    height: WINDOW_HEIGHT / 6 - 20,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  menuItem: {
    padding: 5,
    margin: 5,
    height: WINDOW_HEIGHT / 5 - 45,
    width: WINDOW_HEIGHT / 5 - 45,
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    backgroundColor: "#FFFFFF",
    shadowColor: "#c1c1c1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  menuItemImg: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    alignSelf: "center",
  },
  menuItemText: {
    color: "#6C757D",
    textAlign: "center",
    paddingBottom: 5,
  },
  cokYakindaa: {
    position: "absolute",
    backgroundColor: "#6C757D",
    top: 0,
    height: 14,
    width: WINDOW_HEIGHT / 5 - 45,
  },
  cokYakindaText: {
    color: "#FFFFFF",
    fontSize: 9,
    textAlign: "center",
  },
});
