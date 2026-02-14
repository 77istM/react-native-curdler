import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { Button, ButtonTray } from '../../UI/Button';
import Icons from '../../UI/Icons';

const UserView = ({ user, onDelete, onModify }) => {
  
  const requestDelete = () => Alert.alert(
    "Delete Warning",
    `Are you sure you want to delete ${user.UserFirstname} ${user.UserLastname}?`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDelete(user) }
    ]
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.UserImageURL }} style={styles.image} resizeMode="cover" />

      <View style={styles.infoTray}>
        <Text style={styles.boldText}>
          {user.UserFirstname} {user.UserLastname}
        </Text>
        <Text style={styles.text}>{user.UserEmail}</Text>
        <Text style={styles.text}>
          Level: {user.UserLevel || 'N/A'} 
          {user.UserYearID ? ` (Year ID: ${user.UserYearID})` : ''}
        </Text>
        <Text style={styles.text}>
          Type ID: {user.UserUsertypeID} | Registered: {user.UserRegistered === 1 ? 'Yes' : 'No'}
        </Text>
      </View>

      <ButtonTray>
        <Button 
          label="Modify" 
          icon={<Icons.Edit />} 
          onClick={() => onModify(user)} 
        />
        <Button 
          label="Delete" 
          icon={<Icons.Delete />} 
          onClick={requestDelete}
          style={styles.deleteButton} 
        />
      </ButtonTray>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  image: {
    width: '100%',
    height: 300, 
    borderRadius: 3,
  },
  infoTray: {
    gap: 5,
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'crimson',
  },
});

export default UserView;