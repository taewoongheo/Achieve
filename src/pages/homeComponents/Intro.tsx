import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ms } from 'react-native-size-matters';
import { dayNames } from '../../context/DateContext';
import { useColors } from '../../context/ThemeContext';
import { fontStyle } from '../../assets/style/fontStyle';
import { useQuery } from '@realm/react';
import { User } from '../../../realm/models';
import { shadow } from '../../assets/style/shadow';

const Intro = (): React.JSX.Element => {
  const { theme, currentTheme } = useColors();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const day = now.getDay();

  const user = useQuery(User)[0];
  let phrase = '';

  for (let i = 0; i < user.phrase.length; i++) {
    const idx = Math.floor(Math.random() * user.phrase.length);
    phrase = user.phrase[idx];
  }

  return (
    <View style={styles.layout}>
      <Text
        style={[
          styles.title,
          fontStyle.fontSizeMain,
          { color: theme.textColor },
        ]}>
        안녕하세요, {user.username}님
      </Text>
      <Text
        style={[
          styles.subTitle,
          fontStyle.fontSizeSub,
          { color: theme.textColor, opacity: 0.7 },
        ]}>
        {year}.{month}.{date}. {dayNames[day]}
      </Text>
      <View
        style={[
          styles.pharseLayout,
          currentTheme === 'light' ? shadow.boxShadow : {},
          {
            backgroundColor: theme.backgroundColor,
          },
        ]}>
        <Text
          style={[
            { color: theme.textColor, lineHeight: ms(22, 0.3) },
            fontStyle.fontSizeSub,
          ]}>
          {phrase}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? ms(7, 0.3) : ms(13, 0.3),
  },
  subTitle: {
    paddingTop: ms(5, 1),
  },
  pharseLayout: {
    marginTop: ms(20, 0.3),
    padding: ms(15, 0.3),
    borderRadius: ms(5, 0.3),
  },
});

export default Intro;
