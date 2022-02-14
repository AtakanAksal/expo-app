/* eslint-disable import/prefer-default-export */
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const STREAMS = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams`; // x silinecek
const GET_STREAMS = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams?`; // page=${page}&type=${type}
const POST_PROFILE_STREAM = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streamshow`; // x silinecek
const GET_PROFILE_STREAM = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streamshow?`; // page=${page}&user_id=${userID}
const POST_STREAM = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams/create`;
const POST_COMMENT = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams/comment`; // x Silinecek
const POST_LIKE_UNLIKE = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams/stream-like-update`;
const GET_COMMENTS = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/stream-comments?`; 
const POST_CREATE_COMMENT = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams/comment`;

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

export const getStreams = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(STREAMS, postData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// index =>
// `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${index +
// 1}`,
export const useGetStreams = (page, type, token) => {
  const { data, error, isValidating, mutate } = useSWR([`${GET_STREAMS}page=${page}&type=${type}`, token], fetcher, {
    revalidateOnFocus: false,
  });
  /* 
    const { data, error, mutate, size, setSize } = useSWRInfinite(
      // console.log(size),
      (index) => [`${process.env.REACT_APP_DEVAPI_HOST}v1/profile/streams?page=${index + 1}&type=all`, token],
      fetcher,
      {
        revalidateOnFocus: false,
      }
    ); */

  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getProfileStream = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_PROFILE_STREAM, postData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// üstteki getProfileStream kullanılıyor.
export const useGetProfileStream = (page, userID, token) => {
  const { data, error, mutate } = useSWR([`${GET_PROFILE_STREAM}page=${page}&user_id=${userID}`, token], fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const postStream = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_STREAM, postData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
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

// silinecek..
export const postComment = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_COMMENT, postData, {
        headers: {
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

export const postLikeUnlike = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_LIKE_UNLIKE, postData, {
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

export const useGetComments = (page, profileStreamID, token) => {
  const { data, error, mutate } = useSWR(
    [`${GET_COMMENTS}page=${page}&profile_stream_id=${profileStreamID}`, token],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const createComment = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_CREATE_COMMENT, postData, {
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
