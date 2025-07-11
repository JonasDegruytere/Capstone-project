import React, { useState, useEffect } from "react";
import {
  View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform,
  Alert, TextInput, StyleSheet
} from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, SIZES } from "../../constants";
import { useTheme } from "../../context/ThemeProvider";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
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


const DailyReminders = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";
    const [reminders, setReminders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [manualTime, setManualTime] = useState("");
    const [notDescr, setNotDescr] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const themeStyles = getThemeStyles(isDarkMode);
    const router = useRouter();

    const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission not granted', 'Please allow notifications to receive reminders.');
        }
      };

      useEffect(() => {
        requestPermissions();
        loadUserDetails();
        loadReminders();
      }, []);

      const loadUserDetails = async () => {
          const user = await AsyncStorage.getItem("userDetails");
          if (!user) {
              router.push("/login")
              return;
          }
        setUserDetails(user ? JSON.parse(user) : {});
      };
      const loadReminders = async () => {
        const storedReminders = await AsyncStorage.getItem("userReminders");
        const allReminders = storedReminders ? JSON.parse(storedReminders) : [];
          const futureReminders = allReminders.filter((reminder) => new Date(reminder.triggerDate) > new Date());
        setReminders(futureReminders);
      };
      const handleAddReminder = async () => {
        if (!selectedDate) {
            alert("Please select a date.");
            return;
          }
          const [inputHours, inputMinutes] = manualTime.split(":").map((item) => parseInt(item, 10));
          const triggerDate = new Date(selectedDate);

          if (!isNaN(inputHours) && !isNaN(inputMinutes)) {
            triggerDate.setHours(inputHours, inputMinutes, 0, 0);
          } else {
            triggerDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
          }
          if (triggerDate <= new Date()) {
            alert("Please select a future time.");
            return;
          }
          const strictRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
          if (!strictRegex.test(manualTime)) {
              alert("Please enter a valid time in HH:mm format");
              return;
          }
          const descrToUse = notDescr === "" ? "Reminder: Time for your daily task!" : notDescr;
          const newReminder = {
            id: Date.now(),
            date: selectedDate,
            time: manualTime || triggerDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            description: descrToUse,
            triggerDate: triggerDate.toISOString(),
          };
          try {
            const updatedReminders = [...reminders, newReminder];
            await AsyncStorage.setItem("userReminders", JSON.stringify(updatedReminders));
            setReminders(updatedReminders);
            await scheduleNotification(newReminder);
            alert("Reminder added successfully!");
            await updateReminders(updatedReminders);
            await updateMetaData();
          }
          catch (error) {
            alert("Error adding reminder.");
          }
      }
    const scheduleNotification = async (reminder) => {
        const triggerDate = new Date(reminder.triggerDate);

        if (Platform.OS === "web") {
          setTimeout(() => {
            new Notification("Reminder", { body: reminder.description });
          }, triggerDate - new Date());
        } else {
          await Notifications.scheduleNotificationAsync({
            content: { title: "Reminder", body: reminder.description },
            trigger: { date: triggerDate },
          });
        }
      
    }
    const deleteReminder = async (id) => {
        const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
        await AsyncStorage.setItem("userReminders", JSON.stringify(updatedReminders));
        setReminders(updatedReminders);
        await updateReminders(updatedReminders);
      };
      const Reminder = ({ item }) => (
          <View style={[styles.reminderContainer, {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]}>
              <Text style={[styles.description, {color: themeStyles.TextStyle.color}]}>{item.description}</Text>
              <Text style={[styles.date, { color: themeStyles.TextStyle.color }]}>{item.date} - {item.time}</Text>
              <TouchableOpacity onPress={() => deleteReminder(item.id)} style={[styles.deleteButton, { color: themeStyles.TextStyle.color }]}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
    );

    const getUsersReminders = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("UsersReminders");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Failed to load users reminders:", e);
            return {};
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

    const updateReminders = async (remindersList) => {
        try {
            const userReminders = await getUsersReminders();
            const jsonvalue = await AsyncStorage.getItem("userDetails");
            const curr_usr = JSON.parse(jsonvalue);

            userReminders[curr_usr.userName] = remindersList;
            await AsyncStorage.setItem("UsersReminders", JSON.stringify(userReminders));

        } catch (error) {
            console.error("Failed to update user reminders list", error);
        }
    }

    const updateMetaData = async () => {
        try {
            let usr_data = await AsyncStorage.getItem("userData");
            usr_data = usr_data ? JSON.parse(usr_data) : {};

            usr_data["tot_reminders"] = usr_data["tot_reminders"] ? usr_data["tot_reminders"] + 1 : 1;
            await AsyncStorage.setItem("userData", JSON.stringify(usr_data));

            const usersMetaData = await getUsersMetaData();
            const jsonvalue = await AsyncStorage.getItem("userDetails");
            const curr_usr = JSON.parse(jsonvalue);
            usersMetaData[curr_usr.userName] = usr_data;
            await AsyncStorage.setItem("UsersMetaData", JSON.stringify(usersMetaData));

        } catch (error) {
            console.error("failed to properly update user metdata", error);
        }
    }

    const handleTimeChange = (text) => {
        const cleaned = text.replace(/[^\d]/g, '');

        let formatted = cleaned;
        if (cleaned.length >= 3) {
            formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
        }

        if (formatted.length > 5) return;

        // Allow partial matching while typing
        const partialRegex = /^([01]?[0-9]|2[0-3])?(:[0-5]?[0-9]?)?$/;
        if (!partialRegex.test(formatted)) return;

        setManualTime(formatted);
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.BackgroundStyle.backgroundColor }}>
            <ScreenHeaderBtn />
        <Stack.Screen options={{ headerTitle: "Daily Reminders" }} />
        <ScrollView contentContainerStyle={{ padding: SIZES.medium }}>
                <Calendar
                    style={{
                        borderWidth: 2,
                        borderColor: COLORS.gray,
                        backgroundColor: themeStyles.BackgroundStyle.lightBackground,
                        calendarBackground: themeStyles.BackgroundStyle.lightBackground,
                        dayTextColor: themeStyles.BackgroundStyle.lightBackground,
                        selectedDayBackgroundColor: '#00adf5',
                        color: themeStyles.BackgroundStyle.lightBackground,
                        height: 350,
                    }}
                    theme={{ calendarBackground: themeStyles.BackgroundStyle.lightBackground} }
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{ [selectedDate]: { selected: true, selectedColor: themeStyles.BackgroundStyle.backgroundColor } }}
          />
  
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              onChange={(event, selected) => {
                setSelectedTime(selected || selectedTime);
                setShowTimePicker(false);
              }}
            />
          )}
  
          <TextInput
            placeholder="Enter Time (HH:mm)"
            value={manualTime}
            onChangeText={handleTimeChange}
            keyboardType="numeric"
            maxLength={5}
            style={[styles.input, { color: themeStyles.TextStyle.color }, {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]}
          />
  
                <Text style={[styles.selected, {color: themeStyles.TextStyle.color}]}>Date: {selectedDate || "None"}</Text>
                <Text style={[styles.selected, { color: themeStyles.TextStyle.color }]}>Time: {manualTime || selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
            <TextInput
                placeholder="(Optional) Add a short notification description"
                value={notDescr}
                onChangeText={setNotDescr}
                maxLength={128}
                style={[styles.input, { color: themeStyles.TextStyle.color }, { backgroundColor: themeStyles.BackgroundStyle.lightBackground }]}
            />
                <TouchableOpacity onPress={handleAddReminder} style={[styles.button, {backgroundColor: themeStyles.BackgroundStyle.lightBackground}]}>
          <Text style={[styles.buttonText, {color: themeStyles.TextStyle.color}]}>Add Reminder</Text>
          </TouchableOpacity>
  
            <Text style={[styles.reminderHeader, {color: themeStyles.TextStyle.color}]}>All Reminders:</Text>
                {reminders.length > 0 ? reminders.map((rem) => <Reminder key={rem.id} item={rem} />) : <Text style={[{ color: themeStyles.TextStyle.color }]}>No reminders yet.</Text>}
        </ScrollView>
      </SafeAreaView>
    
    )
    }

    const styles = StyleSheet.create({
        reminderContainer: {
          backgroundColor: COLORS.darkText, borderRadius: SIZES.small, padding: SIZES.small, marginVertical: SIZES.small
        },
        description: { fontWeight: "bold" },
        date: { color: COLORS.darkText, fontSize: SIZES.small },
        input: { borderColor: COLORS.primary, borderWidth: 1, padding: SIZES.small, marginVertical: SIZES.small },
        selected: { fontSize: SIZES.medium, marginVertical: SIZES.small, color: COLORS.primary },
        button: { backgroundColor: COLORS.primary, padding: SIZES.medium, borderRadius: SIZES.medium, alignItems: "center" },
        buttonText: { color: COLORS.lightWhite, fontWeight: "bold" },
        deleteButton: { marginTop: SIZES.small, alignSelf: "flex-end" },
        deleteText: { color: "#FE7654", fontWeight: "bold" },
        reminderHeader: { fontSize: SIZES.large, fontWeight: "bold", color: COLORS.primary, marginVertical: SIZES.medium },
      });
      
    export default DailyReminders;