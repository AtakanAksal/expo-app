import React, { useState } from "react";
import { View } from "react-native";

import RegisterDoneComponent from "../../registerComponents/RegisterDoneComponent";
import Bakanlik from "./bakanlik/Bakanlik";
import Belediye from "./belediye/Belediye";
import BolgeMudur from "./bolgeMudur/BolgeMudur";
import Diger1Statu from "./diger/Diger1Statu";
import Diger2BagliKurum from "./diger/Diger2BagliKurum";
import Diger3Sehir from "./diger/Diger3Sehir";
import Diger4Adress from "./diger/Diger4Adress";
import GenelMudur from "./genelMudur/GenelMudur";
import IlceMudur from "./ilceMudur/IlceMudur";
import IlMudur from "./ilMudur/IlMudur";
import Kamu1Statu from "./Kamu1Statu";
import Kamu3Phone from "./Kamu3Phone";
import AccountInfo from "../../registerComponents/AccountInfo";
import EmailPassword from "../../registerComponents/EmailPassword";
import Kaymakamlik from "./kaymakamlik/Kaymakamlik";
import Valilik from "./valilik/Valilik";

import StylesRegister from "../../StylesRegister";

const KamuMain = () => {
  const [SelectedPage, setSelectedPage] = useState(1);
  const [toBackPage, setToBackPage] = useState(1);

  return (
    <View style={StylesRegister.mainContainer}>
      {
        {
          // @@@@ ÖNEMLİ !!! Sıra numaralarını değiştirme !!!!!!
          1: <Kamu1Statu setSelectedPage={setSelectedPage} />,
          2: <Belediye setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />,
          // SelectedPage 'i Belediye içine göndermeden 2 seçildiğinde set etme olayına bakılacak.
          3: <Kamu3Phone setSelectedPage={setSelectedPage} toBackPage={toBackPage} />,
          4: <AccountInfo setSelectedPage={setSelectedPage} prevPage={3} nextPage={5} />,
          5: <EmailPassword setSelectedPage={setSelectedPage} prevPage={4} nextPage={6} />,
          6: <RegisterDoneComponent setSelectedPage={setSelectedPage} />,
          7: (
            <Kaymakamlik setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />
          ),
          8: <Valilik setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />,
          9: <IlceMudur setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />,
          10: <IlMudur setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />,
          11: (
            <BolgeMudur setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />
          ),
          12: (
            <GenelMudur setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />
          ),
          13: <Bakanlik setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />,
          14: (
            <Diger1Statu setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />
          ),
          15: <Diger2BagliKurum setSelectedPage={setSelectedPage} />,
          16: <Diger3Sehir setSelectedPage={setSelectedPage} />,
          17: (
            <Diger4Adress setSelectedPage={setSelectedPage} setToBackPage={setToBackPage} SelectedPage={SelectedPage} />
          ),
        }[SelectedPage]
      }
    </View>
  );
};

export default KamuMain;
