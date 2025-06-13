import { Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { COLORS, SHADOWS, SIZES } from "../../constants";
import { useTheme } from "../../context/ThemeProvider";
import { Switch, View } from "react-native";
import { TouchableOpacity } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ThemeChange = () => {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async () => {
        const user = await AsyncStorage.getItem("userDetails");
        if (!user) {
            router.push("/login")
            return;
        }
        setUserDetails(user ? JSON.parse(user) : {});
    };

    const isDarkMode = theme === "dark";

    return (
        <SafeAreaView
        style={{
            flex: 1,
                backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhiteBackground,
        }}
        >
            <ScreenHeaderBtn/>
            <View
                style={{
                    justifyContent: "space-between",
                    padding: SIZES.medium,
                    borderRadius: SIZES.small,
                    backgroundColor: isDarkMode ? COLORS.lightWhiteBackground : COLORS.darkBackground,
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
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
                >
                <Text
                    style={{
                    color: isDarkMode ? COLORS.lightText : COLORS.darkText,
                    fontSize: SIZES.medium,
                    fontFamily: "DMBold",
                    marginHorizontal: 25,
                    marginVertical: SIZES.small,
                    }}
                >
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                </Text>

                <Switch
                    trackColor={{ false: COLORS.darkText, true: COLORS.lightText }}
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    style={{marginHorizontal: 25} }
                />
            </View>
    </SafeAreaView>
    )
}

export default ThemeChange;