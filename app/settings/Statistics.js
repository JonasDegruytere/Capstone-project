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

    const [tot_time, set_tot_time] = useState(0);
    const [long_time, set_long_time] = useState(0); 
    const [tot_meds, set_tot_meds] = useState(0);
    const [tot_favs, set_tot_favs] = useState(0);
    const [tot_nots, set_tot_nots] = useState(0);
    const [tot_views, set_tot_views] = useState(0);




    const stats = [
        {
            id: 1,
            value: tot_favs,
            title: "Favourites",
            icon: "https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png",
        },
        {
            id: 2,
            value: tot_time,
            title: "Minutes Meditated",
            icon: "https://static-00.iconduck.com/assets.00/clock-icon-2048x2048-o0dud9zx.png",
        },
        {
            id: 3,
            value: tot_meds,
            title: "Meditations Completed",
            icon: "https://static.thenounproject.com/png/3946740-200.png",
        },
        {
            id: 4,
            value: tot_views,
            title: "Meditations viewed",
            icon: "https://static.thenounproject.com/png/201934-200.png ",
        },
        {
            id: 5,
            value: long_time,
            title: "Longest Meditations",
            icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Hourglass_icon.png",
        },
        {
            id: 6,
            value: tot_nots,
            title: "Notifications created",
            icon: "https://icons.veryicon.com/png/o/object/material-design-icons/notifications-1.png",
        },
    ];

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

    useEffect(() => {
        const loadMetaData = async () => {
            let usr_data = await AsyncStorage.getItem("userData");
            usr_data = usr_data ? JSON.parse(usr_data) : {};

            if (!usr_data["completed"]) { }
            else {
                set_tot_meds(usr_data["completed"]);
            }
            if (!usr_data["total_time"]) { }
            else {
                set_tot_time(usr_data["total_time"]);
            }
            if (!usr_data["longest"]) { }
            else {
                set_long_time(usr_data["longest"]);
            }
            if (!usr_data["tot_reminders"]) { }
            else {
                set_tot_nots(usr_data["tot_reminders"]);
            }
            if (!usr_data["tot_views"]) { }
            else {
                set_tot_views(usr_data["tot_views"]);
            }

            const storedFavorites = await AsyncStorage.getItem("userFavourites");
            const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
            set_tot_favs(favoritesArray.length);
            setFavorites(favoritesArray);
        };

        loadMetaData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.BackgroundStyle.backgroundColor }}>
            <ScreenHeaderBtn />
            <View style={styles.container}>
                {stats.map(stat => (
                    <View
                        style={[styles.card, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}
                        key={stat.id}
                    >
                        <View
                            style={[styles.logoContainer, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}
                        >
                            <Image
                                source={{ uri: stat.icon }}
                                resizeMode="cover"
                                style={styles.logoImage}
                            />
                        </View>
                        <Text style={[styles.value, { color: themeStyles.TextStyle.color }]}>{stat.value}</Text>
                        <Text style={[styles.title, { color: themeStyles.TextStyle.color }]}>{stat.title}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );

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