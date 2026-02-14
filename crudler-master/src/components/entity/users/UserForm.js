import { useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import Icons from '../../UI/Icons';
import { Button, ButtonTray } from '../../UI/Button';
import { Form, InputText } from '../../UI/Form';
import Selector from '../../UI/Selector'; 
import useLoad from '../../../hooks/useLoad';

const defaultUser = {
  UserID: null,
  UserFirstname: '',
  UserLastname: '',
  UserEmail: '',
  UserImageURL: '',
  UserUsertypeID: null, 
  UserYearID: null,     
  UserLevel: 3,         
  UserRegistered: 0,    
  UserPassword: '',     
};

const UserForm = ({ originalUser, onSubmit, onCancel }) => {
  const [user, setUser] = useState(originalUser || defaultUser);
  
  // Dynamic data
  const [userTypes, , isTypesLoading] = useLoad('https://softwarehub.uk/unibase/api/usertypes');
  const [years, , isYearsLoading] = useLoad('https://softwarehub.uk/unibase/api/years');

  const isModify = !!originalUser;
  const submitLabel = isModify ? "Modify" : "Add";
  const submitIcon = isModify ? <Icons.Edit /> : <Icons.Add />;

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = () => {
    if (!user.UserFirstname || !user.UserLastname || !user.UserEmail || !user.UserUsertypeID) {
      Alert.alert('Validation Error', 'Name, Email and User Type are required.');
      return;
    }
    onSubmit(user);
  };

  // Map API data to Selector options
  const userTypeOptions = userTypes ? userTypes.map((type) => ({
    value: type.UsertypeID,
    label: type.UsertypeName,
  })) : [];

  const yearOptions = years ? years.map((year) => ({
    value: year.YearID,
    label: year.YearName,
  })) : [];

  const levelOptions = [
    { value: 3, label: '3 (Foundation)' },
    { value: 4, label: '4 (First Year)' },
    { value: 5, label: '5 (Second Year)' },
    { value: 6, label: '6 (Final Year)' },
    { value: 7, label: '7 (Masters)' },
  ];

  const registeredOptions = [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' },
  ];

  return (
    <Form>
      <InputText 
        label="First Name" 
        value={user.UserFirstname} 
        onChange={(val) => handleChange('UserFirstname', val)} 
      />
      <InputText 
        label="Last Name" 
        value={user.UserLastname} 
        onChange={(val) => handleChange('UserLastname', val)} 
      />
      <InputText 
        label="Email" 
        value={user.UserEmail} 
        onChange={(val) => handleChange('UserEmail', val)} 
      />
      
      <Selector
        label="User Type"
        items={userTypeOptions}
        selectedValue={user.UserUsertypeID}
        onValueChange={(val) => handleChange('UserUsertypeID', val)}
        isLoading={isTypesLoading}
      />

      <Selector
        label="Year"
        items={yearOptions}
        selectedValue={user.UserYearID}
        onValueChange={(val) => handleChange('UserYearID', val)}
        isLoading={isYearsLoading}
      />

      <Selector
        label="Level"
        items={levelOptions}
        selectedValue={user.UserLevel}
        onValueChange={(val) => handleChange('UserLevel', val)}
      />

      <Selector
        label="Registered"
        items={registeredOptions}
        selectedValue={user.UserRegistered}
        onValueChange={(val) => handleChange('UserRegistered', val)}
      />

      {/* Password field- only for Add, or optional update */}
      <InputText 
        label="Password" 
        value={user.UserPassword} 
        onChange={(val) => handleChange('UserPassword', val)} 
      />

      <InputText 
        label="Image URL" 
        value={user.UserImageURL} 
        onChange={(val) => handleChange('UserImageURL', val)} 
      />

      <ButtonTray>
        <Button label={submitLabel} icon={submitIcon} onClick={handleSubmit} />
        <Button label="Cancel" icon={<Icons.Close />} onClick={onCancel} style={styles.cancelButton} />
      </ButtonTray>
    </Form>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: 'grey',
  },
});

export default UserForm;