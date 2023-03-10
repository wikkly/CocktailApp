import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CocktailSearch = () => {
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
    cocktailImage: {
     width:50,
     height: 50,
     borderRadius: 15,
    }
  });

  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const searchCocktails = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`);
      const json = await response.json();
      setCocktails(json.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchCocktails();
  }, []);

  const handlePress = (id) => {
    navigation.navigate('Détails', { id });
  };

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
       keyExtractor={(item) => item.idDrink}
       style={styles.cocktailList}
       renderItem={({item}) => (
         <TouchableOpacity onPress={() => handlePress(item.idDrink)}>
           <View style={styles.cocktailContainer}>
             <Image style={styles.cocktailImage} source={{ uri: item.strDrinkThumb }} />
             <Text style={styles.cocktailName}>
               {item.strDrink}
             </Text>
           </View>
         </TouchableOpacity>
       )}
     />
   )}
 </View>
);
};

export default CocktailSearch;