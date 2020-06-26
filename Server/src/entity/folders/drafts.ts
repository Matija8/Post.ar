import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../user";

@Entity()
export class Drafts {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.drafts)
    user: User;

    @Column({ unique: true, nullable: false })
    messageId: string;

    @Column({ nullable: true })
    to: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    timestamp: string;
 
}
