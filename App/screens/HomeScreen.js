import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/Button";

const HomeScreen = ({ navigation }) => {
	const projects = [
		{
			title: "Make me a table",
			id: 1823,
			user: "BryanBoyos",
			offer: "$32",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		},
		{
			title: "Build a bookshelf",
			id: 3382,
			user: "ConnerBADams",
			offer: "$75",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			title: "Key ring holder",
			id: 4873,
			user: "SaniEntertainment",
			offer: "$20",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			title: "3D print an Ironman mask",
			id: 8234,
			user: "bagels123",
			offer: "$15",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	];
	const _renderItem = ({ item, index }) => {
		const tapEvent = (index) => {
			console.log(index, "pressed");
			navigation.navigate("Home Screen", {
				screen: "ProjectScreen",
				params: { id: item.id, item },
			});
		};
		console.log(item);

		return (
			<View style={styles.projectCard}>
				<TouchableOpacity
					onPress={
						() => tapEvent(index)
						/* (() =>  navigation.navigate("ProjectScreen", {
							screen: "ProjectScreen",
							params: { navigation,
								title: item.title,
								id: item.id,
								user: item.user,
								offer: item.offer,},
						})
						) */
					}
				>
					<Image
						style={styles.image}
						source={{
							uri:
								"https://i-verve.com/blog/wp-content/uploads/2018/09/handyman-app-screens.jpg",
						}}
					/>
					<Text>{item.title}</Text>
					<Text>{item.user}</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={projects}
				renderItem={_renderItem}
				keyExtractor={(item) => item.id}
				initialNumToRender={10}
				removeClippedSubviews={true}
				maxToRenderPerBatch={10}
				windowSize={6}
				numColumns={2}
			/>
			<Button title={"Start project"} onPress={() => navigation.navigate("CreateProjectScreen")}/>
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
	image: {
		height: Dimensions.get("window").width * 0.4,
		aspectRatio: 1,
		borderRadius: 15,
		margin: 2,
	},
	projectCard: {
		margin: 5,
		padding: 10,
		borderWidth: 1,
		borderRadius: 20,
		//backgroundColor: "silver",
	},
});

export default HomeScreen;
