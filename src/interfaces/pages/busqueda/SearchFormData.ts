export interface SearchFormData{
    assureEndBirthDate?: Date;        
    assureStartBirthDate?: Date;      
    assuredFatherSurname?: string;     
    assuredFolio?: string;             
    assuredMotherSurname?: string;     
    bussinessType: 'newBussiness' | 'increase' | 'include' | 'all'; 
    chargeMethod?: string;             
    ownerFatherSurname?: string;       
    ownerGender?: 'male' | 'female' | ''; 
    ownerMotherSurname?: string;       
    requestEndDate?: Date;             
    requestStartDate?: Date;           
    requestStatus: 'pendingManual' | 'completed' | 'all';
}