/* eslint-disable import/prefer-default-export */
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

// const STREAMS = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams`;

const INVOICES = `${process.env.REACT_APP_DEVAPI_HOST}v1/orders/get-invoices` ;  
const FILTERED_INVOICES=  `${process.env.REACT_APP_DEVAPI_HOST}v1/orders/filtered/invoices`; // Tüm detay filtrelemeler buradan
const INVOICE_UNIQUE_NAMES=   `${process.env.REACT_APP_DEVAPI_HOST}v1/orders/get-invoices-unique-names`
const INVOICE_SEARCH=   `${process.env.REACT_APP_DEVAPI_HOST}v1/orders/searched/invoices`
const INVOICE_DETAIL_FILTERED = `${process.env.REACT_APP_DEVAPI_HOST}v1/orders/filtered/orders`

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

export const postInvoices = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postInvoices çalıştı");
    // console.log(postData);
    axios
      .post(INVOICES, postData, {
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
export const postInvoicesFiltered = async (postData, token) => { // Tüm detay filtrelemeler buradan
  return new Promise((resolve, reject) => {
    console.log("postInvoices çalıştı");
    // console.log(postData);
    axios
      .post(FILTERED_INVOICES, postData, {
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
export const postInvoicesUniqueNames = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postInvoices çalıştı");
    // console.log(postData);
    axios
      .post(INVOICE_UNIQUE_NAMES, postData, {
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
export const postInvoicesSearch = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postInvoices çalıştı");
    // console.log(postData);
    axios
      .post(INVOICE_SEARCH, postData, {
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
export const postInvoicesDetailFiltered = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postInvoicesDetail çalıştı");
    // console.log(postData);
    axios
      .post(INVOICE_DETAIL_FILTERED, postData, {
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
