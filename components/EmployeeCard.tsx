import { FC } from "react";
import { Employe } from "../interfaces";
import { Button, Card, Chip, Text, Title, useTheme } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import { deleteEmployee } from "../services";

interface Props {
  employee: Employe;
  onRemove: (id: string) => void;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const EmployeeCard: FC<Props> = ({ employee, onRemove }) => {
  const theme = useTheme();
  const image = `https://recog-data-ia.s3.amazonaws.com/${employee.photo}`;

  const onDelete = (id: string) => {
    deleteEmployee(id).then((res) => {
      if (!res) {
        alert("Error al eliminar el empleado");
        return;
      }
      onRemove(res._id);
      alert("Empleado eliminado");
    });
  };

  return (
    <Card
      style={{
        backgroundColor: theme.colors.tertiary,
      }}
    >
      {/* <Card.Cover source={{ uri: image }} /> */}
      <Card.Content style={{ flexDirection: "row", gap: 10 }}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Title>
            {employee.firstName} {employee.lastName}
          </Title>
          <Text>{formatDate(employee.created_at)}</Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Chip mode="outlined" style={styles.chip}>
              {employee.type}
            </Chip>
          </View>
          <Button
            mode="outlined"
            textColor={theme.colors.error}
            style={[
              styles.button,
              {
                borderColor: theme.colors.error,
              },
            ]}
            onPress={() => onDelete(employee._id)}
          >
            Eliminar
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
  },
  image: {
    flex: 1,
    height: "100%",
    borderRadius: 15,
  },
  infoContainer: {
    flex: 1,
  },

  chip: {
    marginTop: 10,
    marginBottom: 20,
  },
});
