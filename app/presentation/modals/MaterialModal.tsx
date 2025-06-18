import {MaterialInterface} from "../../domain/entitities/Material";
import React, {useEffect, useMemo, useState} from "react";
import {ItemMaterialRepositoryImpl} from "../../data/repositories/ItemMaterialRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import stylesDetails from "../views/Items/ItemDetailsStyles";
import materialStyles from "../views/Materials/MaterialStyles";
import colors from "../../../assets/colors/colors";
import stylesItem from "../views/Items/Styles";
import {BlurView} from "expo-blur";

interface MaterialModalProps {
    visible: boolean;
    onClose: () => void;
    material: MaterialInterface | null;
}
const MaterialModal: React.FC<MaterialModalProps> = ({ visible, onClose, material }) => {
    const [materialCount, setMaterialCount] = useState<number>(0);
    const [requiredCount, setRequiredCount] = useState<number | null>(null);
    const [initialMaterialCount, setInitialMaterialCount] = useState<number>(0);

    const itemMaterialRepo = new ItemMaterialRepositoryImpl();
    const isChanged = materialCount !== initialMaterialCount;

    useEffect(() => {
        if (visible && material) {

            const loadData = async () => {
                try {
                    const stored = await AsyncStorage.getItem(`material_${material.id}`);
                    const parsed = stored ? JSON.parse(stored) : 0;
                    setMaterialCount(parsed);
                    setInitialMaterialCount(parsed); // Esto reinicia isChanged
                } catch (e) {
                    console.log("Error loading saved count", e);
                }
            };

            loadData();
            fetchRequiredCount(material.id);
        }
    }, [visible, material]);

    const fetchRequiredCount = async (materialId: number) => {
        try {
            const data = await itemMaterialRepo.getByMaterial(materialId);
            const total = data.reduce((sum, item) => sum + item.cantidad, 0);
            setRequiredCount(total)
        } catch (error) {
            console.log("Error loading required count:", error);
            setRequiredCount(null);
        }
    }
    const saveMaterialCount = async () => {
        if (materialCount === initialMaterialCount) return;
        if (material) {
            try {
                await AsyncStorage.setItem(`material_${material.id}`, materialCount.toString());
                console.log(`Guardado material_${material.id}: ${materialCount}`);
                onClose();
            } catch (e) {
                console.log("Error saving count", e);
            }
        }
    };
    if (!material) return null;

    const imageSource = material.nombre.toLowerCase().includes('feather')
        ? require('../../../assets/icons/feather.png')
        : require('../../../assets/icons/materials.png');

    return (
        <Modal visible={visible} transparent animationType={"fade"}>
            <View style={styles.modalOverlay}>
                <BlurView
                    intensity={100}
                    tint={"systemMaterialDark"}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <View style={styles.materialContainer}>
                        <Image style={materialStyles.menuIcon} source={imageSource}/>
                        <Text style={styles.materialText}>{material.nombre.trim()}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.textItalic}>You own: {initialMaterialCount}</Text>
                        {requiredCount !== null && (
                            <Text style={styles.textItalic}>Total Necessary: {requiredCount}</Text>
                        )}
                    </View>
                    <Text style={{ color: colors.textDefault }}>Tip: for better experience update this value once you sold your materials to the trapper</Text>

                    <View style={styles.addSection}>
                        <TouchableOpacity onPress={() => setMaterialCount(prev => Math.max(0, prev -1))}>
                            <Text style={styles.upDown}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.current}>{materialCount}</Text>
                        <TouchableOpacity onPress={() => setMaterialCount(prev => prev + 1)}>
                            <Text style={styles.upDown}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <TouchableOpacity
                            onPress={isChanged ? saveMaterialCount : undefined}
                            style={isChanged ? styles.saveButtonActive : styles.saveButtonInactive}>
                            <Image
                                source={isChanged ? require('../../../assets/icons/blueSave.png'): require('../../../assets/icons/save.png')}
                                style={materialStyles.menuIcon}
                            />
                            <Text style={isChanged ? styles.saveTextActive : styles.saveTextInactive}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Image source={require('../../../assets/icons/cancel.png')} style={materialStyles.menuIcon}/>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default MaterialModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    modalContent: {
        backgroundColor: colors.secondaryColor,
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    materialText: {
        fontFamily: 'UIFontDefault',
        color: colors.textDefault,
        fontSize: 18,
    },
    materialContainer: {
        paddingTop: 5,
        height: 35,
        borderBottomWidth: 1,
        alignContent: "center",
        flexDirection: "row",
        gap: 10,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        padding: 8,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.textDefault,
    },
    section: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    addSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal:80,
        alignItems: "center",
    },
    textItalic: {
        fontFamily: 'UIFontItalic',
        fontSize: 16,
        color: colors.textDefault,
    },
    saveButtonActive: {
        backgroundColor: colors.yellowRDR2,
        padding: 10,
        flexDirection: "row",
        gap: 8,
        borderRadius: 7,
        borderColor: colors.yellowRDR2,
    },
    saveButtonInactive: {
        backgroundColor: colors.inactive,
        padding: 10,
        flexDirection: "row",
        gap: 8,
        borderRadius: 7,
    },
    cancelButton: {
        backgroundColor: colors.inactive,
        padding: 10,
        flexDirection: "row",
        gap: 8,
        borderRadius: 7,
    },
    saveTextInactive: {
        fontFamily: 'UIFontDefault',
        color: colors.icons,
        fontSize: 16,
    },
    saveTextActive: {
        fontFamily: 'UIFontDefault',
        color: colors.blueSave,
        fontSize: 16,
    },
    text: {
        fontFamily: 'UIFontDefault',
        fontSize: 16,
        color: colors.textDefault,
    },
    current:{
        fontFamily: 'UIFontItalic',
        fontSize: 25,
        color: colors.textDefault,
    },
    upDown: {
        fontFamily: 'RDR2Font',
        color: colors.textDefault,
        fontSize:40,
    }
})
