import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
    ScrollView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/Button";
import {Header} from 'react-native-elements'
import firebase, { auth } from "firebase";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

// Accepted gigs screen

const GigScreen = ({ navigation }) => {
    const [myGigs, setMyGigs] = useState(null)
	const [loading, setLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            getGigs();
            return () => {
                console.log("Gigs Screen");
            };
        }, [])
    );

	const getGigs = () => {
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
			setMyGigs(snapshot.data().myGigs)
			setLoading(false)
			console.log('My projects: ', snapshot.data().myGigs)
		})
	}

	const _renderItem = ({ item, index }) => {
		const tapEvent = (index) => {
			console.log(index, "pressed");
			navigation.navigate("My Gigs", {
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
        <Header
        centerComponent={{ text: 'My Gigs', style: { color: '#fff', fontSize: 26 } }}
        />
        <View style={styles.innerContainer}>
        {(myGigs != null && myGigs.length > 0) &&
				<View style={{flex: 1,height: '80%', width: '100%', }}>
				<ScrollView>
				<View style={{alignItems:'flex-start', flexDirection: 'row'}}>
					<Text style={styles.projectTypeHeade}>Gigs In Progress:</Text>
				</View>
				<View style={{alignItems:'center', marginBottom: 15}}>
				<FlatList
					data={myGigs.filter(item => item.status == 1)}
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
					<Text style={styles.projectTypeHeade}>Gigs Completed:</Text>
				</View>
				<View style={{alignItems:'center', marginBottom: 15}}>
				<FlatList
					data={myGigs.filter(item => item.status == 2)}
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
                <Button title={"Find a Gig"} onPress={() => navigation.navigate("FindGigScreen")}/>
                </View>	
			</View>
			}
			{(myGigs != null && myGigs.length == 0) && 
				<View style={{height: '80%', alignItems:'center'}}>
				<Text style={{fontSize: 20, marginVertical: 25}}>You're not working on any gigs!</Text>
                <Button title={"Find a Gig"} onPress={() => navigation.navigate("FindGigScreen")}/>
				</View>}
        </View>
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

export default GigScreen;
