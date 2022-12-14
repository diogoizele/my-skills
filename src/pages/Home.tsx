import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  Keyboard,
  StatusBar,
  Alert,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export const Home = () => {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    if (!newSkill) {
      Alert.alert("You can't add an empty skill. Please, type a skill name.");
      return;
    }
    setMySkills(skillsList => [...skillsList, data]);

    setNewSkill('');
    Keyboard.dismiss();
  }

  function handleRemoveSkill(id: string) {
    setMySkills(skillsList => skillsList.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours() - 3;

    console.log(currentHour);

    if (currentHour < 12) {
      setGreetings('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Good afternoon');
    } else {
      setGreetings('Good night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent />
      <Text style={styles.title}>Welcome, Diogo</Text>
      <Text style={styles.greetings}>{greetings}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />
      <Button title="Add" onPress={handleAddSkill} />

      <Text style={[styles.title, {marginVertical: 30}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <SkillCard {...item} onPress={() => handleRemoveSkill(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    borderRadius: 7,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
  },
  greetings: {
    color: '#fff',
    fontSize: 16,
  },
});
