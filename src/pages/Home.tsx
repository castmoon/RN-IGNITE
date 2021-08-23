import React, {useState, useEffect} from 'react';
import { 
    View,
     Text, 
     StyleSheet, 
     TextInput, 
     Platform,
     FlatList,
     StatusBar
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export interface ISkillData {
    id: string;
    name: string;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<ISkillData[]>([]);
    const [greeting, setGreeting] = useState('');

    function handleAddSkill () {
        const data: ISkillData = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldSkills => [...oldSkills, data]);
    }

    function handleRemoveSkill (id: string) {
        setMySkills(oldstate => oldstate.filter(skill => skill.id !== id));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if(currentHour < 12) {
            setGreeting('Good moorning!');
        }
        else if(currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon!');
        }
        else {
            setGreeting('Good night!');
        }
    }, [])

    return (
        <View style= {styles.container}>
            <Text style = {styles.title}>
                Welcome, Guilherme
            </Text>
            <Text style = {{color: '#fff'}}>
                {greeting}
            </Text>
            <TextInput
                style ={styles.input}
                placeholder = 'New Skill' 
                placeholderTextColor = '#555'
                onChangeText = {setNewSkill}  
            />

        <Button title ='Add' onPress ={handleAddSkill} disabled ={newSkill.length > 0 ? false : true}/>
        <Text style={[styles.title, { marginTop: 20 }]}>My Skills</Text>

        <FlatList 
            data = {mySkills}
            keyExtractor = {item => item.id}
            renderItem = {({ item }) => (
                <SkillCard skill ={item.name} onPress ={() => handleRemoveSkill(item.id)}/>
            )}
            showsVerticalScrollIndicator = {false} 
        />
        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30
    }
})