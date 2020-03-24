import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class SentMail {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.inbox)
    user: User;

    @Column({ nullable: false })
    to: string;

    @Column({ nullable: false })
    text: string;

    @Column({ nullable: false })
    timestamp: string;
    
}