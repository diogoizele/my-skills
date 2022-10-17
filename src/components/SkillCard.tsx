import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface SkillCardProps extends TouchableOpacityProps {
  id: string;
  name: string;
}

export const SkillCard = ({name, ...rest}: SkillCardProps) => {
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
    <TouchableOpacity {...rest}>
      <Animated.View style={[styles.buttonSkill, {borderColor}]}>
        <Text style={styles.textSkill}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
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
