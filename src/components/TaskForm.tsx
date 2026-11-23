import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from "react-native";
import { TaskFormData } from "../types/task";

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  title: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  title,
}) => {
  const [formData, setFormData] = React.useState<TaskFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      Alert.alert("Erro", "O título é obrigatório");
      return;
    }
    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>{title}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(title) => setFormData({ ...formData, title })}
          placeholder="Digite o título da tarefa"
          autoCapitalize="sentences"
          returnKeyType="next"
          autoFocus
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={formData.description}
          onChangeText={(description) => setFormData({ ...formData, description })}
          placeholder="Descrição opcional"
          autoCapitalize="sentences"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          returnKeyType="done"
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.buttonCancel]}
          onPress={onCancel}
          disabled={loading}
        >
          <Text style={styles.buttonTextCancel}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSubmit]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonTextSubmit}>
            {loading ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputMultiline: {
    minHeight: 100,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  buttonSubmit: {
    backgroundColor: "#2196F3",
  },
  buttonTextCancel: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonTextSubmit: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
