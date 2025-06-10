import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants/theme";
import styles from "./MeditationTopDisplay.style";

const getThemeStyles = (isDarkMode) => ({

    TextStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    },
    BackgroundStyle: {
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
        lightBackground: isDarkMode ? COLORS.lightDarkBackground : COLORS.lightWhiteBackground,
    }
});


const MeditationTopDisplay = ({ meditationImage, meditationTitle, duration, target, isDarkMode }) => {
    const themeStyles = getThemeStyles(isDarkMode);
    return (
        <View style={[styles.container, {backgroundcolor: themeStyles.BackgroundStyle.backgroundColor}]}>
            <View style={[styles.logoBox, {backgroundColor: themeStyles.BackgroundStyle.backgroundColor}]}>
        <Image
            source={{
            uri: meditationImage,
            }}
            resizeMode="cover"
            style={styles.logoImage}
        />
        </View>

            <View style={[styles.meditationTitleBox, {color: themeStyles.TextStyle.color}]}>
                <Text style={[styles.meditationTitle, {color: themeStyles.TextStyle.color}]}>{meditationTitle}</Text>
        </View>

            <View style={[styles.meditationInfoBox, {color: themeStyles.TextStyle.color}]}>
                <Text style={[styles.meditationName, {color: themeStyles.TextStyle.color}]}>{target} / </Text>
                <View style={[styles.durationBox, {color: themeStyles.TextStyle.color}]}>
            <Image
            source={"https://cdn-icons-png.flaticon.com/512/109/109613.png"}
            resizeMode="cover"
                        style={[styles.durationImage, {backgroundColor: COLORS.gray}]}
            />

                    <Text style={[styles.durationName, {color: themeStyles.TextStyle.color}]}>{duration}</Text>
        </View>
        </View>
    </View>
    );

}

export default MeditationTopDisplay;