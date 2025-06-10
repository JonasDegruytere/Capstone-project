import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from "../constants/theme";

const getThemeStyles = (isDarkMode) => ({

    QuoteStyle: {
        color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    }
});

const DailyQuote = ({ isDarkMode }) => {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(false);
    const themeStyles = getThemeStyles(isDarkMode);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://dummyjson.com/quotes/random');
            if (response.ok) {
            const data = await response.json();
            setQuote(data.quote);
            } else {
            console.error('Error fetching quote:', response.status);
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
            ) : (
            <>
                        <Text style={[styles.quoteText, { color: themeStyles.QuoteStyle.color }]}>
                            "{quote}"
                        </Text>
            </>
            )}
        </View>
        );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
        paddingVertical: 5,
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default DailyQuote;