import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

export default class PersonnalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteDrinks: [
        { key: '1', name: 'Bière' },
        { key: '2', name: 'Vin rouge' },
        { key: '3', name: 'Whisky' },
      ],
      schedule: [
        { key: '1', time: '18h', event: 'Apéro chez les voisins' },
        { key: '2', time: '20h', event: 'Barbecue chez Toto' },
        { key: '3', time: '22h', event: 'Soirée chez Paul' },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/userpicture.jpg")}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Shrek Smith</Text>
          <Text style={styles.userEmail}>whatanalcoholique@wanadoo.com</Text>
          <Text style={styles.userBio}>
            Shrek Smith, le roi de la marre boueuse, qui préfère se nourrir de bière plutôt que de fromage et de pain.
            Si vous cherchez un partenaire de beuverie, Shrek est votre homme
          </Text>
          <Text style={styles.sectionTitle}>Alcools favoris :</Text>
          <FlatList
            data={this.state.favoriteDrinks}
            renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
            keyExtractor={(item) => item.key}
            style={styles.list}
          />
          <Text style={styles.sectionTitle}>Emploi du temps de beuverie :</Text>
          <FlatList
            data={this.state.schedule}
            renderItem={({ item }) => (
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleTime}>{item.time}</Text>
                <Text style={styles.scheduleEvent}>{item.event}</Text>
              </View>
            )}
            keyExtractor={(item) => item.key}
            style={styles.list}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: 'brokenwhite',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 40,
    margin: 16,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F7DC6F',
    textShadowColor: '#C0392B',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 20,
    color: '#AED6F1',
    textShadowColor: '#2980B9',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 10,
  },
  userBio: {
    fontSize: 18,
    color: '#E6B0AA',
    textShadowColor: '#6E2C00',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E74C3C',
    textShadowColor: '#F1C40F',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    backgroundColor: '#F0F3F4',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 18,
    color: '#2C3E50',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scheduleTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F7DC6F',
    textShadowColor: '#C0392B',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginRight: 10,
  },
  scheduleEvent: {
    fontSize: 18,
    color: '#E74C3C',
    textShadowColor: '#F1C40F',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

