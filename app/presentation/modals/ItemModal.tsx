import {ItemInterface, ItemMaterialSimpleInterface} from "../../domain/entitities/Item";
import {MaterialInterface} from "../../domain/entitities/Material";
import React from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../../../assets/colors/colors";
import {BlurView} from "expo-blur";
import {ItemMaterialInterface} from "../../domain/entitities/ItemMaterial";

interface ItemModalProps {
    visible: boolean;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
    materiales: ItemMaterialSimpleInterface[];
    item: ItemInterface;
}

const ItemModal: React.FC<ItemModalProps> = ({ visible, onClose, materiales, onCancel, onConfirm, item }) => {
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

                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{item.nombre.trim()}</Text>
                    </View>
                    <Text style={styles.confirmText}>Confirm craft</Text>
                    <View>
                        {materiales.map(mat => (
                            <Text key={mat.materialId} style={styles.materialText}>
                                • {mat.materialNombre} x{mat.cantidad}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.saveButtonActive}
                            onPress={onConfirm}
                        >
                            <Text style={styles.saveTextActive}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onCancel}
                        >
                            <Text style={styles.closeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    )
}
export default ItemModal;
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    modalContent: {
        width: "80%",
        backgroundColor: colors.secondaryColor,
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        padding: 8,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 15,
        fontFamily: 'UIFontDefault',
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
    saveTextActive: {
        fontFamily: 'UIFontDefault',
        color: colors.blueSave,
        fontSize: 16,
    },
    nameContainer: {
        paddingTop: 5,
        height: 35,
        borderBottomWidth: 1,
        alignContent: "center",
        flexDirection: "row",
        gap: 10,
    },
    nameText: {
        fontFamily: 'UIFontDefault',
        color: colors.textDefault,
        fontSize: 18,
    },
    section: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    cancelButton: {
        backgroundColor: colors.inactive,
        padding: 10,
        flexDirection: "row",
        gap: 8,
        borderRadius: 7,
    },
    confirmText: {
        fontFamily: 'UIFontDefault',
        fontSize: 18,
        color: colors.textDefault,
        textAlign: "center",
        paddingVertical: 15,
    },
    materialText: {
        fontFamily: 'UIFontItalic',
        color: colors.textDefault,
        fontSize: 15,
        marginVertical:5,
        paddingHorizontal: 10,
    },
})
