import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { ColorSchemeName } from "react-native";

import { LoggedOutParamList } from "../types";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import { User } from "../FirestoreModels";

const Stack = createStackNavigator<LoggedOutParamList>();

export default function LoggedOutNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Onboarding"
        children={() => (
          <OnboardingScreen onPress={() => navigation.navigate("UserInfo")} />
        )}
      />
      <Stack.Screen
        name="UserInfo"
        children={() => (
          <UserInfoScreen
            onPress={(userInfo: User) =>
              navigation.navigate("Authentication", { userInfo: userInfo })
            }
          />
        )}
      />
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
    </Stack.Navigator>
  );
}
