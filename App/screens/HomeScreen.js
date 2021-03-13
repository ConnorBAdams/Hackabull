import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import firebase, { auth } from "firebase";


const HomeScreen = ({ navigation }) => {
	return <View style={styles.container}>

	</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default HomeScreen;
