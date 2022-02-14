import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterCountry from "./registerViews/RegisterCountry";
import { RegisterProvider, reducerRegister } from "../../contexts/RegisterContext";
import RegisterSelectAccType from "./registerViews/RegisterSelectAccType";
import RegisterSelectSecType from "./registerViews/RegisterSelectSecType";
import BireyselMain from "./registerViews/bireysel/BireyselMain";
import YabanciMain from "./registerViews/yabanci/YabanciMain";
import TicariMain from "./registerViews/ticari/TicariMain";
import StkMain from "./registerViews/stk/StkMain";
import Kamu1Statu from "./registerViews/kamu/Kamu1Statu";
import RecaptchaComponent from './registerViews/RecaptchaComponent';
import AccountInfo from './registerComponents/AccountInfo';
import Bireysel2Adress from './registerViews/bireysel/Bireysel2Adress';
import Phone from './registerComponents/Phone';
import EmailPassword from './registerComponents/EmailPassword';
import RegisterDoneComponent from './registerComponents/RegisterDoneComponent';
import Yabanci2Adress from './registerViews/yabanci/Yabanci2Adress';
import FaturaAdresi from "./registerComponents/FaturaAdresi";
import Basarisiz from "./registerComponents/Basarisiz";
import BackgroundTaskJob from "./registerComponents/BackgroundTaskJob";
import Password from "./registerComponents/Password";
import Pin from './registerComponents/Pin';
import Pin2 from './registerComponents/Pin2';
import FaturaAdresiYabanci from "./registerComponents/FaturaAdresiYabanci";
import FirmaIsmiUnvan from "./registerComponents/FirmaIsmiUnvan";
import FaturaAdresiTicari from "./registerComponents/FaturaAdresiTicari";
import Belediye from './registerViews/kamu/belediye/Belediye';
import Kaymakamlik from './registerViews/kamu/kaymakamlik/Kaymakamlik';
import Valilik from './registerViews/kamu/valilik/Valilik';
import IlceMudur from './registerViews/kamu/ilceMudur/IlceMudur';
import IlMudur from './registerViews/kamu/ilMudur/IlMudur';
import BolgeMudur from './registerViews/kamu/bolgeMudur/BolgeMudur';
import GenelMudur from './registerViews/kamu/genelMudur/GenelMudur';
import Bakanlik from './registerViews/kamu/bakanlik/Bakanlik';
import Diger1Statu from './registerViews/kamu/diger/Diger1Statu';
import Diger3Sehir from './registerViews/kamu/diger/Diger3Sehir';
import Diger2BagliKurum from './registerViews/kamu/diger/Diger2BagliKurum';
import Diger4Adress from './registerViews/kamu/diger/Diger4Adress';


const Register = () => {
  const Stack = createStackNavigator();

  const initialRegister = {
    register: {},
  };

  return (
    <RegisterProvider initialState={initialRegister} reducer={reducerRegister}>
      <Stack.Navigator>
        <Stack.Screen name="RecaptchaComponent" component={RecaptchaComponent} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterCountry" component={RegisterCountry} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterSelectAccType" component={RegisterSelectAccType} options={{ headerShown: false }} />
        <Stack.Screen name="FirmaIsmiUnvan" component={FirmaIsmiUnvan} options={{ headerShown: false }} />
        <Stack.Screen name="AccountInfo" component={AccountInfo} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterSelectSecType" component={RegisterSelectSecType} options={{ headerShown: false }} />
        <Stack.Screen name="Bireysel2Adress" component={Bireysel2Adress} options={{ headerShown: false }} />
        <Stack.Screen name="Yabanci2Adress" component={Yabanci2Adress} options={{ headerShown: false }} />
        <Stack.Screen name="FaturaAdresi" component={FaturaAdresi} options={{ headerShown: false }} />
        <Stack.Screen name="FaturaAdresiTicari" component={FaturaAdresiTicari} options={{ headerShown: false }} />
        <Stack.Screen name="FaturaAdresiYabanci" component={FaturaAdresiYabanci} options={{ headerShown: false }} />
        <Stack.Screen name="Phone" component={Phone} options={{ headerShown: false }} />
        <Stack.Screen name="Basarisiz" component={Basarisiz} options={{ headerShown: false }} />
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
        <Stack.Screen name="Pin" component={Pin} options={{ headerShown: false }} />
        <Stack.Screen name="Pin2" component={Pin2} options={{ headerShown: false }} />
        <Stack.Screen name="EmailPassword" component={EmailPassword} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterDoneComponent" component={RegisterDoneComponent} options={{ headerShown: false }} />

        {/* Kamu */}        
        <Stack.Screen name="Kamu1Statu" component={Kamu1Statu} options={{ headerShown: false }} />
        <Stack.Screen name="Belediye" component={Belediye} options={{ headerShown: false }} />
        <Stack.Screen name="Kaymakamlik" component={Kaymakamlik} options={{ headerShown: false }} />
        <Stack.Screen name="Valilik" component={Valilik} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Kaymakamlik" component={Kaymakamlik} options={{ headerShown: false }} /> */}
        <Stack.Screen name="IlceMudur" component={IlceMudur} options={{ headerShown: false }} />
        <Stack.Screen name="IlMudur" component={IlMudur} options={{ headerShown: false }} />
        <Stack.Screen name="BolgeMudur" component={BolgeMudur} options={{ headerShown: false }} />
        <Stack.Screen name="GenelMudur" component={GenelMudur} options={{ headerShown: false }} />
        <Stack.Screen name="Bakanlik" component={Bakanlik} options={{ headerShown: false }} />
        <Stack.Screen name="Diger1Statu" component={Diger1Statu} options={{ headerShown: false }} />
        {/* NAv için hiç kullanılmadığı için commentlendi
         <Stack.Screen name="Diger2BagliKurum" component={Diger2BagliKurum} options={{ headerShown: false }} />
        <Stack.Screen name="Diger3Sehir" component={Diger3Sehir} options={{ headerShown: false }} />
        <Stack.Screen name="Diger4Adress" component={Diger4Adress} options={{ headerShown: false }} /> */}

        <Stack.Screen name="BackgroundTaskJob" component={BackgroundTaskJob} options={{ headerShown: false }} />

    
        {/* <Stack.Screen name="YabanciMain" component={YabanciMain} options={{ headerShown: false }} /> 
        <Stack.Screen name="BireyselMain" component={BireyselMain} options={{ headerShown: false }} /> 
        <Stack.Screen name="TicariMain" component={TicariMain} options={{ headerShown: false }} />
        <Stack.Screen name="StkMain" component={StkMain} options={{ headerShown: false }} />
        <Stack.Screen name="KamuMain" component={KamuMain} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </RegisterProvider>
  );
};

export default Register;
