import { StyleSheet, Text, View } from 'react-native';
import ItemSelector from '../../UI/ItemSelector';

const UserItem = ({ user, onSelect }) => {
  return (
    <View style={styles.itemContainer}>
      <ItemSelector 
        onSelect={() => onSelect(user)}
        style={styles.item}
        pressedStyle={styles.pressed}
      >
        <Text style={styles.text}>
          {user.UserFirstname} {user.UserLastname} ({user.UserType})
        </Text>
      </ItemSelector>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 10,
  },
  item: {
    flex: 1,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  pressed: {
    backgroundColor: 'azure',
  },
  text: {
    fontSize: 16,
  },
});

export default UserItem;