import React, {useEffect} from "react";
import { TouchableOpacity, View, Alert, LogBox } from "react-native";
import { Card, Button, Text, Avatar,} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";

const PostCard = (props) => {
    const deleteThisPost=()=>{
        firebase.firestore().collection("posts").doc(props.item.id)
        .delete().then(()=>{
          alert("Post deleted successfully");
        }).catch((error)=>{
          alert(error);
        })
    }  
    const createTwoButtonAlert = () =>
    Alert.alert(
        "Delete post:",
        "Are you sure to delete this post?",
        [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => deleteThisPost() }
        ],
        { cancelable: false }
    );

    useEffect(() => {
        LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function."]);
    }, []);

    return (
        <TouchableOpacity
            onLongPress={()=>{
            if(props.item.data.userId==props.current_user.uid){
                createTwoButtonAlert();
            }
            else{
                alert("You cannot delete others post!");
            }
        }}
        >
            <View style={{ width:350 }}>    
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft:6}} >     
                    <Avatar
                        containerStyle={{ backgroundColor: "#EC8282", marginTop:10 }}
                        rounded
                        icon={{ name: "user", type: "font-awesome", color: "white" }}
                        activeOpacity={1}
                    />
                    <Text h4Style={{ paddingLeft: 8 }}h4>
                        {props.author}
                    </Text>
                </View>

                <View style={{ paddingLeft: 27 }}>
                    <Text style={{ fontStyle: "italic" , paddingLeft:20 }}> 
                        {props.title}
                    </Text>
                    <Text 
                        style={{ paddingBottom: 15, paddingLeft:5, paddingTop:20, marginRight:10, fontSize:16 }}>
                        {props.body}
                    </Text>
                </View>
            </View> 
        </TouchableOpacity>  
    );
};

export default PostCard;
