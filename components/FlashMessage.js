import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage, { showMessage } from "react-native-flash-message";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

class LoginScreen extends React.Component ({ navigation: { navigate } }) {
    static navigationOptions = {
        title: "Login",
    };
    loginSuccess = () => {
        showMessage({
            title: "Login success!",
            message: "Will show this message green",
            type: "success"
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.loginSuccess} title="Show Login Message" />
                <Button onPress={() => this.props.navigation.navigate("Logout")} title="Go to Logout Screen" />
            </View>
        );
    }
}

class LogoutScreen extends React.Component({ navigation: { navigate } }) {
    static navigationOptions = {
        title: "Logout",
    };
    logoutSuccess = () => {
        showMessage({
            title: "Logout success!",
            message: "Will show this message danger/red",
            type: "danger"
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.logoutSuccess} title="Show Login Message" />
                <Button onPress={() => this.props.navigation.goBack()} title="Go to Login Screen" />
            </View>
        );
    }
}


const Stack = createNativeStackNavigator();

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Logout" component={LogoutScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
                <FlashMessage position="top" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
