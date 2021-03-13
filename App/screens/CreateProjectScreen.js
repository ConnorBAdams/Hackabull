import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
} from "react-native";
import Button from "../components/Button";

const CreateProjectScreen = ({ navigation, route }) => {
	return (
		<View>
			<Text>create project</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default CreateProjectScreen;
