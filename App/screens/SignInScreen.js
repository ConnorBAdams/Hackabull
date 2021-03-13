import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from 'react-native-elements';
import firebase, { auth } from "firebase";
import 'firebase/firestore';
import Button from "../components/Button";

const SignInScreen = ({ navigation }) => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const signIn = async () => {
        let response = await auth()
        .createUserWithEmailAndPassword(email, password)
    }

	return (
    <View style={styles.container}>
        <Text style={{fontSize: 24, marginVertical: 30}}>Enter your email and password:</Text>

        <View  style={styles.inputField}>
        <Input
            placeholder='Email'
            label={'Email Address'}
            onChangeText={(text) => setEmail(text)}
            leftIcon={{ type: 'font-awesome', name: 'envelope', color:'grey' }}
            />
            <Input
            placeholder='Password'
            label={'Password'}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            leftIcon={{ type: 'font-awesome', name: 'lock', color:'grey' }}
            />
        </View>
        <Button title="Sign in" onPress={() => signIn()} />
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

    inputField: {
        width: '80%',
        alignItems: 'center'
    },
});

export default SignInScreen;
