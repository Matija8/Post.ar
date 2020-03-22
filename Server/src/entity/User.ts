import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { InboxMail } from "./InboxMail";

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

    @OneToMany(type => InboxMail, inbox => inbox.user)
    inbox: InboxMail[];

}
