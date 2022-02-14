import React, { useState } from "react";
import { View } from "react-native";


import ForgotPass from "./ForgotPass";
import ForgotPassDone from "./ForgotPassDone";
import ForgotPassRefresh from "./ForgotPassRefresh";
import StylesForgot from "./StylesForgot";

const ForgotPassMain = () => {
  const [SelectedPage, setSelectedPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");
  return (

      <View style={StylesForgot.mainContainer}>
        {
          {
            1: <ForgotPass setSelectedPage={setSelectedPage} setSelectedItem={setSelectedItem} />,
            2: <ForgotPassDone setSelectedPage={setSelectedPage} type={type} keyword={keyword} />,
            3: <ForgotPassRefresh setSelectedPage={setSelectedPage} selectedItem={selectedItem}  setType={setType} setKeyword={setKeyword} />,
          }[SelectedPage]
        }
      </View>
    
  );
};

export default ForgotPassMain;
