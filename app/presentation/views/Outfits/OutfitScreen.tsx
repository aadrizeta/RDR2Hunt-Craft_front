import React from "react";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";
import DrawerNavigator from "../../navigation/DrawerNavigator";
import {useNavigation} from "@react-navigation/native";
import {Image, Text, TouchableOpacity, View} from "react-native";
import stylesHome from "../home/StylesHome";
import stylesItem from "../Items/Styles";
import Header from "../../components/Header";

type OutfitsScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>
function Outfits(){
    const navigation = useNavigation<OutfitsScreenNavigationProp>()
    return(
        <View style={stylesItem.main}>
            <Header
                imageSource={require('../../../../assets/icons/menu.png')}
                screenTitle={"Outfits"}
                method={() => navigation.openDrawer()}
            />
        </View>
    )
}
export default Outfits;
