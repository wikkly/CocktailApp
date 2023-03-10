import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CocktailDetailsScreen({ route }) {
  const [isLoading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);

  const navigation = useNavigation();
  
  let id = null;
  if (route && route.params && route.params.id) {
    id = route.params.id;
  }

  const fetchCocktail = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await response.json();
      setCocktail(json.drinks[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCocktail();
    } else {
      setLoading(false);
    }
  }, [id]);

  
  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'All cocktails' }],
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!cocktail) {
    return (
      <View style={styles.container}>
       <Image source={require("../assets/logo.png")} style={{width: 500, height: 500, justifyContent: "center", alignSelf: "center"}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: cocktail.strDrinkThumb }} />
      <Text style={styles.name}>{cocktail.strDrink}</Text>
      <Text style={styles.category}>{cocktail.strCategory}</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
      <Text style={styles.modalText}> Ingrédients :</Text>
      <View style={{ flexDirection: "column" }}>
        {Object.keys(cocktail)
        .filter((key) => key.includes('strIngredient'))
        .map((ingredientKey) => {
        const ingredient = cocktail[ingredientKey];
        return ingredient ? (
        <Text style={styles.ingredient} key={ingredient}>
        {ingredient}
        </Text>
        ) : null;
        })}
        </View>
        <View style={styles.button}>
      <Button title="All Cocktails" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      alignItems: 'center',
      backgroundColor: '#df964a'
    },
    image: {
      width: 300,
      height: 300,
      marginBottom: 20,
      borderRadius: 20
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#3f0743'
    },
    category: {
      fontSize: 18,
      fontStyle: 'italic',
      marginBottom: 30,
      color: '#3f0743'
    },
    instructions: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 50,
      color: '#3f0743'
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#3f0743'
    },
    ingredient: {
      color: 'black',
      margin: 5
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center'
    },
    button: {
        marginTop: 30, 
        backgroundColor: '#3f0743',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
  });

export default CocktailDetailsScreen;
