import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';
import { BottomSheetFlatList, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { TaskDate, useDateContext } from '../context/DateContext';
import { calculateStartAndEndDayOfMonth } from '../../utils/calStartEndWeek';
import { days } from '../context/DateContext';

const MonthCalendar = (): React.ReactElement => {
  const dateContext = useDateContext();

  const { dismiss } = useBottomSheetModal();
  const [curYear, setCurYear] = useState(dateContext.taskDate.year);
  const [curMonth, setCurMonth] = useState(dateContext.taskDate.month);
  const [monthDays, setMonthDays] = useState<TaskDate[]>([]);

  //추가해야 하는 기능 = "오늘" 버튼 누르면 오늘로 초기화.
  //현재 컴포넌트 내부에서 컨텍스트를 변경할 수 있어야 함.

  useEffect(() => {
    handleMoveMonth(0);
  }, []);

  useEffect(() => {
    const [
      startWeekDateOfMonth,
      lastWeekDateOfMonth,
      lastDayOfMonth,
      lastDayOfPrevMonth,
    ] = calculateStartAndEndDayOfMonth(curYear, curMonth);

    const printDays: TaskDate[] = [];
    let date = startWeekDateOfMonth;
    let idx = 0;
    let includeCurMonth = date == 1 ? true : false;
    let startWeek = true;
    let lastWeek = false;
    let lastWeekCnt = 0;
    let changed = false;
    const t = true;
    while (t) {
      if (date == lastWeekDateOfMonth && changed) {
        lastWeek = true;
      }
      if (startWeek) {
        if (date == lastDayOfPrevMonth + 1) {
          date = 1;
          includeCurMonth = true;
        }
        if (idx == 7) {
          changed = true;
          startWeek = false;
        }
      } else if (lastWeek) {
        if (date == lastDayOfMonth + 1) {
          date = 1;
          includeCurMonth = false;
        }
        if (lastWeekCnt == 7) {
          break;
        }
        lastWeekCnt += 1;
      }
      printDays[idx] = {
        year: curYear,
        month: curMonth,
        date: date,
        isActive: includeCurMonth,
      };
      date += 1;
      idx += 1;
    }

    setMonthDays(printDays);
  }, [curYear, curMonth]);

  const calYM = (year: number, month: number, m: number): number[] => {
    let ry = year;
    let rm = month + m;
    if (rm == 0) {
      ry = year - 1;
      rm = 12;
    } else if (rm == 13) {
      ry = year + 1;
      rm = 1;
    }
    return [ry, rm];
  };

  const handleMoveMonth = (m: number) => {
    const [ry, rm] = calYM(curYear, curMonth, m);
    setCurYear(ry);
    setCurMonth(rm);
  };

  const renderItem: ListRenderItem<TaskDate> = ({ item, index }) => {
    if (!item.isActive) {
      return (
        <Pressable style={{ flex: 1 }}>
          <View style={styles.cell}>
            <Text style={{ color: '#949494', fontSize: ms(15, 0.3) }}>
              {item.date}
            </Text>
          </View>
        </Pressable>
      );
    }
    return (
      <Pressable
        onPress={() => {
          index = index % 7;
          dateContext.setTaskDate({
            year: item.year,
            month: item.month,
            date: item.date,
            day: index,
          });
          dismiss();
        }}
        style={{ flex: 1 }}>
        <View style={styles.cell}>
          <Text style={{ color: 'white', fontSize: ms(15, 0.3) }}>
            {item.date}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#282828',
        flex: 1,
        padding: ms(8, 0.3),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: ms(5, 0.3),
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleMoveMonth(-1);
          }}>
          <View>
            <Text style={{ color: 'white' }}>icl</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.ym}>
          {curYear}년 {curMonth}월
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleMoveMonth(1);
          }}>
          <View>
            <Text style={{ color: 'white' }}>icr</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {days.map(value => {
            return (
              <View style={[styles.cell]}>
                <Text style={styles.daysfont}>{value}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <BottomSheetFlatList
            style={{ flex: 1 }}
            data={monthDays}
            numColumns={7}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: ms(10, 0.3), //좌우 버튼크기
    color: 'white',
  },
  ym: {
    fontWeight: '600',
    color: 'white',
    fontSize: ms(18, 0.3),
  },
  cell: {
    padding: ms(12, 0.3), //요일 박스 크기
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysfont: {
    fontSize: ms(15, 0.3),
    color: 'white',
    fontWeight: '200',
    opacity: 0.87,
  },
});

export default MonthCalendar;
