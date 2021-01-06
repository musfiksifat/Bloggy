import React, {useEffect, useState} from 'react';
import { View , StyleSheet} from "react-native";
import { Card, Button, Text, Avatar,} from "react-native-elements";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

const PostReactionBar = (props) => {
    const [liked, setLiked] = useState(false);
    const [icon, setIcon] = useState("like2");
  
    const checkUserLikedPost = (liked_users,uid) => {
      var _length = liked_users.length;
      for (var i = 0; i < _length; i++) {
          if(liked_users[i] == uid){
            setLiked(true);
            setIcon('like1');
            return;
          }
      }
      setLiked(false);
      setIcon('like2');
      return;
    }
  
    const likeEventHandler = (postId,uid)=>{
      if(liked == false){
        if(props.post_data.userId != props.current_user.uid){
            createNotification("liked");
        }
        firebase.firestore().collection("posts").doc(postId).update({
            likeCount: firebase.firestore.FieldValue.increment(1),
            liked_users: firebase.firestore.FieldValue.arrayUnion(uid)
        }); 
      }
      else{
        firebase.firestore().collection("posts").doc(postId).update({
          likeCount: firebase.firestore.FieldValue.increment(-1),
          liked_users: firebase.firestore.FieldValue.arrayRemove(uid)
        });
      }
    }
  
    const createNotification =(type)=>{
        firebase.firestore().collection("users")
        .doc(props.post_data.userId)
        .update({
          notifications: firebase.firestore.FieldValue.arrayUnion({
            notification_type: type,
            postId: props.post_id,
            notification_created_by: props.current_user.displayName,
        })
        })
        .then(() => {
          alert('notification created successfully by: '+ props.current_user.displayName
                        + '\nNotifation type: '+ type);
        })
        .catch((error) => {
          alert(error);
        });
    }

    useEffect(() => {
      checkUserLikedPost(props.post_data.liked_users, 
        props.current_user.uid);
    });
    
  return (  
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Button
                buttonStyle = {{borderColor:'#37D993',  borderWidth:1, width:120 }}
                type="outline"
                title={`  Like (${props.post_data.likeCount})  `}
                titleStyle = {{color:'#2ABF80'}}
                icon={<AntDesign name={icon} size={22} color="#2ABF80" />}
                          
                onPress= {function(){ 
                    likeEventHandler(props.post_id, props.current_user.uid);      
                }}
            />
                        
            <Button 
                buttonStyle = {{backgroundColor:'#33D28E', borderColor:'#37D993', width:130}}
                type="solid"
                title="  Comment  "
                titleStyle = {{color:'white'}}
                icon = {<Feather name="message-square" size={24} color="white" />}
                onPress={() => {
                    console.log(props.post_id);
                    props.navigation.navigate("PostScreen", {postId: props.post_id});
                }}
            />
        </View>   
  );
};

const styles = StyleSheet.create({});

export default PostReactionBar;
