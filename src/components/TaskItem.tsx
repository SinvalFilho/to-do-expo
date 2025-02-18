import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  isDarkMode: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editedText.trim()) {
      onEdit(task.id, editedText);
    }
    setIsEditing(prev => !prev);
  };

  const textStyle = [
    styles.taskText,
    isDarkMode ? themes.dark.text : themes.light.text,
    task.completed && styles.completedText,
  ];

  const toggleIconName = task.completed ? 'check-circle' : 'circle';
  const toggleIconColor = task.completed ? '#4caf50' : isDarkMode ? '#fff' : '#000';

  return (
    <Animated.View style={[styles.taskContainer, isDarkMode && themes.dark.taskContainer]}>
      <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.toggleButton}>
        <Feather name={toggleIconName} size={24} color={toggleIconColor} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        {isEditing ? (
          <TextInput
            style={[styles.editInput, isDarkMode ? themes.dark.input : themes.light.input]}
            value={editedText}
            onChangeText={setEditedText}
            autoFocus
            onSubmitEditing={handleEdit}
            returnKeyType="done"
          />
        ) : (
          <Text style={textStyle}>{task.text}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Feather name={isEditing ? 'check' : 'edit'} size={22} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButton}>
          <Feather name="trash" size={22} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const themes = {
  dark: {
    text: { color: '#fff' },
    input: {
      backgroundColor: '#2c2c2c',
      borderColor: '#555',
      color: '#fff',
    },
    taskContainer: { 
      backgroundColor: '#1e1e1e',
      borderBottomColor: '#444',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
  },
  light: {
    text: { color: '#000' },
    input: {
      backgroundColor: '#f5f5f5',
      borderColor: '#ccc',
      color: '#000',
    },
    taskContainer: { 
      backgroundColor: '#fff',
      borderBottomColor: '#ccc',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
    },
  },
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  toggleButton: {
    padding: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editInput: {
    fontSize: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

export default TaskItem;