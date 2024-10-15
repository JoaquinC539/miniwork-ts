export interface SearchFormData{
    assureEndBirthDate?: Date;        // Optional date field
    assureStartBirthDate?: Date;      // Optional date field
    assuredFatherSurname?: string;     // Optional string
    assuredFolio?: string;             // Optional string
    assuredMotherSurname?: string;     // Optional string
    bussinessType: 'newBussiness' | 'increase' | 'include' | 'all'; // Required with union types
    chargeMethod?: string;             // Optional string
    ownerFatherSurname?: string;       // Optional string
    ownerGender?: 'male' | 'female' | ''; // Optional gender with union types
    ownerMotherSurname?: string;       // Optional string
    requestEndDate?: Date;             // Optional date field
    requestStartDate?: Date;           // Optional date field
    requestStatus: 'pendingManual' | 'completed' | 'all';
}