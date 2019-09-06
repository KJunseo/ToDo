import React,{Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");
 
//풀 컴포넌트를 만들어준다.
//stateless 컴포넌트가 아니라 클래스 컴포넌트를 만드는 이유는 수정 버튼을 누르면 state를 수정모드로 변경해야하기 위함.
//따라서 stateful 컴포넌트가 필요하다.
export default class ToDo extends Component{

    state={
        isEditing: false,     //수정모드인지 그냥 모드인지를 나타내는 state
        isCompleted : false   //완료/미완료를 나타내는 state
    }
    render(){
        const {isCompleted, isEditing} = this.state; //현재 state 값으로 isCompleted 설정

        return(
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}> 
                        <View style={[
                            styles.circle, 
                            isCompleted ? styles.completedCircle : styles.uncompletedCircle
                            ]}>
                        </View>
                    </TouchableOpacity>
                    <Text style={[
                        styles.text, 
                        isCompleted ? styles.completedText : styles.uncompletedText
                        ]}>Hello I'm To Do</Text>
                </View>
                
                        {isEditing ?  /*수정할때 모드 */
                            <View style={styles.actions}>
                                <TouchableOpacity onPressOut={this._finishEditing}>
                                    <View style={styles.actionContainer}>
                                        <Text style={styles.actionText}>✅</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> 
                        : /*수정하지 않을 때 모드 */
                            <View style={styles.actions}>
                                <TouchableOpacity onPressOut={this._startEditing}>
                                    <View style={styles.actionContainer}>
                                        <Text style={styles.actionText}>✏️</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.actionContainer}>
                                        <Text style={styles.actionText}>❌</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> 
                        }
                
            </View>
        );
    }
    _toggleComplete=()=>{
        this.setState(prevState=>{ 
            return { 
                isCompleted: !prevState.isCompleted
            }
        })
    }
    _startEditing=()=>{
        this.setState({
            isEditing: true
        })
    }
    _finishEditing=()=>{
        this.setState({
            isEditing: false
        })
    }
}

const styles = StyleSheet.create({
    //card와 비슷한 디자인인데, card보다 조금 작게 디자인한다. 리스트처럼보이는 게 목적 
    container: {
        width: width-50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",  //수정 아이콘이 바로 옆에 생성되게 하기 위함.
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width / 2
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: { //margin을 주는 이유, 아이콘만 정확하게 클릭하기 힘들기 때문에, 그 주변까지 인식되도록 하기위함 
        marginVertical: 10,
        marginHorizontal: 10
    }
});