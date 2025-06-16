import HomeScreen from "../views/home/HomeScreen";
import {ImageSourcePropType} from "react-native";
import {FC} from "react";
import OutfitScreen from "../views/Outfits/OutfitScreen";
import Favorites from "../views/favorites/Favorites";
import MaterialsScreen from "../views/Materials/MaterialsScreen";


export const constant = {
    SPACING: 16,
    borderRadius: 10,
    titleFontSize: 24,
    textFontSize: 16,
    subTextFontSize: 14,
}

type ScreenItem = {
    route: string;
    label: string;
    iconPath: ImageSourcePropType; // Tipo para imágenes locales
    component: FC; // Componente funcional
};


export const ScreensArray:ScreenItem[] = [
    {
        route: "Home",
        label: "Home",
        iconPath: require("../../../assets/icons/hogar.png"), // Icono de Home
        component: HomeScreen,
    },
    {
        route: "Outfits",
        label: "Outfits",
        iconPath: require("../../../assets/icons/outfit_icon.png"), // Icono de Outfits
        component: OutfitScreen,
    },
    {
        route: "Materials",
        label: "Materials",
        iconPath: require("../../../assets/icons/materials.png"), // Icono de Outfits
        component: MaterialsScreen,
    },
    {
        route: "Favorites",
        label: "Favorites",
        iconPath: require("../../../assets/icons/star.png"), // Icono de Outfits
        component: Favorites,
    },
];
export const drawerMenu = [
    {
        title: "Items",
        iconPath: require("../../../assets/icons/items_icon.png"),
        route: "Items",
        menuList: [
            { id: 2, title: "Hats", iconPath: require("../../../assets/icons/hats.png") },
            { id: 3, title: "Vests", iconPath: require("../../../assets/icons/vest.png") },
            { id: 4, title: "Boots", iconPath: require("../../../assets/icons/boots.png") },
            { id: 5, title: "Chaps", iconPath: require("../../../assets/icons/chaps.png") },
            { id: 10, title: "Saddles", iconPath: require("../../../assets/icons/saddle.png") },
            { id: 11, title: "Gloves", iconPath: require("../../../assets/icons/gloves.png") },
            { id: 12, title: "Coats", iconPath: require("../../../assets/icons/coats.png") },
            { id: 13, title: "Accessories", iconPath: require("../../../assets/icons/accesories.png") },
        ],
    },
];
