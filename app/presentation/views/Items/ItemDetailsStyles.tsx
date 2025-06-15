import {StyleSheet} from "react-native";
import colors from "../../../../assets/colors/colors";

const stylesDetails = StyleSheet.create({
    main: {
        backgroundColor: colors.mainColor,
        flex: 1
    },
    scrollView :{
        marginHorizontal: 20
    },
    text: {
        color: colors.textDefault,
    },
    body: {
        flex: 1,
        marginHorizontal: 30,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    priceText: {
        fontFamily: 'RDR2Font',
        color: colors.textDefault,
        fontSize: 30,
        textAlign: "right",
    },
    dataText: {
        fontFamily: 'UIFontDefault',
        fontSize: 20,
        color: colors.textDefault,
        marginVertical: 8,
    },
    dataRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center"
    },
    materialDataText: {
        fontFamily: 'UIFontItalic',
        fontSize: 15,
        color: colors.textDefault,
    },
    materialContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: colors.secondaryColor,
        marginVertical: 4,
        borderBottomWidth: 5,
        borderBottomColor: colors.icons
    },
    materials: {
        marginVertical: 10
    }
})

export default stylesDetails;
