import React, { useState } from "react";
import { View } from "react-native";

import { UpdateProvider, reducerUpdate } from "../../contexts/UpdateContext";

import StylesUserUpdate from "./StylesUserUpdate";
import UserUpdate0Username from "./UserUpdate0Username";
import UserUpdate1AccInfo from "./UserUpdate1AccInfo";
import UserUpdate2AccDetail from "./UserUpdate2AccDetail";
import UserUpdate3Description from "./UserUpdate3Description";
import UserUpdate4Done from "./UserUpdate4Done";

const UserUpdateMain = () => {
  const [SelectedPage, setSelectedPage] = useState(0);

  const initialUpdate = {
    update: {},
  };

  return (
    <UpdateProvider initialState={initialUpdate} reducer={reducerUpdate}>{/* <UpdateProvider initialState={initialUpdate} reducer={reducerUpdate} State> */}
      <View style={StylesUserUpdate.mainContainer}>
        {
          {
            0: <UserUpdate0Username setSelectedPage={setSelectedPage} />,
            1: <UserUpdate1AccInfo setSelectedPage={setSelectedPage} />,
            2: <UserUpdate2AccDetail setSelectedPage={setSelectedPage} />,
            3: <UserUpdate3Description setSelectedPage={setSelectedPage} />,
            4: <UserUpdate4Done setSelectedPage={setSelectedPage} />,
          }[SelectedPage]
        }
      </View>
    </UpdateProvider>
  );
};

export default UserUpdateMain;
