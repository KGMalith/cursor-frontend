import toast from 'react-hot-toast';

const errorHandler = async (error:any) => {
    toast.error(error.data.msg);
    return error.data

}

const successHandler = (response:any) => {
    if (response.showMessage === true) {
        toast.success(response.msg);
    }
    return response
}

export {
    errorHandler,
    successHandler,
}