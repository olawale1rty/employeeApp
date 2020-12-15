import React from 'react';
import {StyleSheet, View, Text, Image, Linking, Platform, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Title, Card, Button} from 'react-native-paper';
import {MaterialIcons, Entypo} from '@expo/vector-icons'

const Profile = (props) => {
    const {_id, name, email, salary, position, phone, picture} = props.route.params.item

    const deleteEmployee = () => {
        fetch('https://4b1c151e7746.ngrok.io/delete',{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:_id,
            })
        })
        .then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} deleted`)
            props.navigation.navigate('Home')
        })
        .catch(err=>{
            Alert.alert('Unable to delete Employee')
        })
    }

    const openDial = () =>{
        if(Platform.OS === 'android'){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    return(
        <View style={styles.root}>
            <LinearGradient
                colors={['#0033ff','#6bc1ff']}
                style={{height:'20%'}}s
            />
            <View style={{alignItems:'center'}}>
                <Image
                    style={{width:140,height:140,borderRadius:70,marginTop:-50,backgroundColor:'black'}}
                    source={{uri:picture}}
                    />
            </View>
            <View style={{alignItems:'center',margin:15}}>
                <Title>{name}</Title>
                <Text style={styles.myText}>{position}</Text>
            </View>
            <Card style={styles.myCard} onPress={()=>{
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name='email' size={32} color='#006aff'/>
                    <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.myCard} onPress={()=>openDial()}>
                <View style={styles.cardContent}>
                    <Entypo name='phone' size={32} color='#006aff'/>
                    <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name='attach-money' size={32} color='#006aff'/>
                    <Text style={styles.myText}>{salary}</Text>
                </View>
            </Card>
            <View style={{flexDirection:'row',justifyContent:'space-around', padding:10}}>
                <Button icon='account-edit' theme={theme} mode='contained' 
                    onPress={()=>{
                        props.navigation.navigate('Create',
                        {_id, name, email, salary, position, phone, picture})
                    }}>
                    Edit
                </Button>
                <Button icon='delete' theme={theme} mode='contained' onPress={()=>{deleteEmployee()}}>
                    Fire Employee 
                </Button>
            </View>
        </View>
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
    myCard: {
        margin:3,
    },
    cardContent: {
        flexDirection: 'row',
        padding:8
    },
    myText: {
        fontSize:18,
        marginTop:3,
        marginLeft:5
    }
})
export default Profile