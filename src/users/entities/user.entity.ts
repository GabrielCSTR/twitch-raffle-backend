import { IsEmail, IsString } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    @ObjectIdColumn()
    _id?: string;

    @IsString()
    @Column({unique: true})
    twitchId: string;

    @IsString()
    @Column()
    displayName: string;

    @IsString()
    @Column()
    broadcaster_type: string;

    @IsString()
    @Column()
    profile_image_url: string;

    @IsString()
    @Column()
    offline_image_url: string;

    @IsString()
    @Column()
    description: string;

    @Column()
    view_count: number;

    @IsEmail()
    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at?: Date;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at?: Date;

    @BeforeInsert()
    setDefaultValue?(): void {
        const newDate = new Date()
        this.created_at = newDate
        this.updated_at = newDate
    }

    @BeforeUpdate()
    updateDefaultValues?(): void {
        this.updated_at = new Date()
    }
}

