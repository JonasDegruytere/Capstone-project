import { View, Text, Image, TouchableOpacity } from "react-native";
import { use, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Footer.style";
import { icons } from "../../constants";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants/theme";
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

const Footer = ({ data, isDarkMode }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const themeStyles = getThemeStyles(isDarkMode);
    const router = useRouter();

    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem("userFavourites");
            const favoritesArray = favorites ? JSON.parse(favorites) : [];
            const isFav = favoritesArray.some((item) => item.id === data.id);
            setIsFavorite(isFav);
        } catch (error) {
            console.error("Failed to fetch favorites", error);
        }
    };

    useEffect(() => {
        checkIfFavorite();
        }, []);
    
    const handleFavoriteToggle = async () => {
        try {
            let favorites = await AsyncStorage.getItem("userFavourites");
            favorites = favorites ? JSON.parse(favorites) : [];

            const updatedFavorites = isFavorite
            ? favorites.filter((item) => item.id !== data.id)
            : [...favorites, data];

            await AsyncStorage.setItem("userFavourites", JSON.stringify(updatedFavorites));
            setIsFavorite(!isFavorite);
            updateFavourites(updatedFavorites);
        } catch (error) {
            console.error("Failed to update favorites", error);
        }
    };

    const getUsersFavourites = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("UsersFavourites");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users favourites:", e);
            return {};
        }
    }

    const updateFavourites = async (favouritesList) => {
        try {
            const userFavourites = await getUsersFavourites();
            const jsonvalue = await AsyncStorage.getItem("userDetails");
            const curr_usr = JSON.parse(jsonvalue);

            userFavourites[curr_usr.userName] = favouritesList;
            await AsyncStorage.setItem("UsersFavourites", JSON.stringify(userFavourites));

        } catch (error) {
            console.error("Failed to update user favourites list", error);
        }
    }

    function extractMinutes(durationString) {
        const match = durationString.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
    }

    const handleCompleted = async () => {
        try {
            let usr_data = await AsyncStorage.getItem("userData");
            usr_data = usr_data ? JSON.parse(usr_data) : {};
            const minutes = extractMinutes(data.duration);

            usr_data["completed"] = usr_data["completed"] ? usr_data["completed"] + 1 : 1;
            usr_data["total_time"] = usr_data["total_time"] ? usr_data["total_time"] + minutes : minutes;

            if (!usr_data["longest"]) { usr_data["longest"] = 0; }
            if (usr_data["longest"] < minutes) { usr_data["longest"] = minutes; }
            await AsyncStorage.setItem("userData", JSON.stringify(usr_data));

            const usersMetaData = await getUsersMetaData();
            const jsonvalue = await AsyncStorage.getItem("userDetails");
            const curr_usr = JSON.parse(jsonvalue);
            usersMetaData[curr_usr.userName] = usr_data;
            await AsyncStorage.setItem("UsersMetaData", JSON.stringify(usersMetaData));

            router.push("/home")
        }
        catch (error) {
            console.error("Failed to update meditation completion", error);
        }
    }

    const getUsersMetaData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("UsersMetaData");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users metadata:", e);
            return {};
        }
    }




    return (
        <View style={[styles.container, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}>
            <TouchableOpacity style={[styles.likeBtn]} onPress={handleFavoriteToggle}>
        <Image
            source={isFavorite ? icons.heartFilled : icons.heartOutline}
            resizeMode="contain"
            style={[
            styles.likeBtnImage,
            { tintColor: isFavorite ? "red" : "#F37453" },
            ]}
        />
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyBtn} onPress={handleFavoriteToggle}>
                <Text style={[styles.applyBtnText, {color: themeStyles.TextStyle.color}]}>
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </Text>
        </TouchableOpacity>
            <TouchableOpacity style={[styles.applyBtn, { backgroundColor: "#90EE90" }]} onPress={handleCompleted}>
                <Text style={[styles.applyBtnText, { color: themeStyles.TextStyle.color }, { backgroundColor: "#90EE90"}]}>
                Complete Exercise
            </Text>
        </TouchableOpacity>
    </View>
    );
}
export default Footer;