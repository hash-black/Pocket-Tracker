import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const INITIAL_TRANSACTIONS = [
  { id: '1', title: 'Salary', amount: 3000, type: 'income', category: 'Income', date: '2026-10-01' },
  { id: '2', title: 'Groceries', amount: 150, type: 'expense', category: 'Food', date: '2026-10-02' },
  { id: '3', title: 'Electric Bill', amount: 90, type: 'expense', category: 'Utilities', date: '2026-10-03' },
];

export default function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('General');

  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, item) => {
        if (item.type === 'income') {
          acc.income += item.amount;
          acc.balance += item.amount;
        } else {
          acc.expense += item.amount;
          acc.balance -= item.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (filterType === 'all') return transactions;
    return transactions.filter((t) => t.type === filterType);
  }, [transactions, filterType]);

  const handleAddTransaction = () => {
    if (!title.trim() || !amount.trim() || isNaN(Number(amount))) {
      Alert.alert('Invalid Input', 'Please enter a valid title and numeric amount.');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      category: category.trim() || 'General',
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    resetForm();
    setModalVisible(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('General');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>PocketTracker</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text>Balance: ${totals.balance.toFixed(2)}</Text>
        <Text>Income: ${totals.income.toFixed(2)}</Text>
        <Text>Expenses: ${totals.expense.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Pressable onPress={() => setFilterType('all')}>
          <Text style={filterType === 'all' ? styles.boldText : styles.normalText}>All</Text>
        </Pressable>
        <Pressable onPress={() => setFilterType('income')}>
          <Text style={filterType === 'income' ? styles.boldText : styles.normalText}>Income</Text>
        </Pressable>
        <Pressable onPress={() => setFilterType('expense')}>
          <Text style={filterType === 'expense' ? styles.boldText : styles.normalText}>Expenses</Text>
        </Pressable>
      </View>

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.boldText}>+ Add Transaction</Text>
      </Pressable>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.boldText}>{item.title}</Text>
              <Text>{item.category} | {item.date}</Text>
            </View>
            <View style={styles.alignRight}>
              <Text style={styles.boldText}>
                {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
              </Text>
              <Pressable onPress={() => handleDeleteTransaction(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.headerTitle}>Add New Transaction</Text>

          <TextInput
            style={styles.input}
            placeholder="Title (e.g. Coffee)"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount (e.g. 4.50)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Category (e.g. Food, Salary)"
            value={category}
            onChangeText={setCategory}
          />

          <View style={styles.row}>
            <Pressable onPress={() => setType('expense')}>
              <Text style={type === 'expense' ? styles.boldText : styles.normalText}>Expense</Text>
            </Pressable>
            <Pressable onPress={() => setType('income')}>
              <Text style={type === 'income' ? styles.boldText : styles.normalText}>Income</Text>
            </Pressable>
          </View>

          <Pressable style={styles.actionButton} onPress={handleAddTransaction}>
            <Text style={styles.boldText}>Save Transaction</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={() => setModalVisible(false)}>
            <Text>Cancel</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
    opacity: 0.6,
  },
  deleteText: {
    marginTop: 4,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 4,
  },
  addButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
  },
});