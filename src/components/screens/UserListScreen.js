import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';
import Screen from '../layout/Screen';
import UserList from '../entity/users/UserList';
import { Button, ButtonTray } from '../UI/Button';
import Icons from '../UI/Icons';
import API from '../API/API'; 
import useLoad from '../../hooks/useLoad'; 

const API_URL = 'https://softwarehub.uk/unibase/api/users';

export const UserListScreen = ({ navigation }) => {
  const [users, setUsers, isLoading, loadUsers] = useLoad(API_URL);

  const handleAdd = () => {
    const onAdd = async (user) => {
      const result = await API.post(API_URL, user);
      if (result.isSuccess) {
        loadUsers();
        navigation.goBack();
      } else {
        Alert.alert('Add Error', result.message);
      }
    };
    navigation.navigate('UserAddScreen', { onAdd });
  };

  const handleSelect = (user) => {
    const onDelete = async (userToDelete) => {
      const result = await API.delete(`${API_URL}/${userToDelete.UserID}`);
      if (result.isSuccess) {
        loadUsers();
        navigation.goBack();
      } else {
        Alert.alert('Delete Error', result.message);
      }
    };

    const onModify = async (userToUpdate) => {
      const result = await API.put(`${API_URL}/${userToUpdate.UserID}`, userToUpdate);
      if (result.isSuccess) {
        loadUsers();
        navigation.navigate('UserViewScreen', { user: userToUpdate }); 
      } else {
        Alert.alert('Modify Error', result.message);
      }
    };

    navigation.navigate('UserViewScreen', { user, onDelete, onModify });
  };

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <ButtonTray>
          <Button 
            label="Add User" 
            icon={<Icons.Add />} 
            onClick={handleAdd} 
            style={styles.addButton}
            labelStyle={styles.addButtonLabel}
          />
        </ButtonTray>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>Loading Users...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <UserList users={users} onSelect={handleSelect} />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: '100%',
    elevation: 0,
  },
  addButtonLabel: {
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserListScreen;