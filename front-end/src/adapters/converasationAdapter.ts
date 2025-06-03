import { converstation, UserProfile } from "../components/Profile/types";
import { adaptuserProfile, addaptProfileforapi, ApiUserProfile } from "./profileAdapter";


export interface conversationApi{
    success:boolean;
    message:string;
    conversations?:{
        _id:string;
        participants:ParticipantApi[];
        createdAt:string;
        updatedAt:string;
    };
}
export interface conversationApiarray{
    success:boolean;
    message:string;
    conversations?:{
        _id:string;
        participants:ParticipantApi[];
        createdAt:string;
        updatedAt:string;
    }[];
}

export interface ParticipantApi{
    _id:string;
    id:ApiUserProfile;
    isOnline:boolean;
}


export const adaptConverstation=(conversation:conversationApi):converstation=>{
    return{
        id:conversation.conversations?._id||'',
        participants:conversation.conversations?.participants?.map(participant=>({
            user:adaptuserProfile(participant.id),
            isOnline:participant.isOnline
        }))||[],
        createdAt:new Date(conversation.conversations?.createdAt||''),
        updatedAt:new Date(conversation.conversations?.updatedAt||'')
    }
}
export const adaptconversationforapi=(converstation:Partial<converstation>):Partial<conversationApi>=>{

    const converstationapi:Partial<conversationApi>={
        success:true,
        message:'converstation fetched successfully',
        conversations:{
            _id:converstation.id||'',
            participants:[],
            createdAt:converstation.createdAt?.toISOString()||'',
            updatedAt:converstation.updatedAt?.toISOString()||''
        }
    }
    if(converstation.participants!==undefined) converstationapi.conversations!.participants=converstation.participants
    .map(participant=>{
        return{
            id:addaptProfileforapi(participant.user) as ApiUserProfile,
            isOnline:participant.isOnline
        }
    }) as ParticipantApi[];
    if(converstation.createdAt!==undefined) converstationapi.conversations!.createdAt=converstation.createdAt.toISOString();
    if(converstation.updatedAt!==undefined) converstationapi.conversations!.updatedAt=converstation.updatedAt.toISOString();
    return converstationapi;
}

export const safeadaptconverstation=(conversation:conversationApi|conversationApiarray):any=>{
    console.log('conversation from safeadaptconverstation',conversation);
    if(Array.isArray(conversation.conversations)){
        return (conversation as conversationApiarray).conversations?.map(conv=>{
            return{
                id:conv._id,
                participants:conv.participants.map(participant=>({
                    user:adaptuserProfile(participant.id),
                    isOnline:participant.isOnline
                })),
                createdAt:new Date(conv.createdAt),
                updatedAt:new Date(conv.updatedAt)
            }
        });
    }
    else if(  typeof conversation.conversations==='object'){
        const filtredresponse=adaptConverstation(conversation as conversationApi);
        console.log('filtredresponse from safeadaptconverstation',filtredresponse);
        return filtredresponse;
    }
    
}