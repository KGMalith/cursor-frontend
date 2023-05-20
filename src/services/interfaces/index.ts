export interface SignInParameters {
    email: string,
    password: string
};

export interface SignUpParameters {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export interface UpdateProfileParameters {
    first_name: string;
    last_name: string;
};

export interface UpdatePasswordParameters {
    current_password: string;
    confirm_password: string;
};

export interface UpdatePasswordFormikParameters {
    current_password: string;
    new_password:string;
    confirm_password: string;
};

export interface UpdateProfileFormikParameters {
    email:string;
    first_name: string;
    last_name: string;
};

export interface SubmitProfileImageFormikParameters {
    user_image:Array<any>;
};