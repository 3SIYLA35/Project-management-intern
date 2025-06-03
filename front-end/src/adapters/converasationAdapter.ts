import { converstation, UserProfile } from "../components/Profile/types";
import { adaptuserProfile, addaptProfileforapi, ApiUserProfile } from "./profileAdapter";


export interface conversationApi{
    success:boolean;
    message:string;
    conversation?:{
        _id:string;
        participants:ParticipantApi[];
        createdAt:string;
        updatedAt:string;
    };
}
export interface conversationApiarray{
    success:boolean;
    message:string;
    conversation:{
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
        id:conversation.conversation?._id||'',
        participants:conversation.conversation?.participants?.map(participant=>({
            user:adaptuserProfile(participant.id),
            isOnline:participant.isOnline
        }))||[],
        createdAt:new Date(conversation.conversation?.createdAt||''),
        updatedAt:new Date(conversation.conversation?.updatedAt||'')
    }
}
export const adaptconversationforapi=(converstation:Partial<converstation>):Partial<conversationApi>=>{

    const converstationapi:Partial<conversationApi>={
        success:true,
        message:'converstation fetched successfully',
        conversation:{
            _id:converstation.id||'',
            participants:[],
            createdAt:converstation.createdAt?.toISOString()||'',
            updatedAt:converstation.updatedAt?.toISOString()||''
        }
    }
    if(converstation.participants!==undefined) converstationapi.conversation!.participants=converstation.participants
    .map(participant=>{
        return{
            id:addaptProfileforapi(participant.user) as ApiUserProfile,
            isOnline:participant.isOnline
        }
    }) as ParticipantApi[];
    if(converstation.createdAt!==undefined) converstationapi.conversation!.createdAt=converstation.createdAt.toISOString();
    if(converstation.updatedAt!==undefined) converstationapi.conversation!.updatedAt=converstation.updatedAt.toISOString();
    return converstationapi;
}

export const safeadaptconverstation=(conversation:conversationApi|conversationApiarray):any=>{
    if(conversation.conversation && typeof conversation.conversation==='object'){
        return adaptConverstation(conversation as conversationApi);
    }
    else if(Array.isArray(conversation.conversation)){
        return (conversation as conversationApiarray).conversation.map(conv=>{
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
}