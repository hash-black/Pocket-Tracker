import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PocketTrack</Text>

      <Text style={styles.subtitle}>Know where your money goes.</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balance}>₱0,450.00</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={styles.income}>₱0,000</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Expenses</Text>
          <Text style={styles.expense}>₱0,550</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <View style={styles.transaction}>
        <Text style={styles.transactionName}>🍔 Lunch</Text>
        <Text style={styles.transactionAmount}>-₱100</Text>
      </View>

      <View style={styles.transaction}>
        <Text style={styles.transactionName}>🚌 Fare</Text>
        <Text style={styles.transactionAmount}>-₱40</Text>
      </View>

      <View style={styles.transaction}>
        <Text style={styles.transactionName}>📚 School Supplies</Text>
        <Text style={styles.transactionAmount}>-₱250</Text>
      </View>
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
});
