import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import CurrencySelector from "@/components/CurrencySelector";
import DailyLimit from "@/components/DailyLimit";

export default function Index() {
  const params = useLocalSearchParams();

  const [expenses, setExpenses] = useState<
    { name: string; amount: number; date: string }[]
  >([]);

  const [dailyLimit, setDailyLimit] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [savings, setSavings] = useState(0);
  const [currency, setCurrency] = useState("PHP");

  useEffect(() => {
    if (params.name && params.amount) {
      setExpenses((currentExpenses) => [
        ...currentExpenses,
        {
          name: params.name as string,
          amount: Number(params.amount),
          date: new Date().toDateString(),
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

  const todaySpent = totalExpenses;

  const remainingDailyLimit = Math.max(0, dailyLimit - todaySpent);

  const exchangeRate = 0.0159162;

  const convertAmount = (amount: number) => {
    if (currency === "USD") {
      return amount * exchangeRate;
    }

    return amount;
  };

  const balanceAfterSavings = currentBalance - savings - totalExpenses;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>PocketTrack</Text>

      <Text style={styles.subtitle}>Know where your money goes.</Text>

      {/* Current Balance */}

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>

        <Text style={styles.balance}>
          {currency === "PHP" ? "₱" : "$"}
          {convertAmount(balanceAfterSavings).toFixed(2)}
        </Text>
      </View>

      {/* Summary */}

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Savings</Text>

          <Text style={styles.income}>
            {currency === "PHP" ? "₱" : "$"}
            {convertAmount(savings).toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Expenses</Text>

          <Text style={styles.expense}>
            {currency === "PHP" ? "₱" : "$"}
            {convertAmount(totalExpenses).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Currency Selector */}

      <CurrencySelector currency={currency} onChangeCurrency={setCurrency} />

      {/* Current Money */}

      <Text style={styles.inputLabel}>Current Money</Text>

      <TextInput
        style={styles.moneyInput}
        keyboardType="numeric"
        value={String(currentBalance)}
        onChangeText={(text) => setCurrentBalance(Number(text) || 0)}
      />

      {/* Savings */}

      <Text style={styles.inputLabel}>Savings Goal</Text>

      <TextInput
        style={styles.moneyInput}
        keyboardType="numeric"
        value={String(savings)}
        onChangeText={(text) => setSavings(Number(text) || 0)}
      />

      {/* Daily Limit Component */}

      <DailyLimit
        dailyLimit={dailyLimit}
        setDailyLimit={setDailyLimit}
        todaySpent={todaySpent}
        remainingDailyLimit={remainingDailyLimit}
        currency={currency}
        convertAmount={convertAmount}
      />

      {/* Add Expense */}

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add-expense")}
      >
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </Pressable>

      {/* Recent Transactions */}

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <View style={styles.transactionList}>
        {expenses.length === 0 ? (
          <Text style={styles.emptyText}>No transactions yet.</Text>
        ) : (
          expenses.map((expense, index) => (
            <View style={styles.transaction} key={index}>
              <View>
                <Text style={styles.transactionName}>{expense.name}</Text>

                <Pressable onPress={() => deleteExpense(index)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>

              <Text style={styles.transactionAmount}>
                -{currency === "PHP" ? "₱" : "$"}
                {convertAmount(expense.amount).toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </View>
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
    marginTop: 7,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },

  moneyInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },

  transactionList: {
    marginBottom: 20,
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

  deleteText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
