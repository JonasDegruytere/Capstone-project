import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { View } from "react-native-web"; // You might want to use "react-native" instead if this is not web-based.
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons";
import {  useRouter } from "expo-router";

const ScreenHeaderBtn = ({detailPage,handleShare}) => {


    const router=useRouter();
    return (
        <>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnContainer} onPress={()=>router.push("/home")}>
                    <Image source={icons.menu} style={styles.image} />
                </TouchableOpacity>

                {detailPage?
                <>
                <TouchableOpacity style={styles.btnContainer} onPress={() => router.push("/settings")}>
                    <Image source={icons.settings} style={styles.image} />
                </TouchableOpacity>
                </>  
                :
                <>
                <TouchableOpacity style={styles.btnContainer} onPress={()=>router.push("/settings")}>
                    <Image source={icons.settings} style={styles.image} />
                </TouchableOpacity>
                </>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    btn: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 10, 
        width: '100vw',
    marginTop: 20,
    },
    image: {
    width: 30, 
    height: 30,
    resizeMode: 'contain',
    },
    btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    },
});

export default ScreenHeaderBtn;