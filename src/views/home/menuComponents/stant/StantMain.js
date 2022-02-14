/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, FlatList, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BenimStantlarimIcon from "../../../../../assets/gecici/a1.png";
import YayinDurdurulanIcon from "../../../../../assets/stant/stant-durdurulan.png";
import YayinBekleyenIcon from "../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import YayinBekleyenGriIcon from "../../../../../assets/stant/stant-cerceve-gri.png";
import YayinBitenIcon from "../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import YayindaIcon from "../../../../../assets/stant/stant-cerceve-yayinda.png";
import RateIcon from "../../../../../assets/vex-rate.png";
import MainHeader from "../../MainHeader";
import { useStantValue } from "../../../../contexts/StantContext";
import { getMyStants } from "../../../../helpers/stantConnections";
import { useUserValue } from "../../../../contexts/UserContext";

const WIDTH_WINDOW = Dimensions.get("window").width;

const StantMain = () => {
  const [selectionStant, setSelectionStant] = useState(0);

  const [{ user }] = useUserValue();
  const nav = useNavigation();

  // backbutton setup START ---
  useEffect(() => {
    console.log("selectedPage --- use effect ");
    console.log(selectionStant);
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, [selectionStant]);

  const handleBackButtonClick = () => {  
    console.log("selectedPage ---");
    console.log(selectionStant);
    if (selectionStant === 0) {
      nav.goBack();
    } else if (selectionStant === 1 || selectionStant === 2) {
      setSelectionStant(0);
    } else if (selectionStant === 3 || selectionStant === 4 || selectionStant === 5 || selectionStant === 6) {
      setSelectionStant(1);
    } else if (selectionStant === 7 || selectionStant === 8 || selectionStant === 9) {
      setSelectionStant(2);
    }
    return true;
  };

  // backbutton setup END ---

  return (
    <View style={{ flex: 1 }}>
      {
        {
          0: <MainStantSelection setSelectionStant={setSelectionStant} />,
          1: <MyStantSelection setSelectionStant={setSelectionStant} />,
          2: <OtherStantSelection setSelectionStant={setSelectionStant} />,
          3: <StantLists user={user} nav={nav} selectedStantOption="my-taslak" setSelectionStant={setSelectionStant} />,
          4: (
            <StantLists user={user} nav={nav} selectedStantOption="my-yayinda" setSelectionStant={setSelectionStant} />
          ),
          5: (
            <StantLists user={user} nav={nav} selectedStantOption="my-bekleme" setSelectionStant={setSelectionStant} />
          ),
          6: <StantLists user={user} nav={nav} selectedStantOption="my-biten" setSelectionStant={setSelectionStant} />,
          7: (
            <StantLists
              user={user}
              nav={nav}
              selectedStantOption="other-yayinda"
              setSelectionStant={setSelectionStant}
            />
          ),
          8: (
            <StantLists
              user={user}
              nav={nav}
              selectedStantOption="other-bekleme"
              setSelectionStant={setSelectionStant}
            />
          ),
          9: (
            <StantLists user={user} nav={nav} selectedStantOption="other-biten" setSelectionStant={setSelectionStant} />
          ),
        }[selectionStant]
      }
    </View>
  );
};

const MainStantSelection = ({ setSelectionStant }) => (
  <>
    <MainHeader text="Menu - Stant" />
    <View
      style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#FFFFFF", margin: 5 }}
    >
     <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(1)}>{/* ToDo : 1 i değiş */}
        <Image style={styles.image} source={BenimStantlarimIcon} resizeMode="contain" />
        <Text style={[styles.text, { color: "#6C757D" }]}>Onay Bekleyen Stantlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(1)}>
        <Image style={styles.image} source={BenimStantlarimIcon} resizeMode="contain" />
        <Text style={[styles.text, { color: "#6C757D" }]}>Benim Stantlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(2)}>
        <Image style={styles.image} source={BenimStantlarimIcon} resizeMode="contain" />
        <Text style={[styles.text, { color: "#6C757D" }]}>Kullanıcı Stantları</Text>
      </TouchableOpacity>

      {/* <View style={{ width: WIDTH_WINDOW / 3, height: WIDTH_WINDOW / 3, margin: 10 }} /> */}
    </View>
  </>
);

