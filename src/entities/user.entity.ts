import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import {UserRoleEnum} from "../common/enums/user-role.enam";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "enum", enum:UserRoleEnum,default:UserRoleEnum.GUEST })
    role: UserRoleEnum;
}