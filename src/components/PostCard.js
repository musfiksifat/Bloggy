import React from "react";
import { View , StyleSheet} from "react-native";
import { Card, Button, Text, Avatar,} from "react-native-elements";

const PostCard = (props) => {
  return (
      <View style={{ flex:10 , width:350 }}>    
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

           <View style={{  alignItems: "flex-start", paddingLeft: 27 }}>
              <Text style={{ fontStyle: "italic" , paddingLeft:20 }}> 
                  {props.title}
              </Text>
              <Text 
                style={{ paddingBottom: 15, paddingLeft:5, paddingTop:20, marginRight:10, fontSize:16 }}>
                  {props.body}
              </Text>
           </View>
      </View>   
  );
};

export default PostCard;
