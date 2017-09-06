import * as BlueBird from 'bluebird';

export default interface IAppServiceCrudBase<T> {
    insert(model:T):BlueBird<T>;
    getById(id:number):BlueBird<T>;
    getAll():BlueBird<Array<T>>;
    update(id:number,model:T):BlueBird<T>;
    delete(id:number):BlueBird<boolean>;
}