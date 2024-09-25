import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  });

  // Item renderer for FlatList
  const renderItem = ({ item }) => (
    <View style={item.completed ? styles.completedItem : styles.todosItem}>
      <Text style={item.completed ? styles.completedTitle : styles.title}>
        {item.title}
      </Text>
      <Text style={item.completed ? styles.complete : styles.incomplete}>
        {item.completed ? "Completed" : "Not Completed"}
      </Text>
    </View>
  );

  // Key extractor for FlatList
  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  todosItem: {
    padding: 13,
    borderBottomWidth: 2,
    borderBottomColor: "#99f",
    backgroundColor: "#ddf",
  },
  completedItem: {
    padding: 13,
    borderBottomWidth: 2,
    borderBottomColor: "#888",
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 20,
    color: "#333",
  },
  completedTitle: {
    fontSize: 20,
    color: "#555",
    textDecorationLine: "line-through",
  },
  complete: {
    paddingTop: 5,
    color: "#559",
  },
  incomplete: {
    paddingTop: 5,
    color: "#844",
  },
});
