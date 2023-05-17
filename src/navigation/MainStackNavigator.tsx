import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { routes } from '../utilities/routes';
import HomeScreen from '../screens/HomeScreen';
import { Platform } from 'react-native';
import BlogScreen from '../screens/BlogScreen';

const Stack = createStackNavigator();

function MainStackNavigator(): JSX.Element {
    let isAndroid = Platform.OS == 'android' ? true : false

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={routes.HomeScreen}
                screenOptions={{
                    //header: (() => <Header />)
                }}>
                <Stack.Screen name={routes.HomeScreen} component={HomeScreen} />
                <Stack.Screen
                    name={routes.BlogScreen}
                    component={BlogScreen}
                    options={{
                        //header: (() => <FilterHeader />),
                        presentation: 'modal',
                        gestureEnabled: true,
                        ...(isAndroid && TransitionPresets.ModalPresentationIOS)
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default MainStackNavigator;
