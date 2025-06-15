import React, { useState } from "react";
import { View, SafeAreaView, Image, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
        if (!username || !password) {
        Alert.alert("Validation Error", "Please fill in all fields.");
        return;
        }

      try {
          const jsonvalue = await AsyncStorage.getItem("Users");
          const currentUsers = JSON.parse(jsonvalue);
        if (username in currentUsers) {
            const parsedDetails = currentUsers[username];

            if (password === parsedDetails.password) {
                await AsyncStorage.setItem("userDetails", JSON.stringify(currentUsers[username]));

                const favvalue = await AsyncStorage.getItem("UsersFavourites");
                const curr_favs = JSON.parse(favvalue);
                await AsyncStorage.setItem("userFavourites", JSON.stringify(curr_favs[username]));

                const remvalue = await AsyncStorage.getItem("UsersReminders");
                const curr_rems = JSON.parse(remvalue);
                await AsyncStorage.setItem("userReminders", JSON.stringify(curr_rems[username]));

                const metavalue = await AsyncStorage.getItem("UsersMetaData");
                const curr_meta = JSON.parse(metavalue);
                await AsyncStorage.setItem("userData", JSON.stringify(curr_meta[username]));

                router.push("/home");
            } else {
                Alert.alert("Error", "Incorrect password.");
                alert("Error Incorrect password.");
            }
        } else {
            Alert.alert("Error", "No user details found in AsyncStorage.");
            alert("Error No user details found in AsyncStorage.");
        }
        } catch (error) {
        console.error("Error accessing AsyncStorage", error);
        }
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
     <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
<></>
          ),
          headerTitle: "",
        }}
      />
      <View style={{ padding: 20 }}>
        <View
          style={{
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f0f0f0",
            borderRadius: 50,
            height: 90,
            ...SHADOWS.medium,
            shadowColor: COLORS.white,
          }}
        >
          <Image
            source={icons.menu}
            style={{
              width: 50,
              height: 50,
              marginBottom: 20,
            }}
          />
        </View>

        {/* Form Component */}
        <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Options */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ marginRight: 5 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ color: "blue" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;