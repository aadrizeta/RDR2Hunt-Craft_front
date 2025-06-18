import React, {useEffect, useState} from "react";
import {ItemInterface, OutfitInterface} from "../../domain/entitities/Item";
import {AxiosError} from "axios";
import {ApiDelivery} from "../../data/sources/remote/api/ApiDelivery";
import {Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View
} from "react-native";
import ItemContainer from "./ItemContainer";
import colors from "../../../assets/colors/colors";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../App";

if (Platform.OS === 'android'){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

type OutfitDropDownNavigationProp = DrawerNavigationProp<RootStackParamList>
interface Props {
    outfits: OutfitInterface[];
}

const OutfitDropdown: React.FC<Props> = ({ outfits,  }) => {
    const [expandedOutfitId, setExpandedOutfitId] = useState<number | null>(null);
    const [itemsMap, setItemsMap] = useState<{ [key: number]: ItemInterface[] }>({});
    const navigation = useNavigation<OutfitDropDownNavigationProp>();

    useFocusEffect(
        React.useCallback(() => {
            setExpandedOutfitId(null); // ✅ Reset al enfocar
        }, [])
    );

    const toggleOutfit = async (outfitId: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (expandedOutfitId === outfitId) {
            setExpandedOutfitId(null); // Collapse
        } else {
            setExpandedOutfitId(outfitId); // Expand new

            if (!itemsMap[outfitId]) {
                try {
                    const response = await ApiDelivery.get(`/items/by-outfit/${outfitId}`);
                    setItemsMap(prev => ({ ...prev, [outfitId]: response.data }));
                } catch (error) {
                    const e = error as AxiosError;
                    console.log("Error fetching items: ", e.response?.data);
                }
            }
        }
    };
    return (
        <View>
            {outfits.map((outfit) => (
                <View key={outfit.id} style={styles.outfitContainer}>
                    <TouchableOpacity onPress={() => toggleOutfit(outfit.id)}>
                        <Text style={styles.name}>{outfit.nombre}</Text>
                    </TouchableOpacity>

                    {expandedOutfitId === outfit.id && (
                        <View style={styles.itemsList}>
                            <Image
                                style={styles.outfitImage}
                                source={{ uri: outfit.image }}
                            />
                            {(itemsMap[outfit.id] || []).map(item =>(
                                <ItemContainer
                                    key={item.id}
                                    name={item.nombre}
                                    price={item.precio}
                                    id={item.id}
                                    onPress={() => navigation.navigate('ItemDetail', {
                                        id_item: item.id,
                                        item_name: item.nombre
                                    })}
                                />
                            ))}
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
}
export default OutfitDropdown;

const styles = StyleSheet.create({
   outfitContainer: {
       backgroundColor: colors.secondaryColor,
       marginVertical: 5,
       paddingVertical: 12,
       paddingHorizontal: 4,
       borderBottomWidth: 2,

   },
    name: {
        fontSize: 20,
        color: colors.textDefault, // Color oscuro para contraste
        fontFamily: 'UIFontDefault'
    },
    itemsList: {
       marginTop: 10,
    },
    outfitImage: {
        width: 300,
        aspectRatio: 1,
        marginBottom: 10,
        borderRadius: 8,
        alignSelf: "center",
        marginTop: 10,
    },
});
