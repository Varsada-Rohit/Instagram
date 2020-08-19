import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore'

export default function useUserProvider() {
    const [loading, setLoading] = useState(false)

    const addUser = async (userInfo) =>{
        setLoading(true);
        const result = await firestore().collection('users').doc(userInfo.email).set({name : userInfo.name,username:userInfo.username,bio:'',profile : ""}).catch((error)=>{
            console.log('error while adding user',error);
        })
        setLoading(false)
    }

    return ({loading,addUser})
}
