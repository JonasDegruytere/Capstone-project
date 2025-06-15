import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
import DailyMeditation from "../../components/DailyMeditation";
import { useFocusEffect } from "expo-router";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
import { useTheme } from "../../context/ThemeProvider";
import { useRouter } from "expo-router";

function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
}


const getThemeStyles = (isDarkMode) => ({

    TextStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    },
    BackgroundStyle: {
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
        lightBackground: isDarkMode ? COLORS.lightDarkBackground : COLORS.lightWhiteBackground,
    }
});


const Credentials = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [newEmail, setNewEmail] = useState("");
    const [newPass, setNewPass] = useState("");
    const router = useRouter();

    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const themeStyles = getThemeStyles(isDarkMode);

    const loadUserDetails = async () => {
        const user = await AsyncStorage.getItem("userDetails");
        if (!user) {
            router.push("/login")
            return;
        }
        setUserDetails(user);
    };

    useFocusEffect(
        React.useCallback(() => {
            loadUserDetails();
        }, [])
    );

    const getUsers = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Users");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users:", e);
            return {};
        }
    }

    const handleChangeEmail = async () => {
        if (newEmail == "") {
            Alert.alert("Validation Error", "Please enter a valid email.");
            alert("Please enter a valid email.");
            return;
        }
        if (!validateEmail(newEmail)) {
            Alert.alert("Validation Error", "Please enter a valid email.");
            alert("Please enter a valid email.");
            return;
        }
        const a = JSON.parse(userDetails);
        a.email = newEmail;
        await AsyncStorage.setItem("userDetails", JSON.stringify(a));
        const currentUsers = await getUsers();
        currentUsers[a.userName] = a;
        await AsyncStorage.setItem("Users", JSON.stringify(currentUsers));
    }

    const handleChangePass = async () => {
        if (newPass == "") {
            Alert.alert("Validation Error", "Please enter a valid password.");
            alert("Please enter a valid password.");
            return;
        }
        const a = JSON.parse(userDetails);
        a.password = newPass;
        await AsyncStorage.setItem("userDetails", JSON.stringify(a));
        const currentUsers = await getUsers();
        currentUsers[a.userName] = a;
        await AsyncStorage.setItem("Users", JSON.stringify(currentUsers));
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhiteBackground,
            }}
        >
            <ScreenHeaderBtn />
            <View
                style={{
                    justifyContent: "space-between",
                    padding: SIZES.medium,
                    borderRadius: SIZES.small,
                    backgroundColor: isDarkMode ? COLORS.lightWhiteBackground : COLORS.lightDarkBackground,
                    ...SHADOWS.medium,
                    shadowColor: COLORS.white,
                    marginVertical: SIZES.medium,
                    marginHorizontal: SIZES.medium,
                }}
            >
            </View>
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <TextInput
                    placeholder="New email address"
                    value={newEmail}
                    onChangeText={setNewEmail}
                    maxLength={128}
                    style={[styles.input, { color: themeStyles.TextStyle.color }, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}
                />
            </View>
            <TouchableOpacity onPress={handleChangeEmail} style={[styles.button, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}>
                <Text style={[styles.buttonText, { color: themeStyles.TextStyle.color }]}>Change Email</Text>
            </TouchableOpacity>

            <View
                style={{
                    justifyContent: "space-between",
                    padding: SIZES.medium,
                    borderRadius: SIZES.small,
                    backgroundColor: isDarkMode ? COLORS.lightWhiteBackground : COLORS.lightDarkBackground,
                    ...SHADOWS.medium,
                    shadowColor: COLORS.white,
                    marginVertical: SIZES.medium,
                    marginHorizontal: SIZES.medium,
                }}
            >
            </View>
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <TextInput
                    placeholder="New password"
                    value={newPass}
                    onChangeText={setNewPass}
                    maxLength={128}
                    style={[styles.input, { color: themeStyles.TextStyle.color }, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}
                />
            </View>
            <TouchableOpacity onPress={handleChangePass} style={[styles.button, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}>
                <Text style={[styles.buttonText, { color: themeStyles.TextStyle.color }]}>Change Password</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: { borderColor: COLORS.primary, borderWidth: 1, padding: SIZES.small, marginVertical: SIZES.small, width: 500 },
    button: { backgroundColor: COLORS.primary, padding: SIZES.medium, borderRadius: SIZES.medium, alignSelf: "center", width:300, justifyContent: "center" },
    buttonText: { color: COLORS.lightWhite, fontWeight: "bold", alignSelf: "center" },
})

export default Credentials;