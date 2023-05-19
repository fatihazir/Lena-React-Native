import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { routes } from '../utilities/routes';
import HomeScreen from '../screens/HomeScreen';
import { Platform } from 'react-native';
import BlogScreen from '../screens/BlogScreen';
import MainHeader from '../components/mainHeader';

const Stack = createStackNavigator();

function MainStackNavigator(): JSX.Element {
    let isAndroid = Platform.OS == 'android' ? true : false

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={routes.HomeScreen}
                screenOptions={{
                    header: (() => <MainHeader />)
                }}>
                <Stack.Screen name={routes.HomeScreen} component={HomeScreen} />
                <Stack.Screen
                    name={routes.BlogScreen}
                    component={BlogScreen}
                    options={{
                        presentation: 'modal',
                        gestureEnabled: true,
                        ...(isAndroid && TransitionPresets.ModalPresentationIOS)
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default MainStackNavigator;
