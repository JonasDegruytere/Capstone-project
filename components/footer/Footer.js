import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Footer.style";
import { icons } from "../../constants";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants/theme";


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
    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem("favorites");
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
            let favorites = await AsyncStorage.getItem("favorites");
            favorites = favorites ? JSON.parse(favorites) : [];

            const updatedFavorites = isFavorite
            ? favorites.filter((item) => item.id !== data.id)
            : [...favorites, data];

            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Failed to update favorites", error);
        }
    };

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
    </View>
    );
}
export default Footer;