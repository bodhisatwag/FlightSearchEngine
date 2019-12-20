export interface Flight {
    number: string;
    amount: string;
    depart: string;
    departCode: string;
    arrive: string;
    arriveCode: string;
    departDate: string;
    departTime: string;
    arriveDate: string;
    arriveTime: string;
    carrier: string;
};

export interface Passenger {
    name: string;
    age: number;
    sex: Sex;
}

export enum Sex {
    Male = 'Male',
    Female = 'Female',
    UnDisclosed = 'UnDisclosed'
}