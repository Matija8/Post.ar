import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../User";

@Entity()
export class Drafts {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.drafts)
    user: User;

    @Column({ unique: true, nullable: false })
    message_id: string;
    
    @Column({ nullable: false })
    text: string;

    @Column({ nullable: false })
    timestamp: string;
    
}
