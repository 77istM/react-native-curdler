import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 

const Screen = ({ children }) => {
  return (
    // SafeAreaView to ont squashed by screen corner
    <SafeAreaView style={styles.screen} edges={['top', 'bottom', 'left', 'right']}>
      {children}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Screen;