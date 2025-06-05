import { Message } from "@/components/Profile/types";
import { adaptuserProfile, addaptProfileforapi, ApiUserProfile } from "./profileAdapter";



export interface messageApi{
    success:boolean;
    message:string;
    messages:messagesApi[];
    totalMessages:number;
    totalPages:number;
    currentPage:number;
    unreadCount:number;
}
export interface messagesApi{
    _id:string;
    conversationId:string;
    sender:ApiUserProfile;
    content:string;
    read:boolean;
    createdAt:Date;
    updatedAt:Date;
}

export const adaptmessage=(message:messagesApi):Message=>{
    return{
        id:message._id,
        content:message.content,
        sender:adaptuserProfile(message.sender),
        createdAt:message.createdAt,
        updatedAt:message.updatedAt,
        read:message.read,
        conversationId:message.conversationId,
    }
}


export const adaptmessageforapi=(message:Partial<Message>):Partial<messagesApi>=>{
    const messageapi:Partial<messagesApi>={
        _id:message?.id,
    }
    if(message.sender!==undefined) messageapi.sender=addaptProfileforapi(message.sender)as ApiUserProfile;
    if(message.conversationId!==undefined) messageapi.conversationId=message.conversationId;
    if(message.content!==undefined) messageapi.content=message.content;
    if(message.read!==undefined) messageapi.read=message.read;
    if(message.createdAt!==undefined) messageapi.createdAt=message.createdAt;
    if(message.updatedAt!==undefined) messageapi.updatedAt=message.updatedAt;
    return messageapi;
}
