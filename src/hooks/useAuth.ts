import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/services/authServices";


export const useGetUser = () =>{
    return useQuery({
        queryKey:['get-user-profile'],
        queryFn:getProfile,
        retry:false ,
        refetchOnWindowFocus: true
    })
}


export const useGetUserWithoutRefetch = () =>{
    return useQuery({
        queryKey:['get-user-profile-no-fetch'],
        queryFn:getProfile,
        retry:false ,
        refetchOnWindowFocus: false
    })
}
