/* eslint-disable react-native/no-unused-styles */
import React, { useState } from "react";

import {
  View,
  Dimensions,
  FlatList} from "react-native";
import ItemView from "./ItemView";




const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;
const dummyArray = [
  {
    id: "1",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "2",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "3",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "4",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "5",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "6",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "7",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "8",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "9",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "10",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
];

const faturaArray = [
  {
    id: "1",
    value: "Seri No",
  },
  {
    id: "2",
    value: "Hizmet Kodu",
  },
  {
    id: "3",
    value: "İşlem Kodu",
  },
  {
    id: "4",
    value: "Sipariş Kodu",
  },
  {
    id: "5",
    value: "Referans No",
  },
  {
    id: "6",
    value: "Ödeme Tipi",
  },
  {
    id: "7",
    value: "Tutar",
  },
  {
    id: "8",
    value: "Başlangıç Tarihi",
  },
  {
    id: "9",
    value: "Bitiş Tarihi",
  },
];
const tahsilatMakbuzuArray = [
  {
    id: "1",
    value: "Firma İsmi",
  },
  {
    id: "2",
    value: "Tahsilat Konusu",
  },
  {
    id: "3",
    value: "Seri No",
  },
  {
    id: "4",
    value: "Sicil No",
  },
  {
    id: "5",
    value: "Başlangıç Tarihi",
  },
  {
    id: "6",
    value: "Bitiş Tarihi",
  },
  {
    id: "7",
    value: "Makbuz Tarihi",
  },
];
const bankaHesapBilgileriArray = [
  {
    id: "1",
    value: "Hesap Adı",
  },
  {
    id: "2",
    value: "Banka Adı",
  },
  {
    id: "3",
    value: "Şube",
  },
  {
    id: "4",
    value: "Ülke",
  },
  {
    id: "5",
    value: "İl",
  },
  {
    id: "6",
    value: "İlçe",
  },
  {
    id: "7",
    value: "Oluşturma Tarihi",
  },
];
const gelirlerArray = [
  {
    id: "1",
    value: "Yayın Durumu",
  },
  {
    id: "2",
    value: "Modül Seçimi",
  },
  {
    id: "3",
    value: "Sipariş Türü",
  },
  {
    id: "4",
    value: "Sipariş Tarihi",
  },
  {
    id: "5",
    value: "Sipariş Tutarı",
  },
  {
    id: "6",
    value: "Sipariş Kuru Seçimi",
  },
  {
    id: "7",
    value: "Teslimat Tarihi",
  },
  {
    id: "8",
    value: "Onay Tarihi",
  },
  {
    id: "9",
    value: "Tahsilat Tutarı",
  },
  {
    id: "9",
    value: "Tahsilat Kuru",
  },
  {
    id: "9",
    value: "Tahsilat Tarihi",
  },
];
const giderlerArray = [
  {
    id: "1",
    value: "Yayın Durumu",
  },
  {
    id: "2",
    value: "Modül Seçimi",
  },
  {
    id: "3",
    value: "Gider Türü",
  },
  {
    id: "4",
    value: "Gider Tarihi",
  },
  {
    id: "5",
    value: "Gider Tutarı",
  },
  {
    id: "6",
    value: "Gider Kuru",
  },
  {
    id: "7",
    value: "Teslimat Tarihi",
  },
  {
    id: "8",
    value: "Onay Tarihi",
  },
  {
    id: "9",
    value: "Tahsilat Tutarı",
  },
  {
    id: "9",
    value: "Tahsilat Kuru",
  },
  {
    id: "9",
    value: "Tahsilat Tarihi",
  },
];

const ListItemFiltrele = ({ filterAreaList, listItems, setListItems, filterPayloads, setFilterPayloads }) => { // Örneğin Fatura Filtrele içindeki "Seri No" ve açılır listesi
    const [contentOpen, setContentOpen] = useState(false);
    return (
      <View>
        <FlatList
          data={filterAreaList} // listItems
          //   onEndReached={() => getData()} bu method ana componentte active state e uygun get methodunu çağıracak
          renderItem={({ item, index }) => <ItemView value={item.value} listItems={listItems} setListItems={setListItems}  filterPayloads={filterPayloads} setFilterPayloads={setFilterPayloads} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  export default ListItemFiltrele;