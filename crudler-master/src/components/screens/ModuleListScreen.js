import { useState, useEffect } from 'react';
import { StyleSheet, LogBox, Text, View, Alert, ActivityIndicator } from 'react-native';
import Screen from '../layout/Screen';
import ModuleList from '../entity/modules/ModuleList';
import { Button, ButtonTray } from '../UI/Button';
import Icons from '../UI/Icons';
import API from '../API/API';
import useLoad from '../../hooks/useLoad';
import useStore from '../store/useStore';

// Warning for passing functions in navigation params
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const API_URL = 'https://softwarehub.uk/unibase/api/modules';

export const ModuleListScreen = ({ navigation }) => {
  // Initialisations ---------------------
  const [modules, setModules, isLoading, loadModules] = useLoad(API_URL);
  
  // Persist Favourites
  const [favourites, , saveFavourites] = useStore('ModuleFavourites', []);

  // Handlers ----------------------------
  const handleAdd = () => {
    const onAdd = async (module) => {
      const result = await API.post(API_URL, module);
      if (result.isSuccess) {
        loadModules();
        navigation.goBack();
      } else {
        Alert.alert('Add Error', result.message);
      }
    };
    navigation.navigate('ModuleAddScreen', { onAdd });
  };

  const handleSelect = (module) => {
    const onDelete = async (module) => {
      const result = await API.delete(`${API_URL}/${module.ModuleID}`);
      if (result.isSuccess) {
        loadModules();
        navigation.goBack();
      } else {
        Alert.alert('Delete Error', result.message);
      }
    };

    const onModify = async (module) => {
      const result = await API.put(`${API_URL}/${module.ModuleID}`, module);
      if (result.isSuccess) {
        loadModules();
        navigation.navigate('ModuleViewScreen', { module }); 
      } else {
        Alert.alert('Modify Error', result.message);
      }
    };

    navigation.navigate('ModuleViewScreen', { module, onDelete, onModify });
  };

  const handleFavourite = (id) => {
    const newFavourites = favourites.includes(id)
      ? favourites.filter((favId) => favId !== id)
      : [...favourites, id];
    saveFavourites(newFavourites);
  };

  // View --------------------------------
  const augmentedModules = modules.map((module) => ({
    ...module,
    isFavourite: favourites.includes(module.ModuleID),
  }));

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <ButtonTray>
          <Button 
            label="Add Module" 
            icon={<Icons.Add />} 
            onClick={handleAdd}
            style={styles.addButton}
            labelStyle={styles.addButtonLabel}
          />
        </ButtonTray>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>Retrieving records from {API_URL}</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ModuleList 
          modules={augmentedModules} 
          onSelect={handleSelect} 
          onFavourite={handleFavourite} 
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
    gap: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //App View look
  addButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    width: '100%', 
    elevation: 0, 
  },
  addButtonLabel: {
    color: 'black',
  },
});

export default ModuleListScreen;