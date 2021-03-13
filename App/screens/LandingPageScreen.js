import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from '../components/Button'

const LandingPageScreen = ({ navigation }) => {
	return (
	<View style={styles.container}>
		<View style={styles.header}>
			<Text style={styles.headerFont}>Welcome!</Text>
			<Text style={styles.subHeaderFont}>What are you looking to do?</Text>
		</View>
		<View style={styles.subHeader}>
			<Text style={styles.subHeaderFont}> I'm looking to...</Text>
		</View>
		<View style={styles.buttonList}>
			<Button title="Find Work" buttonStyle={{width: '50%', marginBottom: '15%'}} onPress={() => navigation.navigate('MakerCreateScreen')} />
			<Button title="Do Work" buttonStyle={{width: '50%'}} onPress={() => navigation.navigate('BuyerCreateScreen')} />
		</View>
		<View style={styles.footer}>
			<Text style={styles.footerFont}>I alrady have an account</Text>
			<Button title="Sign in" buttonStyle={{width: '50%'}} />
		</View>
	</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		flexDirection: 'column'
	},
	header: {
		paddingTop: '15%',
		height: '25%',
		alignItems: "center",
	}, 
	headerFont: {
		fontSize: 45
	},
	subHeader: {
		paddingTop: '5%',
		alignItems: "center",
		height: '5%'
	},
	subHeaderFont: {
		fontSize: 20,
		marginTop: '10%'
	},
	buttonList: {
		alignItems: "center",
		justifyContent:'center',
		height: '50%'
	},
	footer: {
		alignItems: "center",
		padding: '10%',
		height: '20%',
	},
	footerFont: {
		fontSize: 18,
		paddingBottom: 10
	}
});

export default LandingPageScreen;
