import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  Alert,
  StyleSheet,
} from "react-native";

import {
  MeditationTopDisplay,
  About,
  Footer,
  Tabs,
} from "../../components";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { useTheme } from "../../context/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";



const getThemeStyles = (isDarkMode) => ({

    TextStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    },
    BackgroundStyle: {
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
        lightBackground: isDarkMode ? COLORS.lightDarkBackground : COLORS.lightWhiteBackground,
    }
});


const tabs = ["About", "Instructions"];

const MeditationDetails = () => {
  const params = useGlobalSearchParams();
  const id = params.id;
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: id,
  });
  const meditationItem = useFetch().getItemById(parseInt(id, 10));

  const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const themeStyles = getThemeStyles(isDarkMode);

    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    const loadUserDetails = async () => {
        const user = await AsyncStorage.getItem("userDetails");
        if (!user) {
            router.push("/login")
            return;
        }
        setUserDetails(user);
    };

    useEffect(() => {
        loadUserDetails();
    }, []);




      const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
        }, []);


    const displayTabContent = () => {
        if (activeTab === "About") {
            return (
            <About
                    title={meditationItem.title}
                    info={meditationItem.description ?? "No data provided"}
                    isDarkMode={isDarkMode }
            />
            );
        } else if (activeTab === "Instructions") {
            return (
                <View style={[styles.specificsContainer, {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]}>
                    <Text style={[styles.specificsTitle, {color: themeStyles.TextStyle.color}]}>Instructions:</Text>
                    <View style={[styles.pointsContainer, {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]}>
                {(meditationItem.instructions ?? ["N/A"]).map((item, index) => (
                    <View style={styles.pointWrapper} key={index}>
                        <View style={[styles.pointDot, {color: themeStyles.TextStyle.color}]} />
                        <Text style={[styles.pointText, {color: themeStyles.TextStyle.color}]}>{item}</Text>
                    </View>
                ))}
                </View>
            </View>
            );
        }
        return null;
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
            message: `Check out this meditation: ${meditationItem.title} (${meditationItem.duration})`,
            });
            if (result.action === Share.dismissedAction) {
            // Share dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.BackgroundStyle.backgroundColor }}>
        <ScreenHeaderBtn detailPage={true} handleShare={onShare} />

        <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
            <Text>Something went wrong</Text>
        ) : !meditationItem || meditationItem.length === 0 ? (
            <Text>No data available</Text>
        ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100, backgroundcolor: themeStyles.BackgroundStyle.backgroundColor }}>
            <MeditationTopDisplay
                                        meditationImage={meditationItem.image}
                                        meditationTitle={meditationItem.title}
                                        duration={meditationItem.duration}
                                        target={meditationItem.target}
                                        isDarkMode={isDarkMode }
            />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {displayTabContent()}
            </View>
        )}
        </ScrollView>

            <Footer data={meditationItem} isDarkMode={isDarkMode} />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  specificsContainer: {
    padding: SIZES.medium,
  },
  specificsTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  pointsContainer: {
    marginTop: SIZES.small,
  },
  pointWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small / 2,
  },
  pointDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.small,
  },
  pointText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});

export default MeditationDetails;