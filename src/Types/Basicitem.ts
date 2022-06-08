import { Document } from "mongoose";

export interface BasicItem extends Document {
    title: string;
    description: string;
}