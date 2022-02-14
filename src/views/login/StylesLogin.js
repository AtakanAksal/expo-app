import { StyleSheet } from "react-native";

const StylesLogin = StyleSheet.create({
  container: {
    flex: 1,
   // padding: 20,
   // justifyContent: "flex-start",
   // backgroundColor:"#0B232E"
  },
  input: {
    fontSize: 15,
    backgroundColor: "#fff",
    height: 40,
    margin: 12,
    padding: 5,
    borderWidth: 1,
  },
  buttonRowText: {
    color: "#929CA5",
    fontSize: 10,
    fontStyle:"italic"
  },
  buttonRow: {
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#929CA5",
    paddingBottom :15,
    paddingTop: 15,
    width: "30%",
  },
  viewRow: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
  mainText: {
    fontSize: 15,
    color: "#6C757D",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
});

export default StylesLogin;
