import React from "react";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";
import DrawerNavigator from "../../navigation/DrawerNavigator";
import {useNavigation} from "@react-navigation/native";
import {Image, Text, TouchableOpacity, View} from "react-native";
import stylesHome from "../home/StylesHome";

type OutfitsScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>
function Outfits(){
    const navigation = useNavigation<OutfitsScreenNavigationProp>()
    return(
        <View>
            <TouchableOpacity
                onPress={()=> navigation.openDrawer()}
            >
                <Image source={require('../../../../assets/icons/menu.png')} style={stylesHome.menuIcon}/>
            </TouchableOpacity>
            <Text>Pantalla de Outfits</Text>
        </View>
    )
}
export default Outfits;
