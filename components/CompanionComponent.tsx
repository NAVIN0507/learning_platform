"use client"
import { cn, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import soundwaves  from "@/constants/soundwaves.json"
interface CompanionComponentPageProps{
    name:string;
    topic:string;
    subject:string;
    title:string;
    duration:number;
    companionId:string;
    userName:string;
    userImage:string;
}
enum CallStatus{
    INACTIVE='INACTIVE',
    CONNECTING='CONNECTING',
    ACTIVE='ACTIVE',
    FINISHED='FINISHED'
}
const CompanionComponent = ({name , topic , companionId  , userImage , userName, subject , title , duration}:CompanionComponentPageProps) => {
  const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setisSpeaking] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  useEffect(()=>{
    if(lottieRef){
        if(isSpeaking){
            lottieRef.current?.play()
        }
        else{
            lottieRef.current?.stop()
        }
    }
  },[isSpeaking , lottieRef])
  useEffect(()=>{
    const onCallStart  = ()=>setcallStatus(CallStatus.ACTIVE);
    const onCallEnd = ()=>setcallStatus(CallStatus.FINISHED);
    const onMessage =()=> {};
    const onSpeechStart = () => setisSpeaking(true);
    const onSpeechEnd = () => setisSpeaking(false);
    const onError = (error:Error) => console.log(error);
    vapi.on('call-start' , onCallStart);
    vapi.on('call-end' , onCallEnd);
    vapi.on('message' , onMessage);
    vapi.on('speech-start' , onSpeechStart);
    vapi.on('speech-end' , onSpeechEnd)
    return ()=>{
        vapi.off('call-start' , onCallStart);
        vapi.off('call-end' , onCallEnd);
        vapi.off('message' , onMessage);
        vapi.off('speech-start' , onSpeechStart);
        vapi.off('speech-end' , onSpeechEnd)
    }
  } , [])
  return (
 <section className='flex flex-col h-[70vh]'>
    <section className='flex gap-8 max-sm:flex-col'>
        <div className='companion-section'>
            <div className='companion-avatar' style={{backgroundColor:getSubjectColor(subject)}}>
                <div className={cn('absolute transition-opacity duration-1000' , callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100':'opacity-0' , callStatus=== CallStatus.CONNECTING && 'animate-pulse opacity-100')}>
                    <Image src={`/icons/${subject}.svg`} alt='subject' width={150} height={150} className='max-sm:w-fit'/>
                </div>
                <div className={cn('absolute , transition-opacity duration-1000' , callStatus === CallStatus.ACTIVE ? 'opacity-100' :'opacity-0')}>
                    <Lottie lottieRef={lottieRef}
                    animationData={soundwaves}
                    autoPlay={false}
                    className='companion-lottie'
                    />
                </div>
            </div>
            <p className='font-bold text-2xl'>{name}</p>
        </div>
    </section>
 </section>
  )
}

export default CompanionComponent