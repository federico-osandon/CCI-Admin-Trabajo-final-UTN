import { useState ,useEffect } from 'react'
import { getFirestore } from '../../../firebase/firebaseConfig'

function useGetAlumn() {
    const [alumList, setAlumList] = useState([])
    const [loading, setLoading] = useState(false)
    const db = getFirestore()
    useEffect(() => {
        setLoading(true)
        db.collection('alumnos').get()
        .then(resp => 
            setAlumList(resp.docs.map(alu => ({...alu.data(), id: alu.id })))
        )
        .catch(err=> console.log(err))
        .finally(()=> setLoading(true))
        
    }, [])
    return [alumList, setAlumList, loading]
}

export default useGetAlumn
