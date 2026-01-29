import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function App(): JSX.Element {
  const [display, setDisplay] = useState<string>("");

  const append = (value: string): void => {
    setDisplay((prev) => prev + value);
  };

  const clear = (): void => {
    setDisplay("");
  };

  const calculate = (): void => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const scientific = (operation: string): void => {
    try {
      const value = parseFloat(display);

      let result: number;

      switch (operation) {
        case "sin":
          result = Math.sin((value * Math.PI) / 180);
          break;
        case "cos":
          result = Math.cos((value * Math.PI) / 180);
          break;
        case "tan":
          result = Math.tan((value * Math.PI) / 180);
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        case "square":
          result = Math.pow(value, 2);
          break;
        case "log":
          result = Math.log10(value);
          break;
        case "ln":
          result = Math.log(value);
          break;
        default:
          return;
      }

      setDisplay(result.toString());
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display || "0"}</Text>

      <ScrollView>
        {/* Científica */}
        <View style={styles.row}>
          <CalcButton label="sin" onPress={() => scientific("sin")} />
          <CalcButton label="cos" onPress={() => scientific("cos")} />
          <CalcButton label="tan" onPress={() => scientific("tan")} />
          <CalcButton label="√" onPress={() => scientific("sqrt")} />
        </View>

        <View style={styles.row}>
          <CalcButton label="x²" onPress={() => scientific("square")} />
          <CalcButton label="log" onPress={() => scientific("log")} />
          <CalcButton label="ln" onPress={() => scientific("ln")} />
          <CalcButton label="π" onPress={() => append(Math.PI.toString())} />
        </View>

        {/* Básica */}
        <View style={styles.row}>
          <CalcButton label="7" onPress={() => append("7")} />
          <CalcButton label="8" onPress={() => append("8")} />
          <CalcButton label="9" onPress={() => append("9")} />
          <CalcButton label="/" onPress={() => append("/")} />
        </View>

        <View style={styles.row}>
          <CalcButton label="4" onPress={() => append("4")} />
          <CalcButton label="5" onPress={() => append("5")} />
          <CalcButton label="6" onPress={() => append("6")} />
          <CalcButton label="*" onPress={() => append("*")} />
        </View>

        <View style={styles.row}>
          <CalcButton label="1" onPress={() => append("1")} />
          <CalcButton label="2" onPress={() => append("2")} />
          <CalcButton label="3" onPress={() => append("3")} />
          <CalcButton label="-" onPress={() => append("-")} />
        </View>

        <View style={styles.row}>
          <CalcButton label="0" onPress={() => append("0")} />
          <CalcButton label="C" onPress={clear} />
          <CalcButton label="=" onPress={calculate} />
          <CalcButton label="+" onPress={() => append("+")} />
        </View>
      </ScrollView>
    </View>
  );
}

interface ButtonProps {
  label: string;
  onPress: () => void;
}

function CalcButton({ label, onPress }: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  display: {
    color: "#00ffcc",
    fontSize: 42,
    textAlign: "right",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#1f1f1f",
    flex: 1,
    margin: 5,
    height: 70,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});
