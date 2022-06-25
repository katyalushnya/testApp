import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export default class App extends React.Component {
    state = {
        email: '',
        password: '',
    };

    read = async () => {
        try {
            const credentials = await SecureStore.getItemAsync('myspasswords');
            console.log('value of credentials: ', credentials);

            if (credentials) {
                const myJson = JSON.parse(credentials);
                this.setState({
                    email: myJson.email,
                    password: myJson.password,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    remember = async () => {
        const { email, password } = this.state;
        const credentials = { email, password };
        try {
            await SecureStore.setItemAsync(
                'mypasswords',
                JSON.stringify(credentials)
            );
            this.setState({ email: '', password: '' });
        } catch (e) {
            console.log(e);
        }
    };

    clear = async () => {
        try {
            await SecureStore.deleteItemAsync('mypasswords');
            this.setState({ email: '', password: '' });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { email, password } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    value={email}
                    onChangeText={email => this.setState({ email })}
                    placeholder="email"
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        paddingLeft: 10,
                    }}
                />

                <TextInput
                    value={password}
                    onChangeText={password => this.setState({ password })}
                    placeholder="password"
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        paddingLeft: 10,
                        marginVertical: 10,
                    }}
                />

                <Button title="credentials remember" onPress={this.remember} />
                <View style={styles.space} />
                <Button title="clear credentials" onPress={this.clear} />
                <View style={styles.space} />
                <Button title="read credentials" onPress={this.read} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff9df',
        padding: 8,
        paddingTop: 70,
    },
    space: {
        marginTop: 20,
    },
});
