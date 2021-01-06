import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity,Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { storeDataJSON } from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";
import "firebase/firestore";
import Loading from "./../components/Loading"; 

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  } 
  else {
    return (
      <View style={styles.viewStyle}>
        <Card backgroundColor = "#F1FBF1">
          <Card.Title style={styles.card_titleStyle}> Welcome to BlogApp!</Card.Title>
          <Card.Divider/>
          <Input
            leftIcon={<Ionicons name="ios-person" size={18} color="#504F4F" />}
            placeholder=" Name"
            placeholderTextColor="#918E8E"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            leftIcon={<Ionicons name="ios-school" size={18} color="#504F4F" />}
            placeholder=" Student ID"
            placeholderTextColor="#918E8E"
            onChangeText={function (currentInput) {
              setSID(currentInput);
            }}
          />
          <Input
            leftIcon={<FontAwesome name="envelope" size={14} color="#504F4F" />}
            placeholder=" E-mail Address"
            placeholderTextColor="#918E8E"
            onChangeText={function (currentInput) {
              setEmail(currentInput);
            }}
          />

          <Input
            placeholder=" Password"
            placeholderTextColor="#918E8E"
            leftIcon={<Ionicons name="md-lock-closed-sharp" size={18} color="#504F4F" />}
            secureTextEntry={true}
            onChangeText={function (currentInput) {
              setPassword(currentInput);
            }}
          />

          <TouchableOpacity 
            style={styles.registerButtonContainer}
            onPress={() => {
              if (Name && SID && Email && Password) {
                setIsLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: Name });
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(userCreds.user.uid)
                      .set({
                        name: Name,
                        sid: SID,
                        email: Email,
                        notifications: []
                      })
                      .then(() => {
                        setIsLoading(false);
                        alert("Account created successfully!");
                        console.log(userCreds.user);
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setIsLoading(false);
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              } else {
                alert("Fields can not be empty!");
              }
            }}
          >
            <Text style={styles.registerButtonText}>Sign Up!</Text>
          </TouchableOpacity>

          <Button
            type="clear"
            icon={<AntDesign name="login" size={24} color="#A86C65"/>}
            titleStyle = {styles.titleStyle}
            title="  Already have an account?"
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    paddingTop:25,
    backgroundColor: "#8DDB90",
  },
  card_titleStyle: {
    fontSize: 23,
    color: "#E45D4E",
    paddingTop:10,
    paddingBottom:4,
    alignSelf:"center",
    fontWeight:"800",
  },
  titleStyle: {
    color: "#A86C65",
  },
  registerButtonContainer: {
    "alignItems": "center",
    "alignSelf":"center",
    "paddingTop": 5,
    "width": 270,
    "height": 38,
    "borderWidth": 1,
    "borderColor": "#DED5D5",
    "backgroundColor": "#E45D4E",
    "borderRadius": 8,
  },
  registerButtonText: {
    fontSize: 18,
    color: "rgba(241, 236, 236, 255)",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default SignUpScreen;
