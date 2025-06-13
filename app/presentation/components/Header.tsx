import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";

const Header = ({ imageSource, screenTitle, method }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.iconWrapper} onPress={method}>
                <Image source={imageSource} style={styles.menuIcon} />
            </TouchableOpacity>

            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{screenTitle}</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 150,
        width: '100%',
        position: 'relative',
        paddingHorizontal: 15,
    },
    iconWrapper: {
        zIndex: 2,
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
    titleWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    title: {
        color: colors.textDefault,
        fontSize: 25,
        fontFamily: 'RDR2Font',
    },
});
