import {StyleSheet} from "react-native";
import colors from "../../../../assets/colors/colors";

const stylesItem = StyleSheet.create({
    main: {
        backgroundColor: colors.mainColor,
        flex: 1,
        paddingBottom:20,
    },
    scrollView :{
        marginHorizontal: 20,
        fontFamily: 'UIFontDefault',
        marginBottom: 10
    },
    text: {
        color: colors.textDefault,
        fontFamily: 'UIFontDefault'
    }

})
export default stylesItem;
