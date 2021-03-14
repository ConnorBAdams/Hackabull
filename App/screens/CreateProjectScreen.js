import React, { useState, useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
	Platform 
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, CheckBox } from "react-native-elements";
import firebase, { auth } from "firebase";
import "firebase/firestore";
import TagInput from "react-native-tags-input";
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const CreateProjectScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [requiredDeadline, setRequiredDeadline] = useState(false);
    const [targetDeadline, setTargetDeadline] = useState(new Date());
    const [iNeedHelp, setINeedHelp] = useState(false);
    const [iHaveMaterials, setIHaveMaterials] = useState(false);
    const [tags, setTags] = useState({ tag: "", tagsArray: [] });
    const [userInfo, setUserInfo] = useState(null)
	const [image, setImage] = useState(null);

	useEffect(() => {
	  (async () => {
		if (Platform.OS !== 'web') {
		  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		  if (status !== 'granted') {
			alert('Sorry, we need camera roll permissions to make this work!');
		  }
		}
	  })();
	}, []);

    useFocusEffect(
        React.useCallback(() => {
            GetUserData();
    
          return () => {
              console.log("Create Project Screen")
          };
        }, [])
    );

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [1, 1],
		  quality: 1,
		  base64: true
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		  setImage(result.uri);
		}
	  };

    const GetUserData = () => {
        var userId = firebase.auth().currentUser.uid;
        firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .get()
            .then(function (snapshot) {
                setUserInfo(snapshot.data())
                console.log(snapshot.data())
            })
    }

    const onChange = (event, selectedDate) => {
        const date = selectedDate || date;
        setTargetDeadline(date);
    };

	const submitPost = () => {
		if (title == '') {
			return
		} else if (description == '') {
			return
		} else {
			var userId = firebase.auth().currentUser.uid;
			const project = {
				title: title,
				description: description, 
				budget: budget, 
				requiredDeadline: requiredDeadline,
				targetDeadline: (requiredDeadline)? targetDeadline : null,
				iNeedHelp : iNeedHelp,
				iHaveMaterials : iHaveMaterials,
				equipmentTags : tags.tagsArray,
				status: 0,
				imageb64: image,
				index: tempUserInfo.length -1,
				bids: []
			}
			let tempUserInfo = userInfo
			tempUserInfo.myProjects = [...tempUserInfo.myProjects, project]

			let publicProject = {
				title: title,
				description: description, 
				budget: budget, 
				requiredDeadline: requiredDeadline,
				targetDeadline: (requiredDeadline)? targetDeadline : null,
				iNeedHelp : iNeedHelp,
				iHaveMaterials : iHaveMaterials,
				equipmentTags : tags.tagsArray,
				ownerLocation: userInfo.location,
				ownerName: userInfo.name,
				status: 0,
				index: tempUserInfo.length -1,
				imageb64: image,
				bids: [],
				owner: userId
			}

			// Add to this user
			firebase.firestore()
			.collection("users")
			.doc(userId)
			.set(tempUserInfo);

			// Add to the public projects
			firebase.firestore()
			.collection("projects")
			.add(publicProject);

			navigation.pop()
		}
	}

    const updateTagState = (state) => {
        setTags(state);
    };

    return (
        <View>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20}}>Start a New Project</Text>
                    <View style={styles.inputView}>
                        <Input
                            placeholder=""
                            label="Project Title"
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Input
                            placeholder=""
                            label="Project Description"
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>
					<View style={styles.inputView}>
                        <Input
                            placeholder=""
                            label="Project Budget"
							leftIcon={{ type: 'font-awesome', name: 'dollar', color:'grey' }}
                            onChangeText={(text) => setBudget(text)}
                        />
                    </View>
                    <Text style={styles.sectionHeader}>
                        Equipment this requires:{" "}
                    </Text>
                    <View style={styles.inputView}>
                        <TagInput
                            tags={tags}
                            updateState={(state) => updateTagState(state)}
                            placeholder="CNC, 3D Printer, Lathe, ..."
                            style={styles.inputStyle}
                            inputContainerStyle={{ width: "100%", height: 50 }}
                            inputStyle={{ marginLeft: 20 }}
                            keysForTag={", "}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <CheckBox
                            title="This project has a deadline"
                            checked={requiredDeadline}
                            containerStyle={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                            }}
                            onPress={() =>
                                setRequiredDeadline(!requiredDeadline)
                            }
                            style={{ backgroundColor: "red" }}
                        />
                        {/* {requiredDeadline && 
							<DateTimePicker
							testID="dateTimePicker"
							value={targetDeadline}
							mode={'date'}
							display='spinner'
							is24Hour={true}
							onChange={onChange}
						/> } */}
                    </View>
					<View style={styles.inputView}>
					<CheckBox
                            title="I have all required materials"
                            checked={iHaveMaterials}
                            containerStyle={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                            }}
                            onPress={() =>
                                setIHaveMaterials(!iHaveMaterials)
                            }
                            style={{ backgroundColor: "red" }}
                        />
                    </View>
                    <View style={styles.inputView}>
					<CheckBox
                            title="I can operate the equipment"
                            checked={iNeedHelp}
                            containerStyle={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                            }}
                            onPress={() =>
                                setINeedHelp(!iNeedHelp)
                            }
                            style={{ backgroundColor: "red" }}
                        />
                    </View>
					<View style={{ flex: 1, alignItems: 'center', marginVertical: 30, justifyContent: 'center' }}>
					<Button title="Set a Project Picture" onPress={pickImage} />
					{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
					</View>
                    <Button
                        title="Submit"
                        onPress={() => submitPost()}
                    />
                </View>
            </ScrollView>
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
    inputView: {
        marginVertical: 10,
        width: "90%",
    },
    header: {
        marginTop: 15,
        alignItems: "center",
    },
    equipmentList: {
        height: "20%",
        alignContent: "center",
        alignItems: "center",
    },
    inputStyle: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: "grey",
    },
	sectionHeader: {
		fontSize: 18,
		flexDirection: 'row',
		justifyContent:'flex-start',
		alignItems: 'flex-start'
	}
});

export default CreateProjectScreen;
