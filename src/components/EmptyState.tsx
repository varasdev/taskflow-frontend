import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message = "Nenhuma tarefa cadastrada" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📝</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.hint}>Toque no botão + para adicionar sua primeira tarefa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
