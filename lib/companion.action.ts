"use server"
import { auth } from "@clerk/nextjs/server"
import { createSupaBaseClient } from "./supabase";

export const createCompanion = async(formData :  CreateCompanion)=>{
const {userId:author}  = await auth();
const supabase = createSupaBaseClient();
const {data , error} = await supabase.from('companions').insert({...formData , author}).select();
if(error || !data) throw new Error(error?.message || 'Failed to create a Companion');
return data[0];
}



export const getAllCompanions = async({limit=10 , page =1 , subject , topic}:GetAllCompanions)=>{
    const supabase = createSupaBaseClient();
    let query = supabase.from('companions').select();
    if(subject && topic){
        query = query.ilike('subject' , `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    else if(subject){
        query = query.ilike('subject' , `%${subject}%`)
    }
    else if(topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    query = query.range((page-1)*limit , page*limit-1);
    const {data : companions , error} = await query;
    if(error) {
        console.log(error)
    }
    return companions
} 

export const getCompanion  = async(id:string)=>{
    const supabase = createSupaBaseClient();
const {data : companion , error} =     await supabase.from("companions").select()
    .eq('id' , id);
    if(error) console.log(error);
    if(!companion) return null;
    return companion[0];
}

export const addtoSessionHistory =async(companionId:string)=>{
    const {userId}  = await auth();
    const supabase = createSupaBaseClient();
    const {data , error} = await supabase.from('session_history').insert({
        companion_id:companionId,
        user_id:userId
    })
    if(error) throw new Error(error.message);
    return data;
}

export const getRecentsession  = async()=>{
    const supabase = createSupaBaseClient();
    const {data , error} = await supabase.from('session_history').select(`companions:companion_id (*)`).order('created_at' , {ascending:false})
    if(error) throw new Error(error?.message);
    return data.map(({companions})=>companions);
}
export const getUserSession  = async(userId:string , limit = 10)=>{
    const supabase = createSupaBaseClient();
    const {data , error} = await supabase.from('session_history').select(`companions:companion_id (*)`).eq('user_id' , userId).order('created_at' , {ascending:false})
    if(error) throw new Error(error?.message);
    return data.map(({companions})=>companions);
} 
export const getUserCompanion = async(userId:string)=>{
    const supabase = createSupaBaseClient();
    const {data , error} = await supabase.from('companions').select()
    if(error) throw new Error(error?.message);
    return data;
}

export const newCompanionPermissions = async()=>{
    
}