import { StyleSheet, Text, TextInput, View } from "react-native";

type DailyLimitProps = {
  dailyLimit: number;
  setDailyLimit: (value: number) => void;
  todaySpent: number;
  remainingDailyLimit: number;
  currency: string;
  convertAmount: (amount: number) => number;
};

export default function DailyLimit({
  dailyLimit,
  setDailyLimit,
  todaySpent,
  remainingDailyLimit,
  currency,
  convertAmount,
}: DailyLimitProps) {
  return (
    <>
      <Text style={styles.inputLabel}>Daily Spending Limit</Text>

      <TextInput
        style={styles.moneyInput}
        keyboardType="numeric"
        placeholder="₱0.00"
        value={String(dailyLimit)}
        onChangeText={(text) => setDailyLimit(Number(text) || 0)}
      />

      <View style={styles.dailyLimitCard}>
        <Text style={styles.dailyLimitTitle}>Daily Spending</Text>

        <Text style={styles.dailyLimitText}>
          Limit: {currency === "PHP" ? "₱" : "$"}
          {convertAmount(dailyLimit).toFixed(2)}
        </Text>

        <Text style={styles.dailyLimitText}>
          Spent: {currency === "PHP" ? "₱" : "$"}
          {convertAmount(todaySpent).toFixed(2)}
        </Text>

        <Text style={styles.dailyLimitText}>
          Remaining: {currency === "PHP" ? "₱" : "$"}
          {convertAmount(remainingDailyLimit).toFixed(2)}
        </Text>

        {dailyLimit > 0 && todaySpent > dailyLimit && (
          <Text style={styles.warningText}>
            ⚠️ Daily spending limit exceeded!
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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

  dailyLimitCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#eeeeee",
  },

  dailyLimitTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  dailyLimitText: {
    fontSize: 15,
    marginTop: 5,
  },

  warningText: {
    marginTop: 10,
    fontWeight: "bold",
  },
});
