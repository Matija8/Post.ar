import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Inbox } from "./Inbox";

@Entity()
export class Mail {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Inbox, inbox => inbox.messages)
    message: Inbox;
    
    @Column({ nullable: false })
    isRead: boolean;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    timestamp: string;
    
}
