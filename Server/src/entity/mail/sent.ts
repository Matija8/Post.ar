import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../user";

@Entity()
export class Sent {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.sent)
    user: User;

    @Column({ unique: true, nullable: false })
    messageId: string;
    
    @Column({ nullable: false })
    to: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    timestamp: string;

    @Column({ nullable: false })
    isStarred: boolean;

    @Column({ nullable: false })
    isDeleted: boolean;

}