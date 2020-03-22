import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class InboxMail {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.inbox)
    user: User;

    @Column({ nullable: false })
    from: string;

    @Column({ nullable: false })
    isRead: boolean;

    @Column({ nullable: false })
    text: string;

    @Column({ nullable: false })
    timestamp: string;
    
}
