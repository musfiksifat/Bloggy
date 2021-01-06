import React from "react";
import { Header } from "react-native-elements";


const LightThemeHeader = (props) => {
    return (
        <Header style
        leftComponent={{
            icon: "menu",
            color: "#37D993",
            onPress: props.DrawerFunction,
        }}
        backgroundColor="#ffffff"
        centerComponent={{ 
            text: "Bloggy", 
            style: 
            { 
                color: "#2ABF80" , 
                fontWeight: "bold", 
                fontSize:20, 
            } 
        }}
        rightComponent={{
            icon: "lock-outline",
            color: "#37D993",
            onPress: props.AuthFunction,
        }}
        />
    );
};

export default LightThemeHeader;