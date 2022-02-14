/* eslint-disable import/prefer-default-export */
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

// const STREAMS = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams`;

const VERIFY_USER_LOGIN_INFO = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/who` ;  


const fetcher = async (url, token) => {
  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const postVerifyUserLoginInfo = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postVerifyUserLoginInfo çalıştı");
    // console.log(postData);
    axios
      .post(VERIFY_USER_LOGIN_INFO, postData, {
        headers: {
          Accept: "application/json",
        //  "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("istek gönderildi");
        resolve(res.data);
      })
      .catch((err) => {
        console.log("hata oluştu");
        reject(err);
      });
  });
};