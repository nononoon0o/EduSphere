import { useState } from 'react';
import Collapsible from 'react-native-collapsible/Collapsible'; // ✅ use correct import
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function CustomCollapsible({ title = 'Details', children }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.content}>{children}</View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  content: {
    paddingTop: 10,
  },
});
