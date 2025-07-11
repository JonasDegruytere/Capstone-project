import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import {useRouter } from "expo-router";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeProvider";

const getThemeStyles = (isDarkMode) => ({

    TextStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    },
    BackgroundStyle: {
        backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
        lightBackground: isDarkMode ? COLORS.lightDarkBackground : COLORS.lightWhiteBackground,
    }
});

const Settings = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === "dark";
    const themeStyles = getThemeStyles(isDarkMode);
    const router = useRouter();
    const settings = [
     {
       id: 1,
       title: "Settings",
       icon: "https://cdn-icons-png.flaticon.com/512/126/126472.png",
       target: "Mental Health",
       route: "ThemeChange",
     },
     {
       id: 2,
       title: "My Favourites",
         icon: "https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png",
       target: "Mental Health",
       route: "Favourites",
     },
     {
       id: 3,
       title: "Daily Reminders",
         icon: "https://cdn-icons-png.flaticon.com/512/109/109613.png",
       target: "Mental Health",
       route: "DailyReminders",
    },
    {
        id: 4,
        title: "Account Statistics",
        icon: "https://cdn-icons-png.flaticon.com/512/87/87578.png",
        target: "Mental Health",
        route: "Statistics",
    },
    {
        id: 5,
        title: "Change Account Credentials",
        icon: "https://icons.veryicon.com/png/o/miscellaneous/itsm-management/change-2.png",
        target: "Mental Health",
        route: "Credentials",
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

    const getUsers = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("Users");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users:", e);
            return {};
        }
    }

    const getFavs = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("UsersFavourites");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users:", e);
            return {};
        }
    }

    const getRems = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("UsersReminders");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users:", e);
            return {};
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("UsersMetaData");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users:", e);
            return {};
        }
    }

  useEffect(() => {
    loadUserDetails();
  }, []);

    const deleteAccountData = async ({ userName }) => {
        const curr_favs = await getFavs();
        delete curr_favs[userName];
        await AsyncStorage.setItem("UsersFavourites", JSON.stringify(curr_favs));

        const curr_rems = await getRems();
        delete curr_rems[userName];
        await AsyncStorage.setItem("UsersReminders", JSON.stringify(curr_rems));

        const curr_meta = await getData();
        if (curr_meta.hasOwnProperty(userName)) {
            delete curr_meta[userName];
            await AsyncStorage.setItem("UsersMetaData", JSON.stringify(curr_meta));
        }
    }

    
    const handleAcountDelete = async () => {
        const account = JSON.parse(userDetails);
        const currentUsers = await getUsers();
        if (account.userName in currentUsers) {
            await deleteAccountData({ userName: account.userName });
            delete currentUsers[account.userName];
            await AsyncStorage.setItem("Users", JSON.stringify(currentUsers));
            localStorage.removeItem("userDetails");
            localStorage.removeItem("userFavourites");
            localStorage.removeItem("userData");
            localStorage.removeItem("userReminders");
        }
        router.push("/login");
        };

    const handleLogout = async () => {
        localStorage.removeItem("userDetails");
        localStorage.removeItem("userFavourites");
        localStorage.removeItem("userData");
        localStorage.removeItem("userReminders");
        router.push("/login");
    };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.BackgroundStyle.backgroundColor }}>
      <ScreenHeaderBtn />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
                  <View style={{ width: "100%", borderBottomWidth: 5, marginTop: 10, borderBlockColor: themeStyles.TextStyle.color }} testID="userDetails">
            <Text
                style={{
                    fontFamily: FONT.bold,
                    fontSize: SIZES.xLarge,
                    color: themeStyles.TextStyle.color,
                    alignSelf: "center",
                    marginTop: 2,
                              borderBottomWidth: 5,
                    borderBlockColor: themeStyles.TextStyle.color
                }}
            >
                User Profile
            </Text>
            {userDetails && (
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: SIZES.large,
                                  color: themeStyles.TextStyle.color,
                                  alignSelf: "center",
                                  marginBottom: 10,
                                  padding: 8,
                                  marginTop: 10,
                                  borderWidth: 2,
                                  borderRadius: 50,
                                  background: themeStyles.BackgroundStyle.lightBackground,
                                  borderColor: themeStyles.TextStyle.color,
                }}
              >
                {JSON.parse(userDetails).userName}
              </Text>
            )}
          </View>
          {settings.map((setting) => (
  <TouchableOpacity
    key={setting.id}
    style={{
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: SIZES.medium,
        borderRadius: SIZES.small,
      borderColor: themeStyles.TextStyle.color,
      backgroundColor: themeStyles.BackgroundStyle.lightBackground,
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
      marginVertical: SIZES.small,
    }}
    onPress={() => router.push(`settings/${setting.route}`)}
  >
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: themeStyles.BackgroundStyle.lightBackground,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: setting.icon }}
        resizeMode="cover"
        style={{ width: "70%", height: "70%" }}
      />
    </View>
    <View style={{ flex: 1, marginHorizontal: SIZES.medium }}>
      <Text
        style={{
          fontSize: SIZES.medium,
          fontFamily: "DMBold",
          color: themeStyles.TextStyle.color,
        }}
        numberOfLines={1}
      >
        {setting?.title}
      </Text>
    </View>
  </TouchableOpacity>
          ))}
                  <TouchableOpacity
                      style={{
                          flex: 1,
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          padding: SIZES.medium,
                          borderRadius: SIZES.small,
                          backgroundColor: themeStyles.BackgroundStyle.lightBackground,
                          ...SHADOWS.medium,
                          shadowColor: COLORS.white,
                          marginVertical: SIZES.small,
                      }}
                      onPress={handleLogout}
                  >
                      <View
                          style={{
                              width: 50,
                              height: 50,
                              backgroundColor: themeStyles.BackgroundStyle.lightBackground,
                              borderRadius: SIZES.medium,
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                      >
                          <Image
                              source={icons.exit}
                              resizeMode="cover"
                              style={{
                                  width: "70%",
                                  height: "70%",
                              }}
                          />
                      </View>
                      <View
                          style={{
                              flex: 1,
                              marginHorizontal: SIZES.medium,
                          }}
                      >
                          <Text
                              style={{
                                  fontSize: SIZES.medium,
                                  fontFamily: "DMBold",
                                  color: themeStyles.TextStyle.color,
                              }}
                              numberOfLines={1}
                          >
                              Logout
                          </Text>
                      </View>
                  </TouchableOpacity>
<TouchableOpacity
  style={{
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#ff2c2c",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginVertical: SIZES.small,
  }}
  onPress={handleAcountDelete}
>
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: themeStyles.BackgroundStyle.lightBackground,
      borderRadius: SIZES.medium,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={icons.left}
      resizeMode="cover"
      style={{
        width: "70%",
        height: "70%",
      }}
    />
  </View>
  <View
    style={{
      flex: 1,
      marginHorizontal: SIZES.medium,
    }}
  >
    <Text
      style={{
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: themeStyles.TextStyle.color,
      }}
      numberOfLines={1}
    >
      Delete Account
    </Text>
  </View>
</TouchableOpacity>
          </View>
  </ScrollView>
  </SafeAreaView>
  );
    }

export default Settings;