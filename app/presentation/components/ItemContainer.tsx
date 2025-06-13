import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity,} from "react-native";
import colors from "../../../assets/colors/colors";
import CheckBox from "@react-native-community/checkbox";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../App";

type ItemProps = {
    name: string;
    price: number;
    id:number;
    onPress?: () => void;
};

const ItemContainer: React.FC<ItemProps> = ({ id, name, price, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between", // Nombre a la izquierda, precio a la derecha
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        backgroundColor: colors.secondaryColor, // Beige claro como fondo del menú
    },
    name: {
        fontSize: 16,
        color: colors.textDefault, // Color oscuro para contraste
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.yellowRDR2, // Color del precio similar al original
    },
});

export default ItemContainer;
