import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import filter from "lodash.filter";
import { useUserValue } from "../../../../contexts/UserContext";
import FilterImg from "../../../../../assets/vexmail/filtrele.png";
import Arama from "../../../../../assets/vexmail/arama.png";
import {
  relativeHeightNum,
  relativeWidthAndHeightForSquare,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import { postInvoicesSearch } from "../../../../helpers/muhasebeConnection";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SearchAndFilterMuhasebeComponant = ({
  setListItems,
  listItems,
  filteredData,
  setFilteredData,
  setSelectedComponent,
  activeState
  
}) => {
  const [writedText, setWritedText] = useState("");
 // eslint-disable-next-line no-undef
 const postData = new FormData();
 const [offset, setOffset] = useState(1);
 const [{ user }] = useUserValue();
  const contains = (data, query) => {
    if (
      data?.toString().toLowerCase().includes(query.toString().toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    setWritedText(text);
    if (text !== "") {
      const filtered = filter(listItems, (singledata) => {
        // eslint-disable-next-line no-template-curly-in-string
        //   const obj = {
        //       [`${singledata}.${queryString}`]: singledata
        //   };
        //  const aaaa='first_name'
        //  const strQuery=`${singledata}${queryString}${aaaa}`
        return contains(singledata?.value, text); //         `${singledata}.${queryString}`
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(listItems);
    }
  };
  
  const getInvoiceRemoteSearch = async (text) => {
    //  setLoading(true);
  //  postData.append("main_type", "aa"); //
    postData.append("page", offset);
    postData.append("q", text);

  await postInvoicesSearch(postData, user.token)
      .then((res) => {
        console.log(res);
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setListItems(res.invoices);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };


  const handleRemoteSearch = (text) => {
    console.log("handleRemoteSearch calisti");
    console.log(text);
    setWritedText(text);
    if (text !== "") {
      getInvoiceRemoteSearch(text);
    }else {
      setFilteredData(listItems);
    }
      
  }

  return (
    <View style={styles.searchAndFilterComponant}>
      {/* Search Bar  */}
      <View style={styles.search}>
        <Image
          style={{
            height: 25,
            width: 25,
        //    paddingVertical: 8,
            marginLeft: 10,
            marginRight: 5,
          }}
          source={Arama}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Hızlı Arama"
          style={{ borderBottomWidth: 0.5, flex: 1, marginLeft: 15 }}
          // autoFocus
          onFocus={() => {}}
          onChangeText={(txt) => handleRemoteSearch(txt)}
          value={writedText}
        />
      </View>
      {/* FilterBar */}
      <TouchableOpacity style={styles.filter} onPress={()=>{setSelectedComponent(2)}} >
      <View style={styles.filter}>
        <Image
          style={ { alignSelf: "center", height:  relativeWidthNum(25), width : relativeWidthNum(25) }}
          source={FilterImg}
          resizeMode="contain"
        />
        <Text style={{ color: "#6C757D", fontSize: 12 }}>Filtrele</Text>
      </View>
      </TouchableOpacity>  
    </View>
  );
};

export default SearchAndFilterMuhasebeComponant;

const styles = StyleSheet.create({
  searchAndFilterComponant: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 5,
    width: "100%",
    height: relativeHeightNum(70),
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 8,
  },
  search: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: relativeHeightNum(40),
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginRight: relativeWidthNum(10),
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: relativeHeightNum(40),
    backgroundColor: "white",
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
});

