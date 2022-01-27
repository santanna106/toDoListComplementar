import React,{ useState,useRef,useEffect } from 'react';
import { 
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput
 } from 'react-native';

 import trashIcon from '../assets/icons/trash/trash.png';
 import editIcon from '../assets/icons/edit/edit.png';
 import cancelEdit from '../assets/icons/cancelEdit/X.png';
 import Icon from 'react-native-vector-icons/Feather';
 import { Task } from './TasksList';

 interface TaskItemProps{
     index:number;
     item:Task;
     handleTaskDone: (id:number) => void;
     handleTaskRemove: (id:number) => void;
     handleEditTaskItem:(item:Task) => void;
 }

export function TaskItem({
    index,
    item,
    handleTaskDone,
    handleTaskRemove,
    handleEditTaskItem

}:TaskItemProps){

  const [editing,setEditing] = useState(false);
  const [editTitle,setEditTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null)

  function handleToggleTaskDone (id:number){
    handleTaskDone(id);
  }

  function handleRemoveTask (id:number){
    handleTaskRemove(id);
  }

  function handleStartEditing(){
    setEditing(true);
  }

  function handleCancelEditing(){
    setEditTitle(item.title);
    setEditing(false);
  }

  function handleSubmitEditing(){
    handleEditTaskItem(item);
    setEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing])

  return (
    <>
        <View>
            <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => handleToggleTaskDone(item.id)}
            //TODO - use onPress (toggle task) prop
            >
            <View 
                testID={`marker-${index}`}
                style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                //TODO - use style prop 
            >
                { item.done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>

            <TextInput  
             value={editTitle} 
             onChangeText={setEditTitle}
             editable={editing}
             onSubmitEditing={handleSubmitEditing}
             style={ [item.done ? styles.taskTextDone : styles.taskText, {opacity: editing ? 0.2 : 1} ]}
             ref={textInputRef}
                //TODO - use style prop
            />

            </TouchableOpacity>
        </View>
        {
          editing ?
            <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 5,position:'absolute',left:280 }}
                onPress={() => handleCancelEditing()}
                //TODO - use onPress (remove task) prop
            >
                  <Image source={cancelEdit} />
            </TouchableOpacity>
          :
          <View style={styles.containerButton}>
            <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 5 }}
                    onPress={() => handleStartEditing()}
                    //TODO - use onPress (remove task) prop
                >
                    <Image source={editIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 5,borderLeftColor:'rgba(196, 196, 196, 0.24)',borderLeftWidth:2 }}
                onPress={() => handleRemoveTask(item.id)}
                disabled={editIcon}

                //TODO - use onPress (remove task) prop
            >
                <Image source={trashIcon} />
            </TouchableOpacity>

          </View>
        }
       
        
  </> 
  );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    containerButton:{
        flexDirection:'row',
        width: 100
    }
  })