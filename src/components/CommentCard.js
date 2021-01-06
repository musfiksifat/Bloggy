import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar,} from "react-native-elements";

const CommentCard = (props) => {
  return (
      <View style={{ flex:10 , width:700 }}>      
           <View style={{ flexDirection: "row", alignItems: "center", paddingLeft:4}} >     
              <Avatar
                  containerStyle={{ backgroundColor: "#EC8282", marginTop:5, }}
                  rounded
                  size="small"
                  icon={{ name: "user", type: "font-awesome", color: "white" }}
                  activeOpacity={1}
              />
              <Text h4Style={{ paddingLeft: 8 }}h4>
                  {props.author}
              </Text>
              <Text style={{ fontStyle: "italic" , alignItems:"flex-end" , paddingLeft:60}}> 
                  {props.title}
              </Text>
           </View>

           <View style={{  alignItems: "flex-start", paddingLeft: 27 }}>             
              <Text 
                style={{ paddingBottom: 5, paddingLeft:5, paddingTop:10, marginRight:10, fontSize:16 }}>
                  {props.body}
              </Text>
           </View>
      </View>    
  );
};

export default CommentCard;