const MyStantSelection = ({ setSelectionStant }) => {
  return (
    <>
      <MainHeader text="Menu - Stantlarım" backBtnFunction={() => setSelectionStant(0)} />

      <View style={styles.mainCompContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(3)}>
          <Image style={styles.image} source={YayinBekleyenGriIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#6C757D" }]}>Taslak</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(4)}>
          <Image style={styles.image} source={YayindaIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(5)}>
          <Image style={styles.image} source={YayinBekleyenIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(6)}>
          <Image style={styles.image} source={YayinBitenIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#FF0000" }]}>Yayını Biten</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.imageContainer} onPress={() => console.log("durudurulan")}>
          <Image style={styles.image} source={YayinDurdurulanIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#000000" }]}>Yayın Durdurulan</Text>
        </TouchableOpacity>
        <View style={{ width: WIDTH_WINDOW / 3, height: WIDTH_WINDOW / 3, margin: 10 }} /> */}
      </View>
    </>
  );
};
const OtherStantSelection = ({ setSelectionStant }) => (
  <>
    <MainHeader text="Menu - Kullanıcı Stantı" backBtnFunction={() => setSelectionStant(0)} />

    <View
      style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#FFFFFF", margin: 5 }}
    >
      <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(7)}>
        <Image style={styles.image} source={YayindaIcon} resizeMode="contain" />
        <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(8)}>
        <Image style={styles.image} source={YayinBekleyenIcon} resizeMode="contain" />
        <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setSelectionStant(9)}>
        <Image style={styles.image} source={YayinBitenIcon} resizeMode="contain" />
        <Text style={[styles.text, { color: "#FF0000" }]}>Yayını Biten</Text>
      </TouchableOpacity>
    </View>
  </>
);

