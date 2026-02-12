import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.infiniteScrollContainer}>

      </View>
      <View style={styles.contentContainer}>
        <Image source={require('@/assets/images/wolt-logo.png')} style={styles.brandLogo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  brandLogo: {  
    width: '100%',
    height: 48,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  infiniteScrollContainer: {
    flex: 0.8
  }
})