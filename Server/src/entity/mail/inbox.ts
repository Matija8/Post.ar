import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../user";

@Entity()
export class Inbox {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.inbox)
    user: User;

    @Column({ unique: true, nullable: false })
    message_id: string;

    @Column({ nullable: false })
    from: string;
    
    @Column({ nullable: false })
    isRead: boolean;
    
    @Column({ nullable: false })
    text: string;

    @Column({ nullable: false })
    timestamp: string;
    
}