import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, LogBox} from "react-native";
import { Card } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import PostCard from "./../components/PostCard";
import PostReactionBar from "./../components/PostReactionBar"
import LightThemeHeader from "./../components/LightThemeHeader";
import StoreInputData from "../components/StoreInputData";

import { useNetInfo } from "@react-native-community/netinfo";
import * as firebase from "firebase";
import "firebase/firestore";

const HomeScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState([]);

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore().collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };
  
  useEffect(() => {
    loadPosts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Setting a timer for a longer period of time']);
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
  }, []);

    return (     
      <AuthContext.Consumer>
        {(auth) => (

          <View style={styles.viewStyle}>
            <LightThemeHeader
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
              AuthFunction = {()=>{
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />

            <Card>            
              <StoreInputData
                Text="What's On Your Mind ?"
                currentFunc={setInput}
                currentText={input}
                pressFunction={async () => {
                  setLoading(true);
                  firebase.firestore()
                    .collection("posts")
                    .add({
                      userId: auth.CurrentUser.uid,
                      body: input,
                      author: auth.CurrentUser.displayName,
                      created_at: firebase.firestore.Timestamp.now(),
                      liked_users: [],
                      likeCount: 0,
                      comments: [],
                    })
                    .then((obj) => {
                      setLoading(false);
                      alert("Post created Successfully!\nUserID:"+ auth.CurrentUser.uid+
                      '\nInputBody:'+ input);
                    })
                    .catch((error) => {
                      setLoading(false);
                      alert(error);
                    });
                }}
              />
            </Card>

            <ActivityIndicator size="small" color="#8DDB90" animating={loading} />

            <FlatList
              data={posts}
              //onRefresh={loadPosts}           
              //refreshing={loading}
              renderItem={function ({ item }) {

                return (
                  <View>
                    <Card>
                      <PostCard
                        author={item.data.author}
                        body={item.data.body}
                        title={item.data.created_at.toDate().toDateString().toString()}
                      />
                      <Card.Divider />

                      <PostReactionBar
                        post_data={item.data}
                        post_id={item.id}
                        current_user={auth.CurrentUser}
                        navigation={props.navigation}
                      />
                    </Card>
                  </View>
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );  
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor:"#E6F5E6",
  },
});

export default HomeScreen;
