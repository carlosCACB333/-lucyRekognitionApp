import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export const Icon = ({
  size = 24,
  ...props
}: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) => {
  return <FontAwesome size={size} style={{ marginBottom: -3 }} {...props} />;
};
