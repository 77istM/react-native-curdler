import Screen from '../layout/Screen';
import UserView from '../entity/users/UserView';

export const UserViewScreen = ({ navigation, route }) => {
  const { user, onDelete, onModify } = route.params;

  const gotoModifyScreen = () => {
    navigation.replace('UserModifyScreen', { user, onModify });
  };

  return (
    <Screen>
      <UserView 
        user={user} 
        onDelete={onDelete} 
        onModify={gotoModifyScreen} 
      />
    </Screen>
  );
};

export default UserViewScreen;