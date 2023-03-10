import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CocktailSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const searchCocktails = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`)
      .then(response => response.json())
      .then(data => setCocktails(data.drinks))
      .catch(error => console.error(error));
  };

  const renderCocktail = ({ item }) => (
    <TouchableOpacity style={styles.cocktailContainer}>
        <Image source={{ uri : item.strDrinkThumb }} style={{width:50, height:50}} />
      <Text style={styles.cocktailName}>{item.strDrink}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={setSearchText}
        onSubmitEditing={searchCocktails}
        value={searchText}
        placeholder="Search for cocktails"
        placeholderTextColor="#aaa"
      />
      {cocktails.length > 0 && (
        <FlatList
          data={cocktails}
          renderItem={renderCocktail}
          keyExtractor={item => item.idDrink}
          style={styles.cocktailList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cocktailList: {
    flex: 1,
  },
  cocktailContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    flexDirection: 'row'
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10
  },
  cocktailInstructions: {
    fontSize: 14,
    color: '#666',
  },
});

export default CocktailSearch;