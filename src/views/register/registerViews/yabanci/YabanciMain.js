import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AccountInfo from "../../registerComponents/AccountInfo";
import Yabanci2Adress from "./Yabanci2Adress";
import EmailPassword from "../../registerComponents/EmailPassword";
import Overview from "./Overview";
import RegisterDoneComponent from "../../registerComponents/RegisterDoneComponent";
import StylesRegister from "../../StylesRegister";

const YabanciMain = () => {
  const [SelectedPage, setSelectedPage] = useState(1);

  return (
    <View style={StylesRegister.mainContainer}>
      {
        {
          1: <AccountInfo setSelectedPage={setSelectedPage} nextPage={2} isBireysel />,
          2: <Yabanci2Adress setSelectedPage={setSelectedPage} />,
          3: <EmailPassword setSelectedPage={setSelectedPage} prevPage={2} nextPage={4} />,
          4: <Overview setSelectedPage={setSelectedPage} />,
          5: <RegisterDoneComponent setSelectedPage={setSelectedPage} />,
        }[SelectedPage]
      }
    </View>
  );
};

export default YabanciMain;
