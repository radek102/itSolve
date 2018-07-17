export class CategoryNodeDto {
    Id : number;
    Name : string;
    Description : string;
    Children : CategoryNodeDto[];
    ParentId : number;
}
