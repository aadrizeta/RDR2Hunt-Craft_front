import React  from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../views/home/HomeScreen";
import {Image, StyleSheet} from "react-native";
import ItemsScreen from "../views/Items/ItemsScreen";
import colors from "../../../assets/colors/colors";
import CustomDrawerContent from "../components/CustomDrawerContent";
import {ScreensArray} from "./constants";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ()=>{
    return (
        <Drawer.Navigator
            id={undefined}
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                drawerActiveBackgroundColor: 'rgba(134,134,134,0.25)',
                drawerActiveTintColor: colors.textDefault,
                drawerInactiveTintColor: colors.textDefault,
                drawerStyle:{
                    backgroundColor: colors.drawerColor
                },
            }}
        >
            <Drawer.Screen
                name="Items"
                component={ItemsScreen}
                options={{ drawerItemStyle: { display: "none" } }}
            />

            {ScreensArray.map((item, index) => {
                return(
                    <Drawer.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                        options={{
                            drawerLabel : item.label,
                            drawerIcon: ({size, focused}) =>(
                                <Image
                                    source={item.iconPath}
                                    style={[
                                        styles.iconNavbar,
                                    ]}
                                />
                            )
                        }}
                    />
                )
                }

            )}
        </Drawer.Navigator>
    )
}
const styles = StyleSheet.create({
    iconNavbar: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    drawerContainer: {
        flex: 1,
    },
    headerImage: {
        width: "100%",
        height: 150, // Ajusta la altura según sea necesario
        resizeMode: "cover",
    },
})
export default DrawerNavigator;
