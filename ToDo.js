import React,{Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

//풀 컴포넌트를 만들어준다.
//stateless 컴포넌트가 아니라 클래스 컴포넌트를 만드는 이유는 수정 버튼을 누르면 state를 수정모드로 변경해야하기 위함.
//따라서 stateful 컴포넌트가 필요하다.
export default class ToDo extends Component{
    render(){
        return(
            <View>
                <Text>Hello I'm To Do</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});