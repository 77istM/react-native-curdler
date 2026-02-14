import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icons from './src/components/UI/Icons';

// Module Screens
import ModuleListScreen from './src/components/screens/ModuleListScreen';
import ModuleViewScreen from './src/components/screens/ModuleViewScreen';
import ModuleAddScreen from './src/components/screens/ModuleAddScreen';
import ModuleModifyScreen from './src/components/screens/ModuleModifyScreen';

// User Screens
import UserListScreen from './src/components/screens/UserListScreen';
import UserViewScreen from './src/components/screens/UserViewScreen';
import UserAddScreen from './src/components/screens/UserAddScreen';
import UserModifyScreen from './src/components/screens/UserModifyScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Helper for the Menu Button 
const MenuButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
    <Icons.Menu />
  </TouchableOpacity>
);

// Module Stack Workflow 
const ModuleStack = ({ navigation }) => {
  return (
    <Stack.Navigator 
      initialRouteName='ModuleListScreen'
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen 
        name='ModuleListScreen' 
        component={ModuleListScreen} 
        options={{ 
          title: 'Module Crudler', 
          headerLeft: () => <MenuButton navigation={navigation} /> 
        }} 
      />
      <Stack.Screen name='ModuleViewScreen' component={ModuleViewScreen} options={{ title: 'View Module' }} />
      <Stack.Screen name='ModuleAddScreen' component={ModuleAddScreen} options={{ title: 'Add Module' }} />
      <Stack.Screen name='ModuleModifyScreen' component={ModuleModifyScreen} options={{ title: 'Modify Module' }} />
    </Stack.Navigator>
  );
};

//User Stack Workflow
const UserStack = ({ navigation }) => {
  return (
    <Stack.Navigator 
      initialRouteName='UserListScreen'
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen 
        name='UserListScreen' 
        component={UserListScreen} 
        options={{ 
          title: 'User Crudler', 
          headerLeft: () => <MenuButton navigation={navigation} /> 
        }} 
      />
      <Stack.Screen name='UserViewScreen' component={UserViewScreen} options={{ title: 'View User' }} />
      <Stack.Screen name='UserAddScreen' component={UserAddScreen} options={{ title: 'Add User' }} />
      <Stack.Screen name='UserModifyScreen' component={UserModifyScreen} options={{ title: 'Modify User' }} />
    </Stack.Navigator>
  );
};

// Main App Component
export const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName='UserCrudler'
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: 'azure',
            drawerActiveTintColor: 'dodgerblue',
          }}
        >
          <Drawer.Screen 
            name="UserCrudler" 
            component={UserStack} 
            options={{ title: 'User Crudler' }} 
          />
          <Drawer.Screen 
            name="ModuleCrudler" 
            component={ModuleStack} 
            options={{ title: 'Module Crudler' }} 
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    paddingRight: 15,
  },
});

export default App;