import { StyleSheet } from "react-native";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../utils/HelperFunctions";

const StylesRegister = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0B232E",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    // backgroundColor:"#0B232E"
  },
  mainText: {
    fontSize: 25,
    color: "#6C757D",
    textAlign: "center",
    marginVertical: relativeHeightNum(56),
    fontStyle: "italic",
  },
  countryPicker: {
    padding: 5,
    color: "#1E1E1C",
    width: "100%",
    height: 45,
    justifyContent: "center",
  },
  picker: {
    padding: 5,
    fontSize:12,
    color: "#6C757D",
    paddingBottom: 40,
    width: "100%",
    // height:relativeHeightNum(40),
  },
  pickerDisable: {
    padding: 5,
    color: "#fff",
    paddingBottom: 40,
    width: "100%",
      // height:relativeHeightNum(40),
  },
  pickerContainer: {
    padding: relativeWidthNum(10),
    width:relativeWidthNum(280),
    height:relativeHeightNum(40),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent:"center",
    alignSelf:"center",
    marginVertical:relativeHeightNum(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  pickerContainerSelected: {
    padding: relativeWidthNum(10),
    width:relativeWidthNum(280),
    height:relativeHeightNum(40),
    marginBottom:relativeHeightNum(10),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent:"center",
    alignSelf:"center",
    borderColor:"#00AA9F",
    borderWidth:1
  },
  pickerContainerDisable: {
    width:relativeWidthNum(280),
    height:relativeHeightNum(40),
    marginVertical:relativeHeightNum(5),
    alignSelf:"center",
    backgroundColor: "#6C757D",
    borderWidth: 1,
    margin: 5,
  },
  row: {
    justifyContent: "space-between",
    alignItems:"center",
    flexDirection: "row",
    height: relativeHeightNum(40),
    width:relativeWidthNum(280),
    marginBottom: "7%",
    marginTop:relativeHeightNum(5),
    alignSelf:"center"
  },
  rowContent: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    height: "100%",
    width: "46%",
    // marginHorizontal: "2.5%",
    borderWidth: 1,
  },
  rowContentDisable: {
    justifyContent: "center",
    backgroundColor: "#6C757D",
    height: "100%",
    width: "46%",
    // marginHorizontal: "2.5%",
    borderWidth: 1,
  },
  adressInput: {
    backgroundColor: "#ffffff",
    height: 100,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    color: "#1E1E1C",
  },
  adressInputDisable: {
    backgroundColor: "#6C757D",
    height: 100,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    color: "#fff",
  },
  rowSozlesmeler: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
  },
  rowSozlesmelerDis: {
    marginTop: relativeHeightNum(204),
  },
  sozlesmeText: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#6C757D",
  },
  logo: {
    width: "100%",
    height: 200,
    marginTop: "50%",
  },
  textDone: {
    textAlign: "center",
    color: "#6C757D",
    fontSize: 12,
    margin: 5,
    padding: 10,
  },
  longTextNorm: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#C5C5C5",
  },
  longTextAccent: {
    fontSize: 11,
    fontStyle: "normal",
    color: "#C5C5C5",
    fontWeight: "bold",
  },
  longTextContainer: {
    width: relativeWidthNum(285),
    padding:5,
    alignSelf: "center",
  },
  infoText: {
    fontSize: 11,
    color: "#C5C5C5",
    fontStyle: "italic",
    width: "95%",
    alignSelf: "center",
  },
  textContainer: {
    justifyContent: "center",
    backgroundColor: "#6C757D",
    borderWidth: 1,
    margin: 5,
    padding: relativeWidthNum(10),
    width:relativeWidthNum(280),
    height:relativeHeightNum(40),
    alignSelf:"center"
  },
  containerText: {
    color: "#fff",
    fontSize: 15,
  },
  errorIcon: {
    height: relativeHeightNum(150),
    width: relativeWidthNum(150),
    alignSelf: "center",
  },
  errorText: {
    color: "#6C757D",
    fontSize: 12,
    textAlign: "center",
    marginTop: relativeHeightNum(26),
  },
  basarisizUyariText: {
    color: "#6C757D",
    fontSize: 20,
    textAlign: "center",
    marginTop: relativeHeightNum(55),
  },
  kapat: {
    height: relativeHeightNum(25),
    width: relativeWidthNum(25),
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    fontSize: 15,
    color: "#6C757D",
    width: relativeWidthNum(230),
    textAlignVertical: "top",
  },
  textInputHolder: {
    width: relativeWidthNum(280),
    height: relativeHeightNum(40),
    padding: relativeWidthNum(10),
    backgroundColor: "white",
    borderColor: "#6C757D",
    borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  multipleTextInputHolder: {
    marginTop: relativeHeightNum(11),
    width: relativeWidthNum(280),
    height: relativeHeightNum(80),
    padding: relativeWidthNum(10),
    backgroundColor: "white",
    borderColor: "#6C757D",
    borderWidth: 1,
    alignSelf: "center",
    textAlignVertical: "top",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textWarning: {
    color: "#FF0018",
    fontSize: 8,
    fontStyle: "italic",
    marginTop: relativeHeightNum(4),
    alignSelf: "flex-start",
    marginLeft: relativeWidthNum(22),
  },
  textInfo: {
    color: "#6C757D",
    fontSize: 10,
    fontStyle: "italic",
    marginVertical: relativeHeightNum(10),
    alignSelf: "flex-start",
    marginLeft: relativeWidthNum(22),
  },
  jobListItem: {
    width: relativeWidthNum(280),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:"white",
    padding:relativeHeightNum(8)
  },
  jobListView: {
    width: relativeWidthNum(280),
    height: relativeHeightNum(200),

    backgroundColor: "white",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    // flexDirection: "row",
    // justifyContent: "space-between",
    //  alignItems: "center",
  },
  jobListViewDisabled: {
    width: relativeWidthNum(280),
    height: relativeHeightNum(200),

    backgroundColor: "white",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    // flexDirection: "row",
    // justifyContent: "space-between",
    //  alignItems: "center",
  },
  jobPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: relativeWidthNum(10),
    width:relativeWidthNum(280),
    height:relativeHeightNum(40),
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  jobPickerDisabled: {
    flexDirection: "row",
    justifyContent: "space-between",   
    alignItems: "center",   
    padding: relativeWidthNum(10),
  },
});

export default StylesRegister;
