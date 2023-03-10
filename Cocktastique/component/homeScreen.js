import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity} from 'react-native';
import { Modal } from 'react-native';

// Page d'accueil
function HomeScreen() {
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e1e1e',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: "#352237"
    },
    containerbis: {
      flex: 1,
      backgroundColor: '#1e1e1e',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: 30,
    },
    text: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    textbottom: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
    },
    cocktailContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    cocktailImage: {
      width: 200,
      height: 200,
      borderRadius: 50,
    },
    cocktailTitle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: '#1e1e1e',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      elevation: 5,
    },
    modalTextTitle: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    modalText: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    modalButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: '#3e3e3e',
      marginTop: 20,
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  
    const [isLoading, setLoading] = useState(true);
    const [cocktails, setCocktails] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
  
    const getCocktail = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const json = await response.json();
        return json.drinks ? json.drinks[0] : null;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
  
    useEffect(() => {
      const Get10Cocktails = async () => {
        const newCocktails = [];
        for (let i = 0; i < 30; i++) {
          const cocktail = await getCocktail();
          if (cocktail !== null) {
            newCocktails.push(cocktail);
          }
        }
        setCocktails(newCocktails);
        setLoading(false);
      };
      Get10Cocktails();
    }, []);
  
    const renderCocktail = ({ item }) => {
        return (
            <View style={styles.cocktailContainer}>
              <TouchableOpacity onPress={async () => {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`);
                const json = await response.json();
                setSelectedCocktail(json.drinks[0]);
                setModalVisible(true);
                }}>
                <Image style={styles.cocktailImage} source={{ uri: item.strDrinkThumb }} />
              </TouchableOpacity>
              <Text style={styles.cocktailTitle}>{item.strDrink}</Text>
            </View>
          );
        };
    
    return (
            <View style={styles.container}>
              <Text style={styles.text}> Quoi ? L'alcool c'est pas cool ? Alors pourquoi y'a le mot cool dans l'alcool ? - Patoche </Text>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.containerbis}>
                  <FlatList
                    horizontal={true}
                    data={cocktails}
                    renderItem={renderCocktail}
                    keyExtractor={(item) => item.idDrink}
                  />
                  <Text style={styles.textbottom}> Pour voir les recettes des boissons, cliquez dessus ! </Text>
                  <Image source={require('../assets/menu.png')} style={{ width: 200, height: 200, alignSelf: 'center', justifyContent: 'center', marginBottom: -20}} />
                  {selectedCocktail &&
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalTextTitle}>{selectedCocktail.strDrink}</Text>
                        <Text style={styles.modalText}>{selectedCocktail.strInstructions}</Text>
                        <Text style={styles.modalText}> Ingrédients :</Text>
                        <View style={{ flexDirection: "column" }}>
                        {Object.keys(selectedCocktail)
                            .filter((key) => key.includes('strIngredient'))
                            .map((ingredientKey, index) => {
                      const ingredient = selectedCocktail[ingredientKey];
                      const measureKey = `strMeasure${index + 1}`;
                      const measure = selectedCocktail[measureKey];
                      return ingredient ? (
                        <Text style={{ color: '#fff', margin: 5 }} key={ingredient}>
                        <Image source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`}} style={{width: 50, height: 50}}/>
                          
                        </Text>
                      ) : null;
                    })}
                    </View>
                        <TouchableOpacity
                          style={styles.modalButton}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setSelectedCocktail(null);
                          }}
                        >
                          <Text style={styles.modalButtonText}>Fermer</Text>
                        </TouchableOpacity>
                      </View>
                    </View> 
                  </Modal>}
                </View>
              )}
            </View>
          );  
}

export default HomeScreen