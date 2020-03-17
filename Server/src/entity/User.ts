import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

}
