import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
}

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const getUsers = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Users");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users:", e);
            return {};
        }
    }


    const handleRegister = async () => {
        if (!userName || !email || !password) {
            Alert.alert("Validation Error", "Please fill in all fields.");
            alert("Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert("Validation Error", "Please enter a valid email.");
            alert("Please enter a valid email.");
            return;
        }
    
        const userDetails = { userName, email,password, token: "sample-token" };
        await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));

        const currentUsers = await getUsers();
        currentUsers[userName] = userDetails;
        await AsyncStorage.setItem("Users", JSON.stringify(currentUsers));

        const favvalue = await AsyncStorage.getItem("UsersFavourites");
        const curr_favs = JSON.parse(favvalue) ? JSON.parse(favvalue) : {};
        curr_favs[userName] = [];
        await AsyncStorage.setItem("userFavourites", JSON.stringify(curr_favs[userName]));
        await AsyncStorage.setItem("UsersFavourites", JSON.stringify(curr_favs));

        const remvalue = await AsyncStorage.getItem("UsersReminders");
        const curr_rems = JSON.parse(remvalue) ? JSON.parse(remvalue) : {};
        curr_rems[userName] = [];
        await AsyncStorage.setItem("userReminders", JSON.stringify(curr_rems[userName]));
        await AsyncStorage.setItem("UsersReminders", JSON.stringify(curr_rems));

        const metavalue = await AsyncStorage.getItem("UsersMetaData");
        const curr_meta = JSON.parse(metavalue) ? JSON.parse(metavalue) : {};
        curr_meta[userName] = {};
        await AsyncStorage.setItem("userData", JSON.stringify(curr_meta[userName]));
        await AsyncStorage.setItem("UsersMetaData", JSON.stringify(curr_meta));

    
        router.push("/home");
      };

    return (
            <>
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
                <View style={{ padding: 20 }} testID="signupContainer">
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
                    testID="imageIcon"
                    >
                    <Image
                        source={icons.menu}
                        style={{
                        width: 50,
                        height: 50,
                        }}
                    />
                    </View>
                    <View style={{ marginTop: 30 }} testID="formData">
                    <View style={{ marginBottom: 10 }} testID="userName">
                                <TextInput
                                style={{
                                    borderColor: "#ccc",
                                    borderWidth: 1,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                                value={userName}
                                onChangeText={setUserName}
                                placeholder="UserName"
                                />
                    </View>
                    <View style={{ marginBottom: 10 }} testID="email">
                            <TextInput
                            style={{
                                borderColor: "#ccc",
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                marginBottom: 10,
                            }}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            />
                        </View>

                        <View style={{ marginBottom: 20 }} testID="password">
                            <TextInput
                            style={{
                                borderColor: "#ccc",
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                            }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Password"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                            style={{
                            backgroundColor: COLORS.primary,
                            padding: 15,
                            borderRadius: 5,
                            alignItems: "center",
                            marginBottom: 10,
                            }}
                            onPress={handleRegister}
                            testID="handleRegister"
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 5,
                            }}
                            testID="textData"
                        >
                            <Text style={{ marginRight: 5 }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push("/login")}>
                            <Text style={{ color: "blue" }}>Login</Text>
                            </TouchableOpacity>
                        </View>
            </SafeAreaView>
            </>

        )
}


export default SignUp;
