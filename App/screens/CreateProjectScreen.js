import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, CheckBox } from "react-native-elements";
import firebase, { auth } from "firebase";
import "firebase/firestore";
import TagInput from "react-native-tags-input";

const CreateProjectScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [requiredDeadline, setRequiredDeadline] = useState(false);
    const [targetDeadline, setTargetDeadline] = useState(new Date());
    const [iNeedHelp, setINeedHelp] = useState(false);
    const [iHaveMaterials, setIHaveMaterials] = useState(false);
    const [tags, setTags] = useState({ tag: "", tagsArray: [] });

    const onChange = (event, selectedDate) => {
        const date = selectedDate || date;
        setTargetDeadline(date);
    };

	const submitPost = () => {
		if (title != '') {
			return
		} else if (description != '') {
			return
		} else {

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
