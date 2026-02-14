import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Icons from '../../UI/Icons';
import { Button, ButtonTray } from '../../UI/Button';
import { Form, InputText } from '../../UI/Form';
import Selector from '../../UI/Selector'; 
import useLoad from '../../../hooks/useLoad'; 

const defaultModule = {
  ModuleID: null,
  ModuleCode: null,
  ModuleName: null,
  ModuleLevel: null,
  ModuleLeaderID: null,
  ModuleLeaderName: null,
  ModuleImageURL: null,
  ModuleYearID: null,
};

const ModuleForm = ({ originalModule, onSubmit, onCancel }) => {
  const [module, setModule] = useState(originalModule || defaultModule);
  
  // Finding additional data for selectors
  const [years, , isYearsLoading] = useLoad('https://softwarehub.uk/unibase/api/years');
  const [staff, , isStaffLoading] = useLoad('https://softwarehub.uk/unibase/api/users/staff');

  const isModify = !!originalModule;
  const submitLabel = isModify ? "Modify" : "Add";
  const submitIcon = isModify ? <Icons.Edit /> : <Icons.Add />;

  const handleChange = (field, value) => {
    setModule({ ...module, [field]: value });
  };

  const handleSubmit = () => {
    // Validation
    if (!module.ModuleCode || !module.ModuleName || !module.ModuleLevel || !module.ModuleYearID) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
    
    // Module Code Validation: LLNNNN
    if (!/^[A-Za-z]{2}\d{4}$/.test(module.ModuleCode)) {
      Alert.alert('Validation Error', 'Module Code must be in format LLNNNN (e.g. CI6330).');
      return;
    }

    // Module Name Validation: > 8 chars
    if (module.ModuleName.length <= 8) {
      Alert.alert('Validation Error', 'Module Name must be longer than 8 characters.');
      return;
    }

    // Module Image URL Validation
    if (module.ModuleImageURL && !/^(http|https):\/\/[^ "]+$/.test(module.ModuleImageURL)) {
       Alert.alert('Validation Error', 'Module Image must be a valid URL.');
       return;
    }

    console.log("Submitting module:", module); 
    onSubmit(module);
  };

  // Options for Selectors
  const levels = [
    { value: 3, label: '3 (Foundation)' },
    { value: 4, label: '4 (First Year)' },
    { value: 5, label: '5 (Second Year)' },
    { value: 6, label: '6 (Final Year)' },
    { value: 7, label: '7 (Masters)' },
  ];

  const yearOptions = years ? years.map((year) => ({
    value: year.YearID,
    label: year.YearName,
  })) : [];

  const staffOptions = staff ? staff.map((user) => ({
    value: user.UserID,
    label: `${user.UserFirstname} ${user.UserLastname}`,
  })) : [];

  return (
    <Form>
      <InputText 
        label="Module Code" 
        value={module.ModuleCode} 
        onChange={(val) => handleChange('ModuleCode', val)} 
      />
      <InputText 
        label="Module Name" 
        value={module.ModuleName} 
        onChange={(val) => handleChange('ModuleName', val)} 
      />
      
      {/* Level Selector static data */}
      <Selector
        label="Module Level"
        items={levels}
        selectedValue={module.ModuleLevel}
        onValueChange={(val) => handleChange('ModuleLevel', val)}
      />

      {/* Leader Selector  */}
      <Selector
        label="Module Leader"
        items={staffOptions}
        selectedValue={module.ModuleLeaderID}
        onValueChange={(val) => handleChange('ModuleLeaderID', val)}
        isLoading={isStaffLoading}
      />

      {/* Year Selector  */}
      <Selector
        label="Module Year"
        items={yearOptions}
        selectedValue={module.ModuleYearID}
        onValueChange={(val) => handleChange('ModuleYearID', val)}
        isLoading={isYearsLoading}
      />

      <InputText 
        label="Module Image URL" 
        value={module.ModuleImageURL} 
        onChange={(val) => handleChange('ModuleImageURL', val)} 
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

export default ModuleForm;