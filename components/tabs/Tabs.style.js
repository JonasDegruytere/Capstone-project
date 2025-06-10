import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    backgroundColor: name === activeTab ? COLORS.primary : COLORS.gray,
    borderRadius: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
      shadowColor: COLORS.white,
    marginBottom: 10,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
    color: name === activeTab ? COLORS.secondary : COLORS.primary,
  }),
});

export default styles;
