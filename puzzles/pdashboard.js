import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function PuzzleDashboard() {
  const [view, setView] = useState('dashboard');
  const ratingHistory = [1500, 1520, 1550, 1580, 1600];

  const Card = ({ children, style }) => (
    <View style={[{ backgroundColor: '#111', padding: 18, borderRadius: 20, marginBottom: 14, shadowColor: '#00e5ff', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 }, style]}>
      {children}
    </View>
  );

  if (view === 'problem') {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={{ marginBottom: 14 }}>
          <Text style={{ color: '#00e5ff', fontSize: 20 }}>← Back</Text>
        </TouchableOpacity>
        <Card>
          <Text style={{ color: '#ccc', fontSize: 14, fontStyle: 'italic' }}>Source: <Text style={{ color: '#00e5ff' }}>2014 PUMaC Algebra A #7</Text></Text>
          <Text style={{ color: '#ffcc00', fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>Rating: 2050</Text>
          <Text style={{ color: '#ccc', fontSize: 12, marginTop: 4 }}>Skip Power: 4000   |   Hint Tokens: 30</Text>
        </Card>
        <Card>
          <Text style={{ color: '#00e5ff', fontSize: 22, fontWeight: 'bold', marginBottom: 6 }}>Daily Puzzle – Maximize the Sum!</Text>
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Date: August 13, 2025</Text>
          <Text style={{ color: '#ccc', fontSize: 14, marginBottom: 10 }}>Genre: Algebra / Optimization</Text>
          <Text style={{ color: '#fff', fontSize: 18, lineHeight: 26 }}>
            x, y, and z are positive real numbers that satisfy x³ + 2y³ + 6z³ = 1. Let k be the maximum possible value of 2x + y + 3z. Let n be the smallest positive integer such that kⁿ is an integer. Find the value of kⁿ + n.
          </Text>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Your Rating: <Text style={{ color: '#ffcc00' }}>{ratingHistory[ratingHistory.length - 1]}</Text></Text>
      </Card>

      <Card>
        <Text style={{ color: '#fff', fontSize: 20, marginBottom: 10, fontWeight: '600' }}>📈 Rating Progress</Text>
        <LineChart
          data={{
            labels: ratingHistory.map((_, i) => `Day ${i + 1}`),
            datasets: [{ data: ratingHistory }]
          }}
          width={screenWidth - 64}
          height={220}
          chartConfig={{
            backgroundColor: '#111',
            backgroundGradientFrom: '#111',
            backgroundGradientTo: '#111',
            decimalPlaces: 0,
            color: () => '#00e5ff',
            labelColor: () => '#ccc',
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#00e5ff'
            }
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </Card>

     
      <TouchableOpacity
        style={{ backgroundColor: '#00e5ff', padding: 18, borderRadius: 50, alignItems: 'center', shadowColor: '#00e5ff', shadowOpacity: 0.8, shadowOffset: { width: 0, height: 6 }, shadowRadius: 14 }}
        onPress={() => setView('problem')}
      >
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>🚀 Go to Puzzle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}