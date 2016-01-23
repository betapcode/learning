import React, {
	View, 
	Text, 
	StyleSheet, 
	TextInput, 

} from 'react-native';

import Button from './button';
import Parse from 'parse/react-native';


export default class SignIn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username : 'abc', 
			password: '',
			errorMessage: ''
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Text> Sign In </Text>
				<Text style={styles.label}> Username: </Text> 
				<TextInput 
					style={styles.input} 
					value={this.state.username}
					onChangeText={(text) => this.setState({username: text})}
				/>

				<Text style={styles.label}> Password: </Text> 
				<TextInput style={styles.input} 
					value={this.state.password}
					onChangeText={(text) => this.setState({password: text})}
				/>

				<Text style={styles.label}>{this.state.errorMessage}</Text>

				<Button text='SignIn' onPress={this.onPress.bind(this)} />
			</View>
		);
	}

	onPress() {
		// log the user in 
		Parse.User.logIn(this.state.username, this.state.password, {
			success: (user) => {console.log(user);},
			error: (data, error) => {
				this.setState({
					errorMessage:error.message
				});
			}

		})
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center',
	}, 
	input : {
		padding:4, 
		height: 40, 
		borderColor: 'gray',
		borderWidth: 1,  
		borderRadius: 5, 
		width: 200, 
		margin: 5, 
		alignSelf: 'center',
	}, 
	label : {
		fontSize: 18, 
	}
})

