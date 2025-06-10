import { View, Text } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants/theme";
import styles from "./About.style";

const getThemeStyles = (isDarkMode) => ({

    TextStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    },
    BackgroundStyle: {
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
        lightBackground: isDarkMode ? COLORS.lightDarkBackground : COLORS.lightWhiteBackground,
    }
});


const About = ({ info, title, isDarkMode }) => {
    const themeStyles = getThemeStyles(isDarkMode);
  return (
      <View style={[styles.container, {backgroundcolor: themeStyles.BackgroundStyle.lightBackground}]}>
          <Text style={[styles.headText, {color: themeStyles.TextStyle.color}]}>About {title}:</Text>

          <View style={[styles.contentBox, {color: themeStyles.TextStyle.color}]}>
              <Text style={[styles.contextText, {color: themeStyles.TextStyle.color}]}>{info}</Text>
      </View>
    </View>
  );
};

export default About;