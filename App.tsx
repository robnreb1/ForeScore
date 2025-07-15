import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// load env vars (Cursor’s bundler already supports .env)
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

export default function App() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    // fetch all rows from the courses table
    supabase
      .from('courses')
      .select('*')
      .then(({ data, error }) => {
        if (error) console.error(error);
        setCourses(data || []);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginBottom: 8 }}>
            {item.name} — {item.country}
          </Text>
        )}
        ListEmptyComponent={<Text>No courses yet 😬</Text>}
      />
    </SafeAreaView>
  );
}