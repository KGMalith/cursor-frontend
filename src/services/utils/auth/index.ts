import { axiosInstance } from "../../init";
import axios from 'axios';
import { SignInParameters, SignUpParameters, UpdatePasswordParameters, UpdateProfileParameters } from "../../interfaces";

//signIn API Call
export let signIn = async (values:SignInParameters, setLoading:Function) => {
  try {
    let value:any = await axiosInstance.post("/signin", {...values});
    if (value.success === true) {
      setAccessToken(value.data.token);
    }
    setLoading(false);
    return value;
  } catch (error) {
    setLoading(false);
    return error;
  }
};

//signUp API Call
export let signUp = async (dataSet:SignUpParameters, setState:Function) => {
  try {
    let value = await axiosInstance.post(
      "/signup",
      {...dataSet},
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.loaded) {
            setState(false);
          }
        },
      }
    );
    return value;
  } catch (error) {
    return error;
  }
};

//get user profile data API Call
export let getProfileData = async () => {
  try {
      let value = await axiosInstance.get("/get-user-profile");
      return value;
  } catch (error) {
      return error;
  }
};

//update profile API Call
export let updateProfile = async (dataSet:UpdateProfileParameters) => {
  try {
      let value = await axiosInstance.post("/update-user-profile",
          {
              first_name: dataSet.first_name,
              last_name: dataSet.last_name
          });
      return value;
  } catch (error) {
      return error;
  }
};

//update password API Call
export let updatePassword = async (dataSet:UpdatePasswordParameters) => {
  try {
      let value = await axiosInstance.post("/update-password",
          {
              current_password: dataSet.current_password,
              new_password: dataSet.confirm_password
          });
      return value;
  } catch (error) {
      return error;
  }
};

//user image presigned url API Call
export let getProfileImagePresignedURL = async (type:string) => {
  try {
      let value = await axiosInstance.post("/upload-profile-image",
          {
              image_format_type: type,
          });
      return value;
  } catch (error) {
      return error;
  }
};

//upload user image
export let uploadUserImage = async (imageFile:any, uploadURL:string, setPrecentage:Function) => {
  try {
      let value = await axios.put(uploadURL, imageFile,
          {
              headers: {
                  'Content-Type': imageFile.type
              },
              onUploadProgress: progressEvent => {
                  let value:number = parseInt(Math.round(((progressEvent.loaded || 0) * 100) / (progressEvent.total ?? 1)).toString());
                  setPrecentage(value);

                  setTimeout(() => setPrecentage(0), 1500);
              },
          });
      return value;
  } catch (error) {
      return error
  }
}

//save user image
export let saveUserImage = async (type:string) => {
  try {
      let value = await axiosInstance.post("/update-profile-image",
          {
              image_format_type: type,
          }
      );
      return value;
  } catch (error) {
      return error;
  }
};


//set Access Token
export let setAccessToken = (value:string) => {
  return localStorage.setItem("token", value);
};

//get Access Token
export let getAccessToken = () => {
  return localStorage.getItem("token");
};

//delete local storage
export let logout = () => {
  return localStorage.clear();
};