import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal, Alert, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
const CreateEmployee = ({navigation, route}) => {
    const updateDetails = () => {
        fetch('https://4b1c151e7746.ngrok.io/update',{
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                picture,
                salary,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is updated successfully`)
            navigation.navigate('Home')
        })
        .catch(err=>{
            Alert.alert('Unable to update')
        })
    }
    const getDetails = (type) => {
        if(route.params){
            switch(type){
                case('name'):
                    return route.params.name
                case('phone'):
                    return route.params.phone
                case('email'):
                    return route.params.email
                case('salary'):
                    return route.params.salary
                case('picture'):
                    return route.params.picture
                case('position'):
                    return route.params.position
                default:
                    return ""
            }
        }
        return ""
    }
    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [position, setPosition] = useState(getDetails("position"))
    const [modal, setModal] = useState(false)
    const [enableShift, setEnableShift] = useState(false)

    const submitData = () => {
        fetch('https://4b1c151e7746.ngrok.io/send-data',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                picture,
                salary,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved successfully`)
            navigation.navigate('Home')
        })
        .catch(err=>{
            Alert.alert('Unable to save')
        })
    }

    const pickFromGallery = async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:1
            })
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`text/${data.uri.split('.')[1]}`,
                    name:`text.${data.uri.split('.')[1]}`
                }
                handleUpload(newFile)
            }
        }else{
            Alert.alert('Please, give access to your gallery')
        }
    }

    const pickFromCamera = async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA);
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:1
            })
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`text/${data.uri.split('.')[1]}`,
                    name:`text.${data.uri.split('.')[1]}`
                }
                handleUpload(newFile)
            }
        }else{
            Alert.alert('Please, give access to your camera')
        }
    }

    const handleUpload = (image) => {
        const imageData = new FormData()
        imageData.append('file',image)
        imageData.append('upload_preset','employeeApp')
        imageData.append('cloud_name','dzisnule2')

        fetch('https://api.cloudinary.com/v1_1/dzisnule2/image/upload',{
            method:'post',
            body:imageData
        }).then(res=>res.json())
        .then(data=>{
            setPicture(data.url)
            setModal(false)
        })
        .catch(err=>{
            Alert.alert('Unable to upload image')
        })
    }

    return(
        <KeyboardAvoidingView behavior='position' enabled={enableShift} style={styles.root}>
            <View >
                
                <TextInput
                    label='Name'
                    style={styles.inputStyle}
                    value={name}
                    onFocus={()=>setEnableShift(false)}
                    theme={theme}
                    mode='outlined'
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label='Email'
                    style={styles.inputStyle}
                    value={email}
                    theme={theme}
                    onFocus={()=>setEnableShift(false)}
                    mode='outlined'
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label='Phone'
                    style={styles.inputStyle}
                    value={phone}
                    keyboardType='number-pad'
                    theme={theme}
                    onFocus={()=>setEnableShift(false)}
                    mode='outlined'
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    label='Salary'
                    style={styles.inputStyle}
                    value={salary}
                    theme={theme}
                    onFocus={()=>setEnableShift(true)}
                    mode='outlined'
                    onChangeText={text => setSalary(text)}
                />
                <TextInput
                    label='Position'
                    style={styles.inputStyle}
                    value={position}
                    theme={theme}
                    onFocus={()=>setEnableShift(true)}
                    mode='outlined'
                    onChangeText={text => setPosition(text)}
                />
                <Button style={styles.inputStyle} theme={theme} icon={picture==""?'upload':'check'} mode='contained' onPress={()=> setModal(true)}>
                    Upload Image
                </Button>
                {   
                    route.params?
                    <Button style={styles.inputStyle} theme={theme} icon='content-save' mode='contained' onPress={()=> updateDetails()}>
                        Update details
                    </Button>:
                    <Button style={styles.inputStyle} theme={theme} icon='content-save' mode='contained' onPress={()=> submitData()}>
                        Save
                    </Button>
                }
                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={modal}
                    onRequestClose={()=>setModal(false)}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button theme={theme} icon='camera' mode='contained' onPress={()=> pickFromCamera()}>
                                Camera
                            </Button>
                            <Button theme={theme} icon='image-area' mode='contained' onPress={()=> pickFromGallery()}>
                                Gallery
                            </Button> 
                        </View>
                        <Button theme={theme} onPress={()=> setModal(false)}>
                            Cancel
                        </Button>
                    </View>
                </Modal>
                
            </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors: {
        primary: '#006aff'
    }
}
const styles = StyleSheet.create({
    root: {
        flex:1
    },
    inputStyle: {
        margin:5
    },
    modalButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    modalView: {
        position: 'absolute',
        bottom: 2,
        width: '100%',
        backgroundColor: 'white'
    }
})

export default CreateEmployee
