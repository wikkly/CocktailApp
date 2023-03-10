import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Page "All cocktails"
function AllCocktailsScreen() {
  const styles = StyleSheet.create({
    drinkContainer: {
      borderWidth: 2,
      borderColor: 'purple',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      flexDirection: "row",
    },
    drinkName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 15, 
    },
    drinkImage: {
      width: 50,
      height: 50,
      marginRight: 10
    }
  });

  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const GetCocktails = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
      const json = await response.json();
      setData(json.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCocktails();
  }, []);

  const handlePress = (id) => {
    navigation.navigate('Details', { id });
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.idDrink}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handlePress(item.idDrink)}>
              <View style={styles.drinkContainer}>
                <Image style={styles.drinkImage} source={{ uri: item.strDrinkThumb }} />
                <Text style={styles.drinkName}>
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

export default AllCocktailsScreen;