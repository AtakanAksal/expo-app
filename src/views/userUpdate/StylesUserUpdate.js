import { StyleSheet } from "react-native";

const StylesUserUpdate = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"#0B232E"
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor:"#0B232E"
  },
  mainText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  longText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#00AA9F",
    padding: 10,
  },
  buttonDisable: {
    alignItems: "center",
    backgroundColor: "#dddddd",
    padding: 10,
  },
  picker: {
    padding: 5,
    color: "#7a7a7a",
    paddingBottom: 40,
    width: "100%",
    height: 40,

  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    margin: 5,
  },

  descInput: {
    backgroundColor: "#ffffff",
    height: 150,
    padding: 10,
    borderWidth: 1,
  },
  logo: {
    width: "100%",
    height: 200,
    marginTop: "50%",
  },
});

export default StylesUserUpdate;
