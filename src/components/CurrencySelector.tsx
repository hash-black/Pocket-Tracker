import { Pressable, StyleSheet, Text } from "react-native";

type CurrencySelectorProps = {
  currency: string;
  onChangeCurrency: (currency: string) => void;
};

export default function CurrencySelector({
  currency,
  onChangeCurrency,
}: CurrencySelectorProps) {
  return (
    <>
      <Text style={styles.inputLabel}>Currency</Text>

      <Pressable
        style={styles.currencyButton}
        onPress={() => onChangeCurrency(currency === "PHP" ? "USD" : "PHP")}
      >
        <Text style={styles.currencyButtonText}>
          {currency === "PHP" ? "₱ Philippine Peso" : "$ US Dollar"}
        </Text>
      </Pressable>
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

  currencyButton: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 12,
  },

  currencyButtonText: {
    fontSize: 16,
  },
});
