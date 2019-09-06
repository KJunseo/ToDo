import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView} from 'react-native';
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  //새로운 state 생성
  state={
    newToDo: ""
  };

  render(){
    const {newToDo} = this.state; //newToDo에 value를 주기

    return ( 
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.title}>To Do App</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"} 
            value={newToDo} 
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"} 
            returnKeyType={"done"}
            autoCorrect={false}
            >
            </TextInput>
            <ScrollView contentContainerStyle={styles.toDos}> 
              <ToDo></ToDo>
            </ScrollView>
        </View> 
      </View>
    );
  }

  //텍스트 값을 받아오는 함수를 하나 생성한다.
  _controlNewToDo = text=>{
    this.setState({
      newToDo: text
    });
  };
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
        elevation: 3  //아이폰일 경우 보다 옵션이 제한적 / 0~5 까지의 숫자 / 숫자가 클수록 쉐도우가 강한 것 
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
