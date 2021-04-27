import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import data from "./src/data/data.json";

export default function App() {
  const [search, setsearch] = useState("");
  const [filteredResults, setfilteredResults] = useState([]);
  const [isMod, setisMod] = useState(false);
  const [val, setval] = useState(0);

  useEffect(() => {
    setfilteredResults(
      data.filter((i) => {
        return i.A.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#0582ff",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
        }}
      >
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderRadius: 5,
            borderColor: "white",
            borderWidth: 2,
            padding: 5,
          }}
          onChangeText={(e) => setsearch(e)}
          placeholder="Search table here"
          placeholderTextColor="white"
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderRadius: 5,
            borderColor: "white",
            borderWidth: 2,
            padding: 5,
            marginLeft: 10,
          }}
          value={val}
          onChangeText={(e) => setval(e)}
          placeholder="Enter number to manipulate D"
          placeholderTextColor="white"
        />
        <TouchableOpacity
          style={{
            width: 120,
            height: 40,
            backgroundColor: "#55d96b",
            padding: 5,
            borderRadius: 10,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
            borderColor: "#55d96b",
          }}
          onPress={() => setisMod(true)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 120,
            height: 40,
            backgroundColor: "#e8b41a",
            padding: 5,
            borderRadius: 10,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
            borderColor: "#e8b41a",
          }}
          onPress={() => {
            setisMod(false), setval(0);
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          style={{
            height: Dimensions.get("window").height * 0.7,
            margin: 20,
            marginTop: 50,
          }}
        >
          {isMod ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontStyle: "italic", color: "green" }}>
                Autocolumn manipulation for D is on. Press Reset to switch it
                off
              </Text>
            </View>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontStyle: "italic", color: "grey" }}>
                Autocolumn manipulation for D is Off. Enter greater than 0 and
                apply to switch it on
              </Text>
            </View>
          )}
          {filteredResults.map((i) => (
            <View
              style={{
                width: "100%",

                height: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={styles.mainCell}>{i.A}</Text>
              <Text style={styles.textCell}>{i.B}</Text>
              <Text style={styles.textCell}>{i.C}</Text>
              {isMod ? (
                val > 0 ? (
                  <Text style={styles.modText}>{i.D * val}</Text>
                ) : (
                  <Text style={styles.textCell}>{i.D}</Text>
                )
              ) : (
                <Text style={styles.textCell}>{i.D}</Text>
              )}

              <Text style={styles.textCell}>{i.E}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textCell: {
    width: "15%",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    height: 30,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
  },
  mainCell: {
    width: "30%",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    height: 30,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
  },
  modText: {
    width: "15%",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    height: 30,
    textAlign: "center",
    padding: 5,
    color: "green",
    fontWeight: "bold",
    borderRadius: 5,
  },
});
