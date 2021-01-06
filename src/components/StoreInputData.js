import React from "react";
import { View} from "react-native";
import { Button, Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

const InputCard = (props) => {
  
  return (
    <View>
      <Input
        placeholder={props.Text}
        leftIcon={<Entypo name="pencil" size={24} color="#2ABF80" />}
        onChangeText={(currentText) => {
          props.currentFunc(currentText);
        }}
      />
      <Button 
        buttonStyle = {{backgroundColor:'#37D993', width:310, height:38, borderRadius:8 ,borderColor:'#37D993', alignSelf:"center"}}
        title=" Post " 
        type="solid" 
        titleStyle = {{color:'white', fontWeight:"bold", fontSize:18 }}
        onPress={props.pressFunction} 
      />
    </View>
  );

};

export default InputCard;