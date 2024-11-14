// src/DTO/regitesrDTO.ts

export interface RegisterDTO {
    username: string;
    password: string;
    organization: string;
    region?: string;
  }
  
  export interface LoginDTO {
    username: string;
    password: string;
  }