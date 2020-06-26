import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Inbox } from "./folders/inbox";
import { Sent } from "./folders/sent";
import { Drafts } from "./folders/drafts";

export enum UserTheme {
    LIGHT = "default",
    DARK = "dark"
}

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
    })
    theme: UserTheme;

    @Column({
        nullable: false,
        default: false
    })
    keepMeLoggedIn: boolean;

    @OneToMany(type => Inbox, inbox => inbox.user)
    inbox: Inbox[];

    @OneToMany(type => Sent, sent => sent.user)
    sent: Sent[];

    @OneToMany(type => Drafts, drafts => drafts.user)
    drafts: Drafts[];

}
