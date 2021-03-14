import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import firebase, { auth } from "firebase";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import * as geolib from "geolib";

// Find Gigs Screen

const FindGigScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [location, setLocation] = useState(null);
	const [myGigs, setMyGigs] = useState(null)
    const [gigList, setGigList] = useState(null);
	const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getProjects();
            return () => {
                console.log("Create Project Screen");
            };
        }, [])
    );

    const getProjects = () => {
		if (loading || gigList != null) 
			return
		setLoading(true)
		var userId = firebase.auth().currentUser.uid;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let tempLoc = {
					latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setLocation(tempLoc);
				console.log(location, tempLoc);
				firebase
					.firestore()
					.collection("projects")
					.get()
					.then(function (snapshot) {
						const wipList = [];
						snapshot.forEach((doc) => {

							let gigLoc = {latitude: parseFloat(doc.data().ownerLocation.latitude), longitude: parseFloat(doc.data().ownerLocation.latitude) }
							let distance = geolib.getDistance(tempLoc, gigLoc)
							let data = doc.data()
							data.id = doc.id
							data.distance = distance
							data.requiresQuery = true
							wipList.push(data);
						});
						setGigList(wipList);
						setLoading(false)
					});
            },
        );
		firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .get()
            .then(function (snapshot) {
                setMyGigs(snapshot.data().myGigs)
            })
	}

	
	const _renderItem = ({ item, index }) => {
		const tapEvent = (index) => {
			console.log(index, "pressed");
			navigation.navigate("My Gigs", {
				screen: "ProjectScreen",
				params: { id: item.id, item, gigInquiry: true },
			});
		};
		console.log('rendering: ', item);

		return (
			<View style={styles.projectCard}>
				<TouchableOpacity
					onPress={
						() => tapEvent(index)
					}
				>
					<Image
						style={styles.image}
						source={(item.imageb64? {uri:item.imageb64} : {
							uri:
								"https://i-verve.com/blog/wp-content/uploads/2018/09/handyman-app-screens.jpg",
						})}
					/>
					<Text>Title: {item.title}</Text>
					<Text>Owner: {item.ownerName}</Text>
					<Text>Distance: {item.distance} miles</Text>
				</TouchableOpacity>
			</View>
		);
	};

	if (loading || gigList == null) {
		return(
			<View style={styles.container}> 
				<Text>Loading...</Text>
				<ActivityIndicator size='large' color='blue' style={{marginVertical:20}} />
			</View>
		)
	}

    return (
		<View style={styles.container}> 
		<FlatList
            data={gigList}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender={10}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={6}
            numColumns={2}
        />
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
    header: {
        height: '10%',
        paddingVertical: '5%'
    }
});

export default FindGigScreen;
