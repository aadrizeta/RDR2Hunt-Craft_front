import {StyleSheet} from "react-native";
import colors from "../../../../assets/colors/colors";

const MaterialStyles = StyleSheet.create({
    legendaryTitle: {
        fontFamily: 'UIFontItalic',
        color: colors.yellowRDR2,
        fontSize: 20,
    },
    letterTitle: {
        fontFamily: 'UIFontItalic',
        color: colors.textDefault,
        fontSize: 20,
    },
    container: {
        borderRadius: 5,
        backgroundColor: colors.secondaryColor,
        marginBottom: 10,
    },
    menuIcon: {
        width: 20,
        height: 20,
    },
    indicator: {
        width: 20,
        height: 20,
    },
    titleContainer: {
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: colors.drawerColor,
        height: 35,
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    },
    letterContainer: {
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: colors.drawerColor,
        height: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    materialText: {
        fontFamily: 'UIFontDefault',
        color: colors.textDefault,
        fontSize: 14,
    },
    materialContainer: {
        marginTop: 10,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        height: 40,
        borderBottomWidth: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    checkbox: {
    },
})
export default MaterialStyles;
