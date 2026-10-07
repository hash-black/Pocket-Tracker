import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type Expense = {
  name: string;
  amount: number;
  date: string;
};

export default function History() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem("expenses");

        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses));
        }
      } catch (error) {
        console.log("Error loading history:", error);
      }
    };

    loadExpenses();
  }, []);

  const groupedExpenses: { [date: string]: Expense[] } = {};

  expenses.forEach((expense) => {
    if (!groupedExpenses[expense.date]) {
      groupedExpenses[expense.date] = [];
    }

    groupedExpenses[expense.date].push(expense);
  });

  const dates = Object.keys(groupedExpenses).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>History</Text>

      {dates.length === 0 ? (
        <Text style={styles.emptyText}>No expenses recorded yet.</Text>
      ) : (
        dates.map((date) => {
          const dailyTotal = groupedExpenses[date].reduce(
            (total, expense) => total + expense.amount,
            0,
          );

          return (
            <View key={date} style={styles.dateSection}>
              <View style={styles.dateHeader}>
                <Text style={styles.dateTitle}>{date}</Text>

                <Text style={styles.dailyTotal}>₱{dailyTotal.toFixed(2)}</Text>
              </View>

              {groupedExpenses[date].map((expense, index) => (
                <View
                  style={styles.expenseRow}
                  key={`${expense.name}-${index}`}
                >
                  <Text style={styles.expenseName}>{expense.name}</Text>

                  <Text style={styles.expenseAmount}>
                    -₱{expense.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          );
        })
      )}

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </ScrollView>
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
    marginBottom: 25,
  },

  dateSection: {
    marginBottom: 25,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#eeeeee",
  },

  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  dateTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },

  dailyTotal: {
    fontSize: 17,
    fontWeight: "bold",
  },

  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
  },

  expenseName: {
    fontSize: 16,
  },

  expenseAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666666",
  },

  backButton: {
    marginTop: 10,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#222222",
    alignItems: "center",
  },

  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
