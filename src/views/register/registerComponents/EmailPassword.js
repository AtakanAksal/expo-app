/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  ImageBackground,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useForm } from "react-hook-form";

import { useNavigation } from '@react-navigation/native';
import { useRegisterValue } from "../../../contexts/RegisterContext";
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../components/mainLogo/MainLogo";

import SozlesmelerModal from "./SozlesmelerModal";

import BtnMain from "../../../components/btnMain/BtnMain";
import TxtValidationInput from "../../../components/txtFormInput/TxtValidationInput";
import {
  checkEmail,
  checkUserExists,
  newRegister,
} from "../../../helpers/connections";
import StylesRegister from "../StylesRegister";
import BackgroundImage from "../../../../assets/register_background.jpg";

const EmailPassword = ({ setSelectedPage, prevPage, nextPage }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [sozlesmeChecked, setSozlesmeChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openSozlesme, setOpenSozlesme] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const methods = useForm();
  const [{ register }] = useRegisterValue();
  const nav = useNavigation();
  const postData = new FormData();

  useEffect(() => {
    if (Object.keys(methods.formState.errors).length > 0 || !sozlesmeChecked) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [sozlesmeChecked, methods.formState]);

  useEffect(() => {
    if (Object.keys(methods.formState.errors).length > 0) {
      setOpenSozlesme(false);
    } else {
      setOpenSozlesme(true);
    }
  }, [methods.formState]);

  const onPress = async (data) => {
   

    postData.append("accountType", register.accountType); //
    // postData.append("account_id", register.accountType); ??
    // postData.append("bireysel_ticari_faliyet", register.bireysel_ticari_faliyet);
    postData.append("countryBinaryCode", register.ulkeDetay.binarycode); //
    postData.append("country_id", register.countryId); //

    postData.append("countyname", register.ulkeDetay.countryname); //
    postData.append("gender_id", register.gender); //
    postData.append("first_name", register.firstname); //
    postData.append("last_name", register.lastname); //
    postData.append("mobilephone", register.phonenumber); //
    postData.append("email", data.ipnEmail); //
    // postData.append("token", data.token);??
    // postData.append("username", data.ipnUserName);
     postData.append("secret", register.password);//
     postData.append("pin_code", register.pin);//
    postData.append("birth_date", register.borndate); //

    if (register.public_institution_id) {
      postData.append("public_institution_id", register.public_institution_id);
    }
    // if (register.phonenumberestablishment) {
    //   postData.append("phonenumberestablishment", register.phonenumberestablishment);
    // }
    if (register.cityId) {
      postData.append("city_id", register.cityId); //
    }
    if (register.town) {
      postData.append("town_id", register.town); //
    }

    if (register.bolge) {
      postData.append("bolge", register.bolge);
    }
    if (register.belde) {
      postData.append("belde", register.belde);
    }
    if (register.district) {
      postData.append("district", register.district); //
    }
    if (register.kurumIsim) {
      // ? contexte yok
      postData.append("kurumIsim", register.kurumIsim);
    }
    if (register.kamuStatuIsim) {
      postData.append("kamuStatuIsim", register.kamuStatuIsim);
    }
    if (register.kamuBagliOlduguKurumIsim) {
      postData.append(
        "kamuBagliOlduguKurumIsim",
        register.kamuBagliOlduguKurumIsim
      );
    }
    if (register.address) {
      postData.append("address", register.address); //
    }
    if (register.bakanlikType) {
      postData.append("bakanlikType", register.bakanlikType);
    }
    if (register.genelMudurluk) {
      postData.append("genelMudurluk", register.genelMudurluk);
    }

    if (register.ticariUnvan) {
      postData.append("ticariUnvan", register.ticariUnvan);
    }
    if (register.company_type) {
      postData.append("company_type", register.company_type);
    }
    if (register.vergiDairesi) {
      postData.append("tax_center_id", register.vergiDairesi); //
    }
    if (register.vergiNo) {
      postData.append("invoice_taxno", register.vergiNo); //
    }
    if (register.faturaAdres) {
      postData.append("fatura_adresi", register.faturaAdres); //
    }
    if (register.faturaUnvani) {
      postData.append("fatura_unvan", register.faturaUnvani); //
    }

    if (register.stk_isim) {
      postData.append("stk_isim", register.stk_isim); //
    }
    if (register.stk_tur) {
      postData.append("stk_tur_ismi", register.stk_tur); //
    }
    if (register.sector_id) {
      postData.append("sector_id", register.sector_id); //
    }
    if (register.sector_job_id) {
      register.sector_job_id.forEach(element => {
        postData.append("sector_job_id[]", element); //
      });
     
    }
    if (register.firma_ismi) {
      postData.append("firma_ismi", register.firma_ismi); //
    }
    if (register.ticari_unvan) {
      postData.append("ticari_unvan", register.ticari_unvan); //
    }
    if (register.sector_diger) {
      postData.append("sector_diger", register.sector_diger); //
    }
console.log("giden formdata : ", postData);
    newRegister(postData)
      .then((res) => {
        console.log(res);
        nav.navigate("RegisterDoneComponent");
      })
      .catch((err) => console.log(err)); // ?
  };

  const rulesEmail = {
    // minLength: { value: 2, message: "En az 2 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "E-posta Adresi Hatalı",
    },
    validate: {
      checkUrl: async () =>
        (await (postData.append("email", methods.getValues("ipnEmail")),
        checkEmail(postData)
          .then((res) => !res.success)
          .catch((err) => console.log(err)))) ||
        "E-posta Adresi Kullanımdadır.",
    },
  };

  const rulesUserName = {
    minLength: { value: 3, message: "En az 3 karakter giriniz." },
    maxLength: { value: 20, message: "En fazla 20 karakter girebilirsiniz." },
    required: { value: true, message: "Bu alan gerekli." },
    pattern: {
      value: /^[a-zA-Z0-9._]+$/,
      message: "Kullanıcı Adı Hatalı",
    },
    validate: {
      checkUrl: async () =>
        (await (postData.append("username", methods.getValues("ipnUserName")),
        checkUserExists(postData)
          .then((res) => !res.success)
          .catch((err) => console.log(err)))) || "Kullanıcı Adı Kullanımdadır.",
    },
  };

  // const rulesPassword = {
  //   minLength: { value: 6, message: "En az 6 karakter giriniz." },
  //   required: { value: true, message: "Bu alan gerekli." },
  //   pattern: {
  //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
  //     message:
  //       "Şifreniz en az 6 karakterden oluşmalı, içinde en az bir adet büyük harf, küçük harf ve rakam yer almalıdır.",
  //   },
  // };

  // const rulesPass2 = {
  //   // minLength: { value: 6, message: "En az 6 karakter giriniz." },
  //   required: { value: true, message: "Bu alan gerekli." },
  //   validate: { samePass: (v) => v === methods.watch("ipnPass1") || "Parololar uyuşmuyor." },
  // };

  return (
    <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
      <View style={StylesRegister.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />
        <ScrollView keyboardShouldPersistTaps="handled">
          <MainLogo keyboardUp />
          <Text style={StylesRegister.mainText}>Son Birkaç Adım!</Text>

          <View>
            <TxtValidationInput
              content="notNull"
              name="ipnEmail"
              rules={rulesEmail}
              placeHolder="E-mail Adresiniz"
              noUppercase="none"
              {...methods}
            />

            {/* <TxtValidationInput
            content={typeof methods.watch("ipnEmail") === "undefined" ? "" : methods.watch("ipnEmail")}
            name="ipnUserName"
            rules={rulesUserName}
            placeHolder="Kullanıcı Adınız"
            {...methods}
          />

          <TxtValidationInput
            content={
              (typeof methods.watch("ipnEmail") === "undefined" ? "" : methods.watch("ipnEmail")) &&
              (typeof methods.watch("ipnUserName") === "undefined" ? "" : methods.watch("ipnUserName"))
            }
            name="ipnPass1"
            rules={rulesPassword}
            placeHolder="Şifre"
            longInfoText
            isPass
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            {...methods}
          />

          <TxtValidationInput
            content={
              (typeof methods.watch("ipnEmail") === "undefined" ? "" : methods.watch("ipnEmail")) &&
              (typeof methods.watch("ipnUserName") === "undefined" ? "" : methods.watch("ipnUserName")) &&
              (typeof methods.watch("ipnPass1") === "undefined" ? "" : methods.watch("ipnPass1"))
            }
            name="ipnPass2"
            rules={rulesPass2}
            placeHolder="Şifre Tekrar"
            isPass
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            {...methods}
          /> */}
          </View>

          {/* Sözleşme bilgilendirme satırı */}
          <View style={StylesRegister.rowSozlesmelerDis}>
            {methods.watch("ipnEmail") !== "" && openSozlesme && (
              <View style={StylesRegister.rowSozlesmeler}>
                <CheckBox
                  tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
                  disabled={false}
                  value={sozlesmeChecked}
                  onValueChange={(check) => {
                    setSozlesmeChecked(check);
                    if(!sozlesmeChecked){
                      setModalVisible(true);
                    }                   
                  }}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={StylesRegister.sozlesmeText}>
                    E-mail bilgilendirmeyi okudum.
                  </Text>
                </TouchableOpacity>

                
                  {/* SözleşmelerModal */}
                <Modal
                  transparent
                  animationType="fade"
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible((prev) => !prev);
                  }}
                >
                  <SozlesmelerModal setModalVisible={setModalVisible} />
                </Modal>
              </View>
            )}
          </View>
        </ScrollView>
        <BtnMain
        buttonDisabled={buttonDisabled} 
          onPress={methods.handleSubmit(onPress)}
          txt="Kaydet ve İlerle"
        />
      </View>
    </ImageBackground>
  );
};

export default EmailPassword;
