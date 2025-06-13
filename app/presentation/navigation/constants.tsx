import HomeScreen from "../views/home/HomeScreen";
import {ImageSourcePropType} from "react-native";
import {FC} from "react";
import OutfitScreen from "../views/Outfits/OutfitScreen";


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
];
export const drawerMenu = [
    {
        title: "Items",
        iconPath: require("../../../assets/icons/items_icon.png"),
        route: "Items",
        menuList: [
            { id: 2, title: "hats" },
            { id: 3, title: "vests" },
            { id: 4, title: "boots" },
            { id: 5, title: "chaps" },
            { id: 10, title: "saddles" },
            { id: 11, title: "gloves" },
            { id: 12, title: "coats" },
            { id: 13, title: "accessories" },
        ],
    },
];
