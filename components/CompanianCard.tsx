import React from 'react'
interface CompanianCardProps{
    id:string;
    name:string;
    topic:string;
    subject:string;
    duration:number;
    color:string;
}
const CompanianCard = ({id , name , topic , subject , duration , color}:CompanianCardProps) => {
  return (
    <div>CompanianCard</div>
  )
}

export default CompanianCard