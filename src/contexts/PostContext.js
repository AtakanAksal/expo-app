/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { createContext, useContext, useState, useEffect } from "react";
import filter from "lodash.filter";
import { useGetStreams, getStreams } from "../helpers/streamConnections";
import { useUserValue } from "./UserContext";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [homestreamData, setHomestreamData] = useState([]);
  const [myProfileStreamData, setMyProfileStreamData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [myOffset, setMyOffset] = useState(1);

  const [{ user }] = useUserValue();

  // const { data, isLoading, isError } = useGetStreams(offset, "all", user.token);
/*   useEffect(() => {
    console.log(homestreamData);
  }, [homestreamData]); */

  const getData = () => {
    console.log(offset);
    console.log("get DATA ------ çalıştı");

    const postData = new FormData();
    postData.append("page", offset);
    postData.append("type", "all"); // ? type belirlenecek

    getStreams(postData, user.token)
      .then((res) => {
        setHomestreamData((prevState) => [...prevState, ...res.streams]);
        // setOffset((prev) => prev + 1);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const getMyData = () => {
    /*  console.log("get DATA ------ çalıştı"); */

    const postData = new FormData();
    postData.append("page", myOffset);
    postData.append("type", "me"); // ? type belirlenecek

    getStreams(postData, user.token)
      .then((res) => {
        setMyProfileStreamData((prevState) => [...prevState, ...res.streams]);
        // setMyOffset((prev) => prev + 1);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [offset]);

  useEffect(() => {
    getMyData();
  }, [myOffset]);

  /*   useEffect(() => {
    if (!(isLoading || isError)) {
      if (offset === 1) {
        setHomestreamData(data.streams);
      } else {
        setHomestreamData((prevState) => [...prevState, ...data.streams]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); */

  const resetStream = () => {
    if (offset === 1) {
      setHomestreamData([]);
      getData();
    } else {
      setHomestreamData([]);
      setOffset(1);
    }
  };

  const incrementOffset = () => {
    setOffset((prev) => prev + 1);
  };
  const resetMyStream = () => {
    if (myOffset === 1) {
      setMyProfileStreamData([]);
      getMyData();
    } else {
      setMyProfileStreamData([]);
      setMyOffset(1);
    }
  };
  const incrementMyOffset = () => {
    setMyOffset((prev) => prev + 1);
  };

  /*  ilk yapılan.. 
  const changePostLike = (likeStatus, likeData) => {
    const degistirilecekData = { ...likeData.streamlikes[0] };
    const anaStream = [...homestreamData];
    if (likeStatus) {
      // ! Todo: promise'e çevir
      // ? Todo: promise'e çevir
      anaStream.forEach((element) => {
        if (likeData.id === element.id) {
          element.streamlikes.push(degistirilecekData);
        }
      });
      setHomestreamData(anaStream);
    } else {
      // ! Todo: promise'e çevir
      anaStream.forEach((element) => {
        if (element.id === likeData.id) {
          const index = element.streamlikes.findIndex((kkk) => kkk.id === degistirilecekData.id);
          element.streamlikes.splice(index, index + 1);
        }
      });
      setHomestreamData(anaStream);
    }
  };
*/

  const changePostLike = (likeStatus, likeableID) => {
    const anaStream = [...homestreamData];

    if (likeStatus === "1") {
      console.log("like yapıldı");
      anaStream.forEach((el) => {
        if (el.id === likeableID) {
          const index = anaStream.findIndex((kkk) => kkk.id === likeableID);
          const likeCount = anaStream[index].streamlikes_count;
          anaStream[index] = { ...anaStream[index], is_liked: true, streamlikes_count: likeCount + 1 };
          setHomestreamData(anaStream);
          // console.log(anaStream);
        }
      });
    } else {
      console.log("like kaldırıldı");
      anaStream.forEach((el) => {
        if (el.id === likeableID) {
          const index = anaStream.findIndex((kkk) => kkk.id === likeableID);
          const likeCount = anaStream[index].streamlikes_count;
          anaStream[index] = { ...anaStream[index], is_liked: false, streamlikes_count: likeCount - 1 };
          setHomestreamData(anaStream);
          // console.log(anaStream);
        }
      });
    }
  };
  const changeMyPostLike = (likeStatus, likeableID) => {
    const profileStream = [...myProfileStreamData];

    if (likeStatus === "1") {
      console.log("like yapıldı");
      profileStream.forEach((el) => {
        if (el.id === likeableID) {
          const index = profileStream.findIndex((kkk) => kkk.id === likeableID);
          const likeCount = profileStream[index].streamlikes_count;
          profileStream[index] = { ...profileStream[index], is_liked: true, streamlikes_count: likeCount + 1 };
          setMyProfileStreamData(profileStream);
          // console.log(profileStream);
        }
      });
    } else {
      console.log("like kaldırıldı");
      profileStream.forEach((el) => {
        if (el.id === likeableID) {
          const index = profileStream.findIndex((kkk) => kkk.id === likeableID);
          const likeCount = profileStream[index].streamlikes_count;
          profileStream[index] = { ...profileStream[index], is_liked: false, streamlikes_count: likeCount - 1 };
          setMyProfileStreamData(profileStream);
          // console.log(profileStream);
        }
      });
    }
  };

  const changeCommentCount = (postID) => {
    const anaStream = [...homestreamData];
    // console.log(postID);
    anaStream.forEach((el) => {
      if (el.id === postID) {
        const index = anaStream.findIndex((kkk) => kkk.id === postID);
        const commentCount = anaStream[index].stream_comments_count;
        anaStream[index] = { ...anaStream[index], stream_comments_count: commentCount + 1 };
        setHomestreamData(anaStream);
        //  console.log(anaStream);
      }
    });
  };
  const changeMyCommentCount = (postID) => {
    const profileStream = [...myProfileStreamData];
    // console.log(postID);
    profileStream.forEach((el) => {
      if (el.id === postID) {
        const index = profileStream.findIndex((kkk) => kkk.id === postID);
        const commentCount = profileStream[index].stream_comments_count;
        profileStream[index] = { ...profileStream[index], stream_comments_count: commentCount + 1 };
        setMyProfileStreamData(profileStream);
        //  console.log(profileStream);
      }
    });
  };

  return (
    <PostContext.Provider
      value={{
        homestreamData,
        resetStream,
        incrementOffset,
        changePostLike,
        changeCommentCount,
        myProfileStreamData,
        resetMyStream,
        incrementMyOffset,
        changeMyPostLike,
        changeMyCommentCount,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostValue = () => useContext(PostContext);
