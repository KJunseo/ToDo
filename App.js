import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView} from 'react-native';
import ToDo from "./ToDo";
import {AppLoading} from "expo";
import uuidv1 from "uuid/v1"; //uuid version 1

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  //새로운 state 생성
  state={
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };
  componentDidMount=()=>{
    this._loadToDos(); 
  }

  render(){
    const {newToDo, loadedToDos ,toDos} = this.state; //newToDo에 value를 주기
    if(!loadedToDos){
      return <AppLoading/>
    }

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
            onSubmitEditing={this._addToDo}
            >
            </TextInput>
            <ScrollView contentContainerStyle={styles.toDos}> 
              {Object.values(toDos).map(toDo => <ToDo key={toDo.id} {...toDo} deleteToDo={this._deleteToDo}/>)}
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
  _loadToDos =()=>{
    this.setState({
      loadedToDos: true
    })
  }
  _addToDo=()=>{
    const {newToDo} = this.state; //newToDo를 state에서 가져와 
    if(newToDo !==""){ //newToDo가 비어있지 않다면, 뭔가를 해야한다.
      this.setState(prevState=>{
        const ID = uuidv1(); //아이디값을 받아옴 
        const newToDoObject={
          [ID]:{
            id: ID, //받아온 ID값
            isCompleted: false, //새로추가된 new To Do는 아직 완료되지 않았기 때문 
            text: newToDo, //new To Do의 내용
            createAt: Date.now() //만들어진 날짜 
          }
        };
        const newState={
          ...prevState, //이전에 우리가 가지고 있던 것 
          newToDo: "", // + 새로운 To Do 
          toDos: { //toDo 오브젝트
            ...prevState.toDos, //이전의 모든 toDo들 
            ...newToDoObject //새로운 toDo 오브젝트
          }
        };
        return { ...newState};
      });
    }
  }; 
  _deleteToDo=(id)=>{ //삭제를 하려면 id값을 받아와야한다.
    this.setState(prevState=>{
      const toDos= prevState.toDos; //이전 state에서 모든 to do들을 가져온다.
      delete toDos[id]; //id값이 일치하는 항목을 삭제해준다.
      const newState={
        ...prevState,
        ...toDos
      }
      return {...newState};
    })
  }
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
