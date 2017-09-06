import * as BlueBird from 'Bluebird';
export default interface IServiceCrudBase<T> {
    insert(model:T):BlueBird<T>;
    getById(id:number):BlueBird<T>;
    getAll():BlueBird<Array<T>>;
    update(id:number,model:T):BlueBird<T>;
    delete(id:number):BlueBird<boolean>;
}