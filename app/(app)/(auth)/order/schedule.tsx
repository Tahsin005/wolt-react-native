import { Colors } from '@/constants/theme';
import { Host, HStack, Picker } from '@expo/ui/swift-ui';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Schedule = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const in2Days = new Date(today);
  in2Days.setDate(in2Days.getDate() + 2);
  const in3Days = new Date(today);
  in3Days.setDate(in3Days.getDate() + 3);

  const nextDays = [
    'Today',
    `${tomorrow.getDate()}.${tomorrow.getMonth() + 1}`,
    `${in2Days.getDate()}.${in2Days.getMonth() + 1}`,
    `${in3Days.getDate()}.${in3Days.getMonth() + 1}`,
  ];
  const nextTimes = Array.from({ length: 24 * 12 }, (_, i) => {
    const hour = Math.floor(i / 12);
    const minute = (i % 12) * 5;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const handleConfirm = () => {
    router.dismiss();
  };
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <Host style={{ height: 200 }}>
          <HStack>
            <Picker
              variant="wheel"
              options={nextDays}
              selectedIndex={selectedDay}
              onOptionSelected={({ nativeEvent: { index } }) => {
                setSelectedDay(index);
              }}
            />
            <Picker
              variant="wheel"
              options={nextTimes}
              selectedIndex={selectedTime}
              onOptionSelected={({ nativeEvent: { index } }) => {
                setSelectedTime(index);
              }}
            />
          </HStack>
        </Host>
      ) : (
        <View style={styles.androidPickerContainer}>
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerHeader}>Day</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {nextDays.map((day, index) => (
                <TouchableOpacity
                  key={day}
                  style={[styles.pickerItem, selectedDay === index && styles.pickerItemActive]}
                  onPress={() => setSelectedDay(index)}>
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedDay === index && styles.pickerItemTextActive,
                    ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerHeader}>Time</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {nextTimes.map((time, index) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.pickerItem, selectedTime === index && styles.pickerItemActive]}
                  onPress={() => setSelectedTime(index)}>
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedTime === index && styles.pickerItemTextActive,
                    ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Schedule;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 40,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(255, 255, 255)',
  },
  androidPickerContainer: {
    flexDirection: 'row',
    height: 300,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  pickerColumn: {
    flex: 1,
    paddingTop: 16,
  },
  pickerHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  pickerItem: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  pickerItemActive: {
    backgroundColor: '#f0f9ff',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#000',
  },
  pickerItemTextActive: {
    color: Colors.secondary,
    fontWeight: '700',
  },
});
