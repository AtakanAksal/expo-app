import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import RegisterDoneComponent from "../../registerComponents/RegisterDoneComponent";
import Stk1StkType from "./Stk1StkType";
import Stk2Adress from "./Stk2Adress";
import AccountInfo from "../../registerComponents/AccountInfo";
import EmailPassword from "../../registerComponents/EmailPassword";


import StylesRegister from "../../StylesRegister";

const StkMain = () => {
  const [SelectedPage, setSelectedPage] = useState(1);
  return (
    <View style={StylesRegister.mainContainer}>
      {
        {
          1: <Stk1StkType setSelectedPage={setSelectedPage} />,
          2: <Stk2Adress setSelectedPage={setSelectedPage} />,
          3: <AccountInfo setSelectedPage={setSelectedPage} prevPage={2} nextPage={4}/>,
          4: <EmailPassword setSelectedPage={setSelectedPage} prevPage={3} nextPage={5}/>,
          5: <RegisterDoneComponent setSelectedPage={setSelectedPage} />,
        }[SelectedPage]
      }
    </View>
  );
};

export default StkMain;
