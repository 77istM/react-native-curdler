import { StyleSheet, Text, View, Alert } from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';
import { Button, ButtonTray } from '../../UI/Button';
import Icons from '../../UI/Icons';

const ModuleView = ({ module, onDelete, onModify }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  const handleDelete = () => onDelete(module);

  const requestDelete = () => Alert.alert(
    "Delete Warning",
    `Are you sure you want to delete module ${module.ModuleCode} ${module.ModuleName}?`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: handleDelete }
    ]
  );

  // View --------------------------------
  return (
    <View style={styles.container}>
      <FullWidthImage source={{ uri: module.ModuleImageURL }} style={styles.image} />

      <View style={styles.infoTray}>
        <Text style={styles.boldText}>
          {module.ModuleCode} {module.ModuleName}
        </Text>
        <Text style={styles.text}>Level {module.ModuleLevel}</Text>
        <Text style={styles.text}>
          {module.ModuleLeaderName} <Text style={styles.dimText}>(Module Leader)</Text>
        </Text>
      </View>

      <ButtonTray>
        <Button 
          label="Modify" 
          icon={<Icons.Edit />} 
          onClick={() => onModify(module)} 
        />
        <Button 
          label="Delete" 
          icon={<Icons.Delete />} 
          onClick={requestDelete}
          style={styles.deleteButton} 
        />
      </ButtonTray>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  image: {
    borderRadius: 3,
  },
  infoTray: {
    gap: 5,
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dimText: {
    color: 'grey',
  },
  deleteButton: {
    backgroundColor: 'crimson',
  },
});

export default ModuleView;