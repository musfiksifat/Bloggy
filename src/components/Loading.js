import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}
    >
      <ActivityIndicator size="large" color="#2ABF80" animating={true} />
    </View>
  );
};

export default Loading;