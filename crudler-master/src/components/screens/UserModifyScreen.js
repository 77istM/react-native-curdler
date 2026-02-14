import Screen from '../layout/Screen';
import UserForm from '../entity/users/UserForm';

export const UserModifyScreen = ({ navigation, route }) => {
  const { user, onModify } = route.params;
  const handleCancel = () => navigation.goBack();

  const handleModify = (updatedUser) => {
    onModify(updatedUser);
    navigation.replace('UserViewScreen', { user: updatedUser });
  };

  return (
    <Screen>
      <UserForm 
        originalUser={user} 
        onSubmit={handleModify} 
        onCancel={handleCancel} 
      />
    </Screen>
  );
};

export default UserModifyScreen;