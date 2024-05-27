import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView style={{ padding: 10, backgroundColor: "#ffffff", flex: 1 }}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "600",
          marginBottom: 30,
        }}
      >
        Uber
      </Text>
      <View style={{ paddingTop: "3rem" }}>
        <View style={styles.bookingContainer}>
          <View style={styles.booking}>
            <Image
              source={require("../assets/images/uber.png")}
              style={styles.image}
            />
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Get a ride</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)")}>
              <FontAwesome6 name="circle-arrow-right" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.booking}>
            <Image
              source={require("../assets/images/order.png")}
              style={styles.image}
            />
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Order Food</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)")}>
              <FontAwesome6 name="circle-arrow-right" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{ color: "gray", fontWeight: "600" }}>Go Again</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="work-outline" size={26} />
            <View>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Work</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "600",
                }}
              >
                1455 Market Street
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="clock-time-three-outline" size={26} />

            <View>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                1600 Michigan Street
              </Text>
              <Text style={{ fontSize: 12, color: "gray", fontWeight: "600" }}>
                Sun Fransico
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="work-outline" size={26} />
            <View>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Work</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  fontWeight: "600",
                }}
              >
                1455 Market Street
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="clock-time-three-outline" size={26} />

            <View>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                1600 Michigan Street
              </Text>
              <Text style={{ fontSize: 12, color: "gray", fontWeight: "600" }}>
                Sun Fransico
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  bookingContainer: {
    display: "flex",
    gap: 8,
    flexDirection: "row",
    marginBottom: 30,
  },
  booking: {
    backgroundColor: "#F6F6F6",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    flex: 1,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  descriptionContainer: {
    display: "flex",
    gap: 16,
  },
});
