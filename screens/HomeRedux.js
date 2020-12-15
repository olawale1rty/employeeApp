import React,{useEffect} from 'react';
import {StyleSheet, View, Text, Image, FlatList, Alert,} from 'react-native';
import {Card, FAB} from 'react-native-paper'
import {useSelector, useDispatch} from 'react-redux'

function Home(props){
    const dispatch = useDispatch()
    const {data, loading} = useSelector((state)=>{
        return state
    })

    const fetchData = () =>{
        fetch('http://10.0.2.2:5000/')
        .then(res=>res.json())
        .then(results=>{
            dispatch({type:'ADD_DATA',payload:results})
            dispatch({type:'SET_LOADING',payload:false})
        })
        .catch(err=>Alert.alert('Something went wrong'))
    }

    useEffect(()=>{
        fetchData()
    },[])

    const renderList = (item) => {
        return(
            <Card style={styles.myCard} onPress={()=>{props.navigation.navigate('Profile',{item})}}>
                <View style={styles.cardView}>
                    <Image
                    style={{width: 60, height: 60, borderRadius:30, backgroundColor: 'black'}}
                    source={{uri: item.picture}}
                    />
                    <View style={{marginLeft: 7}}>
                        <Text style={styles.text1}>{item.name}</Text>
                        <Text style={styles.text2}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    }
    return(
        <View style={{flex:1}}>
            
            <FlatList
                data={data}
                renderItem={({item})=>{
                    return renderList(item)
                }}
                keyExtractor={item=> String(item._id)}
                onRefresh={()=>fetchData()}
                refreshing={loading}
            />                
            
            <FAB
                onPress={()=>{props.navigation.navigate('Create')}}
                style={styles.fab}
                theme={{colors:{accent: '#006aff'}}}
                small={false}
                icon='plus'
            />            
        </View>
    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text1: {
        fontSize:20,
        fontWeight: 'bold'
    },
    text2: {
        fontSize:18,
        fontWeight: 'bold'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right:0,
        bottom:0
    }
})

export default Home