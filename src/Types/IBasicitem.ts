import { Document } from "mongoose";

export interface IBasicItem extends Document {
    title: string;
    description: string;
}