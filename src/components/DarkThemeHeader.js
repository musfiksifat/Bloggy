import React from "react";
import { Header } from "react-native-elements";

const DarkThemeHeader = (props) => {
    return (

        <Header
            backgroundColor= '#37D993'
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: props.DrawerFunction,
            }}
            centerComponent={{ text: " Bloggy ", style: { color: "#fff", fontSize:20 } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: props.AuthFunction,
            }}
          />

    );
};

export default DarkThemeHeader;