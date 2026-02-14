import { StyleSheet, Pressable } from 'react-native';
import Icons from './Icons';

const Favourite = ({ isFavourite, onToggle }) => {
  return (
    <Pressable onPress={onToggle} style={styles.container}>
      {isFavourite ? <Icons.Heart /> : <Icons.HeartOutline />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

export default Favourite;