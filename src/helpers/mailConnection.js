/* eslint-disable import/prefer-default-export */
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const RECEIVED_MAIL = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/received`; // Gelen maillerin çekimi
const SENT_MAIL = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/sent`; // Giden maillerin çekimi
const TO_SEARCH_IN_FOLLOWINGS = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/followings-by-name-and-mail`; // Gelen mail listeleme

// Alıcı taslağa ekleme
const ADD_TO_RECEIVER = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/add-receiver`;
const ADD_TO_CC = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/add-cc`;
const ADD_TO_BCC = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/add-bcc`;

// Alıcı taslaktan çıkarma
const REMOVE_TO = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/remove-receiver`;
const REMOVE_CC = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/remove-cc`;
const REMOVE_BCC = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/remove-bcc`;

// Taslak id alımı, ilk kişi profile eklenirken çekilir
const MAIL_ID = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/send-mail`

const POST_UPDATE_CONTENT = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/update-content`

const POST_UPLOAD_MAIL_FILE  = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/upload-mail-file`

 const POST_DELETE_MAIL_FILE = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/delete-mail-file`;

 const POST_MAKE_SENT = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/make-sent`

 const POST_IMZA = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/user-details-imza`

 const POST_USERLIST = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/user-by-name-and-mail`
 const POST_ADD_NEW_FOLDER = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/add-new-folder`

const POST_GET_FOLDERS = `${process.env.REACT_APP_DEVAPI_HOST}v1/mail/get-folders`


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

export const postReceivedMail = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postReceivedMail çalıştı");
   //  console.log(postData);
    axios
      .post(RECEIVED_MAIL, postData, {
        headers: {
          Accept: "application/json",
        //  "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("istek gönderildi");
       // console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log("hata oluştu");
        reject(err);
      });
  });
};

export const postSentMail = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postSentMail çalıştı");
    // console.log(postData);
    axios
      .post(SENT_MAIL, postData, {
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

export const postToSearchInFollowings = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postToSearchInFollowings çalıştı");
    // console.log(postData);
    axios
      .post(TO_SEARCH_IN_FOLLOWINGS, postData, {
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


// Alıcı taslağa ekleme


export const postAddToReceiver = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postAddToReceiver çalıştı");
    // console.log(postData);
    axios
      .post(ADD_TO_RECEIVER, postData, {
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
export const postAddCcReceiver = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postAddCcReceiver çalıştı");
    // console.log(postData);
    axios
      .post(ADD_TO_CC, postData, {
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
export const postAddBccReceiver = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postAddBccReceiver çalıştı");
    // console.log(postData);
    axios
      .post(ADD_TO_BCC, postData, {
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


// Alıcı taslaktan çıkarma
export const postRemoveTo = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postRemoveTo çalıştı");
    // console.log(postData);
    axios
      .post(REMOVE_TO, postData, {
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
export const postRemoveCC = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postRemoveCC çalıştı");
    // console.log(postData);
    axios
      .post(REMOVE_CC, postData, {
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
export const postRemoveBCC = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postRemoveBCC çalıştı");
    // console.log(postData);
    axios
      .post(REMOVE_BCC, postData, {
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


// Taslak id alımı, ilk kişi profile eklenirken çekilir
export const postMailId = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postMailId çalıştı");
    // console.log(postData);
    axios
      .post(MAIL_ID, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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

// taslak kaydetme işlemi
export const postUpdateContent = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postUpdateContent çalıştı");
    // console.log(postData);
    axios
      .post(POST_UPDATE_CONTENT, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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


export const postUpdateMailFile = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postUpdateMailFile çalıştı");
    // console.log(postData);
    axios
      .post(POST_UPLOAD_MAIL_FILE, postData, {
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
export const postDeleteMailFile = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postUpdateContent çalıştı");
    // console.log(postData);
    axios
      .post(POST_DELETE_MAIL_FILE, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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
export const postMakeSent = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postUpdateContent çalıştı");
    // console.log(postData);
    axios
      .post(POST_MAKE_SENT, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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
export const postImza = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postImza çalıştı");
    // console.log(postData);
    axios
      .post(POST_IMZA, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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
export const postUserList = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postUserList çalıştı");
    // console.log(postData);
    axios
      .post(POST_USERLIST, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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

export const postAddNewFolder = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postUserList çalıştı");
    // console.log(postData);
    axios
      .post(POST_ADD_NEW_FOLDER, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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


export const postGetFolders = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("postGetFolders çalıştı");
    // console.log(postData);
    axios
      .post(POST_GET_FOLDERS, postData, {
        headers: {
          Accept: "application/json",
         // "Content-Type": "multipart/form-data",
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