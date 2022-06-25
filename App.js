import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from "./screens/AuthScreen";
import PaymentScreen from "./screens/PaymentScreen";
import * as LocalAuthentication from 'expo-local-authentication';

//https://www.youtube.com/watch?v=7-_XgjelXvQ

export default function App() {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false); //тут как раз faceid / touchid
    const [isAuthenticated, setIsAuthenticated] = useState(false); // обычный пароль или пин

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });

    function onAuthenticate () {
        const auth = LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate',
            fallbackLabel: 'Enter Password',
        });
        auth.then(result => {
                setIsAuthenticated(result.success);
                console.log(result);
            }
        );
    }

    return (
        <View style={styles.container}>
            { isBiometricSupported //тут можно ставить isAuthenticated, и тогда работает пароль на симуляторе
                ? <PaymentScreen setIsAuthenticated={setIsAuthenticated} />
                : <Auth onAuthenticate={onAuthenticate} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});