import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import firebase, { auth } from "firebase";
import PropTypes from 'prop-types'
import Profile from './Profile'
import contactData from '../assets/user_data.json'

const ProfileScreen = ({ navigation }) => {
	return <View style={styles.container}>
        <Profile />
        
        <Button title="Sign out" onPress={() =>auth().signOut() } />

    </View>;
};



export default ProfileScreen
