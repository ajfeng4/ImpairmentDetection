import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import GameHeader from "@/components/GameHeader";
import { randomizeIcons } from "@/logic/Randomizer";

export default function MemoryCheckGame() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [iconsGrid, setIconsGrid] = useState(randomizeIcons());

    const toggleSelection = (item) => {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const handleSubmit = () => {
        setIconsGrid(randomizeIcons());
        setSelectedItems([]);
    };

    return (
        <View style={styles.screenContainer}>
            <GameHeader />

            <View style={styles.carouselBox}>
                <Text style={styles.carouselText}>Identify the items correctly!</Text>
                <View style={styles.iconGrid}>
                    {iconsGrid.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((icon, colIndex) => {
                                const index = rowIndex * 3 + colIndex;
                                return (
                                    <TouchableOpacity key={index} onPress={() => toggleSelection(index)} style={styles.iconWrapper}>
                                        <FontAwesome5
                                            name={icon}
                                            size={50}
                                            color={selectedItems.includes(index) ? "white" : "black"}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
                {["1", "2", "3", "4"].map((num) => (
                    <View key={num} style={styles.progressItem}>
                        <Text style={styles.progressText}>{num}</Text>
                        <Text style={styles.progressLabel}>Question {num}</Text>
                        <View style={styles.progressStatus}>
                            <Text style={styles.statusText}>In Progress</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
    },
    carouselBox: {
        backgroundColor: "#28C76F",
        width: "100%",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    carouselText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    iconGrid: {
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    iconWrapper: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#fff",
        width: "80%",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 20,
    },
    submitButtonText: {
        color: "#28C76F",
        fontSize: 16,
        fontWeight: "bold",
    },
    progressContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 20,
    },
    progressItem: {
        alignItems: "center",
        width: 80,
    },
    progressText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    progressLabel: {
        fontSize: 12,
        color: "gray",
        textAlign: "center",
    },
    progressStatus: {
        backgroundColor: "#2C6BED",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 5,
    },
    statusText: {
        color: "white",
        fontSize: 10,
        textAlign: "center",
    },
});