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

const ProjectScreen = ({ navigation, route }) => {
	const { id, item } = route.params;
	console.log(item, "assme");
	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>{item.title}</Text>
			<Image
				style={styles.image}
				source={{
					uri:
						"https://i-verve.com/blog/wp-content/uploads/2018/09/handyman-app-screens.jpg",
				}}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.userText}>{item.user}</Text>
				<Text style={styles.offerText}>{item.offer}</Text>
			</View>

			<Text style={styles.descText}>{item.description}</Text>
			<View style={styles.buttonView}>
				<Button title={"Make offer"} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		//justifyContent: "center",
	},
	infoContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		margin: 10,
	},
	image: {
		height: Dimensions.get("window").width * 0.4,
		aspectRatio: 1,
		backgroundColor: "blue",
		margin: 20,
	},
	titleText: {
		fontSize: 25,
		fontWeight: "bold",
		margin: 10,
	},
	userText: {
		fontSize: 20,
        marginHorizontal: 10,
	},
	offerText: {
		fontSize: 20,
        marginHorizontal: 10,
        color: "green"
	},
	descText: {
		fontSize: 16,
	},
    buttonView: {
        margin: 20
    }
});

export default ProjectScreen;
