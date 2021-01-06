import React, { useState } from "react";
import { View , StyleSheet} from "react-native";
import { Card, Button, Text, Avatar,} from "react-native-elements";

const NotificationCard = (props) => {  
    
    let my_icon, icon_type;
    if(props.type == "commented"){
        my_icon = "message";
        icon_type = "MaterialCommunityIcons";
    }else{
        my_icon = "thumbs-o-up";
        icon_type = "font-awesome";
    }

    return (
    <Card>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"flex-start"}}>

            <Avatar
                containerStyle={{ backgroundColor: "#EC8282" }}
                rounded
                
                icon={{
                  name: my_icon,
                  type: icon_type,
                  color: "white",
                }}
                activeOpacity={1}
            />
            <Text style={{ paddingHorizontal: 10 }}>
                {props.author} {props.type} on Your Post.
            </Text>
        </View>
     </Card>
    
  );
};

const styles = StyleSheet.create({

});

export default NotificationCard;