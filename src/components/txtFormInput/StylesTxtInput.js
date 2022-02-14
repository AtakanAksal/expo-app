import { StyleSheet } from "react-native";
import { relativeHeightNum, relativeWidthNum } from "../../utils/HelperFunctions";


const StylesTxtInput = StyleSheet.create({
  messageTxt: {
    color: "#FF0018",
    fontSize: 12,
    // paddingLeft: 6,
  //  paddingRight: 10,
    marginTop: -5,
    marginLeft:relativeWidthNum(35),
    fontStyle:"italic"
  },
   inputEnable: {
    color: "#6C757D",
    backgroundColor: "#fff",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
  //  borderWidth: 1,
    fontSize: 12,
    alignSelf:"center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  inputError: {
    color: "#6C757D",
    fontSize: 12,
    backgroundColor: "#fff",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
    borderWidth: 2,
    borderColor: "#FF0018",
    alignSelf:"center"
  },

  inputValid: {
    color: "#6C757D",
    fontSize: 12,
    backgroundColor: "#fff",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
    borderWidth: 2,
    borderColor: "#00AA9F",
    alignSelf:"center"
  },

  inputDisable: {
    backgroundColor: "#6C757D",
    height: relativeHeightNum(40),
    width: relativeWidthNum(280),
    margin: 5,
    paddingLeft: relativeWidthNum(13),
    borderWidth: 1,
    fontSize: 12,
    color: "#fff",
    alignSelf:"center"
  },

  checkIcon: {
    // backgroundColor:"red",
    paddingLeft: 5,
    zIndex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "75%",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    // backgroundColor:"red",
    paddingLeft: 5,
    zIndex: 1,
    position: "absolute",
    top: 0,
    bottom: 10,
    left: "75%",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  showpass: {
    zIndex: 5,
    position: "absolute",
    top: 10,
    left: "65%",
    right: 43,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StylesTxtInput;
