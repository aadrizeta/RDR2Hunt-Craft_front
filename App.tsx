import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./app/presentation/views/home/HomeScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import * as Font from "expo-font";
import {useEffect, useState} from "react";
import ItemsScreen from "./app/presentation/views/Items/ItemsScreen";
import DrawerNavigator from "./app/presentation/navigation/DrawerNavigator";
import ItemDetailScreen from "./app/presentation/views/Items/ItemDetailScreen";


const Stack = createNativeStackNavigator<RootStackParamList>()
export type RootStackParamList={
    DrawerNavigator: undefined,
    Home: undefined,
    Items: { category: string; id: number }; // Parámetros para ItemsScreen
    ItemDetail: { id_item: number, item_name: string }; // Parámetros para ItemDetailScreen
    Outfits: undefined
    ItemTipo: {idTipo: number},
    ItemOutfit: {idOutfit: number},
}

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded){
            Font.loadAsync({
                'RDR2Font': require('./assets/fonts/chineserocksfree.ttf'),
                'UIFontDefault': require('./assets/fonts/droid-serif.regular.ttf'),
                'UIFontBold': require('./assets/fonts/droid-serif.bold.ttf'),
                'UIFontItalic': require('./assets/fonts/droid-serif.italic.ttf'),
                'UIFontItalicBold': require('./assets/fonts/droid-serif.bold-italic.ttf'),
            })
        }
    });
  return (
      /*<NavigationContainer>
          <HomeScreen/>
      </NavigationContainer>*/
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name={"DrawerNavigator"} component={DrawerNavigator}/>
            <Stack.Screen name={"Home"} component={HomeScreen}/>
            <Stack.Screen name={"Items"} component={ItemsScreen}/>
            <Stack.Screen name={"ItemDetail"} component={ItemDetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
