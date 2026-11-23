import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { Task } from "../types/task";
import { taskApi } from "../services/api";
import { TaskItem } from "../components/TaskItem";
import { TaskForm } from "../components/TaskForm";
import { EmptyState } from "../components/EmptyState";

export const TaskListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao carregar tarefas";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const handleCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSubmit = async (data: { title: string; description: string }) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await taskApi.update(editingTask._id, data);
        Alert.alert("Sucesso", "Tarefa atualizada com sucesso");
      } else {
        await taskApi.create(data);
        Alert.alert("Sucesso", "Tarefa criada com sucesso");
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao salvar tarefa";
      Alert.alert("Erro", message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await taskApi.update(id, { completed });
      fetchTasks();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao atualizar tarefa";
      Alert.alert("Erro", message);
      fetchTasks(); // Revert on error
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskApi.delete(id);
      Alert.alert("Sucesso", "Tarefa excluída com sucesso");
      fetchTasks();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao excluir tarefa";
      Alert.alert("Erro", message);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appTitle}>TaskFlow</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.counter}>
            <Text style={styles.counterLabel}>
              {pendingCount} pendente{pendingCount !== 1 ? "s" : ""}
            </Text>
            <Text style={styles.counterLabel}>
              {completedCount} concluída{completedCount !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>
      </View>

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={<EmptyState />}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleCreate}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {showForm && (
        <TaskForm
          initialData={editingTask || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          loading={formLoading}
          title={editingTask ? "Editar Tarefa" : "Nova Tarefa"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2196F3",
  },
  counter: {
    alignItems: "flex-end",
  },
  counterLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    fontSize: 28,
    fontWeight: "300",
    color: "#fff",
    lineHeight: 32,
  },
});
