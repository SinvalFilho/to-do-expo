import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';
import { saveTasks, loadTasks } from '../utils/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen: React.FC = () => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    (async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    })();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks(prev => [...prev, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };

  return (
    <View style={[styles.container, isDarkMode ? themes.dark.background : themes.light.background]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode ? themes.dark.text : themes.light.text]}>
          Minhas Tarefas
        </Text>
        <View style={styles.switchContainer}>
          <Icon
            name={isDarkMode ? 'weather-night' : 'weather-sunny'}
            size={24}
            color={isDarkMode ? themes.dark.text.color : themes.light.text.color}
          />
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(prev => !prev)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, isDarkMode ? themes.dark.input : themes.light.input]}
          placeholder="Adicionar tarefa"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="plus-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
            isDarkMode={isDarkMode}
          />
        )}
      />
    </View>
  );
};

const themes = {
  dark: {
    background: { backgroundColor: '#121212' },
    text: { color: '#fff' },
    input: {
      backgroundColor: '#1e1e1e',
      borderColor: '#333',
      color: '#fff',
    },
  },
  light: {
    background: { backgroundColor: '#f5f5f5' },
    text: { color: '#000' },
    input: {
      backgroundColor: '#fff',
      borderColor: '#ccc',
      color: '#000',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#6200ee',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
