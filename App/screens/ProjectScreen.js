import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
	Alert,
	TouchableOpacity,
} from "react-native";
import Button from "../components/Button";
import firebase, { auth } from "firebase";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const ProjectScreen = ({ navigation, route }) => {
	const [bids, setBids] = useState([])
	const { id, item, gigInquiry } = route.params;

	useFocusEffect(
        React.useCallback(() => {
			if (!gigInquiry)
				getBidInfo()
			return () => {
                console.log("Description Screen");
            };
        }, [])
    );

	const getBidInfo = () => {
		setBids([])
		for (var i = 0; i < item.bids.length; i++) {
			firebase
			.firestore()
			.collection("users")
			.doc(item.bids[i])
			.get()
			.then(function (snapshot) {
				let tempBids = [...bids, snapshot.data()]
				setBids(tempBids)
			})
		}
	}

	const bidProject = () => {
		console.log("PROJECT HAS BEEN BID")
		Alert.alert("Bid on this project?", 
		"The owner of the project will be notified and your contact information will be shared.",
			[{
				text: "Cancel",
				onPress: () => console.log('Cancelled'),
				style: "cancel"
			},
			{
				text: "Confirm",
				onPress: () => submitBid(),
				style: 'confirm'

			}]
		)
	}

	const deleteProject = () => {
		console.log("Pressed delete")
	}

	const submitBid = () => {
		var userId = firebase.auth().currentUser.uid;

		let tempItem = item
		if (item.bids != undefined)
		{
			if (item.bids.includes(userId)) {
				Alert.alert("You've already bid on this!")
				navigation.pop()
				return
			}
			item.bids = [...item.bids, userId]
		} else {
			item.bids = [userId]
		}

		// Add to the public projects
		firebase.firestore()
		.collection("projects")
		.doc(item.id)
		.set(tempItem)

		// THIS IS A TERRIBLE WAY TO DO THIS AND I AM SO SORRY
		// but I am tried and want to get this part done
		firebase.firestore()
		.collection("users")
		.doc(item.owner)
		.get()
		.then(function (snapshot) {
			let oldProfile = snapshot.data()
			oldProfile.myProjects[item.index] = tempItem
			firebase.firestore()
			.collection("users")
			.doc(item.owner)
			.set(oldProfile)
		})

		navigation.pop()

	}

	const _renderItem = ({ item, index }) => {
		const deny = () => {

		}
		const accept = () => {

		}
		console.log(item);

		return (
			<View style={styles.projectCard}>
				<TouchableOpacity
					onPress={
						() => tapEvent(index)
					}
				>
					<Text style={styles.userText}>Maker: {item.name}</Text>
					<Text style={styles.userText}>Rating: Stars </Text>
					<Text style={styles.userText}>Location: {item.city}, {item.state} </Text>
					<Text style={styles.userText}>Contact: </Text>
					<Text style={styles.userText}>Email: {item.email}</Text>
					{ item.phone && <Text style={styles.userText}>Phone: {item.phone}</Text>}
					
					<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
						<Button title={'Deny'} onPress={() => deny()} />
						<Button title={'Accept'} buttonStyle={{backgroundColor:'darkgreen'}} onPress={() => accept()} />
					</View>
				</TouchableOpacity>
			</View>
		);
	};


	return (
		<ScrollView style={{width: '100%'}}>
		<View style={styles.container}>
			<Text style={styles.titleText}>{item.title}</Text>
			<Image
				style={styles.image}
				source={(item.imageb64) ? {uri: item.imageb64} : {
					uri:
						"https://i-verve.com/blog/wp-content/uploads/2018/09/handyman-app-screens.jpg",
				}}
			/>
			<View style={styles.descriptionBox}>
				<Text style={styles.userText}>Posted by: {!gigInquiry ? "You!" : item.ownerName }</Text> 
				<Text style={styles.offerText}>Budget: ${item.budget}</Text>
				<Text style={{textDecorationLine:'underline', paddingBottom: 5, fontSize: 18}}>Description: </Text>
				<Text style={styles.infoText}>{item.description}</Text>
				<Text style={styles.userText}>Materials Provided: {item.iHaveMaterials ? "Yes" : "No"}</Text>
				<Text style={styles.userText}>Owner can do task: {item.iNeedHelp ? "Yes" : "No"}</Text>
				<Text style={styles.userText}>Project has a deadline: {item.requiredDeadline ? "Yes" : "No"}</Text>
				{item.distance ?
				<Text style={styles.userText}>Distance: {item.distance} miles away</Text> 
				: <Text /> }
			</View>
			{gigInquiry &&
			<View style={styles.buttonView}>
				<Button title={"Bid on Project"} onPress={() => {bidProject()}} />
			</View>}
			{!gigInquiry && 
			<View style={{width: '90%'}}>
				<Text style={{fontSize: 22, paddingTop: 15, paddingBottom: 10}}>Bids:</Text>
				<View>
				<FlatList
					data={bids}
					renderItem={_renderItem}
					keyExtractor={(item) => item.id}
					initialNumToRender={10}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					windowSize={6}
					numColumns={1}
				/>
				</View>
				<View style={{width: '70%'}}>
					<Button iconName="trash" title="Delete Project" />
				</View>
			</View>
			}
		</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		width: '100%',
		height: '100%'
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
		borderRadius: 20
	},
	titleText: {
		fontSize: 25,
		fontWeight: "bold",
		margin: 10,
	},
	userText: {
		fontSize: 20,
	},
	offerText: {
		fontSize: 20,
        color: "green"
	},
	descText: {
		fontSize: 16,
	},
	infoText: {
		fontSize: 16,
		marginBottom: 10
	},
    buttonView: {
        margin: 20
    },
	descriptionBox: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 20,
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: 15,
		width: '80%',
	},
	projectCard: {
		marginVertical: 10,
		borderWidth: 0.25,
		borderRadius: 20,
		padding: 10
	}
});

export default ProjectScreen;
