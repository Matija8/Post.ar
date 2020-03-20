import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Mail } from "./Mail";

@Entity()
export class Inbox {
    
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Mail, mail => mail.message)
    messages: Mail[];

}
