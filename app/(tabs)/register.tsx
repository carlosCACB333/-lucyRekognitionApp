import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { saveEmployee } from "../../services";

export default function TabTwoScreen() {
  const [uri, setUri] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("Empleado");

  const isValid =
    firstName.trim() && lastName.trim() && type.trim() && uri?.trim();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.canceled) {
      setUri(null);
      return;
    }
    setUri(result.assets[0].uri);
  };

  const uploadImage = async () => {
    if (!isValid) {
      alert("Faltan datos");
      return;
    }

    const formData = new FormData();
    const image = {
      uri,
      name: `${firstName.trim()}-${lastName.trim()}.png`,
      type: "image/png",
    };
    formData.append("image", image as any);
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("type", type.trim());

    saveEmployee(formData).then((res) => {
      if (!res) {
        alert("Error al guardar el empleado");
        return;
      }
      setFirstName("");
      setLastName("");
      setType("");
      setUri(null);
      alert("Empleado guardado");
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Datos del empleado</Text>
          <View style={styles.separator} />

          <TextInput
            label="Nombre"
            style={styles.input}
            mode="outlined"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            label="Apellido"
            style={styles.input}
            mode="outlined"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            label="Cargo"
            style={styles.input}
            mode="outlined"
            value={type}
            onChangeText={setType}
          />
          <Button style={styles.button} mode="outlined" onPress={pickImage}>
            Seleccionar imagen ({uri ? "1" : "0"} seleccionada)
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={uploadImage}
            disabled={!isValid}
          >
            Guardar datos
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    // width: 400,
    marginVertical: 5,
    alignSelf: "stretch",
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
});
