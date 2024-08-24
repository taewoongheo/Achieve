import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useDateContext } from '../../context/DateContext';
import { days } from '../../context/DateContext';
import { useColors } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { makeWeekCalendar, selectedCheck } from '../../utils/makeWeekCalendar';

const WeekCalender = (): React.ReactElement => {
  const { theme } = useColors();
  const { setTaskDate, taskDate } = useDateContext();
  const week = makeWeekCalendar();

  return (
    <View style={styles.layout}>
      {week.map((value, index) => {
        const isToday: boolean = selectedCheck(value, taskDate);
        return (
          <Pressable
            key={index}
            onPress={() => {
              setTaskDate(value);
            }}
            style={[
              styles.btn,
              isToday ? { backgroundColor: theme.textColor } : {},
            ]}>
            <Text
              style={[
                styles.days,
                { color: theme.textColor },
                { marginBottom: ms(3, 0.3) },
                isToday ? { color: theme.backgroundColor } : {},
              ]}>
              {days[index]}
            </Text>
            <Text
              style={[
                styles.days,
                { color: theme.textColor },
                isToday ? { color: theme.backgroundColor } : {},
              ]}>
              {value.date}
            </Text>
            {value.isInclude ? (
              <Icon
                name='circle-medium'
                style={[
                  styles.days,
                  { color: theme.textColor },
                  isToday ? { color: theme.backgroundColor } : {},
                ]}></Icon>
            ) : (
              <></>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginVertical: ms(10, 0.3),
    marginHorizontal: ms(9, 0.3),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(5, 0.3),
    marginHorizontal: ms(2, 0.3),
    borderRadius: ms(5, 0.3),
  },
  days: {
    fontFamily: 'Pretendard-Regular',
  },
});

export default WeekCalender;
