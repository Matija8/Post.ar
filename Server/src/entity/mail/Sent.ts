import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../User";

@Entity()
export class Sent {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.sent)
    user: User;

    @Column({ unique: true, nullable: false })
    message_id: string;
    
    @Column({ nullable: false })
    to: string;

    @Column({ nullable: false })
    text: string;

    @Column({ nullable: false })
    timestamp: string;

}