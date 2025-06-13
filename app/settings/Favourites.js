import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES } from "../../constants";
import DailyMeditation from "../../components/DailyMeditation";
import { useFocusEffect } from "expo-router";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
import { useTheme } from "../../context/ThemeProvider";
import { useRouter } from "expo-router";

const getThemeStyles = (isDarkMode) => ({

    TextStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    },
    BackgroundStyle: {
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
        lightBackground: isDarkMode ? COLORS.lightDarkBackground : COLORS.lightWhiteBackground,
    }
});


const Favourites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const themeStyles = getThemeStyles(isDarkMode);


     const loadFavorites = async () => {
        try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favoritesArray);
        } catch (error) {
        console.error("Error loading favorites:", error);
        } finally {
        setIsLoading(false);
        }
    };

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
        loadFavorites();
        loadUserDetails();
        }, [])
    );
return(
        <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.BackgroundStyle.backgroundColor }}>
            <ScreenHeaderBtn/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={themeStyles.TextStyle.color} />
                ) : favorites.length === 0 ? (
                        <Text style={[styles.headerTitle, {color: themeStyles.TextStyle.color}]}>No favorite items found.</Text>
                ) : (
                    <>
                                <Text style={{
                                    textAlign: "center", color: COLORS.tertiary, fontWeight: "bold", fontSize: SIZES.large, padding: 8,
                                    marginTop: 10,
                                    borderWidth: 2,
                                    borderRadius: 50,
                                    background: themeStyles.BackgroundStyle.lightBackground, }}>My Favourite Exercises</Text>
                                <DailyMeditation meditations={favorites} isDarkMode={ isDarkMode} />
                    </>
                )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    padding: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Favourites;