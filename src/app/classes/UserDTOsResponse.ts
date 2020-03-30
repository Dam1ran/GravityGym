import { UserDTO } from './UserDTO';

export class UserDTOsResponse {
    userDTOs :UserDTO[];
    numberOfPages: number;
    PageNumber: number;    
}