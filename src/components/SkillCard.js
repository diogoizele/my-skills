import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

export const SkillCard = ({skill}) => {
  const borderAnimatedRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnimatedRef, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [borderAnimatedRef]);

  const borderColor = borderAnimatedRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4BB543', '#1f1e25'],
  });

  return (
    <Animated.View style={[styles.buttonSkill, {borderColor}]}>
      <Text style={styles.textSkill}>{skill}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textSkill: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSkill: {
    borderWidth: 3,
    borderColor: '#1f1e25',
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
});
