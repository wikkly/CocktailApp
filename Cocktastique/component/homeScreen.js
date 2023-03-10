import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity} from 'react-native';
import { Modal } from 'react-native';

// Page d'accueil
function HomeScreen() {

    const styles = StyleSheet.create({
        title: {
          marginTop: 50,
          marginBottom: 30,
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        },
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111118',
        },
        text: {
            marginTop: 30, 
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#df964a',
          },
          textbottom: {
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 20, 
            color: '#df964a',
          },
        containerbis: {
          flex: 1,
          height : "100%",
          marginLeft: 10,
          marginTop: 20, 
          marginBottom: 0,
          backgroundColor: '#2f263d',
        },
        cocktailContainer: {
          margin: 20,
          marginTop: 60,
          marginBottom: 0,  
          alignItems: 'center',
        },
        cocktailImage: {
          width: 300,
          height: 300,
          borderRadius: 10,
        },
        cocktailTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
          color: 'white',
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "#2f263d",
            borderRadius: 10,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          modalText: {
            marginBottom: 15,
            fontSize: 18,
            textAlign: "center",
            color: "#fff"
          },
          modalTextTitle: {
            marginBottom: 15,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff"
          },
          modalButton: {
            borderRadius: 5,
            padding: 10,
            elevation: 2,
            backgroundColor: "#df964a",
            marginTop: 10,
          },
          modalButtonText: {
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }
      })

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
        for (let i = 0; i < 10; i++) {
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
                  <Image source={require('../assets/menu.png')} style={{ width: 125, height: 125, alignSelf: 'center', justifyContent: 'center'}} />
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
                            .map((ingredientKey) => {
                      const ingredient = selectedCocktail[ingredientKey];
                      return ingredient ? (
                        <Text style={{ color: '#fff', margin: 5 }} key={ingredient}>
                          {ingredient}
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