
import axios from "axios";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const GET_POSTS_LIST = `https://jsonplaceholder.typicode.com/posts`;
// const POST_LOGIN = `https://jsonplaceholder.typicode.com/posts`;

const GET_COUNTRY_LIST = `${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/getCountry`;

const FORGOT_PASS_USERNAME = "";
const FORGOT_PASS_PHONE = "";
const FORGOT_PASS_EMAIL = "";
const UPDATE_USER = "";
const REGISTER = "";
// const LOGIN = `${process.env.REACT_APP_DEVAPI_HOST}v1/auth/login`; //! env alınamadı
const LOGIN = `${process.env.REACT_APP_DEVAPI_HOST}v1/auth/login`; //! env alınamadı
const GET_ALL_USER = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/get-allusers`;
const GET_USER_DETAIL = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/get-detail`;
const CHECK_USER = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/get-username`;
const CHECK_PHONE = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/get-phones`;
const CHECK_EMAIL = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/get-emails`;
const CHECK_PHONE_EXISTS = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/is-cell-phone-exists`;
const GET_GENDER = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-gender`;
const CHECK_USER_EXISTS = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/is-user-name-exist`;
const GET_COUNTRIES = `${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/get-country`;
const CHECK_USER_ROLE = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/get-user-role`;
const STK_TYPE = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-non-governmental-organisation-type`;

const GET_CITIES = `${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/get-cities/212`;
const GET_TOWNS = `${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/get-towns/`;
const GET_DISTRICTIS = `${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/get-districts/`;

const GET_COMPANY_TYPE = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-company-type`;
const GET_TAX_CENTER = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-tax-center`;

const GET_INSTITUTION_TYPE = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-public-institution-type`;
const GET_REGION_TYPE = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-region-type`;
const GET_METROPOL_CITIES = `${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/get-metropol-cities/212`;
const GET_NON_METROPOL_CITIES = `${process.env.REACT_APP_DEVAPI_HOST}v1/helpers/get-non-metropol-cities/212`;
const GET_MINISTRY_TYPE = `${process.env.REACT_APP_DEVAPI_HOST}v1/dropdown/get-ministry-type`;

const NEW_REGISTER = `${process.env.REACT_APP_DEVAPI_HOST}v1/user/mobile-code/create`         // `${process.env.REACT_APP_DEVAPI_HOST}v1/user/new`;
const POST_STORE_AUTHORITY_CHANGE = `${process.env.REACT_APP_DEVAPI_HOST}v1/feedback/storeAuthorityChange`;

const GET_PROFILE = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/show/`;
const FOLLOW_PROFILE = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/follow`;
const UNFOLLOW_PROFILE = `${process.env.REACT_APP_DEVAPI_HOST}v1/profile/unfollow`;

const YAYINDAKI_STANTLAR = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/on-air-list`;
const BEKLEMEDE_STANTLAR = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/broadcast-waiting-list`;
const BITEN_STANTLAR = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/broadcast-ending-list`;

const STANT_BEGENILER = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/get-likes?id=`;
const STANT_SIKAYETLER = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/get-booth-complaints`;

const GET_CLOUDFILES_TAKEN_FROM_BOOTH = `${process.env.REACT_APP_DEVAPI_HOST}v1/storage/cloudfiles-taken-from-booth?`;
const GET_CLOUDFILES_GIVEN_TO_BOOTH = `${process.env.REACT_APP_DEVAPI_HOST}v1/storage/cloudfiles-given-to-booth?`;
const GET_VEXDRIVES_TAKEN_FROM_BOOTH = `${process.env.REACT_APP_DEVAPI_HOST}v1/storage/expodrives-taken-from-booth?`;
const GET_VEXDRIVES_GIVEN_TO_BOOTH = `${process.env.REACT_APP_DEVAPI_HOST}v1/storage/expodrives-given-to-booth?`;

const GET_ERISIM = `${process.env.REACT_APP_DEVAPI_HOST}v1/visitor/boothuser?`;
const GET_ETKILESIM = `${process.env.REACT_APP_DEVAPI_HOST}v1/visitor/interactionuser?`;

const POST_DOCUMENTS_TO_VEXDRIVE = `${process.env.REACT_APP_DEVAPI_HOST}v1/storage/userbag/store-multiple-cloudfile`;
const POST_STANT_VEXRATE = `${process.env.REACT_APP_DEVAPI_HOST}v1/visitor/ratings-by-users-for-booth`;

const BOOTH_DOCUMENTS = `${process.env.REACT_APP_DEVAPI_HOST}v1/booth/cloudfiles-by-category-id`;

const POST_NOTIFICATION_FOLLOW = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/follow`;
const POST_NOTIFICATION_LIKES = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/likes`;
const POST_NOTIFICATION_BLOCKS = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/blocks`;
const POST_NOTIFICATION_COMPLAINTS = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/complaints`;
const POST_NOTIFICATION_INVITATIONS = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/invitations`;
const POST_NOTIFICATION_COMMENTS = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/comments`;
const POST_NOTIFICATION_THANKS = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/thanks`;
const POST_NOTIFICATION_APPLICATIONS = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/applications`;
const POST_NOTIFICATION_GIFT = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/gifts`;
const POST_NOTIFICATION_UPDATE = `${process.env.REACT_APP_DEVAPI_HOST}v1/feedback/getAuthorityChanges`;
const POST_ANNOUNCEMENT = `${process.env.REACT_APP_DEVAPI_HOST}v1/admin-announcement/index`;
const POST_NOTIFICATION_COUNTS = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/get-counts`;
const POST_NOTIFICATION_MALEVOLENCE =`${process.env.REACT_APP_DEVAPI_HOST}v1/malevolence/store`; // art niyet bildir api

/* Card işlem */
const POST_NOTIFICATION_BUTTONS_DELETE = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/delete-multiple`;
const POST_NOTIFICATION_BUTTONS_THANK = `${process.env.REACT_APP_DEVAPI_HOST}v1/thank/store`;
const POST_NOTIFICATION_BUTTONS_SETASREAD = `${process.env.REACT_APP_DEVAPI_HOST}v1/notification/set-as-read`;
const POST_NOTIFICATION_MALEVOLENCE_DELETE_BY_USER = `${process.env.REACT_APP_DEVAPI_HOST}v1/feedback/deleteByUser`;


