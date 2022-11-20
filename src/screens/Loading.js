import React from "react";
import { View, ActivityIndicator } from "react-native";

function Loading() {
  return (
    <View>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="orange" />
      </View>
    </View>
  );
}


export default Loading;