import LoginDto from "./LoginDto"

export default interface RegisterDto extends LoginDto {
    organization: string;
    area?: string;
}