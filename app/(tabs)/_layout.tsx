import { Tabs } from "expo-router";
import { Icon } from "../../components/Icon";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.tertiary,
        },
      }}
    >
      <Tabs.Screen
        name="rekognition"
        options={{
          title: "Reconomiento",
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="video-camera" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Empleados",
          tabBarIcon: ({ color }) => <Icon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Registro",
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="user-plus" color={color} />,
        }}
      />
    </Tabs>
  );
}
