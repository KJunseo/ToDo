import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform} from 'react-native';

const { height, width } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Text style={styles.title}>To Do App</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder={"New To Do"}></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {    //아이폰일 경우
        shadowColor:"rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1, //쉐도우가 위아래로 왔다갔다 하지 않게하기 위함.
          width: 0 //border부분에 쉐도우가 있게하기 위함 
        }
      },
      android: {   //안드로이드일 경우 
        elevation: 3
      }
    })
  },
  input: {

  }
});
