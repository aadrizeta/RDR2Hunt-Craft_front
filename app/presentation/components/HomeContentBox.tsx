import React from "react";
import colors from "../../../assets/colors/colors";
import {View, Text, Image, StyleSheet} from "react-native";

const HomeContextBox = ({ imageSource, title, description }) => {
    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.secondaryColor,
        borderRadius: 16,
        overflow: 'hidden',
        padding: 16,
        marginBottom: 16,
        alignContent: "space-around",
    },
    image: {
        width: '45%',
        height: 140,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        paddingLeft: 16,
        alignContent: "space-around",
    },
    title: {
        color: colors.textDefault,
        fontSize: 18,
        marginBottom: 6,
        fontFamily: 'RDR2Font'
    },
    description: {
        color: colors.textDefault,
        fontSize: 14,
        fontFamily: 'RDR2Font'

    },
});
export default HomeContextBox;
