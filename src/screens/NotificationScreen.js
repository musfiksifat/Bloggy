import React from "react";
import { View, StyleSheet } from "react-native";
import NotificationListCard from "../components/NotificationListCard";
import { AuthContext } from "../providers/AuthProvider";
import DarkThemeHeader from "./../components/DarkThemeHeader"
import { useNetInfo } from "@react-native-community/netinfo";

const NotificationScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>         
          <DarkThemeHeader
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
              AuthFunction = {()=>{
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
          />         
          <NotificationListCard
            current_user={auth.CurrentUser}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;
