import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase, { auth } from "firebase";
import 'firebase/firestore';
import { ScrollView } from "react-native-gesture-handler";


// People buying services account setup screen

const BuyerAccCreateScreen = ({ navigation }) => {
    const[emailAddress, setEmailAddress] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[name, setName] = useState('')

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
                    equipment: [],
                    myProjects: []
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
        <ScrollView style={{width: '100%'}}>
        <View style={styles.innerContainer}>
            <Text style={{fontSize: 24, marginVertical: 20}}>First, let's get an account set up</Text>
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
            <View style={{marginTop: '2.5%'}}>
                <Button title="Create Account" onPress={() => CreateAccount()} />
            </View>
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
    innerContainer: {
		alignItems: "center",
		justifyContent: "center",
        marginTop: '10%',
        width:'100%'
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
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 20
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


export default BuyerAccCreateScreen;
