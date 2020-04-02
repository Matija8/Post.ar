import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Inbox } from "./mail/Inbox";
import { Sent } from "./mail/Sent";
import { Drafts } from "./mail/Drafts";

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
        nullable: false
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

    @OneToMany(type => Inbox, inbox => inbox.user)
    inbox: Inbox[];

    @OneToMany(type => Sent, sent => sent.user)
    sent: Sent[];

    @OneToMany(type => Drafts, drafts => drafts.user)
    drafts: Drafts[];

}
