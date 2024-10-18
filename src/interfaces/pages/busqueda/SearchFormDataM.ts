export interface SearchFormDataM{
    status:string;
    typeOfBusinessIs:string;
    gender?:string;
    ownerPaternalLastName?:string;
    ownerMaternalLastName?:string;
    insuredPaternalLastName?:string;
    insuredMaternalLastName?:string;
    dteOfBirthBefore?:Date;
    dteOfBirthAfter?:Date;
    policyNumber?:string;
    paymentMethod?:string;
    dteOfAppBefore?:Date;
    dteOfAppAfter?:Date;
}