//  Reklam
const POST_ADVERTISEMENT_WITH_TYPE = `${process.env.REACT_APP_DEVAPI_HOST}v1/announcements/get-announcement-with-type`
const POST_ADVERTISEMENT_FILTER =  `${process.env.REACT_APP_DEVAPI_HOST}v1/announcements/filter-and-search`

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

export const useDataPosts = () => {
  const { data, error } = useSWR(GET_POSTS_LIST, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    // eslint-disable-next-line object-shorthand
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDataCountries = () => {
  const { data, error } = useSWR(GET_COUNTRIES, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetCities = () => {
  const { data, error } = useSWR(GET_CITIES, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useGetTowns = (id) => {
  const { data, error } = useSWR(`${GET_TOWNS}${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetDistricts = (id) => {
  const { data, error } = useSWR(`${GET_DISTRICTIS}${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const postLogin = async (postData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(LOGIN, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkUser = async (postData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(CHECK_USER, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkPhone = async (postData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(CHECK_PHONE, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkEmail = async (postData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(CHECK_EMAIL, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkPhoneExists = async (postData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(CHECK_PHONE_EXISTS, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const useGetGender = () => {
  const { data, error } = useSWR(GET_GENDER, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const checkUserExists = async (postData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(CHECK_USER_EXISTS, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const newRegister = async (postData) => {
  // console.log(postData);
  return new Promise((resolve, reject) => {
    axios
      .post(NEW_REGISTER, postData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUserRole = async () => {
  return new Promise((resolve, reject) => {
    axios
      .post(CHECK_USER_ROLE)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const useGetStkTypes = () => {
  const { data, error, mutate } = useSWR(STK_TYPE, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetCompanyType = () => {
  const { data, error } = useSWR(GET_COMPANY_TYPE, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetTaxCenter = () => {
  const { data, error } = useSWR(GET_TAX_CENTER, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetInstitutionType = () => {
  const { data, error } = useSWR(GET_INSTITUTION_TYPE, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetRegionType = () => {
  const { data, error } = useSWR(GET_REGION_TYPE, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetMetropolCities = () => {
  const { data, error } = useSWR(GET_METROPOL_CITIES, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetNonMetropolCities = () => {
  const { data, error } = useSWR(GET_NON_METROPOL_CITIES, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetMinistryType = () => {
  const { data, error } = useSWR(GET_MINISTRY_TYPE, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getAllUser = async () => {
  return new Promise((resolve, reject) => {
    axios
      .post(GET_ALL_USER)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postStoreAuthoritychange = async (postData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_STORE_AUTHORITY_CHANGE, postData)
      .then((res) => {
        // console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const followProfile = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(FOLLOW_PROFILE, postData, {
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

export const unfollowProfile = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(UNFOLLOW_PROFILE, postData, {
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

export const userDetailById = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(GET_USER_DETAIL, postData, {
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

/* @@@@@ STANT SALON FUAR @@@@@ */
/* @@@@@ STANT SALON FUAR @@@@@ */
/* @@@@@ STANT SALON FUAR @@@@@ */

export const postYayindakiStantlar = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(YAYINDAKI_STANTLAR, postData, {
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

export const postBeklemedeStantlar = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BEKLEMEDE_STANTLAR, postData, {
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

export const postBitenStantlar = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BITEN_STANTLAR, postData, {
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

// ? swr kullanarak beceremedim. Tekrardan bakılacak
/* export const useGetCloudFilesTaken = (documentType, boothId, currentPage, token) => {
  const { data, error } = useSWR(
    [
      {
        "gelen-kartvizit": `${GET_CLOUDFILES_GIVEN_TO_BOOTH}booth_id=${boothId}&cloudfile_categories_id=2&currentPage=${currentPage}`,
        "giden-kartvizit": `${GET_CLOUDFILES_TAKEN_FROM_BOOTH}booth_id=${boothId}&cloudfile_categories_id=2&currentPage=${currentPage}`,
      }[documentType],
      token,
    ],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}; */

/* export const useGetBoothLikes = (boothID, page) => {
  const { data, error } = useSWR(`${STANT_BEGENILER}${boothID}&page=${page}`, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}; */



export const getBoothLikes= async (boothID, page, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${STANT_BEGENILER}${boothID}&page=${page}`, {
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


export const postStantSikayetler = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(STANT_SIKAYETLER, postData, {
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

export const getCloudFilesTaken = async (documentType, boothId, currentPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        {
          "gelen-kartvizit": `${GET_CLOUDFILES_GIVEN_TO_BOOTH}booth_id=${boothId}&cloudfile_categories_id=2&currentPage=${currentPage}`,
          "giden-kartvizit": `${GET_CLOUDFILES_TAKEN_FROM_BOOTH}booth_id=${boothId}&cloudfile_categories_id=2&currentPage=${currentPage}`,
          "gelen-brosur": `${GET_CLOUDFILES_GIVEN_TO_BOOTH}booth_id=${boothId}&cloudfile_categories_id=1&currentPage=${currentPage}`,
          "giden-brosur": `${GET_CLOUDFILES_TAKEN_FROM_BOOTH}booth_id=${boothId}&cloudfile_categories_id=1&currentPage=${currentPage}`,
          "gelen-vexdrive": `${GET_VEXDRIVES_GIVEN_TO_BOOTH}booth_id=${boothId}&currentPage=${currentPage}`,
          "giden-vexdrive": `${GET_VEXDRIVES_TAKEN_FROM_BOOTH}booth_id=${boothId}&currentPage=${currentPage}`,
        }[documentType],
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const documentsSaveToDrive = async (postData, token) => {
  /*   console.log("------ ğğğ-----");
    //  console.log(token);
    // eslint-disable-next-line no-undef
    const postData = new FormData();
  
    postData.append("shareable_ids[]", 449);
    postData.append("contacted_user_id", 61);
    postData.append("is_profile", 0);
    postData.append("booth_id", -1); */

  /*   const abc = {
      shareable_ids: [449, 450],
      contacted_user_id: 61,
      is_profile: true,
      booth_id: null,
    }; */

  // console.log(postData);
  return new Promise((resolve, reject) => {
    axios
      .post(POST_DOCUMENTS_TO_VEXDRIVE, postData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
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

export const getErisim = async (boothId, currentPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${GET_ERISIM}booth_id=${boothId}&currentPage=${currentPage}`, {
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

export const getEtkilesim = async (boothId, currentPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${GET_ETKILESIM}booth_id=${boothId}&currentPage=${currentPage}`, {
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

export const postStantVexRate = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_STANT_VEXRATE, postData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
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
export const postBoothDocuments = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BOOTH_DOCUMENTS, postData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
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

export const postNotificationFollow = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_FOLLOW, postData, {
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

export const postNotificationLikes = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_LIKES, postData, {
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
export const postNotificationBlocks = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_BLOCKS, postData, {
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
export const postNotificationComplaints = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_COMPLAINTS, postData, {
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
export const postNotificationInvitations = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_INVITATIONS, postData, {
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
export const postNotificationComments = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_COMMENTS, postData, {
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
export const postNotificationThanks = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_THANKS, postData, {
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
export const postNotificationApplications = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_APPLICATIONS, postData, {
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
export const postNotificationGift = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_GIFT, postData, {
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
export const postNotificationUpdate = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_UPDATE, postData, {
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

export const postNotificationButtonDelete = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_BUTTONS_DELETE, postData, {
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
export const postNotificationButtonThank = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_BUTTONS_THANK, postData, {
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
export const postNotificationButtonSetAsRead = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_BUTTONS_SETASREAD, postData, {
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

export const getProfile = async (userID, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${GET_PROFILE}${userID}`, {
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
export const postAnnouncement = async (postData, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_ANNOUNCEMENT, postData, {
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
export const postNotificationCount = async (token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(POST_NOTIFICATION_COUNTS, null, {
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
export const postNotificationMalevolance = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("connettion çalıştı");
    // console.log(postData);
    axios
      .post(POST_NOTIFICATION_MALEVOLENCE, postData, {
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
export const postNotificationDeleteByUser = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("connettion çalıştı");
    // console.log(postData);
    axios
      .post(POST_NOTIFICATION_MALEVOLENCE_DELETE_BY_USER, postData, {
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
export const postAdvertisementWithType = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("connettion çalıştı");
    // console.log(postData);
    axios
      .post(POST_ADVERTISEMENT_WITH_TYPE, postData, {
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
export const postAdvertisementFilter = async (postData, token) => {
  return new Promise((resolve, reject) => {
    console.log("connettion çalıştı");
    // console.log(postData);
    axios
      .post(POST_ADVERTISEMENT_FILTER, postData, {
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
