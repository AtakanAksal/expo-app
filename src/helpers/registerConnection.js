/* eslint-disable import/prefer-default-export */
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const SEND_CODE = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/mobile-code/create`;
const CHECK_CODE = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/mobile-code/check`;
const FORGET_PASS = `${process.env.REACT_APP_DEVAPI_HOST}v1/auth/forgot/password`;

const GET_SECTORS = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-all-sectors` ;  
const GET_JOBS = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-jobs/` ;  
const GET_WORLD_CITIES=`${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/get-world-cities/`
     
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

export const postSendCode = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postSendCode çalıştı");
    // console.log(postData);
    axios
      .post(SEND_CODE, postData, {
        headers: {
          Accept: "application/json",
        //  "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
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
export const postCheckCode = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postCheckCode çalıştı");
    // console.log(postData);
    axios
      .post(CHECK_CODE, postData, {
        headers: {
          Accept: "application/json",
        //  "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
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


export const useGetSectors = () => {
  const { data, error } = useSWR(GET_SECTORS, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    // eslint-disable-next-line object-shorthand
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useGetJobs = (id) => {
  const { data, error } = useSWR(`${GET_JOBS}${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    // eslint-disable-next-line object-shorthand
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useGetWorldCities = (countryName) => {
  const { data, error } = useSWR(`${GET_WORLD_CITIES}${countryName}`, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    // eslint-disable-next-line object-shorthand
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const postForgetPassword = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postCheckCode çalıştı");
    // console.log(postData);
    axios
      .post(FORGET_PASS, postData, {
        headers: {
          Accept: "application/json",
        //  "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
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