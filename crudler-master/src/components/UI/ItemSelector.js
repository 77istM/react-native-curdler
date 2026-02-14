import { Pressable, StyleSheet, Vibration, View } from 'react-native';

const ItemSelector = ({ children, style, pressedStyle, onSelect }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  const handlePress = () => {
    Vibration.vibrate(5);
    if (onSelect) onSelect();
  };

  // View --------------------------------
  return (
    <Pressable
      onLongPress={handlePress}
      delayLongPress={500}
      style={({ pressed }) => [style, pressed && pressedStyle]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default ItemSelector;