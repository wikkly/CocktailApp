import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

const UserPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [favoritePhrase, setFavoritePhrase] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 50 }}
        source={require('../assets/screenuser.jpg')}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={text => setName(text)}
        value={name}
        placeholder='Name'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={text => setSurname(text)}
        value={surname}
        placeholder='Surname'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={text => setFavoritePhrase(text)}
        value={favoritePhrase}
        placeholder='Favorite alcoholic phrase'
      />
      <TouchableOpacity
        style={{ backgroundColor: 'grey', padding: 10, borderRadius: 5, marginTop: 30}}
        onPress={() => navigation.navigate('Random Cocktail')}
      >
        <Text style={{ color: 'white'}}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPage;