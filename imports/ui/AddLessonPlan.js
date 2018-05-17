import React from 'react'
import { LessonPlans } from '../api/lessonplans'
import { Requests } from '../api/requests'
import {Meteor} from 'meteor/meteor'

const AddLessonPlans = ()=>{

    return (
        
        <div>
            <form onSubmit = {(e)=>{

                e.preventDefault()

                let slides = []
                const name = e.target.lessonplan.value

                slides[0] = {
                    note:'',
                    iframes: []
                }

                if(name) {
                    LessonPlans.insert({
                        name,
                        slides,
                        userId:this.userId
                    },(err, docs)=>{
                        slides = []

                        slides[0] = {
                            title:'',
                            comments:[],
                            iframes:[]
                        }

                        Requests.insert({_id:docs, slides})
                    })
                } 

                e.target.lessonplan.value = ''

            }}>
                <input type = 'text' name = 'lessonplan' placeholder = 'Name'/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddLessonPlans