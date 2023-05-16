import { useRef, useState, useEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Camera,
  CameraType,
  FaceDetectionResult,
  ImageType,
} from "expo-camera";
import { Icon } from "../../components/Icon";
import { Text } from "react-native-paper";
import { IFacePosition, IRecogData } from "../../interfaces";
import * as FaceDetector from "expo-face-detector";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { getSimilarity } from "../../services";
import { useIsFocused } from "@react-navigation/native";

export default function TabOneScreen() {
  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions({
    request: true,
  });
  const [recogData, setRecogData] = useState<IRecogData | null>(null);
  const [detected, setDetected] = useState(false);
  const faceValues = useSharedValue<IFacePosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rollAngle: 0,
  });
  const animatedStyles = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: 1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    borderWidth: 2,
    borderColor: "green",
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y },
      {
        rotate: `${faceValues.value.rollAngle}deg`,
      },
    ],
  }));

  const camera = useRef<Camera>(null);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const employe = recogData
    ? recogData?.employe.firstName + " " + recogData?.employe.lastName
    : "No se reconoce a nadie";
  const similarity = recogData?.Similarity
    ? parseFloat(recogData.Similarity.toString()).toFixed(2)
    : "";

  useEffect(() => {
    if (!detected) return;
    takePicture();
  }, [detected]);

  const takePicture = async () => {
    if (!camera.current) return;

    // take picture
    const dataImage = await camera.current.takePictureAsync({
      quality: 1,
      imageType: ImageType.png,
    });

    const formData = new FormData();
    const image = {
      uri: dataImage.uri,
      name: dataImage.uri.split("/").pop()!,
      type: Platform.OS === "ios" ? "image" : "image/png",
    };
    formData.append("image", image as any);
    console.log("haciendo la peticion");
    getSimilarity(formData).then((res) => setRecogData(res));
  };

  const handleFacesDetected = (result: FaceDetectionResult) => {
    if (result.faces.length) {
      const face = result.faces[0] as any;
      faceValues.value = {
        width: face.bounds.size.width,
        height: face.bounds.size.height,
        x: face.bounds.origin.x,
        y: face.bounds.origin.y,
        rollAngle: face.rollAngle,
      };
      setDetected(true);
    } else {
      setDetected(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
        <View style={styles.separator} />
      </View>
    );
  }

  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No tienes permisos para usar la cámara</Text>
        <View style={styles.separator} />
      </View>
    );

  return (
    <View style={styles.container}>
      {detected && <Animated.View style={animatedStyles} />}
      {isFocused && (
        <Camera
          onFacesDetected={handleFacesDetected}
          style={styles.camera}
          type={type}
          ref={camera}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        >
          <View style={styles.opContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Icon size={30} name="rotate-left" color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Icon size={30} name="circle" color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      <View style={styles.responseContainer}>
        <Text style={recogData ? styles.success : styles.error}>
          {recogData
            ? `Personal autorizado (${similarity}%)`
            : "Personal no autorizado"}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.text}>Nombre: {employe}</Text>
        <Text style={styles.text}>
          {recogData ? `Tipo de empleado: ${recogData?.employe.type}` : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
    backgroundColor: "white",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  opContainer: {
    flex: 1,
    flexDirection: "column",
    width: 50,
    alignSelf: "flex-end",
    marginVertical: 50,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  button: {
    marginVertical: 20,
  },
  responseContainer: {
    width: "70%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    bottom: 50,
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  error: {
    color: "red",
    fontSize: 20,
  },
  success: {
    color: "green",
    fontSize: 20,
  },
});
