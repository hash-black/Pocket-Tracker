import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const params = useLocalSearchParams();
  const [expenses, setExpenses] = useState([
    {
      name: "Lunch",
      amount: 100,
    },
    {
      name: "Fare",
      amount: 40,
    },
    {
      name: "School Supplies",
      amount: 250,
    },
  ]);
  useEffect(() => {
    if (params.name && params.amount) {
      setExpenses((currentExpenses) => [
        ...currentExpenses,
        {
          name: params.name as string,
          amount: Number(params.amount),
        },
      ]);
    }
  }, [params.name, params.amount]);

  const deleteExpense = (indexToDelete: number) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((_, index) => index !== indexToDelete),
    );
  };
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const totalIncome = 1000;
  const balance = totalIncome - totalExpenses;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PocketTrack</Text>

      <Text style={styles.subtitle}>Know where your money goes.</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balance}>₱{balance}.00</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={styles.income}>₱{totalIncome}.00</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Expenses</Text>
          <Text style={styles.expense}>₱{totalExpenses}</Text>
        </View>
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add-expense")}
      >
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <ScrollView style={styles.transactionList}>
        {expenses.map((expense, index) => (
          <View style={styles.transaction} key={index}>
            <View>
              <Text style={styles.transactionName}>{expense.name}</Text>

              <Pressable onPress={() => deleteExpense(index)}>
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>

            <Text style={styles.transactionAmount}>-₱{expense.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  transactionList: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },

  balanceCard: {
    marginTop: 25,
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#eeeeee",
  },

  balanceLabel: {
    fontSize: 14,
  },

  balance: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },

  summaryContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  summaryCard: {
    flex: 1,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#eeeeee",
  },

  summaryLabel: {
    fontSize: 14,
  },

  income: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  expense: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },

  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },

  transactionName: {
    fontSize: 16,
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#222222",
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "bold",
  },
});
