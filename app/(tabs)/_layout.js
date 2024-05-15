import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <TabLabel
              label="Rides"
              icon={<Ionicons size={28} name="car-sport" />}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="lunch"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <TabLabel
              label="Eats"
              icon={<FontAwesome size={28} name="cutlery" />}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const TabLabel = ({ label, icon, focused }) => {
  const labelColor = focused ? "white" : "black";
  const iconColor = focused ? "white" : "black";
  const backgroundColor = focused ? "black" : "transparent";

  return (
    <View style={[styles.tabLabel, { backgroundColor }]}>
      {React.cloneElement(icon, { color: iconColor })}
      <Text style={[styles.tabLabelText, { color: labelColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 30,
    marginTop: 3,
    marginBottom: 3,
  },
  tabLabelText: {
    marginLeft: 8,
    marginRight: 5,
  },
});
