import { Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {styles} from '../styles'

function IconButton({ icon, label, pressFn }) {
  return (
    <Pressable style={styles.iconButton} onPress={pressFn}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{ label }</Text>
    </Pressable>
  );
}

export default IconButton;