const StantLists = ({ user, selectedStantOption, setSelectionStant, nav }) => {
  const [offset, setOffset] = useState(1);
  const [stantData, setStantData] = useState([]);

  const [, dispatch] = useStantValue();
  // const dispatch = 111;

  useEffect(() => {
    if (selectedStantOption === "my-taslak") {
      getMyStants([4, 7, 8], offset, user.token) // ? // ! 4 statüsü kaldırılacak, listede eleman görebilmek için eklnedi. boş gelen listeler için listtemptycomponent oluşturulacak
        .then((res) => {
          setStantData((prev) => [...prev, ...res.booths.data]);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (selectedStantOption === "my-yayinda") {
      getMyStants([1], offset, user.token)
        .then((res) => {
          setStantData((prev) => [...prev, ...res.booths.data]);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (selectedStantOption === "my-bekleme") {
      getMyStants([5], offset, user.token)
        .then((res) => {
          setStantData((prev) => [...prev, ...res.booths.data]);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (selectedStantOption === "my-biten") {
      getMyStants([2, 6], offset, user.token)
        .then((res) => {
          setStantData((prev) => [...prev, ...res.booths.data]);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (selectedStantOption === "other-yayinda") {
      getMyStants([1], offset, user.token)
        .then((res) => {
          setStantData((prev) => [...prev, ...res.booths.data]);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (selectedStantOption === "other-bekleme") {
      getMyStants([5], offset, user.token)
        .then((res) => {
          setStantData((prev) => [...prev, ...res.booths.data]);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (selectedStantOption === "other-biten") {
      getMyStants([2, 6], offset, user.token)
        .then((res) => {
          setStantData((prev) => [...prev, ...res.booths.data]);
          // console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [offset]);

  const headerName = () => {
    switch (selectedStantOption) {
      case "my-taslak":
        return "Stant - Taslak";
      case "my-yayinda":
        return "Stant - Yayında Olanlar";
      case "my-bekleme":
        return "Stant - Yayın Bekleyen";
      case "my-biten":
        return "Stant - Yayını Biten";
      case "other-yayinda":
        return "Kullanıcı Stantları - Yayında";
      case "other-bekleme":
        return "Kullanıcı Stantları - Yayın Bekleyen";
      case "other-biten":
        return "Kullanıcı Stantları - Yayın Biten";

      default:
        return null;
    }
  };

  return (
    <>
      <MainHeader
        text={headerName()}
        backBtnFunction={() => setSelectionStant(selectedStantOption.substring(0, 2) === "my" ? 1 : 2)}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={stantData}
          onEndReached={stantData.length > 10 ? () => setOffset((prev) => prev + 1) : null}
          onEndReachedThreshold={1}
          // ListHeaderComponent={headerComponent} // null geçilebilir
          // ListFooterComponent={footerComponent}
          renderItem={(item) => renderItem(item, selectedStantOption, dispatch, nav)}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          key={1}
        />
      </View>
    </>
  );
};
const renderItem = ({ item }, selectedStantOption, dispatch, nav) => (
  <View>
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => openStantMenu(item, selectedStantOption, dispatch, nav)}
      // disabled={item.status === 4}
    >
      <Image
        style={styles.image}
        source={
          {
            1: YayindaIcon,
            2: YayinBitenIcon,
            5: YayinBekleyenIcon,
            7: YayinBekleyenGriIcon,
            8: YayinBekleyenGriIcon,
            6: YayinDurdurulanIcon,
            4: YayinBekleyenGriIcon,
          }[item.status]
        }
        resizeMode="contain"
      />

      {
        {
          1: <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>,
          2: <Text style={[styles.text, { color: "#FF0000" }]}>Bitti</Text>,
          5: <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>,
          6: <Text style={[styles.text, { color: "#6C757D" }]}>Yayını Durdurulan</Text>,
          7: <Text style={[styles.text, { color: "#6C757D" }]}>Taslak</Text>,
          8: <Text style={[styles.text, { color: "#6C757D" }]}>Taslak</Text>,
          4: <Text style={[styles.text, { color: "#6C757D" }]}>Özelleştirme Bekliyor</Text>,
        }[item.status]
      }
      {item.rating && (item.status === 1 || item.status === 2) && (
        <View style={{ position: "absolute", top: 0, right: -22 }}>
          <Image style={styles.ratting} source={RateIcon} resizeMode="contain" />
          <Text
            style={{
              position: "absolute",
              top: 3,
              right: 0,
              left: 0,
              textAlign: "center",
              fontSize: 11,
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            {item.rating}
          </Text>
        </View>
      )}
    </TouchableOpacity>
    <Text style={[styles.text, { color: "#6C757D", marginBottom: 15, width: WIDTH_WINDOW / 2 - 10 }]}>{item.name}</Text>
  </View>
);

const openStantMenu = (item, selectedStantOption, dispatch, nav) => {
  dispatch({ type: "changeStant", newStant: item });
  dispatch({ type: "setPage", prevPage: selectedStantOption });
  nav.navigate("StantMenu");
};

export default StantMain;

const styles = StyleSheet.create({
  mainCompContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    margin: 5,
  },
  imageContainer: {
    width: WIDTH_WINDOW / 3,
    height: WIDTH_WINDOW / 3,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    justifyContent: "center",
    elevation: 6,
    margin: 15,
    alignSelf: "center",
  },
  /*   imageContainerDisable: {
    width: WIDTH_WINDOW / 3,
    height: WIDTH_WINDOW / 3,
    backgroundColor: "#c1c1c1",
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    justifyContent: "center",
    elevation: 6,
  }, */
  image: {
    width: "60%",
    height: "60%",
    alignSelf: "center",
  },
  ratting: {
    width: WIDTH_WINDOW / 8,
    height: WIDTH_WINDOW / 8,
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
  },

  headFrame: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

// import React, { useState, useEffect, useRef, useCallback } from "react";

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   BackHandler,
// } from "react-native";
// import PagerView from "react-native-pager-view";
// import { useUserValue } from "../../../../contexts/UserContext";

// import GoBackPng from "../../../../../assets/forgotpass/go-back-black.png";

// import BenimStantlarimIcon from "../../../../../assets/gecici/a1.png";

// import YayinDurdurulanIcon from "../../../../../assets/stant/stant-durdurulan.png";
// import YayinBekleyenIcon from "../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
// import YayinBekleyenGriIcon from "../../../../../assets/stant/stant-cerceve-gri.png";
// import YayinBitenIcon from "../../../../../assets/stant/stant-cerceve-yayin-biten.png";
// import YayindaIcon from "../../../../../assets/stant/stant-cerceve-yayinda.png";
// import RateIcon from "../../../../../assets/vex-rate.png";

// import StantMenu from "./StantMenu";

// import { postYayindakiStantlar, postBeklemedeStantlar, postBitenStantlar } from "../../../../helpers/connections";
// import { useStantValue } from "../../../../contexts/StantContext";
// import { getMyStants } from "../../../../helpers/stantConnections";
// import SelectUser from "./SelectUser";

// const WIDTH_WINDOW = Dimensions.get("window").width;
// // ? Bu sayfada pager-view kullanılarak geri dönüldüğünde listenn resetlenmesini engellenecek

// const StantMain = ({ setSelectedMenu }) => {
//   const [selectedPage, setSelectedPage] = useState(0);

//   const [loading, setLoading] = useState(true);

//   const [{ user }] = useUserValue();
//   const [{ page }] = useStantValue();

//   const pagerRef = useRef(null);

//   // backbutton setup START ---
//   useEffect(() => {
//     console.log("selectedPage --- use effect ");
//     console.log(selectedPage);
//     BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
//     return () => {
//       BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
//     };
//   }, [selectedPage]);

//   const handleBackButtonClick = () => {
//     console.log("selectedPage ---");
//     console.log(selectedPage);
//     if (selectedPage === 0) {
//       setSelectedMenu(0);
//     } else if (selectedPage === 1 || selectedPage === 2) {
//       pagerRef.current.setPageWithoutAnimation(0);
//     } else if (selectedPage === 3 || selectedPage === 4 || selectedPage === 5 || selectedPage === 9) {
//       pagerRef.current.setPageWithoutAnimation(1);
//     } else if (selectedPage === 6 || selectedPage === 7 || selectedPage === 8) {
//       pagerRef.current.setPageWithoutAnimation(2);
//     } else if (selectedPage === 10) {
//       pagerRef.current.setPageWithoutAnimation(getPrevPage());
//     }

//     return true;
//   };
//   const getPrevPage = () => {
//     switch (page) {
//       case "my-taslak":
//         return 9;
//       case "my-yayinda":
//         return 3;
//       case "my-bekleme":
//         return 4;
//       case "my-biten":
//         return 5;
//       case "other-yayinda":
//         return 6;
//       case "other-bekleme":
//         return 7;
//       case "other-biten":
//         return 8;

//       default:
//         return null;
//     }
//   };
//   // backbutton setup END ---

//   const footerComponent = () => {
//     if (loading) {
//       return <ActivityIndicator color="#00AA9F" size="large" />;
//     }
//     return null;
//   };

//   return (
//     <PagerView
//       ref={pagerRef}
//       style={{ flex: 1 }}
//       initialPage={0}
//       scrollEnabled={false}
//       onPageSelected={(e) => setSelectedPage(e.nativeEvent.position)}
//     >
//       <View key="0">
//         {/* position 0 */}
//         <MainStantSelection pagerRef={pagerRef} setSelectedMenu={setSelectedMenu} />
//       </View>
//       <View key="1">
//         {/* position 1 */}
//         <MyStantSelection pagerRef={pagerRef} />
//       </View>
//       <View key="2">
//         {/* position 2 */}
//         <SelectUser pagerRef={pagerRef} />
//         {/* <OtherStantSelection pagerRef={pagerRef} /> */}
//         {/*  içinde dallanan bir yapı olacak */}
//       </View>
//       <View key="3">
//         {/* position 3 */}
//         {/* {console.log("position 333 ---- ç")} */}
//         <StantLists pagerRef={pagerRef} user={user} selectedStantOption="my-yayinda" />
//       </View>
//       <View key="4">
//         {/* position 4 */}
//         <StantLists pagerRef={pagerRef} user={user} selectedStantOption="my-bekleme" />
//       </View>
//       <View key="5">
//         {/* position 5 */}
//         <StantLists pagerRef={pagerRef} user={user} selectedStantOption="my-biten" />
//       </View>
//       <View key="6">
//         {/* position 6 */}
//         {/* {console.log("position 6 -ççç")} */}
//         <StantLists pagerRef={pagerRef} user={user} selectedStantOption="other-yayinda" />
//       </View>
//       <View key="7">
//         {/* position 7 */}
//         <StantLists pagerRef={pagerRef} user={user} selectedStantOption="other-bekleme" />
//       </View>
//       <View key="8">
//         {/* position 8 */}
//         <StantLists pagerRef={pagerRef} user={user} selectedStantOption="other-biten" />
//       </View>
//       <View key="9">
//         {/* position 9 */}
//         <StantLists pagerRef={pagerRef} user={user} selectedStantOption="my-taslak" />
//       </View>

//       {/* position 10 */}
//       <View key="10">
//         <StantMenu pagerRef={pagerRef} />
//       </View>
//     </PagerView>
//   );
// };

// export default StantMain;

// const styles = StyleSheet.create({
//   mainCompContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignContent: "center",
//     // alignItems: "center",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//     // alignContent: "center",
//     alignItems: "center",
//   },
//   imageContainer: {
//     width: WIDTH_WINDOW / 3,
//     height: WIDTH_WINDOW / 3,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 0.5,
//     borderColor: "#c1c1c1",
//     justifyContent: "center",
//     elevation: 6,
//     margin: 15,
//     alignSelf: "center",
//   },
//   /*   imageContainerDisable: {
//     width: WIDTH_WINDOW / 3,
//     height: WIDTH_WINDOW / 3,
//     backgroundColor: "#c1c1c1",
//     borderWidth: 0.5,
//     borderColor: "#c1c1c1",
//     justifyContent: "center",
//     elevation: 6,
//   }, */
//   image: {
//     width: "60%",
//     height: "60%",
//     alignSelf: "center",
//   },
//   ratting: {
//     width: WIDTH_WINDOW / 8,
//     height: WIDTH_WINDOW / 8,
//     alignSelf: "center",
//   },
//   text: {
//     alignSelf: "center",
//     textAlign: "center",
//   },

//   headFrame: {
//     flexDirection: "row",
//     height: 50,
//     backgroundColor: "#EFEFEF",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
// });

// const OpenStantMenu = (item, pagerRef, dispatch, selectedStantOption) => {
//   dispatch({ type: "changeStant", newStant: item });
//   dispatch({ type: "setPage", prevPage: selectedStantOption });
//   pagerRef.current.setPageWithoutAnimation(10);
//   // switch (selectedStantOption) {
//   //   case "my-taslak":
//   //     pagerRef.current.setPageWithoutAnimation(10);
//   //     break;

//   //   case "my-yayinda":
//   //     pagerRef.current.setPageWithoutAnimation(10);
//   //     break;

//   //   case "my-bekleme":
//   //     pagerRef.current.setPageWithoutAnimation(11);
//   //     break;

//   //   case "my-biten":
//   //     pagerRef.current.setPageWithoutAnimation(10);
//   //     break;

//   //   case "other-yayinda":
//   //     pagerRef.current.setPageWithoutAnimation(10);
//   //     break;

//   //   case "other-bekleme":
//   //     pagerRef.current.setPageWithoutAnimation(10);
//   //     break;

//   //   case "other-biten":
//   //     pagerRef.current.setPageWithoutAnimation(10);
//   //     break;

//   //   default:
//   //     break;
//   // }
// };

// const renderItem = ({ item }, pagerRef, dispatch, selectedStantOption) => (
//   <View>
//     <TouchableOpacity
//       style={styles.imageContainer}
//       onPress={() => OpenStantMenu(item, pagerRef, dispatch, selectedStantOption)}
//       // disabled={item.status === 4}
//     >
//       <Image
//         style={styles.image}
//         source={
//           {
//             1: YayindaIcon,
//             2: YayinBitenIcon,
//             5: YayinBekleyenIcon,
//             7: YayinBekleyenGriIcon,
//             8: YayinBekleyenGriIcon,
//             6: YayinDurdurulanIcon,
//             4: YayinBekleyenGriIcon,
//           }[item.status]
//         }
//         resizeMode="contain"
//       />

//       {
//         {
//           1: <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>,
//           2: <Text style={[styles.text, { color: "#FF0000" }]}>Bitti</Text>,
//           5: <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>,
//           6: <Text style={[styles.text, { color: "#6C757D" }]}>Yayını Durdurulan</Text>,
//           7: <Text style={[styles.text, { color: "#6C757D" }]}>Taslak</Text>,
//           8: <Text style={[styles.text, { color: "#6C757D" }]}>Taslak</Text>,
//           4: <Text style={[styles.text, { color: "#6C757D" }]}>Özelleştirme Bekliyor</Text>,
//         }[item.status]
//       }
//       {item.rating && (item.status === 1 || item.status === 2) && (
//         <View style={{ position: "absolute", top: 0, right: -22 }}>
//           <Image style={styles.ratting} source={RateIcon} resizeMode="contain" />
//           <Text
//             style={{
//               position: "absolute",
//               top: 3,
//               right: 0,
//               left: 0,
//               textAlign: "center",
//               fontSize: 11,
//               fontWeight: "bold",
//               color: "#FFFFFF",
//             }}
//           >
//             {item.rating}
//           </Text>
//         </View>
//       )}
//     </TouchableOpacity>
//     <Text style={[styles.text, { color: "#6C757D", marginBottom: 15, width: WIDTH_WINDOW / 2 - 10 }]}>{item.name}</Text>
//   </View>
// );

// const MainStantSelection = ({ pagerRef, setSelectedMenu }) => (
//   <>
//     <View style={styles.headFrame}>
//       <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
//         <TouchableOpacity onPress={() => setSelectedMenu(0)}>
//           <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
//         </TouchableOpacity>
//         <Text style={{ color: "#6C757D", fontSize: 20 }}>Menu - Stant</Text>
//       </View>
//     </View>
//     <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
//       <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(1)}>
//         <Image style={styles.image} source={BenimStantlarimIcon} resizeMode="contain" />
//         <Text style={[styles.text, { color: "#6C757D" }]}>Benim Stantlarım</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(2)}>
//         <Image style={styles.image} source={BenimStantlarimIcon} resizeMode="contain" />
//         <Text style={[styles.text, { color: "#6C757D" }]}>Kullanıcı Stantları</Text>
//       </TouchableOpacity>

//       {/* <View style={{ width: WIDTH_WINDOW / 3, height: WIDTH_WINDOW / 3, margin: 10 }} /> */}
//     </View>
//   </>
// );

// const MyStantSelection = ({ pagerRef }) => {
//   return (
//     <>
//       <View style={styles.headFrame}>
//         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
//           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(0)}>
//             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
//           </TouchableOpacity>
//           <Text style={{ color: "#6C757D", fontSize: 20 }}>Menu - Stantlarım</Text>
//         </View>
//       </View>
//       <View style={styles.mainCompContainer}>
//         <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(9)}>
//           <Image style={styles.image} source={YayinBekleyenGriIcon} resizeMode="contain" />
//           <Text style={[styles.text, { color: "#6C757D" }]}>Taslak</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(3)}>
//           <Image style={styles.image} source={YayindaIcon} resizeMode="contain" />
//           <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(4)}>
//           <Image style={styles.image} source={YayinBekleyenIcon} resizeMode="contain" />
//           <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(5)}>
//           <Image style={styles.image} source={YayinBitenIcon} resizeMode="contain" />
//           <Text style={[styles.text, { color: "#FF0000" }]}>Yayını Biten</Text>
//         </TouchableOpacity>
//         {/* <TouchableOpacity style={styles.imageContainer} onPress={() => console.log("durudurulan")}>
//           <Image style={styles.image} source={YayinDurdurulanIcon} resizeMode="contain" />
//           <Text style={[styles.text, { color: "#000000" }]}>Yayın Durdurulan</Text>
//         </TouchableOpacity>
//         <View style={{ width: WIDTH_WINDOW / 3, height: WIDTH_WINDOW / 3, margin: 10 }} /> */}
//       </View>
//     </>
//   );
// };
// const OtherStantSelection = ({ pagerRef }) => (
//   <>
//     <View style={styles.headFrame}>
//       <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
//         <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(0)}>
//           <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
//         </TouchableOpacity>
//         <Text style={{ color: "#6C757D", fontSize: 20 }}>Menu - Kullanıcı Stantı</Text>
//       </View>
//     </View>
//     <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
//       <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(6)}>
//         <Image style={styles.image} source={YayindaIcon} resizeMode="contain" />
//         <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(7)}>
//         <Image style={styles.image} source={YayinBekleyenIcon} resizeMode="contain" />
//         <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.imageContainer} onPress={() => pagerRef.current.setPageWithoutAnimation(8)}>
//         <Image style={styles.image} source={YayinBitenIcon} resizeMode="contain" />
//         <Text style={[styles.text, { color: "#FF0000" }]}>Yayını Biten</Text>
//       </TouchableOpacity>
//     </View>
//   </>
// );

// // const YayindaStantSelection = ({ pagerRef, user }) => {
// //   // ? pagination uygulanmadı, offset arttırılacak.
// //   const [offset, setOffset] = useState(1);
// //   const [stantData, setStantData] = useState([]);

// //   const [, dispatch] = useStantValue();

// //   useEffect(() => {
// //     getMyStants([1], offset, user.token)
// //       .then((res) => {
// //         setStantData((prev) => [...prev, ...res.booths.data]);
// //         // console.log(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [offset]);

// //   return (
// //     <>
// //       <View style={styles.headFrame}>
// //         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
// //           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(1)}>
// //             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
// //           </TouchableOpacity>
// //           <Text style={{ color: "#6C757D", fontSize: 20 }}>Stant - Yayında Olanlar</Text>
// //         </View>
// //       </View>
// //       <View style={styles.container}>
// //         <FlatList
// //           contentContainerStyle={{ width: "100%" }}
// //           showsVerticalScrollIndicator={false}
// //           maxToRenderPerBatch={10}
// //           data={stantData}
// //           // ListHeaderComponent={headerComponent} // null geçilebilir
// //           // ListFooterComponent={footerComponent}
// //           renderItem={(item) => renderItem(item, pagerRef, dispatch)}
// //           keyExtractor={(item, index) => index.toString()}
// //           numColumns={2}
// //           key={1}
// //         />
// //       </View>
// //     </>
// //   );
// // };
// // const BeklemedeStantSelection = ({ pagerRef, user }) => {
// //   // ? pagination uygulanmadı, offset arttırılacak.
// //   const [offset, setOffset] = useState(1);
// //   const [stantData, setStantData] = useState([]);

// //   const [, dispatch] = useStantValue();

// //   useEffect(() => {
// //     getMyStants([5], offset, user.token)
// //       .then((res) => {
// //         setStantData((prev) => [...prev, ...res.booths.data]);
// //         // console.log(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [offset]);

// //   return (
// //     <>
// //       <View style={styles.headFrame}>
// //         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
// //           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(1)}>
// //             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
// //           </TouchableOpacity>
// //           <Text style={{ color: "#6C757D", fontSize: 20 }}>Stant - Yayın Bekleyen</Text>
// //         </View>
// //       </View>
// //       <View style={styles.container}>
// //         <FlatList
// //           contentContainerStyle={{ width: "100%" }}
// //           showsVerticalScrollIndicator={false}
// //           maxToRenderPerBatch={10}
// //           data={stantData}
// //           // ListHeaderComponent={headerComponent} // null geçilebilir
// //           // ListFooterComponent={footerComponent}
// //           renderItem={(item) => renderItem(item, pagerRef, dispatch)}
// //           keyExtractor={(item, index) => index.toString()}
// //           numColumns={2}
// //           key={1}
// //         />
// //       </View>
// //     </>
// //   );
// // };
// // const BitenStantSelection = ({ pagerRef, user }) => {
// //   // ? pagination uygulanmadı, offset arttırılacak.
// //   const [offset, setOffset] = useState(1);
// //   const [stantData, setStantData] = useState([]);

// //   const [, dispatch] = useStantValue();

// //   useEffect(() => {
// //     getMyStants([2, 6], offset, user.token)
// //       .then((res) => {
// //         setStantData((prev) => [...prev, ...res.booths.data]);
// //         // console.log(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [offset]);

// //   return (
// //     <>
// //       <View style={styles.headFrame}>
// //         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
// //           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(1)}>
// //             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
// //           </TouchableOpacity>
// //           <Text style={{ color: "#6C757D", fontSize: 20 }}>Stant - Yayını Biten</Text>
// //         </View>
// //       </View>
// //       <View style={styles.container}>
// //         <FlatList
// //           contentContainerStyle={{ width: "100%" }}
// //           showsVerticalScrollIndicator={false}
// //           maxToRenderPerBatch={10}
// //           data={stantData}
// //           // ListHeaderComponent={headerComponent} // null geçilebilir
// //           // ListFooterComponent={footerComponent}
// //           renderItem={(item) => renderItem(item, pagerRef, dispatch)}
// //           keyExtractor={(item, index) => index.toString()}
// //           numColumns={2}
// //           key={1}
// //         />
// //       </View>
// //     </>
// //   );
// // };

// // const TaslakStantSelection = ({ pagerRef, user }) => {
// //   // ? pagination uygulanmadı, offset arttırılacak.
// //   const [offset, setOffset] = useState(1);
// //   const [stantData, setStantData] = useState([]);

// //   const [, dispatch] = useStantValue();

// //   useEffect(() => {
// //     getMyStants([4, 7, 8], offset, user.token)
// //       .then((res) => {
// //         setStantData((prev) => [...prev, ...res.booths.data]);
// //         // console.log(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [offset]);

// //   return (
// //     <>
// //       <View style={styles.headFrame}>
// //         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
// //           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(1)}>
// //             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
// //           </TouchableOpacity>
// //           <Text style={{ color: "#6C757D", fontSize: 20 }}>Stant - Taslak</Text>
// //         </View>
// //       </View>
// //       <View style={styles.container}>
// //         <FlatList
// //           contentContainerStyle={{ width: "100%" }}
// //           showsVerticalScrollIndicator={false}
// //           maxToRenderPerBatch={10}
// //           data={stantData}
// //           // ListHeaderComponent={headerComponent} // null geçilebilir
// //           // ListFooterComponent={footerComponent}
// //           renderItem={(item) => renderItem(item, pagerRef, dispatch)}
// //           keyExtractor={(item, index) => index.toString()}
// //           numColumns={2}
// //           key={1}
// //         />
// //       </View>
// //     </>
// //   );
// // };

// // const OtherYayindaStantSelection = ({ pagerRef, user }) => {
// //   // ? pagination uygulanmadı, offset arttırılacak.
// //   const [offset, setOffset] = useState(1);
// //   const [stantData, setStantData] = useState([]);

// //   const [, dispatch] = useStantValue();

// //   useEffect(() => {
// //     getMyStants([1], offset, user.token)
// //       .then((res) => {
// //         setStantData((prev) => [...prev, ...res.booths.data]);
// //         // console.log(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [offset]);

// //   return (
// //     <>
// //       <View style={styles.headFrame}>
// //         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
// //           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(2)}>
// //             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
// //           </TouchableOpacity>
// //           <Text style={{ color: "#6C757D", fontSize: 20 }}>Kullanıcı Stantları - Yayında</Text>
// //         </View>
// //       </View>
// //       <View style={styles.container}>
// //         <FlatList
// //           contentContainerStyle={{ width: "100%" }}
// //           showsVerticalScrollIndicator={false}
// //           maxToRenderPerBatch={10}
// //           data={stantData}
// //           // ListHeaderComponent={headerComponent} // null geçilebilir
// //           // ListFooterComponent={footerComponent}
// //           renderItem={(item) => renderItem(item, pagerRef, dispatch)}
// //           keyExtractor={(item, index) => index.toString()}
// //           numColumns={2}
// //           key={1}
// //         />
// //       </View>
// //     </>
// //   );
// // };
// // const OtherBeklemedeStantSelection = ({ pagerRef, user }) => {
// //   // ? pagination uygulanmadı, offset arttırılacak.
// //   const [offset, setOffset] = useState(1);
// //   const [stantData, setStantData] = useState([]);

// //   const [, dispatch] = useStantValue();

// //   useEffect(() => {
// //     getMyStants([5], offset, user.token)
// //       .then((res) => {
// //         setStantData((prev) => [...prev, ...res.booths.data]);
// //         // console.log(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [offset]);

// //   return (
// //     <>
// //       <View style={styles.headFrame}>
// //         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
// //           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(2)}>
// //             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
// //           </TouchableOpacity>
// //           <Text style={{ color: "#6C757D", fontSize: 20 }}>Kullanıcı Stantları - Yayın Bekleyen</Text>
// //         </View>
// //       </View>
// //       <View style={styles.container}>
// //         <FlatList
// //           contentContainerStyle={{ width: "100%" }}
// //           showsVerticalScrollIndicator={false}
// //           maxToRenderPerBatch={10}
// //           data={stantData}
// //           // ListHeaderComponent={headerComponent} // null geçilebilir
// //           // ListFooterComponent={footerComponent}
// //           renderItem={(item) => renderItem(item, pagerRef, dispatch)}
// //           keyExtractor={(item, index) => index.toString()}
// //           numColumns={2}
// //           key={1}
// //         />
// //       </View>
// //     </>
// //   );
// // };
// // const OtherBitenStantSelection = ({ pagerRef, user }) => {
// //   // ? pagination uygulanmadı, offset arttırılacak.
// //   const [offset, setOffset] = useState(1);
// //   const [stantData, setStantData] = useState([]);

// //   const [, dispatch] = useStantValue();

// //   useEffect(() => {
// //     getMyStants([2, 6], offset, user.token)
// //       .then((res) => {
// //         setStantData((prev) => [...prev, ...res.booths.data]);
// //         // console.log(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [offset]);

// //   return (
// //     <>
// //       <View style={styles.headFrame}>
// //         <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
// //           <TouchableOpacity onPress={() => pagerRef.current.setPageWithoutAnimation(2)}>
// //             <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
// //           </TouchableOpacity>
// //           <Text style={{ color: "#6C757D", fontSize: 20 }}>Kullanıcı Stantları - Yayın Biten</Text>
// //         </View>
// //       </View>
// //       <View style={styles.container}>
// //         <FlatList
// //           contentContainerStyle={{ width: "100%" }}
// //           showsVerticalScrollIndicator={false}
// //           maxToRenderPerBatch={10}
// //           data={stantData}
// //           // ListHeaderComponent={headerComponent} // null geçilebilir
// //           // ListFooterComponent={footerComponent}
// //           renderItem={(item) => renderItem(item, pagerRef, dispatch)}
// //           keyExtractor={(item, index) => index.toString()}
// //           numColumns={2}
// //           key={1}
// //         />
// //       </View>
// //     </>
// //   );
// // };
