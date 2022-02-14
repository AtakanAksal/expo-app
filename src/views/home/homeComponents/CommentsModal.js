/* eslint-disable consistent-return */
import React, { useState, useEffect, useCallback } from "react";
import { TextInput, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useUserValue } from "../../../contexts/UserContext";
import { useGetComments, createComment } from "../../../helpers/streamConnections";

import { Flags } from "../../../components/FlagExporter";
import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";
import CommentIcon from "../../../../assets/comment.png";
import TDotV from "../../../../assets/three-dot-v.png";
import CameraIcon from "../../../../assets/camera.png";
import SendIcon from "../../../../assets/send.png";

import { usePostValue } from "../../../contexts/PostContext";

const CommentsModal = ({ closePress, profileStreamID, commentCount, setCommentCount }) => {
  const [commentText, setCommentText] = useState("");
  const [offset, setOffset] = useState(1);
  const [streamComments, setStreamComments] = useState([]);

  // console.log(streamComments);
  const { changeCommentCount, changeMyCommentCount } = usePostValue();
  const [{ user }] = useUserValue();

  const { data, mutate, isLoading, isError } = useGetComments(offset, profileStreamID, user.token); //  profileStreamID 402

  const setUyelikTuru = ({ item }) => {
    if (item.user?.userrole_id === 1) {
      return "Bireysel";
    }
    if (item.user?.userrole_id === 2) {
      return "Ticari";
    }
    if (item.user?.userrole_id === 3) {
      return "Kamu";
    }
    if (item.user?.userrole_id === 4) {
      return "STK";
    }
  };

  useEffect(() => {
    // console.log(data?.stream[0]?.stream_comments);
    setStreamComments(data?.stream[0]?.stream_comments);
  }, [data]);

  const createCommentFunc = useCallback(() => {
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    postData.append("user_id", user.user_id);
    postData.append("stream_id", profileStreamID); // 402
    postData.append("text_content", commentText);

    createComment(postData, user.token)
      .then((res) => {
        console.log(res);
        if (res.result === "success") {
          mutate();
          setCommentText("");
          setCommentCount((prev) => prev + 1);
          changeCommentCount(profileStreamID);
          changeMyCommentCount(profileStreamID);
        }
      })
      .catch((err) => console.log(err));
  }, [commentText]);

  return (
    <View style={styles.mainContainer}>
      {/** @@@@@  HEAD @@@@@ */}
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={closePress}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Yorumlar</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image style={{ height: 45, width: 45 }} source={CommentIcon} resizeMode="contain" />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </View>
      </View>

      {/** @@@@@  MİDD @@@@@ */}
      <View style={styles.midFrame}>
        <FlatList
          style={{
            flex: 1,
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          data={streamComments}
          // ? pagination bakılacak
          // onEndReached={() => setOffset((prev) => prev + 1)}
          // onEndReachedThreshold={1}mm
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: "row", padding: 7 }}>
              <Image
                style={{ height: 40, width: 40, marginRight: 10 }}
                source={{ uri: item.user?.userdetail?.picture }}
                resizeMode="contain"
              />
              <View style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
                  <View style={{ justifyContent: "center", marginLeft: 10 }}>
                    <Text style={{ fontSize: 12, color: "#6C757D" }}>
                      {
                        item?.user?.userrole_id && item.user?.userrole_id === 1
                          ? item.user?.userdetail?.name
                          : item.user?.userdetail
                              ?.name /** // ? streamcommentsin içinde full_institution_name yok - item.full_institution_name */
                      }
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                      <View
                        style={{
                          marginRight: 2 /**  borderWidth: 0.5, borderColor:"#EEEEEE"  // beyaz bayraklara çerçeve için */,
                        }}
                      >
                        <Image
                          style={{ height: 20, width: 20 }}
                          source={Flags[item.user?.userdetail?.country?.binarycode.toLowerCase()]}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={{ fontSize: 10, textAlignVertical: "center", color: "#6C757D" }}>
                        {item.user?.userdetail?.country?.binarycode}
                      </Text>

                      <Text style={{ paddingLeft: 10, fontSize: 8, textAlignVertical: "center", color: "#6C757D" }}>
                        {setUyelikTuru({ item })}
                      </Text>
                    </View>
                  </View>
                  <Image style={{ height: 30, width: 30, alignSelf: "center" }} source={TDotV} resizeMode="contain" />
                </View>
                <Text style={{ padding: 10 }}>{item.text_content}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/** @@@@@  FOOT @@@@@ */}
      <View style={styles.footFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Image style={{ height: 45, width: 45 }} source={CameraIcon} resizeMode="contain" />
          <TextInput
            style={{ margin: 5, flex: 1, height: 45, paddingHorizontal: 5 }}
            multiline
            placeholder="Herkese açık bir yorum yaz..."
            onChangeText={(text) => setCommentText(text)}
            value={commentText}
          />
          {commentText.length > 0 && (
            <TouchableOpacity onPress={() => createCommentFunc()}>
              <Image style={{ height: 45, width: 45 }} source={SendIcon} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  headFrame: {
    flexDirection: "row",
    margin: 5,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  midFrame: {
    flex: 1,
    margin: 5,
    backgroundColor: "#FFF",
  },
  footFrame: {
    borderTopWidth: 0.5,
    margin: 5,

    minHeight: 60,

    backgroundColor: "#fff",
  },

  commentCount: {
    position: "absolute",
    top: 0,
    bottom: 6,
    left: 0,
    right: 0,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
