import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, BackHandler } from 'react-native';
import { 
  Button, 
  Card, 
  Title, 
  Paragraph, 
  ActivityIndicator,
  Portal,
  Modal,
  IconButton,
  RadioButton,
  Text,
} from 'react-native-paper';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchRooms } from '../services/api';
import { Dropdown } from 'react-native-paper-dropdown';
import { Room, RoomAvailability, TimeSlot } from '../types/Room';

const RoomListingScreen = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sortedRooms, setSortedRooms] = useState<Room[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>("08:00");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'level' | 'capacity' | 'availability'>('level');
  const [loading, setLoading] = useState(false);
  const [tempSortBy, setTempSortBy] = useState<'level' | 'capacity' | 'availability'>('level');

  // Time slots array for the dropdown
  const timeSlots: TimeSlot[] = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  useEffect(() => {
    // loadRooms();
  }, [selectedDate]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Prevents default back action
    });
    loadRooms();
    return () => backHandler.remove();
  }, []);

  // UpdateRooms when sortBy or TimeSlot changes
  useEffect(() => {
    const sortedRooms = sortRooms(rooms);
    setSortedRooms(sortedRooms);
  }, [sortBy, selectedTimeSlot]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await fetchRooms(selectedDate);
      setRooms(data);
      const sortedRooms = sortRooms(data);
      setSortedRooms(sortedRooms);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortRooms = (rooms: Room[]) => {
    switch (sortBy) {
      case 'level':
        return [...rooms].sort((a, b) => parseInt(a.level) - parseInt(b.level));
      case 'capacity':
        return [...rooms].sort((a, b) => parseInt(b.capacity) - parseInt(a.capacity));
      case 'availability':
        return [...rooms].sort((a, b) => 
          (b.availability[selectedTimeSlot] === "1" ? 1 : 0) - 
          (a.availability[selectedTimeSlot] === "1" ? 1 : 0)
        );
      default:
        return rooms;
    }
  };

  const handleReset = () => {
    setTempSortBy('level');
  };

  const handleApply = () => {
    setSortBy(tempSortBy);
    setSortModalVisible(false);
  };

  const renderRoom = ({ item }: { item: Room }) => (
    <Card style={{ margin: 8, backgroundColor: '#f6f6f6' }}>
    <Card.Content>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>{item.name}</Title>
        <Text 
          style={{
            fontStyle: 'italic',
            color: item.availability[selectedTimeSlot] === "1" ? 'green' : 'red', // Green for available, red for occupied
          }}
        >
          {item.availability[selectedTimeSlot] === "1" ? 'Available' : 'Occupied'}
        </Text>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <Paragraph>Level {item.level}</Paragraph>
        <Paragraph>Capacity: {item.capacity}</Paragraph>
      </View>
    </Card.Content>
  </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Title>Book a Room</Title>
        </View>
        <IconButton
          icon="camera"
          onPress={() => router.push('/qr-scanner-screen')}
        />
      </View>
      
      {/* Date Picker */}
      <View style={{ marginBottom: 16 }}>
        <Button 
          mode="outlined" 
          onPress={() => setShowDatePicker(true)}
          style={{ marginBottom: 8 }}
        >
          {selectedDate.toLocaleDateString()}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}

        {/* Time Slot Picker */}
        <View style={{ marginTop: 8 }}>
          <Dropdown
            label="Select Time Slot"
            mode="outlined"
            value={selectedTimeSlot}
            onSelect={(value?: string) => value && setSelectedTimeSlot(value as TimeSlot)}
            options={timeSlots.map(time => ({ label: time, value: time }))}
          />
        </View>
      </View>

      {/* Rooms +  Sort Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title> Rooms</Title>
        <IconButton
          icon="sort"
          onPress={() => setSortModalVisible(true)}
        />
      </View>

      {/* FlatList of Rooms */}
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={sortedRooms}
          extraData={sortedRooms}
          renderItem={renderRoom}
          keyExtractor={item => item.name}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}

      {/* Sort Modal */}
      <Portal>
        <Modal
          visible={sortModalVisible}
          onDismiss={() => setSortModalVisible(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            margin: 20,
            borderRadius: 8
          }}
        >
          <Title>Sort by</Title>
          <RadioButton.Group onValueChange={value => setTempSortBy(value as typeof sortBy)} value={tempSortBy}>
            <RadioButton.Item label="Level" value="level" />
            <RadioButton.Item label="Capacity" value="capacity" />
            <RadioButton.Item label="Availability" value="availability" />
          </RadioButton.Group>
          
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16, gap: 8 }}>
            <Button onPress={handleReset} mode="outlined">
              Reset
            </Button>
            <Button onPress={handleApply} mode="contained">
              Apply
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
  },
});

export default RoomListingScreen;