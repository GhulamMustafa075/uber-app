import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { getDistance } from "geolib";

const Pickup = () => {
  const [location, setLocation] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);
  const [startPointData, setStartPointData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const { startPoint, destination, focusedIcon } = useLocalSearchParams();
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (startPoint && destination) {
      const start = JSON.parse(startPoint);
      const end = JSON.parse(destination);
      setStartPointData(start);
      setDestinationPoint(end);
      calculateDistance(start.geocodes.main, end.geocodes.main);
    }
  }, [startPoint, destination]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (mapRef.current && startPoint && destination) {
        const start = JSON.parse(startPoint);
        const end = JSON.parse(destination);
        mapRef.current.fitToCoordinates(
          [
            {
              latitude: start.geocodes.main.latitude,
              longitude: start.geocodes.main.longitude,
            },
            {
              latitude: end.geocodes.main.latitude,
              longitude: end.geocodes.main.longitude,
            },
          ],
          {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          }
        );
      }
    })();
  }, [startPoint, destination]);

  const calculateDistance = (start, end) => {
    const distanceInMeters = getDistance(
      { latitude: start.latitude, longitude: start.longitude },
      { latitude: end.latitude, longitude: end.longitude }
    );
    setDistance(distanceInMeters);
  };

  const resetMarkers = () => {
    setStartPointData(null);
    setDestinationPoint(null);
    setDistance(null);
    router.push("/(tabs)");
  };

  const getIcon = () => {
    switch (focusedIcon) {
      case "motorbike":
        return require("../../assets/images/desBike.png");
      case "rickshaw":
        return require("../../assets/images/desRickshaw.png");
      case "car-side":
        return require("../../assets/images/desCar.png");
      default:
        return require("../../assets/images/desBike.png");
    }
  };

  const CustomMarker = ({ coordinate, title, icon }) => {
    return (
      <Marker coordinate={coordinate} title={title}>
        <Image
          source={icon}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </Marker>
    );
  };

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return (
      <ActivityIndicator size={"large"} color={"#000"} style={styles.loading} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {!startPointData && !destinationPoint && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
          />
        )}
        {startPointData && (
          <CustomMarker
            coordinate={{
              latitude: startPointData.geocodes.main.latitude,
              longitude: startPointData.geocodes.main.longitude,
            }}
            title={startPointData.name}
            icon={getIcon()}
          />
        )}
        {destinationPoint && (
          <Marker
            coordinate={{
              latitude: destinationPoint.geocodes.main.latitude,
              longitude: destinationPoint.geocodes.main.longitude,
            }}
            title={destinationPoint.name}
          />
        )}
        {startPointData && destinationPoint && (
          <Polyline
            coordinates={[
              {
                latitude: startPointData.geocodes.main.latitude,
                longitude: startPointData.geocodes.main.longitude,
              },
              {
                latitude: destinationPoint.geocodes.main.latitude,
                longitude: destinationPoint.geocodes.main.longitude,
              },
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
      </MapView>
      {!startPointData || !destinationPoint ? (
        <View style={styles.directionBtn}>
          <TouchableOpacity onPress={() => router.push("/booking")}>
            <FontAwesome5 name="directions" size={38} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.cancelBtn}>
            <TouchableOpacity onPress={resetMarkers}>
              <MaterialIcons name="cancel" size={38} />
            </TouchableOpacity>
          </View>
          <View style={styles.distance}>
            <Text>Distance: {distance / 1000} KM</Text>
            <Text>Total Price: 100 Rs</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Pickup;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  directionBtn: {
    position: "absolute",
    zIndex: 99999,
    right: 20,
    bottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  cancelBtn: {
    position: "absolute",
    zIndex: 99999,
    right: 20,
    bottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  distance: {
    position: "absolute",
    zIndex: 99999,
    left: 20,
    bottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
});
