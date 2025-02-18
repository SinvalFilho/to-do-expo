import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';

const TASKS_KEY = '@tasks';

export const saveTasks = async (tasks: Task[]) => {
  try {
    const jsonTasks = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonTasks);
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const jsonTasks = await AsyncStorage.getItem(TASKS_KEY);
    return jsonTasks ? JSON.parse(jsonTasks) : [];
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    return [];
  }
};