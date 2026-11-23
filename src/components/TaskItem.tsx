import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from "react-native";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableOpacity onPress={() => onToggle(task._id, !task.completed)} style={styles.checkboxArea}>
          <View
            style={[
              styles.checkbox,
              task.completed && styles.checkboxChecked,
            ]}
          >
            {task.completed && <View style={styles.checkmark} />}
          </View>
        </TouchableOpacity>

        <View style={styles.textContent}>
          <Text
            style={[
              styles.title,
              task.completed && styles.titleCompleted,
            ]}
          >
            {task.title}
          </Text>
          {task.description && (
            <Text
              style={[
                styles.description,
                task.completed && styles.descriptionCompleted,
              ]}
            >
              {task.description}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Excluir tarefa",
              "Tem certeza que deseja excluir esta tarefa?",
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => onDelete(task._id) },
              ]
            );
          }}
          style={[styles.actionButton, styles.actionButtonDelete]}
        >
          <Text style={styles.actionButtonTextDelete}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  checkboxArea: {
    marginRight: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  descriptionCompleted: {
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#e3f2fd",
  },
  actionButtonDelete: {
    backgroundColor: "#ffebee",
  },
  actionButtonText: {
    color: "#2196F3",
    fontWeight: "600",
    fontSize: 14,
  },
  actionButtonTextDelete: {
    color: "#f44336",
  },
});
