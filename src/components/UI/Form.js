import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export const Form = ({ children, style }) => {
  return (
    <KeyboardAvoidingView style={styles.formContainer}>
      <ScrollView contentContainerStyle={[styles.formItems, style]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const InputText = ({ label, value, onChange }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.itemInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  formItems: {
    gap: 15,
  },
  item: {
    gap: 5,
  },
  itemLabel: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 5,
  },
  itemInput: {
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});