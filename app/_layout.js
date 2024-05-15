import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image, SafeAreaView, Text, View } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => {
          return (
            <SafeAreaView style={{ marginTop: 50 }}>
              <View
                style={{
                  height: 200,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={require("../assets/images/cars.jpg")}
                  style={{ height: 130, width: 130, borderRadius: 65 }}
                />
                <Text
                  style={{
                    color: "#111",
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: "bold",
                  }}
                >
                  Ghulam Mustafa
                </Text>
                <Text style={{ color: "#111", fontSize: 16, marginBottom: 10 }}>
                  Frontend Developer
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#F6F6F6",
          },
          drawerActiveBackgroundColor: "#000",
          drawerActiveTintColor: "#fff",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Rides",
            title: "Rides",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Setting"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          options={{
            drawerLabel: "Contact",
            title: "Contact",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="contacts" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Support"
          options={{
            drawerLabel: "Support",
            title: "Support",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-check-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
