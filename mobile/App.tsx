import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseSearchScreen from './screens/CourseSearchScreen';

export type RootStackParamList = {
  CourseSearch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CourseSearch"
          component={CourseSearchScreen}
          options={{ title: 'Select Course' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}