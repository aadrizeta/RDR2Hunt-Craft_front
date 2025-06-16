import React, {useState} from "react";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Image, View, StyleSheet, TouchableOpacity, Text, TouchableNativeFeedback, LayoutAnimation} from "react-native";
import {constant, drawerMenu} from "../navigation/constants";
import colors from "../../../assets/colors/colors";

const CustomDrawerContent = (props)=>{
    const [menuIndex, setMenuIndex] = useState(-1);
    const navigation = props.navigation;
    return (
        <View style={styles.drawerContainer}>
            {/* Imagen de encabezado */}
            <View style={styles.headerContainer}>
                <Image
                    style={styles.headerImage}
                    source={require("../../../assets/pictures/header_image.jpg")}
                />
            </View>
            {/* Contenedor del Drawer */}
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
                <DrawerItemList {...props}/>
                {drawerMenu.map((item, index) => {
                    return(
                        <TouchableOpacity key={index}
                                          style={[styles.menu]}
                                          onPress={() => {
                                              LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
                                              setMenuIndex(menuIndex === index ? -1 : index)
                                          }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9, gap: 10, marginVertical: 5}}>
                                <Image
                                    source={item.iconPath}
                                    style={styles.iconNavbar}
                                />
                                <Text style={{
                                    color: colors.textDefault,
                                    fontFamily: 'UIFontDefault'
                                }}>
                                    {item.title}
                                </Text>
                            </View>
                            {menuIndex === index && <View style={{borderRadius: constant.borderRadius, marginTop: 10}} >
                                {item.menuList.map((sumMenu, index) => (
                                        <TouchableNativeFeedback
                                            key={index}
                                            onPress={() => navigation.navigate("Items", { category: sumMenu.title, id: sumMenu.id })}
                                        >
                                            <View style={styles.subMenu}>
                                                <Image
                                                    source={sumMenu.iconPath}
                                                    style={styles.iconNavbar}
                                                />
                                                <Text
                                                    style={{
                                                        color: colors.textDefault,
                                                        fontFamily: 'UIFontDefault',
                                                        paddingTop: 5
                                                }}
                                                >{sumMenu.title}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    )
                                )}
                            </View>}
                        </TouchableOpacity>

                    )
                })}
            </DrawerContentScrollView>

        </View>
    )
}
export default CustomDrawerContent;
const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
    },
    iconNavbar: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        overflow: "hidden",
    },

    headerImage: {
        width: "100%",
        height: 150, // Ajusta la altura según sea necesario
        resizeMode: "cover",
    },
    drawerContent: {
        flexGrow: 1, // Hace que los elementos se ubiquen debajo de la imagen
        paddingTop: 10, // Ajusta el espacio si es necesario
    },
    subMenu: {
        flexDirection: 'row',
        marginHorizontal: 25,
        gap: 10,
        paddingVertical: constant.SPACING / 1.5,
    },
    menu: {
        marginHorizontal: constant.SPACING / 1.7,
        marginVertical: constant.SPACING / 2.5,
        borderRadius: constant.borderRadius,
    },
});
