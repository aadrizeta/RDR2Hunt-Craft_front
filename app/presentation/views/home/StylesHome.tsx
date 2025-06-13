import { StyleSheet } from 'react-native';
import colors from "../../../../assets/colors/colors";

const stylesHome = StyleSheet.create({
    main: {
        backgroundColor: colors.mainColor,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        height: 150,
    },
    appIcon: {
        width: 200,
        height: 80,
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
    userIcon: {
        width: 40,
        height: 40,
    },
    scrollContainer: {
        padding: 20,
    },

});
export default stylesHome;