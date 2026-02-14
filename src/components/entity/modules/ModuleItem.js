import { StyleSheet, Text, View } from 'react-native';
import ItemSelector from '../../UI/ItemSelector';
import Favourite from '../../UI/Favourite';

const ModuleItem = ({ module, onSelect, onFavourite }) => {
  return (
    <View style={styles.itemContainer}>
      <Favourite 
        isFavourite={module.isFavourite} 
        onToggle={() => onFavourite(module.ModuleID)} 
      />
      <ItemSelector 
        onSelect={() => onSelect(module)}
        style={styles.item}
        pressedStyle={styles.pressed}
      >
        <Text style={styles.text}>
          {module.ModuleCode} {module.ModuleName}
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

export default ModuleItem;