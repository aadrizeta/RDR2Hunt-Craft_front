import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";
import {useNavigation} from "@react-navigation/native";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import stylesItem from "../Items/Styles";
import Header from "../../components/Header";
import {AxiosError} from "axios";
import {MaterialRepositoryImpl} from "../../../data/repositories/MaterialRepository";
import {useEffect, useState} from "react";
import {MaterialInterface} from "../../../domain/entitities/Material";
import materialStyles from "./MaterialStyles";

type MaterialsStackNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>

function MaterialsScreen () {
    const navigation = useNavigation<MaterialsStackNavigationProp>();
    const [legendaryMaterials, setLegendaryMaterials] = useState<MaterialInterface[]>([]);
    const [groupedMaterials, setGroupedMaterials] = useState<Record<string, MaterialInterface[]>>({});
    const materialRepo = new MaterialRepositoryImpl();
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (key: string) => {
        setExpandedSection(prev => (prev === key ? null : key));
    };

    useEffect(() => {
        setExpandedSection(null);
        loadMaterials();
    }, []);


    const loadMaterials = async () =>{
        try {
            const allMaterials = await materialRepo.getAllMaterials();

            const legendary = allMaterials.filter(m => m.nombre.trim().toLowerCase().startsWith("legendary"));
            const normalMaterials = allMaterials.filter(m => !m.nombre.trim().toLowerCase().startsWith("legendary"));

            const grouped = groupMaterialsByLetter(normalMaterials);

            setLegendaryMaterials(legendary);
            setGroupedMaterials(grouped);

            console.log("Materiales Legendarios: " + {legendary});
            console.log("Normales: " + {grouped});

        } catch (error) {
            const e = error as AxiosError;
            console.log("Error loading materials:", e.response?.data);
        }
    };
    const groupMaterialsByLetter = (materials: MaterialInterface[]): Record<string, MaterialInterface[]> => {
        const grouped: Record<string, MaterialInterface[]> = {};
        materials.forEach((material) => {
            const firstLetter = material.nombre.trim().charAt(0).toUpperCase();
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = [];
            }
            grouped[firstLetter].push(material);
        });
        Object.keys(grouped).forEach(letter => {
           grouped[letter].sort((a, b) => a.nombre.localeCompare(b.nombre));
        });
        return grouped
    }
    return(
        <View style={stylesItem.main}>
            <Header
                imageSource={require('../../../../assets/icons/menu.png')}
                screenTitle={"Materials"}
                method={() => navigation.openDrawer()}
            />
            <ScrollView style={stylesItem.scrollView}>
                {legendaryMaterials.length > 0 && (
                    <View style={materialStyles.container}>
                        <TouchableOpacity onPress={() => toggleSection("legendary")}>
                            <View style={materialStyles.letterContainer}>
                                <Image
                                    source={require("../../../../assets/icons/legendaryIcon.png")}
                                    style={materialStyles.menuIcon}
                                />
                                <Text style={materialStyles.legendaryTitle}>Legendary Materials</Text>
                                <Image
                                    source={
                                        expandedSection === "legendary"
                                        ? require("../../../../assets/icons/up.png")
                                        : require("../../../../assets/icons/down.png")
                                    }
                                    style={materialStyles.indicator}
                                />
                            </View>
                        </TouchableOpacity>

                        {expandedSection === "legendary" && (
                            <View>
                                {legendaryMaterials.map(material => (
                                    <View style={materialStyles.materialContainer}>
                                        <Text
                                            key={material.id}
                                            style={materialStyles.materialText}
                                        >
                                            {material.nombre.trim()}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                {Object.keys(groupedMaterials).sort().map(letter => (
                    <View style={materialStyles.container} key={letter}>
                        <TouchableOpacity onPress={() => toggleSection(letter)}>
                            <View style={materialStyles.letterContainer}>
                                <Text style={materialStyles.letterTitle}>{letter}</Text>
                                <Image
                                    source={
                                        expandedSection === "legendary"
                                            ? require("../../../../assets/icons/up.png")
                                            : require("../../../../assets/icons/down.png")
                                    }
                                    style={materialStyles.indicator}
                                />
                            </View>
                        </TouchableOpacity>

                        {expandedSection === letter && (
                            <View>
                                {groupedMaterials[letter].map(material => (
                                    <View style={materialStyles.materialContainer}>
                                        <Image
                                            source={ material.nombre.toLowerCase().includes("feather")
                                                ? require("../../../../assets/icons/feather.png")
                                                : require("../../../../assets/icons/materials.png")
                                            }
                                            style={materialStyles.menuIcon}
                                        />
                                        <Text
                                            key={String(material.id)}
                                            style={materialStyles.materialText}
                                        >
                                            {material.nombre.trim()}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
export default MaterialsScreen
