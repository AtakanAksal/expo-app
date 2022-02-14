import { StyleSheet } from "react-native";
import { relativeHeightNum } from "../../utils/HelperFunctions";

const StylesForgot = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor:"#0B232E"
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems:"center",
    // backgroundColor:"#0B232E"
  },
  mainText: {
    fontSize: 20,
    color: "#6C757D",
    textAlign: "center",
    marginTop: relativeHeightNum(50),
    marginBottom: relativeHeightNum(65),
    fontStyle:"italic"
  },
  viewRow: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "#6C757D",
    fontSize: 11,
    fontStyle: "italic",
    margin: 15,
    padding: 10,
  },
  input: {
    fontSize: 15,
    backgroundColor: "#fff",
    height: 40,
    margin: 12,
    padding: 5,
    borderWidth: 1,
  },
  logo: {
    width: "100%",
    height: 200,
    marginTop: "50%",
  },
  textDone: {
    textAlign:"center",
    color: "#6C757D",
    fontSize: 11,
    margin: 5,
    padding: 10,
  },
});

export default StylesForgot;
