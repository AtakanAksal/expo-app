import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import RegisterDoneComponent from "../../registerComponents/RegisterDoneComponent";
import Ticari1TradeType from "./Ticari1TradeType";
import Ticari2VD from "./Ticari2VD";
import AccountInfo from "../../registerComponents/AccountInfo";
import Ticari4Adress from "./Ticari4Adress";
import EmailPassword from "../../registerComponents/EmailPassword";
import StylesRegister from "../../StylesRegister";

const TicariMain = () => {
  const [SelectedPage, setSelectedPage] = useState(1);
  return (
    <View style={StylesRegister.mainContainer}>
      {
        {
          1: <Ticari1TradeType setSelectedPage={setSelectedPage} />,
          2: <Ticari2VD setSelectedPage={setSelectedPage} />,
          3: <AccountInfo setSelectedPage={setSelectedPage} prevPage={2} nextPage={4} />,
          4: <Ticari4Adress setSelectedPage={setSelectedPage} />,
          5: <EmailPassword setSelectedPage={setSelectedPage} prevPage={4} nextPage={6} />,
          6: <RegisterDoneComponent setSelectedPage={setSelectedPage} />,
        }[SelectedPage]
      }
    </View>
  );
};

export default TicariMain;
