import Screen from '../layout/Screen';
import UserForm from '../entity/users/UserForm';

export const UserAddScreen = ({ navigation, route }) => {
  const { onAdd } = route.params;
  const handleCancel = () => navigation.goBack();

  return (
    <Screen>
      <UserForm onSubmit={onAdd} onCancel={handleCancel} />
    </Screen>
  );
};

export default UserAddScreen;