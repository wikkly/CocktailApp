import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button, ScrollView } from 'react-native';
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
      routes: [{ name: 'Tous les cocktails - alcool' }],
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
      <ScrollView>
      <Text style={styles.category}>{cocktail.strCategory}</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
      <Text style={styles.modalText}> Ingrédients :</Text>
      <View style={{ flexDirection: "column" }}>
        {Object.keys(cocktail)
        .filter((key) => key.includes('strIngredient'))
        .map((ingredientKey, index) => {
        const ingredient = cocktail[ingredientKey];
        const measureKey = `strMeasure${index + 1}`;
        const measure = cocktail[measureKey];
        return ingredient ? (
        <Text style={styles.ingredient} key={ingredient}>
        <Image source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`}} style={{width: 50, height: 50, alignSelf: "center", justifyContent: "center"}}/>
        {`${ingredient} - ${measure}`}
        </Text>
        ) : null;
        })}
        </View>
        <View style={styles.button}>
      <Button title="Autre cocktails ?" onPress={handlePress} />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#4a4a4a',
    textAlign: 'center',
  },
  category: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ff7f50',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 18,
    marginVertical: 10,
    color: '#4a4a4a',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  ingredient: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4a4a4a',
    paddingHorizontal: 30,
  },
  modalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4a4a4a',
    textAlign: 'center',
  },
  button: {
    marginVertical: 20,
    width: '50%',
    backgroundColor: '#ff7f50',
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#4a4a4a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#f9f9f9',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default CocktailDetailsScreen;
