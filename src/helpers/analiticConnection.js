/* eslint-disable import/prefer-default-export */
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

// const STREAMS = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams`;

const GETWITHID = `${process.env.REACT_APP_DEVAPI_HOST}v1/stats/getwithid` ;  
const ALLVISITORWITHPAGE = `${process.env.REACT_APP_DEVAPI_HOST}v1/visitor/all-visitor-with-page`


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

export const fetchGetWithId = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postInvoices çalıştı");
    // console.log(postData);
    axios
      .post(GETWITHID, postData, {
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

export const fetchAllVisitorWithPage = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postInvoices çalıştı");
    // console.log(postData);
    axios
      .post(ALLVISITORWITHPAGE, postData, {
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