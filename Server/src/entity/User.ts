import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Inbox } from "./Inbox";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false,
        length: 64
    })
    username: string;

    @Column({
        nullable: false,
        length: 64
    })
    password: string;

    @Column({
        nullable: false,
        length: 64
    })
    name: string;

    @Column({
        nullable: false,
        length: 64
    })
    surname: string;

    @OneToOne(type => Inbox)
    @JoinColumn()
    inbox: Inbox;

}
