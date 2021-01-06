import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage, Image, Text , ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import DarkThemeHeader from "./../components/DarkThemeHeader"

const ProfileScreen = (props) => {
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

          <Card>
            
            <View style={{ flexDirection: "column", alignItems: "center", backgroundColor:"white" }}>         
              <Image
                  source = {require('./../../assets/picture.png')} 
                  alt = "User picture" 
                  resizeMode = "contain"
                  style = {styles.ImageStyle}
              />
              <Text style= {{fontSize:28, color:"#707070"}}> {auth.CurrentUser.name}  </Text>
            </View> 
              
            <View style={{paddingTop:15, backgroundColor:"white"}}>            
              <Button
                buttonStyle = {{backgroundColor:'#37D993', borderColor:'#75C67D', alignSelf:"center"}}
                type="solid"
                title="   Delete My Profile   "
                titleStyle = {{color:'white', fontSize:15,}}
                onPress={
                  async function(){
                      await removeData(auth.CurrentUser.email);
                       auth.setIsLoggedIn(false);
                  }
                }
              />
            </View>

          </Card>
          
          <ScrollView style = {styles.BolckStyle}>
            <Card>
            <Text style={styles.textStyle}> {`Student ID :\n\n\t\t`} 
              <Text style={styles.textStyle2}>{auth.CurrentUser.sid} </Text>  
            </Text>
            <Card.Divider/>
            <Text style={styles.textStyle}> {`Email address:\n\n\t\t`}  
              <Text style={styles.textStyle2}>{auth.CurrentUser.email} </Text>  
            </Text>
            <Card.Divider/>
            <Text style={styles.textStyle}> {`Date of Birth:\n\n\t\t`}  
              <Text style={styles.textStyle2}> {'19 January,1998'} </Text>  
            </Text>
            <Card.Divider/>    
            <Text style={styles.textStyle}> {`Gender:\n\n\t\t`} 
              <Text style={styles.textStyle2}> {'Male'} </Text> 
            </Text>    
            </Card>
          </ScrollView>
             
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
  textStyle : {
    marginBottom: 5,
    marginTop: 4,
    paddingLeft:10,
    textAlign : "left",
    fontSize : 18,
    color :'black',
  },
  textStyle2 : {
    fontSize : 16,
    fontStyle:"italic",
    color :'#999FA1',
  },
  BolckStyle : {
    //backgroundColor:'#EDFDDA',
    //marginStart:16,
    //marginEnd:16,
    flexDirection:"column",
    borderColor:"white",
    borderLeftWidth:2,
    borderRightWidth:2,
  },

  ImageStyle : {
    height:120,
    width:120,
    borderColor:'#C5CACB',
    borderRadius:150/2,
    marginTop: 12,
    marginBottom: 8,
    alignSelf : 'center',  
  },
  
});

export default ProfileScreen;
