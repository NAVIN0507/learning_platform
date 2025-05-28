"use client"
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import soundwaves  from "@/constants/soundwaves.json"
import { Repeat } from 'lucide-react';
interface CompanionComponentPageProps{
    name:string;
    topic:string;
    subject:string;
    title:string;
    duration:number;
    companionId:string;
    userName:string;
    userImage:string;
    voice:string;
    style:string;
}
enum CallStatus{
    INACTIVE='INACTIVE',
    CONNECTING='CONNECTING',
    ACTIVE='ACTIVE',
    FINISHED='FINISHED'
}
const CompanionComponent = ({name , topic , companionId  , voice , style ,  userImage , userName, subject, title , duration}:CompanionComponentPageProps) => {
  const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setisSpeaking] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [messages, setmessages] = useState<SavedMessage[]>([])
  const [isMuted, setisMuted] = useState(false)
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
    const onMessage =(message:Message)=> {
        if(message.type === 'transcript' && message.transcriptType === 'final'){
            const newMessage = {role:message.role , content:message.transcript};
            setmessages((prev) => [newMessage , ...prev])
        }
    };
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
  } , []);
  const toggleMicrophone = ()=>{
    const isMuted  = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setisMuted(!isMuted)
  }
  const handleConnect = async()=>{
    setcallStatus(CallStatus.CONNECTING)
    const assistentOverrides = {
        variableValues:{
            subject , topic , style
        },
        clientMessages :['transcript'],
        serverMessages:[],
    }//@ts-ignore
    vapi.start(configureAssistant(voice , style) , assistentOverrides)
  }
  const handelDisconnect = async()=>{
    setcallStatus(CallStatus.FINISHED)
    vapi.stop()
  }
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
        <div className='user-section'>
            <div className='user-avatar'>
                <Image src={userImage} alt='user' width={130} height={130} className='rounded-xl'/>
                <p className='font-bold text-2xl'>{userName}</p>
            </div>
            <div className='flex gap-2'>
            <button className='btn-mic' onClick={toggleMicrophone} disabled={callStatus!==CallStatus.ACTIVE}>
                <Image src={isMuted ? '/icons/mic-off.svg':'/icons/mic-on.svg'} alt='mic' width={36} height={36}/>
                <p className='max-sm:hidden'>{isMuted? 'Turn on MicroPhone' :'Turn off MicroPhone'}</p>
            </button>
            <button className='btn-mic' onClick={handleConnect}>
                <Repeat className='mt-3'/>
                <p className='max-sm:hidden'>Repeat the session</p>
            </button>
            </div>
            <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white' , callStatus===CallStatus.ACTIVE ? 'bg-red-700':'bg-orange-500' , callStatus===CallStatus.CONNECTING && 'animate-pulse')}
            onClick={callStatus===CallStatus.ACTIVE ? handelDisconnect : handleConnect}
            >
                {callStatus === CallStatus.ACTIVE ? "End Lesson" : callStatus === CallStatus.CONNECTING ? "Connecting..." :  'Start Lesson'}
            </button>
        </div>
    </section>
    <section className='transcript'>
        <div className='transcript-message no-scrollbar'>
           {messages.map((message)=>{
            if(message.role === 'assistant'){
                return(
                    <p key={message.content} className='max-sm:text-sm'>{name.split('')[0].replace('/[.,]/g' , '')}:{message.content}</p>
                )
            }
            else{
              return(  <p key={message.content} className='text-primary max-sm:text-sm'>
                    {userName} :{message.content}
                </p>)
            }
           })}
        </div>
        <div className='transcript-fade'/> 
    </section>
 </section>
  )
}

export default CompanionComponent