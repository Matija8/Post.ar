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
    is_read: boolean;
    
    @Column({ nullable: false })
    is_starred: boolean;

    @Column({ nullable: false })
    subject: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    timestamp: string;

    @Column({nullable:false})
    is_deleted: boolean;

}
