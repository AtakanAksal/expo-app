import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DovizModal from "./DovizModal";
import DunyaSaatleriModal from "./DunyaSaatleriModal";
import FotografModal from "./FotografModal";
import HavaDurumuModal from "./HavaDurumuModal";
import KartvizitModal from "./KartvizitModal";
import RandevuModal from "./RandevuModal";
import TakipModal from "./TakipModal";
import VideoModal from "./VideoModal";

const MainModal = ({ component, closePress, selectedIndex, setSelectedIndex }) => {
  switch (component) {
    case "kartvizit":
      return <KartvizitModal closePress={closePress} />;
    case "foto":
      return (
        <FotografModal closePress={closePress} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      );
    case "video":
      return <VideoModal closePress={closePress} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />;
    case "randevu":
      return <RandevuModal closePress={closePress} />;
    case "takip":
      return <TakipModal closePress={closePress} />;
    case "doviz":
      return <DovizModal closePress={closePress} />;
    case "hava":
      return <HavaDurumuModal closePress={closePress} />;
    case "saat":
      return <DunyaSaatleriModal closePress={closePress} />;

    default:
      return null;
  }
};

export default MainModal;

const styles = StyleSheet.create({});
