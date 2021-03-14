import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import firebase, { auth } from "firebase";
import PropTypes from 'prop-types'
import Profile from './Profile'
import contactData from '../assets/user_data.json'
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null)
    

    useFocusEffect(
        React.useCallback(() => {
            GetUserData();
    
          return () => {
              console.log("Profile Screen")
          };
        }, [])
    );

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

	return (
    <View style={styles.container}>
        <View style={{width:'100%', height: '100%', flexDirection: 'column', alignContent:'flex-start'}}>
            <Profile {...contactData} />
        </View>
        
    </View>
    );
};

// const ProfileScreen = () => <Profile {...contactData} />

// ProfileScreen.navigationOptions = () => ({
//   header: null,
// })

// ProfileScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",

	},
});

export default ProfileScreen
