import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";
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


const Statistics = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const themeStyles = getThemeStyles(isDarkMode);



    const stats = [
        {
            id: 1,
            title: "Favourites",
            icon: "https://cdn-icons-png.flaticon.com/512/126/126472.png",
        },
        {
            id: 2,
            title: "Minutes Meditated",
            icon: "https://cdn-icons-png.flaticon.com/512/2932/2932360.png",
        },
        {
            id: 3,
            title: "Meditations Completed",
            icon: "https://static-00.iconduck.com/assets.00/clock-icon-2048x2048-o0dud9zx.png",
        },
        {
            id: 4,
            title: "Meditations viewed",
            icon: "https://static-00.iconduck.com/assets.00/stats-icon-2048x2048-po60mvco.png",
        },
        {
            id: 5,
            title: "Longest Meditations",
            icon: "https://icons.veryicon.com/png/o/miscellaneous/itsm-management/change-2.png",
        },
        {
            id: 6,
            title: "Notifications created",
            icon: "https://icons.veryicon.com/png/o/miscellaneous/itsm-management/change-2.png",
        },
    ];


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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.BackgroundStyle.backgroundColor }}>
            <ScreenHeaderBtn />
            <View style={styles.container}>
                {stats.map(stat => (
                    <View style={[styles.card, {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]} key={stat.id}>
                        <View style={[styles.logoContainer, {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]}>
                            <Image
                                source={{ uri: stat.icon }}
                                resizeMode="cover"
                                style={styles.logoImage}
                            />
                        </View>
                        <Text style={[styles.value, {color: themeStyles.TextStyle.color}]}>{stat.id}</Text>
                        <Text style={[styles.title, {color: themeStyles.TextStyle.color}]}>{stat.title}</Text>
                    </View>
                ))}
            </View>
            );
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 100,
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 24,
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        marginBottom: 12,
        color: '#444',
    },
    value: {
        fontSize: 18,
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    logoContainer: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        borderRadius: SIZES.medium,
        alignItems: "center",
        marginBottom: 16,
    },
    logoImage: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.medium,
    },
});

export default Statistics;