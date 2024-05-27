import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import debounce from "lodash.debounce";

const Booking = () => {
  const [places, setPlaces] = useState([]);
  const [inputText, setInputText] = useState("");
  const [destination, setDestination] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [focusedIcon, setFocusedIcon] = useState("motorbike");
  const [isGoPressed, setIsGoPressed] = useState(false);

  const handlePress = (icon) => {
    setFocusedIcon(icon);
  };

  const handleChange = debounce((text) => {
    searchPlaces(text);
  }, 300);

  const searchPlaces = async (text) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3mvUGiD+3ms10/xcy7LGd3r50NvPEQbZPvCemQC5TMV8=",
      },
    };
    try {
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?query=${text}&limit=20`,
        options
      );
      const data = await response.json();
      setPlaces(data.results);
    } catch (error) {
      console.error("Error fetching places:", error);
      Alert.alert(
        "Error",
        "There was an error fetching the places. Please try again."
      );
    }
  };

  const resetStates = () => {
    setPlaces([]);
    setInputText("");
    setDestination("");
    setStartPoint("");
    setFocusedIcon("motorbike");
  };

  const defaultPlaces = [
    { id: "1", name: "Tariq Road" },
    { id: "2", name: "Garden East" },
    { id: "3", name: "Saddar" },
    { id: "4", name: "Numaish" },
    { id: "5", name: "Bahadurabad" },
    { id: "6", name: "Lyari" },
  ];

  const combinedPlaces = inputText ? places : defaultPlaces;

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.placesContainer}>
        <View style={{ borderRadius: 3, paddingBottom: 20 }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={{ fontSize: 16 }}
              placeholderTextColor="#7C7C7C"
              placeholder="Pick up point"
              value={startPoint?.name}
              onChangeText={(text) => {
                setInputText("start");
                handleChange(text);
              }}
            />
            {startPoint ? (
              <TouchableOpacity onPress={() => setStartPoint("")}>
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={24}
                  style={styles.iconInput}
                />
              </TouchableOpacity>
            ) : (
              <MaterialIcons
                name="location-on"
                size={24}
                style={styles.iconInput}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={{ fontSize: 16 }}
              placeholderTextColor="#7C7C7C"
              placeholder="Choose Destination"
              value={destination?.name}
              onChangeText={(text) => {
                setInputText("destination");
                handleChange(text);
              }}
            />
            {destination ? (
              <TouchableOpacity onPress={() => setDestination("")}>
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={24}
                  style={styles.iconInput}
                />
              </TouchableOpacity>
            ) : (
              <MaterialCommunityIcons
                name="car-clock"
                size={24}
                style={styles.iconInput}
              />
            )}
          </View>
          <View style={styles.iconContainer}>
            {["motorbike", "rickshaw", "car-side"].map((icon) => (
              <TouchableOpacity key={icon} onPress={() => handlePress(icon)}>
                <MaterialCommunityIcons
                  name={icon}
                  size={28}
                  style={[
                    styles.icon,
                    focusedIcon === icon ? styles.focusedIcon : null,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <FlatList
          style={styles.placesList}
          data={combinedPlaces}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                setPlaces([]);
                inputText === "start"
                  ? setStartPoint(item)
                  : setDestination(item);
                setInputText("");
              }}
            >
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={26}
              />
              <Text style={styles.placeText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.backBtn}>
        <TouchableOpacity
          onPress={() => {
            resetStates();
            router.push("/(tabs)");
          }}
        >
          <Ionicons name="arrow-back-circle" size={38} />
        </TouchableOpacity>
      </View>
      <View style={styles.go}>
        <TouchableOpacity
          style={[
            styles.goButton,
            isGoPressed && styles.goButtonPressed,
            (!startPoint || !destination || !focusedIcon) &&
              styles.goButtonDisabled,
          ]}
          onPressIn={() => setIsGoPressed(true)}
          onPressOut={() => setIsGoPressed(false)}
          onPress={() => {
            resetStates();
            router.push({
              pathname: "/(tabs)",
              params: {
                startPoint: JSON.stringify(startPoint),
                destination: JSON.stringify(destination),
                focusedIcon,
              },
            });
          }}
          disabled={!startPoint || !destination || !focusedIcon}
        >
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  placesContainer: {
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#E2E2E2",
    marginTop: 20,
  },
  iconInput: {
    color: "#7C7C7C",
    borderLeftWidth: 1,
    borderLeftColor: "#7C7C7C",
    paddingLeft: 15,
  },
  icon: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: "black",
  },
  focusedIcon: {
    backgroundColor: "black",
    color: "white",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  descriptionContainer: {
    paddingLeft: 15,
    marginTop: 15,
    gap: 14,
  },
  descriptionItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 10,
  },
  touch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    gap: 12,
    marginVertical: 10,
    paddingBottom: 10,
  },

  placeName: {
    fontSize: 17,
    fontWeight: "600",
  },
  placesList: {
    maxHeight: 300,
  },

  backBtn: {
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
  go: {
    position: "absolute",
    zIndex: 99999,
    right: 20,
    bottom: 20,
    width: 150,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  goButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  goButtonPressed: {
    backgroundColor: "#555",
  },
  goButtonDisabled: {
    backgroundColor: "#E2E2E2",
  },
  goButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
