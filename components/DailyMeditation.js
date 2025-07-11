import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";
import useFetch from "../hook/useFetch";

const getThemeStyles = (isDarkMode) => ({

    TextStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    },
    BackgroundStyle: {
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
        lightBackground: isDarkMode ? COLORS.lightDarkBackground : COLORS.lightWhiteBackground,
    }
});


const DailyMeditation = ({ meditations, isDarkMode }) => {
  const router = useRouter();

  const { isLoading, error, bestMeditations } = useFetch("search", {
    query: "",
    num_pages: "1",
  });

  const themeStyles = getThemeStyles(isDarkMode);

  const handleNavigate = (id) => {
    router.push(`/meditation-details/${id}`);
  };

  const data = meditations || bestMeditations;

  return (
    <View style={styles.container}>
          <View style={[styles.header, {borderColor: themeStyles.TextStyle.color}]}>
              <Text style={[styles.headerTitle, { color: themeStyles.TextStyle.color }]}>Meditations</Text>
      </View>

        <View style={[styles.cardsContainer, {backgroundColor: themeStyles.BackgroundStyle.backgroundColor}]}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((meditation) => (
            <TouchableOpacity
              key={`meditation-${meditation.id}`}
                  style={[styles.cardContainer, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}
              onPress={() => handleNavigate(meditation.id)}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: meditation.image }}
                  resizeMode="cover"
                  style={styles.logoImage}
                />
              </View>

              <View style={styles.textContainer}>
                      <Text style={[styles.meditationName, {color: themeStyles.TextStyle.color}]} numberOfLines={1}>
                  {meditation.title}
                </Text>
                      <Text style={[styles.meditationDetail, { color: themeStyles.TextStyle.color }]}>
                  {meditation.target}
                </Text>
                      <Text style={[styles.meditationDetail, { color: themeStyles.TextStyle.color }]}>
                  {meditation.duration}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

export default DailyMeditation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
      marginTop: SIZES.small,
      borderTopWidth: 1,
      borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.medium,
      color: COLORS.primary,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: "100%",
    height: 150,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    borderRadius: SIZES.medium,
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.medium,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.medium,
  },
  meditationName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
});
