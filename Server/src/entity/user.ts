import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Inbox } from "./mail/inbox";
import { Sent } from "./mail/sent";
import { Drafts } from "./mail/drafts";

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

    @Column({
        nullable: false,
        enum: ["default", "dark"]
    })
    theme: string;

    @OneToMany(type => Inbox, inbox => inbox.user)
    inbox: Inbox[];

    @OneToMany(type => Sent, sent => sent.user)
    sent: Sent[];

    @OneToMany(type => Drafts, drafts => drafts.user)
    drafts: Drafts[];

}
