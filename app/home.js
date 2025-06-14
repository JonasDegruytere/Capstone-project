import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";
import { useTheme } from "../context/ThemeProvider";
import DailyQuote from "../components/DailyQuote";
import { useRouter } from "expo-router";
import BreathingExercise from "../components/BreathingExercise";
import StressReliefExercises from "../components/StressRelief";
import MindfullnessExercises from "../components/Mindfullness";
import SelfCompassionExercises from "../components/Selfcompassion";
import GroudingExercise from "../components/Grounding";

const Home = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === "dark";
    const router = useRouter();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
      const user = await AsyncStorage.getItem("userDetails");
      if (!user) {
          router.push("/login")
          return;
      }
      setUserDetails(user);
  };

    return (
     <>
       <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhiteBackground,
      }}
    >
     <ScreenHeaderBtn/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,

          }}
          testID="screensDisplay"
        >

                        <Welcome userDetails={userDetails ? JSON.parse(userDetails) : null} isDarkMode={isDarkMode} />
                        <DailyQuote isDarkMode={isDarkMode}/>
                        <PopularMeditation isDarkMode={isDarkMode}/>
                        <DailyMeditation isDarkMode={isDarkMode} />
                        <BreathingExercise isDarkMode={isDarkMode} />
                        <StressReliefExercises isDarkMode={isDarkMode} />
                        <MindfullnessExercises isDarkMode={isDarkMode} />
                        <SelfCompassionExercises isDarkMode={isDarkMode} />
                        <GroudingExercise isDarkMode={isDarkMode } />
        </View>
      </ScrollView>
    </SafeAreaView>
     </>
    );
  };

  export default Home;