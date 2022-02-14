/* eslint-disable no-undef */
/* eslint-disable no-lonely-if */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import filter from "lodash.filter";
import { Tooltip } from "react-native-elements";
import { useSWRConfig } from "swr";

import { postLikeUnlike } from "../../../helpers/streamConnections";

import TDotH from "../../../../assets/three-dot-h.png";
import Like from "../../../../assets/like.png";
import LikeEmpty from "../../../../assets/like-empty.png";
import CommentIcon from "../../../../assets/comment.png";
import CommentsModal from "../homeComponents/CommentsModal";
import FullScreenImageModal from "../homeComponents/FullScreenImageModal";
// tooltip icons
import FowardIcon from "../../../../assets/tooltip/foward.png";
import ShareIcon from "../../../../assets/tooltip/share.png";
import EditIcon from "../../../../assets/tooltip/edit.png";
import DeleteIcon from "../../../../assets/tooltip/delete.png";
import CommentOpen from "../../../../assets/tooltip/comment-open.png";
import CommentClose from "../../../../assets/tooltip/comment-close.png";
import ProfileBox from "../../../components/profileComponent/ProfileBox";
import { usePostValue } from "../../../contexts/PostContext";

const ekran = Dimensions.get("screen");
const calculatedSize = ekran.width / 6;

const widthForScrollview = Dimensions.get("window").width - 20; // -20 padding ve marginler için

