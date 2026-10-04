import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddExpense() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Lunch"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Amount</Text>

      <TextInput
        style={styles.input}
        placeholder="₱0.00"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Pressable
        style={styles.saveButton}
        onPress={() => {
          if (!description || !amount) {
            alert("Please fill in all fields.");
            return;
          }

          router.replace({
            pathname: "/",
            params: {
              name: description,
              amount: amount,
            },
          });
        }}
      >
        <Text style={styles.saveButtonText}>Save Expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },

  saveButton: {
    marginTop: 30,
    backgroundColor: "#222222",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
