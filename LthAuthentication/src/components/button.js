import React, {
	Text, 
	StyleSheet, 
	View, 
	TouchableHighlight
} from 'react-native';

export default class Button extends React.Component {
	render() {
		return (
			<TouchableHighlight 
				style={styles.button}
				onPress={this.props.onPress}
				underlayColor={'gray'}
				>
				<Text>{this.props.text}</Text>
			</TouchableHighlight>
		);
	}
}

var styles = StyleSheet.create({
	button: {
		justifyContent: 'center', 
		alignItems : 'center', 
		borderWidth: 1, 
		borderRadius: 5, 
		padding: 5, 
		borderColor: 'black', 
		marginTop: 10
	}, 
	buttonText: {
		flex: 1, 
		alignSelf: "center", 
		fontSize: 20, 
	}
})