const Card = ({ stream, userID, userToken, user }) => {
  const [showingImg, setShowingImg] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullScreenModalVisible, setFullScreenModalVisible] = useState(false);
  const [tooltipVpos, setTooltipVpos] = useState(2000);
  // const [tooltipHeight, setTooltipHeight] = useState(190);

  const [streamLike, setStreamLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (stream?.is_liked) {
      setStreamLike(true);
      setLikeCount(stream?.streamlikes_count);
    } else {
      setLikeCount(stream?.streamlikes_count);
    }
    setCommentCount(stream?.stream_comments_count);
  }, []);

  const dotRef = useRef(null);
  const scrollViewRef = useRef(null);

  const { changePostLike } = usePostValue();

  const postLikeUnlikeFunc = (likeableID, isLiked) => {
    const postData = new FormData();

    postData.append("likeable_id", likeableID);
    postData.append("is_liked", isLiked);

    postLikeUnlike(postData, userToken)
      .then((res) => {
        if (res.result === "success") {
          if (res.is_liked === "1") {
            setStreamLike(true);
            setLikeCount((prev) => prev + 1);
            changePostLike(res.is_liked, likeableID);
            // console.log("render111");
          } else {
            setStreamLike(false);
            setLikeCount((prev) => prev - 1);
            changePostLike(res.is_liked, likeableID);
          }

          // console.log("res--- --");
          // console.log(res);
          // changePostLike(res.is_liked, res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const setShowImage = (selectedIndex) => {
    // setShowingImg(selectedIndex);
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: widthForScrollview * selectedIndex,
        animated: true,
      });
    }
  };

  const changeIndex = (nativeEvent) => {
    const newIndex = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    // console.log(newIndex);
    if (newIndex !== showingImg) {
      setShowingImg(newIndex);
    }
  };

  const tooltipPopover = () => {
    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("ilet tıklandı")}>
          <Image source={FowardIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>İlet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Paylaş tıklandı")}>
          <Image source={ShareIcon} style={styles.tooltipImage} resizeMode="contain" />
          <Text style={styles.tooltipText}>Paylaş</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {/** @@@@@ Head @@@@@ */}
      <View style={styles.cardHead}>
        <ProfileBox
          roleID={user?.userrole_id}
          userID={user?.userdetail.user_id}
          userAvatar={user?.userdetail?.picture}
          fullName={user?.userdetail?.name}
          institutionName={user?.userdetail?.full_institution_name}
          countryBinary={user?.userdetail?.country?.binarycode}
          timeCalculate={stream?.created_at}
        />

        <View style={styles.cardHeadRight}>
          <View>
            <Tooltip
              onOpen={() => dotRef.current.measure((a, b, width, height, px, py) => setTooltipVpos(py))}
              containerStyle={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#EEEEEE",
                top: tooltipVpos + 14,
                left: 170,
              }}
              //          overlayColor="#00AA9F30"
              skipAndroidStatusBar
              height={80}
              backgroundColor="#FFFFFF"
              withPointer={false}
              popover={tooltipPopover()}
            >
              <Image
                ref={dotRef}
                style={{ height: 30, width: 30, alignSelf: "center" }}
                source={TDotH}
                resizeMode="contain"
              />
            </Tooltip>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => postLikeUnlikeFunc(stream?.id, streamLike ? 0 : 1)}>
              {/* <TouchableOpacity> */}
              <Image
                style={{ height: 30, width: 30, alignSelf: "center", marginRight: 10 }}
                source={streamLike ? Like : LikeEmpty}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/*  {console.log("likeCount---")}
            {console.log(likeCount)} */}
            <Text style={{ color: "#00AA9F" }}>{likeCount}</Text>
            {/* <Text style={{ color: "#00AA9F" }}>
              {streamIsLiked ? Object.keys(stream?.streamlikes).length + 1 : Object.keys(stream?.streamlikes).length}
            </Text> */}
          </View>
        </View>
      </View>

      {/** @@@@@ Middle @@@@@ */}
      <View style={styles.cardMiddle}>
        {stream?.text_content && <Text style={styles.mainText}>{stream?.text_content}</Text>}

        {Object.keys(stream?.photo).length > 0 && ( // ? burada videoda eklenecek
          <>
            <ScrollView
              ref={scrollViewRef}
              pagingEnabled
              onScroll={({ nativeEvent }) => changeIndex(nativeEvent)}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: widthForScrollview, height: ekran.height / 3 }}
            >
              {stream?.photo.map((image, index) => (
                <Pressable key={index} onPress={() => setFullScreenModalVisible(true)}>
                  <Image
                    style={{
                      backgroundColor: "#FFFFFF",
                      height: ekran.height / 3,
                      width: widthForScrollview - 10,
                      alignSelf: "center",
                      marginHorizontal: 5,
                    }}
                    source={{ uri: image }}
                    resizeMode="contain"
                  />
                </Pressable>
              ))}
            </ScrollView>

            {/*      <Pressable onPress={() => setFullScreenModalVisible(true)}>
              <Image
                style={{ backgroundColor: "#fcffff", height: ekran.height / 3, width: "100%", alignSelf: "center" }}
                source={{ uri: Object.values(stream?.photo)[showingImg] }}
                resizeMode="contain"
              />
            </Pressable> */}

            <Modal
              transparent
              animationType="fade"
              visible={fullScreenModalVisible}
              onRequestClose={() => {
                setFullScreenModalVisible((prev) => !prev);
              }}
            >
              <FullScreenImageModal
                closePress={() => setFullScreenModalVisible(false)}
                img={Object.values(stream?.photo)[showingImg]}
              />
            </Modal>
          </>
        )}

        {Object.keys(stream?.photo).length > 1 && (
          <View style={{ paddingVertical: 10, alignItems: "center" }}>
            <FlatList
              style={{
                height: ekran.width / 5,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={stream?.photo} // stream?.photo - denemeData
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => setShowImage(index)}>
                  <Image
                    style={{
                      marginRight: 5,
                      backgroundColor: "#000000",
                      height: ekran.width / 5,
                      width: ekran.width / 5,
                      alignSelf: "center",
                    }}
                    source={{ uri: item }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>

      {/** @@@@@ Foot @@@@@ */}

      <View style={styles.cardFoot}>
        <View style={{ flex: 9 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFFFF",
              shadowColor: "#c1c1c1",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 6,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.yorumYaz}>Yorum Yaz...</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, padding: 10, alignItems: "center" }}>
          <Image style={{ flex: 1, height: "100%", width: "100%" }} source={CommentIcon} resizeMode="contain" />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </View>
      </View>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible((prev) => !prev);
        }}
      >
        <CommentsModal
          closePress={() => setModalVisible(false)}
          profileStreamID={stream?.id}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
        />
      </Modal>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    marginVertical: 5,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 100,
    backgroundColor: "#FFF",
  },
  cardHead: {
    flexDirection: "row",
  },

  cardHeadRight: {
    flex: 0.3,
    alignItems: "flex-end",
  },

  cardMiddle: {
    flex: 1,
    marginVertical: 10,
  },
  mainText: {
    padding: 10,
    color: "#6C757D",
    fontSize: 13,
  },

  cardFoot: {
    flexDirection: "row",
    marginBottom: 5,
    backgroundColor: "#FFFFFF",
  },

  yorumYaz: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    margin: 5,
    padding: 10,
    height: "100%",
    fontSize: 15,
    color: "#6C757D",
  },

  commentCount: {
    position: "absolute",
    top: 0,
    bottom: 4,
    left: 0,
    right: 0,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
  },

  // tooltips styles
  tooltipContainer: {
    alignSelf: "flex-start",
  },

  tooltipItems: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  tooltipImage: {
    height: 25,
    width: 25,
  },

  tooltipText: {
    color: "#6C757D",
    marginLeft: 10,
  },
});
