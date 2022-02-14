import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import RegisterDoneComponent from "../../registerComponents/RegisterDoneComponent";
import AccountInfo from "../../registerComponents/AccountInfo";
import Bireysel2Adress from "./Bireysel2Adress";
import EmailPassword from "../../registerComponents/EmailPassword";
import StylesRegister from "../../StylesRegister";
import Phone from "../../registerComponents/Phone";
import RegisterSelectSecType from "../RegisterSelectSecType";



const  BireyselMain = () => {
  const [SelectedPage, setSelectedPage] = useState(1);

  return (
    <View style={StylesRegister.mainContainer}>
      {
        {
          1: <AccountInfo setSelectedPage={setSelectedPage}  nextPage={2} isBireysel />,
          2: <Bireysel2Adress setSelectedPage={setSelectedPage} />,
          3: <Phone  setSelectedPage={setSelectedPage} prevPage={2} nextPage={4}/>,
          4: <EmailPassword setSelectedPage={setSelectedPage} prevPage={3} nextPage={5} />,
          5: <RegisterDoneComponent setSelectedPage={setSelectedPage} />, 
          6: <RegisterSelectSecType setSelectedPage={setSelectedPage} />,
         
        }[SelectedPage]
      }
    </View>
  );
};

export default BireyselMain;
