import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, orderBy, startAt, endAt } from 'firebase/firestore';
import { db } from '../firebase';

type Course = {
  id:   string;
  name: string;
  city: string;
};

export default function CourseSearchScreen() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const col = collection(db, 'courses');

      const q = search.trim()
        ? query(
            col,
            orderBy('name'),
            startAt(search),
            endAt(search + '\uf8ff')
          )
        : col;

      const snap = await getDocs(q);
      setCourses(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Course,'id'>) })));
    };

    fetchCourses();
  }, [search]);

  const renderItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.city}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search courses…"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <FlatList
        data={courses}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input:     { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 },
  row:       { paddingVertical: 10 },
  title:     { fontSize: 16, fontWeight: '600' },
  subtitle:  { color: '#666' },
});