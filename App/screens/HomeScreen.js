import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/Button";
import {Header} from 'react-native-elements'
import firebase, { auth } from "firebase";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
	const[projects, setProjects] = useState(null)
	const[loading, setLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            getProjects();
            return () => {
                console.log("Home Screen");
            };
        }, [])
    );

	const getProjects = () => {
		if (loading)
			return
		setLoading(true)
		var userId = firebase.auth().currentUser.uid;
		firebase
		.firestore()
		.collection("users")
		.doc(userId)
		.get()
		.then(function (snapshot) {
			setProjects(snapshot.data().myProjects)
			setLoading(false)
			console.log('My projects: ', snapshot.data().myProjects)
		})
	}

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
					}
				>
					<Image
						style={styles.image}
						source={(item.imageb64) ? {uri: item.imageb64} : {
							uri:
								"https://i-verve.com/blog/wp-content/uploads/2018/09/handyman-app-screens.jpg",
						}}
					/>
					<Text>Title: {item.title}</Text>
					<Text>Owner: You!</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Header
			centerComponent={{ text: 'My Projects', style: { color: '#fff', fontSize: 20 } }}
			/>
			<View style={styles.innerContainer}>
			{(projects != null && projects != []) &&
				<View style={{flex: 1,height: '80%', width: '100%', }}>
				<ScrollView>
				<View style={{alignItems:'flex-start', flexDirection: 'row'}}>
					<Text style={styles.projectTypeHeade}>Projects Not Started:</Text>
				</View>
				<View style={{alignItems:'center', marginBottom: 15}}>
				<FlatList
					data={projects.filter(item => item.status == 0)}
					renderItem={_renderItem}
					keyExtractor={(item) => item.id}
					initialNumToRender={10}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					windowSize={6}
					numColumns={2}
				/>
				</View>
				<View style={{alignItems:'flex-start', flexDirection: 'row'}}>
					<Text style={styles.projectTypeHeade}>Projects In Progress:</Text>
				</View>
				<View style={{alignItems:'center', marginBottom: 15}}>
				<FlatList
					data={projects.filter(item => item.status == 1)}
					renderItem={_renderItem}
					keyExtractor={(item) => item.id}
					initialNumToRender={10}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					windowSize={6}
					numColumns={2}
				/>
				</View>
				<View style={{alignItems:'flex-start', flexDirection: 'row'}}>
					<Text style={styles.projectTypeHeade}>Completed Projects:</Text>
				</View>
				<View style={{alignItems:'center', marginBottom: 15}}>
				<FlatList
					data={projects.filter(item => item.status == 2)}
					renderItem={_renderItem}
					keyExtractor={(item) => item.id}
					initialNumToRender={10}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					windowSize={6}
					numColumns={2}
				/>
				</View>
				</ScrollView>	
				<View style={{alignItems:'center'}}>
				<Button title={"Start new project"} onPress={() => navigation.navigate("CreateProjectScreen")}/>
				</View>	
			</View>
			}
			{(projects != null && projects.length == 0) && 
				<View style={{height: '80%', alignItems:'center'}}>
				<Text style={{fontSize: 20, marginVertical: 25}}>You don't have any active projects!</Text>
				<Button title={"Start new project"} onPress={() => navigation.navigate("CreateProjectScreen")}/>
				</View>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
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
	innerContainer: {
		height: Dimensions.get('window').height * 0.8,
		flexDirection: 'column',
		alignContent:'flex-start',
		width: '100%'
	},
	projectTypeHeade: {
		fontSize: 18,
		marginTop: 25,
		marginBottom: 15,
		marginLeft: 15,
		textDecorationLine:'underline'
	}
});

export default HomeScreen;
