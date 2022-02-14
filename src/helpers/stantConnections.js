/* eslint-disable import/prefer-default-export */
import axios from "axios";

const GET_STANT_INFO = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/menu`;
const GET_MY_STANT = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/filter-custom-user`;
const GIFT_LIST = `${process.env.REACT_APP_DEVAPI_HOST}v1/gift/all/unique/filter-values`;

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

export const getStantInfo = async (boothID, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GET_STANT_INFO, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          booth_id: boothID,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMyStants = async (status, page, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GET_MY_STANT, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          paginate: 20,
          page,
          status,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getMyGifts = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(GIFT_LIST, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
