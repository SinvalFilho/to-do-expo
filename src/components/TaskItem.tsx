import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editedText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={setEditedText}
            autoFocus
          />
        ) : (
          <Text style={[styles.taskText, task.completed && styles.completedText]}>
            {task.text}
          </Text>
        )}
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.editText}>{isEditing ? '✅' : '✏️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  editText: {
    fontSize: 20,
  },
  deleteText: {
    fontSize: 20,
  },
});

export default TaskItem;