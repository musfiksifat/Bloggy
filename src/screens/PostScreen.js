import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, ScrollView, } from "react-native";
import { Card } from "react-native-elements";
import PostCard from "./../components/PostCard";
import CommentCard from "./../components/CommentCard";
import { AuthContext } from "../providers/AuthProvider";
import DarkThemeHeader from "./../components/DarkThemeHeader";
import StoreInputData from "../components/StoreInputData";

import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";

const PostScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const postID = props.route.params.postId;
  const [posts, setPosts] = useState({
    author:'',
    body:'',
    title:'',
    likeCount:0,
  });
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState([]);

  const loadIndividualPostDetails = async () => {
    setLoading(true);
    firebase
      .firestore().collection('posts')
      .doc(postID)
      .onSnapshot((querySnapshot) => {
        let obj = querySnapshot.data();
        let temp_comments = [];
        let postObj = {
          author: obj.author,
          body: obj.body + '\n\n',
          title: new Date(obj.created_at.toDate()).toString().slice(0,24)+'(+06)',
          likeCount: obj.likeCount,
        }
        obj.comments.forEach((doc) => {
          temp_comments.push(doc);
        });
        setComments(temp_comments);
        setPosts(postObj);
        setLoading(false);
        console.log(postObj.title)
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadIndividualPostDetails();
  }, []);

    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
              <DarkThemeHeader
                DrawerFunction={() => {
                  props.navigation.toggleDrawer();
                }}
              />
              <Card>
                <View style={styles.viewStyle2} >
                    <PostCard
                        post_id={postID}
                        author={posts.author}
                        body={posts.body}
                        post_title={posts.title}
                    />
                </View>
              </Card>
              
              <Card>
                <StoreInputData
                    Text="Post your comment "
                    currentFunc={setInput}
                    currentText={input}
                    pressFunction={ async () => {
                        setLoading(true);
                        firebase
                          .firestore()
                          .collection('posts')
                          .doc(postID)
                          .update({
                              comments: firebase.firestore.FieldValue.arrayUnion({
                                userid: auth.CurrentUser.uid,
                                username: auth.CurrentUser.displayName,
                                time: firebase.firestore.Timestamp.now(),
                                body: input,
                          }),
                        })
                        .then((obj) => {
                          setLoading(false);
                          alert("Comment created Successfully!\nUserID:"+ auth.CurrentUser.uid+
                          '\nComment:'+ input);
                        })
                        .catch((error) => {
                          setLoading(false);
                          alert(error);
                        });
                    }}
                />
              </Card>
              
            <ActivityIndicator size="small" color="#8DDB90" animating={loading} />

            <ScrollView>
              <Card>
                <Card.Title>Comments for this post</Card.Title>
                <Card.Divider />
                  <FlatList
                    data={comments}
                    //onRefresh={loadIndividualPostDetails}
                    //refreshing={loading}
                    inverted={true}
                    keyExtractor={(item) => item.time.toString()}
                    renderItem={({ item }) => {
                        return (
                          <Card>
                              <CommentCard
                                author={item.username}
                                body={item.body}
                                title={item.time.toDate().toDateString().toString()}
                              />
                          </Card>
                        );                   
                      }
                    }
                  />
              </Card>
            </ScrollView>
          </View>
        )}
      </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
  viewStyle2: {
    paddingTop:10,
    paddingBottom:40,
    height:100,
  },
});

export default PostScreen;