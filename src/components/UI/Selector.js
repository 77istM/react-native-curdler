import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 

export const Selector = ({ label, items, selectedValue, onValueChange, isLoading = false }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      {isLoading ? (
        <View style={styles.itemLoading}>
          <Text style={styles.itemLoadingText}>Loading records...</Text>
        </View>
      ) : (
        <View style={styles.itemInput}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            mode="dropdown"
          >
            {items.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 15,
  },
  itemLabel: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 5,
  },
  itemInput: {
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
  },
  itemLoading: {
    backgroundColor: 'mistyrose',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    padding: 15, 
  },
  itemLoadingText: {
    color: 'grey',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default Selector;