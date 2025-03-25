import { Message } from "@/model/User.Model";

export interface ApiResponose{
    success: boolean;
    message: string;
    isAcceptingMessage?:  boolean; 
    messages?: Array<Message>
}