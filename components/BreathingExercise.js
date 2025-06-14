import { useState } from "react";
import { useRouter } from "expo-router";
import {COLORS, FONT, SHADOWS, SIZES} from '../constants/theme'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

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


const BreathingExercise = ({ isDarkMode }) => {
    const router = useRouter();
    const { breathingExercises, isLoading, error } = useFetch("search");
    const [selectedBreathing, setselectedBreathing] = useState();
    const themeStyles = getThemeStyles(isDarkMode);

    const renderMeditationCard = ({ item }) => (
        <TouchableOpacity
            style={[styles.container(selectedBreathing, item), {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]}
          onPress={() => handleCardPress(item)}
        >
          <TouchableOpacity style={styles.logoContainer(selectedBreathing, item)}>
            <Image
              source={{ uri: item?.image }}
              resizeMode="cover"
              style={styles.logoImage}
            />
          </TouchableOpacity>
          <View style={styles.tabsContainer}>
                <Text style={[styles.companyName, {color: themeStyles.TextStyle.color}]} numberOfLines={1}>
              {item.target}
            </Text>
          </View>
    
            <View style={[styles.infoContainer, { color: themeStyles.TextStyle.color }]}>
            <Text
                    style={[styles.meditationName(selectedBreathing, item), { color: themeStyles.TextStyle.color }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <View style={styles.infoWrapper}>
                    <Text style={[styles.publisher(selectedBreathing, item), { color: themeStyles.TextStyle.color }]}>
                {item?.shortDescription}
              </Text>
            </View>
          </View>
            <Text style={[styles.location, { color: themeStyles.TextStyle.color }]}> {item.duration}</Text>
        </TouchableOpacity>
    );

    const handleCardPress = (item) => {
        router.push(`/meditation-details/${item.id}`);
        setselectedBreathing(item.id);
    };
  
   return(
    <>
        <View style={styles.container} testID="popularContainer">
               <View style={[styles.header, {borderColor: themeStyles.TextStyle.color}]} testID="popularHeader">
                   <Text style={[styles.headerTitle, {color: themeStyles.TextStyle.color}]}>Breathing Exercises</Text>
                <TouchableOpacity></TouchableOpacity>
            </View>
        </View>
           <View style={[styles.cardsContainer, {backgroundColor: themeStyles.BackgroundStyle.backgroundColor}]}>
                {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                <Text>Something went wrong</Text>
                ) : (
                <FlatList
                    data={breathingExercises}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMeditationCard}
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                    horizontal
                />
                )}
        </View>
    </>
   )
};

const styles = StyleSheet.create({

    container: (selectedBreathing, item) => ({
      width: 270,
      padding: SIZES.xLarge,
      marginHorizontal: SIZES.small,
      marginTop: SIZES.xLarge, 
      marginBottom: SIZES.xLarge,
      backgroundColor: selectedBreathing === item.id ? COLORS.primary : "#FFF",
      borderRadius: SIZES.medium,
      justifyContent: "space-between",
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
    }),

    header: {
      flexDirection: "row",
      justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    headerTitle: {
      fontSize: SIZES.xLarge,
      fontFamily: FONT.medium,
    },
    headerBtn: {
      fontSize: SIZES.medium,
      fontFamily: FONT.medium,
      color: COLORS.gray,
    },


    cardsContainer: {
      marginTop: SIZES.medium,
    },

    logoContainer: (selectedBreathing, item) => ({
      width: "100%",
      height: 140,
      borderRadius: SIZES.medium,
      justifyContent: "center",
      alignItems: "center",
    }),
    logoImage: {
      width: "100%",
      height: "100%",
      borderRadius: SIZES.large,
    },

    tabsContainer: {
      paddingVertical: SIZES.small / 2,
      paddingHorizontal: SIZES.small,
      marginTop: SIZES.medium,
      width: "100%",
    },
    companyName: {
      fontSize: SIZES.small,
      fontFamily: FONT.regular,
      color: "#B3AEC6",
      marginTop: SIZES.small / 1.5,
      paddingVertical: SIZES.small / 2.5,
      paddingHorizontal: SIZES.small,
      borderRadius: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS.gray2,
    },

    infoContainer: {
      marginTop: SIZES.large,
    },
    meditationName: (selectedBreathing, item) => ({
      fontSize: SIZES.large,
      fontFamily: FONT.medium,
      color: selectedBreathing === item.id ? COLORS.white : COLORS.primary,
    }),
    infoWrapper: {
      flexDirection: "row",
      marginTop: 5,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    publisher: (selectedBreathing, item) => ({
      fontSize: SIZES.medium - 2,
      fontFamily: FONT.regular,
      color: selectedBreathing === item.id ? COLORS.white : COLORS.primary,
    }),
    location: {
      fontSize: SIZES.medium - 2,
      fontFamily: FONT.regular,
      color: "#B3AEC6",
      marginTop: SIZES.small,
    },
  });
  
export default BreathingExercise;