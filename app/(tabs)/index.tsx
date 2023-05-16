import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { StyleSheet } from "react-native";
import { Employe } from "../../interfaces";
import { EmployeeCard } from "../../components/EmployeeCard";
import { useTheme } from "react-native-paper";
import { fetchEmployees } from "../../services";

export default function TabTwoScreen() {
  const [employees, setEmployees] = useState<Employe[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  useEffect(() => {
    fetchEmployees().then((res) => {
      setEmployees(res);
    });
  }, []);

  const onRemove = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <FlatList
      style={styles.list}
      data={employees}
      renderItem={({ item }) => (
        <EmployeeCard employee={item} onRemove={onRemove} />
      )}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={[colors.primary]}
          progressBackgroundColor={colors.background}
          onRefresh={() => {
            setRefreshing(true);
            fetchEmployees().then((res) => {
              setEmployees(res);
              setRefreshing(false);
            });
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  input: {
    width: "100%",
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
});
