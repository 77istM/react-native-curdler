import { StyleSheet, Text, View } from 'react-native';
import ItemSelector from './ItemSelector'; 

export const Button = ({ label, icon, onClick, style, labelStyle }) => {
  return (
    <ItemSelector
      onSelect={onClick}
      style={[styles.button, style]}
      pressedStyle={styles.pressed}
    >
      {icon ? icon : null}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </ItemSelector>
  );
};

export const ButtonTray = ({ children, style }) => {
  return (
    <View style={[styles.buttonTray, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    gap: 5,
  },
  pressed: {
    backgroundColor: 'azure', // Visual feedback colour
    elevation: 5,             // Shadow effect
    opacity: 0.8,             // Slight transparency
  },
  label: {
    fontSize: 16,
    color: 'white', 
  },
  buttonTray: {
    flexDirection: 'row',
    gap: 15,
      justifyContent: 'center',
  },
});