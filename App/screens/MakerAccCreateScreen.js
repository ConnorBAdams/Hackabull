import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import TagInput from 'react-native-tags-input'
import Button from "../components/Button";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase, { auth } from "firebase";
import 'firebase/firestore';

// People providing services account create screen


const MakerAccCreateScreen = ({ navigation }) => {
    const[tags, setTags] = useState({
          tag: '',
          tagsArray: []
        })
    const[emailAddress, setEmailAddress] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[name, setName] = useState('')

    const updateTagState = (state) => {
        setTags(state)
    };

    const CreateAccount = async () => {
        try {
            let response = await auth()
            .createUserWithEmailAndPassword(emailAddress, password)
            if (response.additionalUserInfo.isNewUser) {
                var user = response.user;
                firebase.firestore()
                .collection("users")
                .doc(user.uid)
                .set({
                    email: emailAddress,
                    name: name,
                    createdAt: Date.now(),
                    lastLoggedIn: Date.now(),
                    profilePic: "",
                    aboutMe: "",
                    location: "",
                    equipment: tags.tagsArray
                });
            }
            //props.onLogin();
        } catch (e) {
            Alert.alert(e.message);
            console.error(e.message);
        }
    }

	return (
    <View style={styles.container}>
        <Text style={{fontSize: 24, marginVertical: 10}}>First, let's get an account set up</Text>
        <View style={styles.inputField}>
            <Input
            placeholder='Bob@ILikeToMakeStuff.com'
            label={'Email Address'}
            onChangeText={(text) => setEmailAddress(text)}
            leftIcon={{ type: 'font-awesome', name: 'envelope', color:'grey' }}
            />
            <Input
            placeholder='Something super secure'
            label={'Password'}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            leftIcon={{ type: 'font-awesome', name: 'lock', color:'grey' }}
            />
            <Input
            placeholder='Secure Confirmation'
            label={'Confirm Password'}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            leftIcon={{ type: 'font-awesome', name: 'lock', color:'grey' }}
            />
            <Input
            placeholder='Bob Clagett'
            label={'Name'}
            onChangeText={(text) => setName(text)}
            leftIcon={{ type: 'font-awesome', name: 'user', color:'grey' }}
            />
            
        </View>
        <Text style={styles.sectionHeader}>Equipment I have: </Text>
        <View style={styles.equipmentList}>
            <TagInput 
            tags={tags} 
            updateState={(state) => updateTagState(state)} 
            placeholder="CNC, 3D Printer, Lathe, ..."
            style={styles.inputStyle}
            inputContainerStyle={{paddingHorizontal: '12.5%', width: '100%', height: 50}}
            inputStyle={{marginLeft: 20}}
            keysForTag={', '} />
        </View>
        <Button title="Create Account" onPress={() => CreateAccount()} />
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
    equipmentList: {
        height: '20%',
        alignContent:'center',
        alignItems: 'center'
    },
    inputField: {
        width: '80%',
        alignItems: 'center'
    },
    inputStyle: {
        width: '100%', 
        height: '100%', 
        paddingHorizontal: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    sectionHeader: {
        fontSize: 20, 
        paddingVertical: 20
    },
    textInput: {
        paddingHorizontal: 10, 
        marginTop: 10,
        width: '100%', 
        fontSize: 18,
        height: 50,
        borderWidth: 1.5,
        borderRadius: 20,
        borderColor: 'black',
        width: '75%'
    }
});

export default MakerAccCreateScreen;
