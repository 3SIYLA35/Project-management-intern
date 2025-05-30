

export interface Reply{
    id:string;
    content:string;
    user:string;
    parentReplyId:string;
    replyLevel:number;
    createdAt:Date;
    updatedAt:Date;
}

export interface Comment{
    id:string;
    content:string;
    taskId:string;
    user:string;
    replies:Comment[];
    createdAt:Date;
    updatedAt:Date;
}

export interface CommentInput{
    content:string;
    taskId:string;
}