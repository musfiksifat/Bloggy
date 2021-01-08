import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Card, Button, Avatar} from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";

const NotificationListCard = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = (ID) => {
    setLoading(true);
    firebase
      .firestore()
      .collection('users').doc(ID)
      .get().then((querySnapshot) => {
        let temp_notifications = [];
        let count = 0;
        querySnapshot.data().notifications.forEach((doc) => {
         temp_notifications.push({
          id: count,
          notification_created_by: doc.notification_created_by,
          notification_type: doc.notification_type,
          postId: doc.postId,
        });
          count += 1;
        });
        //console.log(temp_notifications);
        setNotifications(temp_notifications);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadNotifications(props.current_user.uid);
  }, []);

  return ( 
    <Card> 
      <ActivityIndicator size="small" color="#8DDB90" animating={loading} />    
        <FlatList
            data={notifications}
            scrollEnabled={true}
            inverted={true}
            renderItem={function ({ item }) { 
                let my_icon, icon_type;
                if(item.notification_type == "commented"){
                    my_icon = "message";
                    icon_type = "MaterialCommunityIcons";
                }else{
                    my_icon = "thumbs-o-up";
                    icon_type = "font-awesome";
                }          
                return (
                    <View>
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
                                    {item.notification_created_by} {item.notification_type} on Your Post.
                                </Text>
                            </View>
                        </Card>
                    </View>
                );
            }}
        />
    </Card>
    );
};

export default NotificationListCard;
