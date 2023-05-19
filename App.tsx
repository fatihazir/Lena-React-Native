
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { SharedContextProvider } from './src/store/context/SharedContext';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import Overlay from './src/components/overlay';
import GlobalLoading from './src/components/globalLoading';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <SharedContextProvider>
        <MainStackNavigator />
        <Overlay />
        <GlobalLoading />
      </SharedContextProvider>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
