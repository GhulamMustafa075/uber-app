import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { getDistance } from "geolib";

const Pickup = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);

  const [pickup, setPickup] = useState(null);
  const [inputText, setInputText] = useState("");
  const [distance, setdistance] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    }
    fetchData();
  }, []);

  const handleChange = (text) => {
    setTimeout(() => searchPlaces(text), 800);
  };

  const calculateDistance = (itemLat, itemLog) => {
    var dis = getDistance(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      { latitude: itemLat, longitude: itemLog }
    );
    // alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
    setdistance(dis);
    console.log(dis, "distance");
  };

  const searchPlaces = async (text) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3mvUGiD+3ms10/xcy7LGd3r50NvPEQbZPvCemQC5TMV8=",
      },
    };
    fetch(`https://api.foursquare.com/v3/places/search?query=${text}`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        setPlaces(response.results);
      })
      .catch((err) => console.error(err, "eeror"));
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
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={"Your Location"}
        />
        {pickup && (
          <Marker
            coordinate={{
              latitude: pickup.geocodes.main.latitude,
              longitude: pickup.geocodes.main.longitude,
            }}
            title={pickup.name}
          />
        )}
      </MapView>
      {pickup && (
        <>
          <View style={styles.cancleBtn}>
            <TouchableOpacity
              onPress={() => {
                setPickup(null);
                setPlaces([]);
                setInputText("");
              }}
            >
              <MaterialIcons name="cancel" size={38} />
            </TouchableOpacity>
          </View>
          <View style={styles.distance}>
            <Text>Distance: {distance / 1000}KM</Text>
            <Text>Total Price: 100 Rs</Text>
          </View>
        </>
      )}
      <View
        style={{
          borderBottomColor: "lightgray",
          marginTop: 10,
          borderBottomWidth: 1,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            marginBottom: 10,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Good Morning, Jost
        </Text>
      </View>
      <View style={styles.placesContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Where to?"
            value={inputText}
            onChangeText={(text) => {
              handleChange(text);
              setInputText(text);
            }}
          />
          <MaterialCommunityIcons
            name="car-clock"
            size={24}
            style={{
              color: "#7C7C7C",
              borderLeftWidth: 1,
              borderLeftColor: "#7C7C7C",
              paddingLeft: 15,
            }}
          />
        </View>
        {places.length > 0 && (
          <FlatList
            style={styles.placesList}
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setPickup(item);
                  calculateDistance(
                    item.geocodes.main.latitude,
                    item.geocodes.main.longitude
                  );
                  setPlaces([]);
                  mapRef.current.animateToRegion(
                    {
                      latitude: item.geocodes.main.latitude,
                      longitude: item.geocodes.main.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                    1000
                  );
                }}
              >
                <Text style={styles.placeText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
        {!pickup && (
          <View style={styles.descriptionContainer}>
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
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={26}
              />

              <View>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  1600 Michigan Street
                </Text>
                <Text
                  style={{ fontSize: 12, color: "gray", fontWeight: "600" }}
                >
                  Sun Fransico
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
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
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "50%",
  },
  descriptionContainer: {
    display: "flex",
    gap: 16,
    marginTop: 15,
  },
  placesContainer: {
    padding: 15,
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#E2E2E2",
  },
  placesList: {
    zIndex: 99999,
    backgroundColor: "#E2E2E2",
    padding: 10,
    borderRadius: 3,
    zIndex: 888,
    top: 10,
    left: 0,
    maxHeight: 120,
    overflow: "scroll",
  },
  placeText: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 6,
  },
  cancleBtn: {
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
