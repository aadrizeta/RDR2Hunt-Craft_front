import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import stylesItem from "../Items/Styles";
import Header from "../../components/Header";
import {AxiosError} from "axios";
import {MaterialRepositoryImpl} from "../../../data/repositories/MaterialRepository";
import {useCallback, useEffect, useState} from "react";
import {MaterialInterface} from "../../../domain/entitities/Material";
import materialStyles from "./MaterialStyles";
import MaterialModal from "../../modals/MaterialModal";
import { Checkbox } from '@futurejj/react-native-checkbox';
import colors from "../../../../assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MaterialsStackNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>

function MaterialsScreen () {
    const navigation = useNavigation<MaterialsStackNavigationProp>();
    const [legendaryMaterials, setLegendaryMaterials] = useState<MaterialInterface[]>([]);
    const [groupedMaterials, setGroupedMaterials] = useState<Record<string, MaterialInterface[]>>({});
    const materialRepo = new MaterialRepositoryImpl();
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<MaterialInterface | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [checkedMaterials, setCheckedMaterials] = useState<Record<number, boolean>>({});
    const toggleSection = (key: string) => {
        setExpandedSection(prev => (prev === key ? null : key));
    };

    const loadCheckedLegendaryMaterials = async () => {
        try {
            const stored = await AsyncStorage.getItem('checked_legendary_materials');
            const ids: number[] = stored ? JSON.parse(stored) : [];

            const checkedState: Record<number, boolean> = {};
            ids.forEach(id => {
                checkedState[id] = true;
            });

            setCheckedMaterials(checkedState);
            console.log("Legendary Materials IDs (AsyncStorage):", ids);

        } catch (e) {
            console.log("Error loading checked legendary materials", e);
        }
    };

    useEffect(() => {
        setExpandedSection(null);
        loadMaterials();
        loadCheckedLegendaryMaterials();
    }, []);
    useFocusEffect(
      useCallback(() => {
          setExpandedSection(null);
      }, [])
    );


    const loadMaterials = async () =>{
        try {
            const allMaterials = await materialRepo.getAllMaterials();

            const legendary = allMaterials.filter(m => m.nombre.trim().toLowerCase().startsWith("legendary"));
            const normalMaterials = allMaterials.filter(m => !m.nombre.trim().toLowerCase().startsWith("legendary"));

            const grouped = groupMaterialsByLetter(normalMaterials);

            setLegendaryMaterials(legendary);
            setGroupedMaterials(grouped);

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
    };
    const toggleCheckbox = async (materialId: number) => {
        const updatedChecked = { ...checkedMaterials, [materialId]: !checkedMaterials[materialId] };
        setCheckedMaterials(updatedChecked);

        try {
            let stored = await AsyncStorage.getItem('checked_legendary_materials');
            let ids = stored ? JSON.parse(stored) : [];

            if (updatedChecked[materialId]) {
                // Añadir ID si no existe
                if (!ids.includes(materialId)) {
                    ids.push(materialId);
                }
            } else {
                // Eliminar ID si se desmarca
                ids = ids.filter((id: number) => id !== materialId);
            }

            await AsyncStorage.setItem('checked_legendary_materials', JSON.stringify(ids));
        } catch (e) {
            console.log("Error updating AsyncStorage", e);
        }
    };


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
                                            style={[materialStyles.materialText, checkedMaterials[material.id] && { textDecorationLine: 'line-through' , color: 'gray'}]}
                                        >
                                            {material.nombre.trim()}
                                        </Text>
                                        <Checkbox
                                            status={checkedMaterials[material.id] ? 'checked' : 'unchecked'}
                                            onPress={() => toggleCheckbox(material.id)}
                                            color={colors.redRDR2}
                                            style={materialStyles.checkbox}
                                        />
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
                                        expandedSection === letter
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
                                    <TouchableOpacity
                                        key={material.id}
                                        onPress={() => {
                                            setSelectedMaterial(material);
                                            setModalVisible(true);
                                        }}
                                    >
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
                                    </TouchableOpacity>

                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
            <MaterialModal visible={modalVisible} onClose={() => setModalVisible(false)} material={selectedMaterial}/>
        </View>
    )
}
export default MaterialsScreen
