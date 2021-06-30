// Add User
export class AddUser {
    static readonly type = '[User] Add';

    constructor(public payload: any) { }
}
// Update User
export class UpdateUser {
    static readonly type = '[User] Update';
    constructor(public payload: any) { }
}

// get User
export class GetUser {
    static readonly type = '[User] Get';

}
// single User
export class SetSelectedUser {
    static readonly type = '[User] Set';
    constructor(public id: number) { }
}
// delete User
export class DeleteUser {
    static readonly type = '[User] Delete'
    constructor(public id: string) { }
}